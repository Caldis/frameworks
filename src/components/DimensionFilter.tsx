import styles from './DimensionFilter.module.css'

interface DimensionFilterProps {
  label: string
  options: { key: string; label: string }[]
  active: string[]
  onChange: (selected: string[]) => void
}

export default function DimensionFilter({ label, options, active, onChange }: DimensionFilterProps) {
  const toggle = (key: string) => {
    if (active.includes(key)) {
      onChange(active.filter(k => k !== key))
    } else {
      onChange([...active, key])
    }
  }

  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      {options.map(opt => (
        <button
          key={opt.key}
          className={`${styles.pill} ${active.includes(opt.key) ? styles.pillActive : ''}`}
          onClick={() => toggle(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
