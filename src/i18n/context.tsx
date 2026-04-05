import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import type { Locale, LocaleStrings } from './types'
import { en } from './locales/en'
import { zh } from './locales/zh'

const locales: Record<Locale, LocaleStrings> = { en, zh }
const STORAGE_KEY = 'fw-locale'

function detectLocale(): Locale {
  // 1. Check localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'zh') return stored
  } catch {}
  // 2. Check browser language
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('zh')) return 'zh'
  // 3. Default to English
  return 'en'
}

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: LocaleStrings
  // Helper to get localized framework fields
  localized: <T extends { [key: string]: any }>(
    obj: T,
    field: string
  ) => string
}

const I18nContext = createContext<I18nContextValue>(null!)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch {}
  }, [])

  const t = locales[locale]

  // Helper: localized(framework, 'name') returns framework.name or framework.name_zh
  const localized = useCallback(<T extends Record<string, any>>(obj: T, field: string): string => {
    if (locale === 'en') return obj[field] ?? ''
    const zhField = `${field}_zh`
    return obj[zhField] ?? obj[field] ?? ''
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, t, localized }), [locale, setLocale, t, localized])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
