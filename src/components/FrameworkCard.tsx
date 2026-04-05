import type { Framework } from '../types'
import { getCategoryByKey } from '../data/categories'
import styles from './FrameworkCard.module.css'

interface FrameworkCardProps {
  framework: Framework
  onClick: (fw: Framework) => void
  isFavorite: boolean
  onToggleFavorite: (slug: string) => void
}

export default function FrameworkCard({
  framework,
  onClick,
  isFavorite,
  onToggleFavorite,
}: FrameworkCardProps) {
  const category = getCategoryByKey(framework.category)

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(framework.slug)
  }

  return (
    <div className={styles.card} onClick={() => onClick(framework)}>
      <span className={styles.number}>
        # {String(framework.id).padStart(2, '0')}
      </span>

      <button
        className={`${styles.star} ${isFavorite ? styles.starActive : ''}`}
        onClick={handleStarClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div className={styles.nameEn}>{framework.name}</div>
      <div className={styles.nameZh}>{framework.name_zh}</div>

      <div className={styles.tagRow}>
        {category && (
          <span
            className={styles.tag}
            style={{
              backgroundColor: category.colorBg,
              color: category.colorText,
            }}
          >
            {category.name}
          </span>
        )}
        {framework.ai_relevant && (
          <span className={styles.aiTag}>AI</span>
        )}
      </div>

      <div className={styles.descEn}>{framework.desc}</div>
      <div className={styles.descZh}>{framework.desc_zh}</div>
    </div>
  )
}
