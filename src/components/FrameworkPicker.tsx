import { useState, useRef, useEffect, useCallback } from 'react'
import type { Framework, CategoryKey } from '../types'
import { categories, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import styles from './FrameworkPicker.module.css'

interface FrameworkPickerProps {
  frameworks: Framework[]
  value: string
  onChange: (slug: string) => void
  disabledSlugs?: string[]
  placeholder?: string
}

export default function FrameworkPicker({
  frameworks,
  value,
  onChange,
  disabledSlugs = [],
  placeholder = 'Search...',
}: FrameworkPickerProps) {
  const { locale, localized } = useI18n()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const selected = frameworks.find(f => f.slug === value)

  // Filter frameworks by search query
  const filtered = query.trim()
    ? frameworks.filter(f => {
        const q = query.toLowerCase()
        return f.name.toLowerCase().includes(q) || f.name_zh.includes(q) || f.origin_author?.toLowerCase().includes(q)
      })
    : frameworks

  // Group by category
  const grouped = categories
    .map(cat => ({
      cat,
      fws: filtered.filter(f => f.category === cat.key),
    }))
    .filter(g => g.fws.length > 0)

  // Flat list for keyboard navigation
  const flatList = grouped.flatMap(g => g.fws)

  const handleSelect = useCallback((slug: string) => {
    onChange(slug)
    setOpen(false)
    setQuery('')
    setActive(-1)
  }, [onChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(prev => Math.min(prev + 1, flatList.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter' && active >= 0 && flatList[active]) {
      e.preventDefault()
      if (!disabledSlugs.includes(flatList[active].slug)) {
        handleSelect(flatList[active].slug)
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }, [active, flatList, disabledSlugs, handleSelect])

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  return (
    <div className={styles.picker} ref={containerRef}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {selected ? (
          <span className={styles.selectedLabel}>
            <span className={styles.dot} style={{ backgroundColor: catColorVar(selected.category, 'text') }} />
            {localized(selected, 'name')}
          </span>
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
        <span className={styles.chevron}>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.searchBox}>
            <input
              ref={inputRef}
              className={styles.searchInput}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setActive(-1) }}
              onKeyDown={handleKeyDown}
              placeholder={locale === 'en' ? 'Type to filter...' : '输入筛选...'}
            />
          </div>
          <div className={styles.list}>
            {grouped.map(({ cat, fws }) => (
              <div key={cat.key}>
                <div className={styles.groupLabel}>
                  {locale === 'en' ? cat.name : cat.name_zh}
                </div>
                {fws.map(fw => {
                  const disabled = disabledSlugs.includes(fw.slug)
                  const isActive = flatList[active]?.slug === fw.slug
                  return (
                    <button
                      key={fw.slug}
                      className={`${styles.option} ${isActive ? styles.optionActive : ''} ${disabled ? styles.optionDisabled : ''}`}
                      onClick={() => !disabled && handleSelect(fw.slug)}
                      onMouseEnter={() => setActive(flatList.indexOf(fw))}
                      disabled={disabled}
                      type="button"
                    >
                      <span className={styles.dot} style={{ backgroundColor: catColorVar(fw.category, 'text') }} />
                      {localized(fw, 'name')}
                    </button>
                  )
                })}
              </div>
            ))}
            {flatList.length === 0 && (
              <div className={styles.empty}>
                {locale === 'en' ? 'No matches' : '无匹配'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
