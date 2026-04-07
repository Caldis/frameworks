import type { Framework } from '../types'
import { getCategoryByKey, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import Fingerprint from './Fingerprint'
import styles from './FrameworkCard.module.css'

interface FrameworkCardProps {
  framework: Framework
  onClick: (fw: Framework) => void
  isFavorite: boolean
  onToggleFavorite: (slug: string) => void
  hideCategoryTag?: boolean
}

export default function FrameworkCard({
  framework,
  onClick,
  isFavorite,
  onToggleFavorite,
  hideCategoryTag = false,
}: FrameworkCardProps) {
  const { localized } = useI18n()
  const category = getCategoryByKey(framework.category)

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(framework.slug)
  }

  return (
    <div className={styles.card} onClick={() => onClick(framework)}>
      <div className={styles.topRow}>
        <span className={styles.number}>
          # {String(framework.id).padStart(2, '0')}
        </span>
        <Fingerprint
          framework={framework}
          color={catColorVar(framework.category, 'text')}
        />
      </div>

      <button
        className={`${styles.star} ${isFavorite ? styles.starActive : ''}`}
        onClick={handleStarClick}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div className={styles.name}>{localized(framework, 'name')}</div>

      <div className={styles.tagRow}>
        {category && !hideCategoryTag && (
          <span
            className={styles.tag}
            style={{
              backgroundColor: catColorVar(framework.category, 'bg'),
              color: catColorVar(framework.category, 'text'),
            }}
          >
            {localized(category, 'name')}
          </span>
        )}
        {framework.ai_relevant && (
          <span className={styles.aiTag}>AI</span>
        )}
      </div>

      <div className={styles.desc}>{localized(framework, 'desc')}</div>

      <div className={styles.meta}>
        <span className={`${styles.complexity} ${
          framework.complexity === 'beginner' ? styles.complexityBeginner
          : framework.complexity === 'intermediate' ? styles.complexityIntermediate
          : styles.complexityAdvanced
        }`}>
          {framework.complexity === 'beginner' ? '~' : framework.complexity === 'intermediate' ? '~~' : '~~~'}
        </span>
        {framework.origin_author && (
          <span className={styles.author}>{framework.origin_author}</span>
        )}
      </div>
    </div>
  )
}
