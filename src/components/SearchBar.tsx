import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllFrameworks } from '../data/loader'
import { catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import styles from './SearchBar.module.css'

const MAX_SUGGESTIONS = 7

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}

export default function SearchBar({ value, onChange, inputRef }: SearchBarProps) {
  const { t, localized } = useI18n()
  const navigate = useNavigate()
  const [isMac, setIsMac] = useState(false)
  const [active, setActive] = useState(-1)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes('MAC'))
  }, [])

  // Compute suggestions from input value
  const suggestions = (() => {
    if (!value.trim() || value.length < 1) return []
    const q = value.toLowerCase()
    return getAllFrameworks()
      .filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.name_zh.includes(q) ||
        f.origin_author?.toLowerCase().includes(q)
      )
      .slice(0, MAX_SUGGESTIONS)
  })()

  const hasSuggestions = suggestions.length > 0 && open

  const selectSuggestion = useCallback((slug: string) => {
    setOpen(false)
    setActive(-1)
    onChange('')
    navigate(`/frameworks/${slug}`)
  }, [navigate, onChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!hasSuggestions) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(prev => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault()
      selectSuggestion(suggestions[active].slug)
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActive(-1)
    }
  }, [hasSuggestions, active, suggestions, selectSuggestion])

  // Open dropdown when typing
  const handleChange = useCallback((val: string) => {
    onChange(val)
    setOpen(true)
    setActive(-1)
  }, [onChange])

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className={styles.container} ref={containerRef}>
      <span className={styles.icon}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder={t.searchPlaceholder}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => value.trim() && setOpen(true)}
        role="combobox"
        aria-expanded={hasSuggestions}
        aria-autocomplete="list"
      />
      <span className={styles.shortcut}>{isMac ? '\u2318K' : 'Ctrl+K'}</span>

      {hasSuggestions && (
        <ul className={styles.dropdown} role="listbox">
          {suggestions.map((fw, i) => (
            <li
              key={fw.slug}
              className={`${styles.suggestion} ${i === active ? styles.suggestionActive : ''}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={e => { e.preventDefault(); selectSuggestion(fw.slug) }}
            >
              <span
                className={styles.suggestionDot}
                style={{ backgroundColor: catColorVar(fw.category, 'text') }}
              />
              <span className={styles.suggestionName}>{localized(fw, 'name')}</span>
              {fw.origin_author && (
                <span className={styles.suggestionAuthor}>{fw.origin_author}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
