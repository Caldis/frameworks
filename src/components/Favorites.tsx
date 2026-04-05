import type { Framework } from '../types'
import CardGrid from './CardGrid'
import styles from './Favorites.module.css'

interface FavoritesProps {
  favorites: string[]
  frameworks: Framework[]
  onCardClick: (fw: Framework) => void
  onToggleFavorite: (slug: string) => void
}

export default function Favorites({
  favorites,
  frameworks,
  onCardClick,
  onToggleFavorite,
}: FavoritesProps) {
  if (favorites.length === 0) return null

  const favFrameworks = frameworks.filter(fw => favorites.includes(fw.slug))

  if (favFrameworks.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.star}>★</span>
        <span className={styles.title}>Favorites</span>
        <span className={styles.count}>{favFrameworks.length}</span>
      </div>
      <CardGrid
        frameworks={favFrameworks}
        onCardClick={onCardClick}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </section>
  )
}
