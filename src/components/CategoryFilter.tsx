import type { CategoryKey } from '../types'
import { categories } from '../data/categories'
import { useI18n } from '../i18n'
import styles from './CategoryFilter.module.css'

interface CategoryFilterProps {
  active: CategoryKey | null
  onChange: (cat: CategoryKey | null) => void
  counts: Record<CategoryKey | 'all', number>
}

export default function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  const { t, localized } = useI18n()

  return (
    <div className={styles.filters}>
      <button
        className={`${styles.btn} ${active === null ? styles.btnActive : ''}`}
        onClick={() => onChange(null)}
      >
        {t.all}<span className={styles.count}>{counts.all}</span>
      </button>
      {categories.map(cat => (
        <button
          key={cat.key}
          className={`${styles.btn} ${active === cat.key ? styles.btnActive : ''}`}
          onClick={() => onChange(cat.key)}
          onMouseEnter={e => {
            if (active !== cat.key) {
              const el = e.currentTarget as HTMLButtonElement
              el.style.backgroundColor = cat.colorBg
              el.style.color = cat.colorText
              el.style.borderColor = cat.colorBg
            }
          }}
          onMouseLeave={e => {
            if (active !== cat.key) {
              const el = e.currentTarget as HTMLButtonElement
              el.style.backgroundColor = ''
              el.style.color = ''
              el.style.borderColor = ''
            }
          }}
        >
          {localized(cat, 'name')}<span className={styles.count}>{counts[cat.key]}</span>
        </button>
      ))}
    </div>
  )
}
