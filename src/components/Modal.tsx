import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Framework } from '../types'
import { getCategoryByKey } from '../data/categories'
import { useI18n } from '../i18n'
import StepsList from './StepsList'
import RelatedFrameworks from './RelatedFrameworks'
import styles from './Modal.module.css'

interface ModalProps {
  framework: Framework | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
  relatedFrameworks: Framework[]
}

const HINT_KEY = 'modal-nav-hint-shown'

export default function Modal({
  framework,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  relatedFrameworks,
}: ModalProps) {
  const { locale, t, localized } = useI18n()
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (framework && !sessionStorage.getItem(HINT_KEY)) {
      sessionStorage.setItem(HINT_KEY, '1')
      setShowHint(true)
      const timer = setTimeout(() => setShowHint(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [framework])

  useEffect(() => {
    if (!framework) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [framework, onClose, onPrev, onNext, hasPrev, hasNext])

  if (!framework) return null

  const category = getCategoryByKey(framework.category)
  const subtitle = locale === 'en' ? framework.name_zh : framework.name
  const steps = locale === 'en' ? framework.steps : framework.steps_zh

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.number}>
              # {String(framework.id).padStart(2, '0')}
            </span>
            <h2 className={styles.title}>{localized(framework, 'name')}</h2>
            <span className={styles.titleZh}>{subtitle}</span>
            {category && (
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  backgroundColor: category.colorBg,
                  color: category.colorText,
                  display: 'inline-block',
                }}
              >
                {localized(category, 'name')}
              </span>
            )}
            {framework.ai_relevant && (
              <span className={styles.aiTag}>AI</span>
            )}
          </div>
          <div className={styles.vizPlaceholder}>
            <span>{framework.viz_type}</span>
          </div>
          <p className={styles.desc}>{localized(framework, 'desc')}</p>
          <StepsList steps={steps} />
          {relatedFrameworks.length > 0 && (
            <div className={styles.related}>
              <h3>{t.relatedFrameworks}</h3>
              <RelatedFrameworks frameworks={relatedFrameworks} />
            </div>
          )}
          <Link
            to={`/frameworks/${framework.slug}`}
            className={styles.detailLink}
          >
            {t.viewDetails}
          </Link>
        </div>
      </div>
      {hasPrev && (
        <button
          className={styles.navPrev}
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
        >
          &larr;
        </button>
      )}
      {hasNext && (
        <button
          className={styles.navNext}
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
        >
          &rarr;
        </button>
      )}
      {showHint && (
        <div className={styles.hint}>
          ⌨️ ← → to navigate
        </div>
      )}
    </div>
  )
}
