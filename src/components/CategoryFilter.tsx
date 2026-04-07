import type { CategoryKey } from '../types'
import { categories, catColorVar } from '../data/categories'
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
          style={{
            '--cat-bg': catColorVar(cat.key, 'bg'),
            '--cat-text': catColorVar(cat.key, 'text'),
          } as React.CSSProperties}
        >
          {localized(cat, 'name')}<span className={styles.count}>{counts[cat.key]}</span>
        </button>
      ))}
    </div>
  )
}
