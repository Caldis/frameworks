import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  inputRef?: React.RefObject<HTMLInputElement>
}

export default function SearchBar({ value, onChange, inputRef }: SearchBarProps) {
  const { t } = useI18n()
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes('MAC'))
  }, [])

  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        onChange={e => onChange(e.target.value)}
      />
      <span className={styles.shortcut}>{isMac ? '\u2318K' : 'Ctrl+K'}</span>
    </div>
  )
}
