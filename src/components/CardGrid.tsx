import type { Framework } from '../types'
import FrameworkCard from './FrameworkCard'
import styles from './CardGrid.module.css'

interface CardGridProps {
  frameworks: Framework[]
  onCardClick: (fw: Framework) => void
  favorites: string[]
  onToggleFavorite: (slug: string) => void
  hideCategoryTag?: boolean
}

export default function CardGrid({
  frameworks,
  onCardClick,
  favorites,
  onToggleFavorite,
  hideCategoryTag = false,
}: CardGridProps) {
  if (frameworks.length === 0) {
    return (
      <div className={styles.grid}>
        <div className={styles.empty}>No frameworks found.</div>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {frameworks.map((fw) => (
        <FrameworkCard
          key={fw.slug}
          framework={fw}
          onClick={onCardClick}
          isFavorite={favorites.includes(fw.slug)}
          onToggleFavorite={onToggleFavorite}
          hideCategoryTag={hideCategoryTag}
        />
      ))}
    </div>
  )
}
