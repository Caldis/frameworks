import { Link } from 'react-router-dom'
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

  const hasMore = frameworks.length > PREVIEW_COUNT
  const visible = hasMore ? frameworks.slice(0, PREVIEW_COUNT) : frameworks

  return (
    <section className={styles.categorySection}>
      <div
        className={styles.sectionHeader}
        style={{ borderLeft: `4px solid ${category.colorText}` }}
      >
        <Link to={`/category/${category.slug}`} className={styles.sectionNameLink}>
          {localized(category, 'name')}
        </Link>
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

      {hasMore && (
        <Link
          to={`/category/${category.slug}`}
          className={styles.showMore}
        >
          View all {frameworks.length} in {localized(category, 'name')} &rarr;
        </Link>
      )}
    </section>
  )
}
