import { useState } from 'react'
import type { Category, Framework } from '../types'
import { useI18n } from '../i18n'
import CardGrid from './CardGrid'
import styles from './CategorySection.module.css'

const PREVIEW_COUNT = 6

interface CategorySectionProps {
  category: Category
  frameworks: Framework[]
  onCardClick: (fw: Framework) => void
  favorites: string[]
  onToggleFavorite: (slug: string) => void
}

export default function CategorySection({
  category,
  frameworks,
  onCardClick,
  favorites,
  onToggleFavorite,
}: CategorySectionProps) {
  const { localized } = useI18n()
  const [expanded, setExpanded] = useState(false)

  const hasMore = frameworks.length > PREVIEW_COUNT
  const visible = expanded || !hasMore ? frameworks : frameworks.slice(0, PREVIEW_COUNT)

  return (
    <section className={styles.categorySection}>
      <div
        className={styles.sectionHeader}
        style={{ borderLeft: `4px solid ${category.colorText}` }}
      >
        <span className={styles.sectionName}>
          {localized(category, 'name')}
        </span>
        <span className={styles.sectionNameZh}>
          {category.name_zh}
        </span>
        <span className={styles.sectionCount}>
          {frameworks.length}
        </span>
      </div>

      <CardGrid
        frameworks={visible}
        onCardClick={onCardClick}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />

      {hasMore && !expanded && (
        <button
          className={styles.showMore}
          onClick={() => setExpanded(true)}
        >
          Show all {frameworks.length} &rarr;
        </button>
      )}
    </section>
  )
}
