import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Framework } from '../types'
import { getCategoryByKey, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import FrameworkViz from './FrameworkViz'
import StepsList from './StepsList'
import RelatedFrameworks from './RelatedFrameworks'
import ShaderCanvas from './ShaderCanvas'
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

// Category key → approximate RGB for shader tinting
const CAT_COLORS: Record<string, [number, number, number]> = {
  thinking:      [0.45, 0.73, 0.58],
  architecture:  [0.35, 0.58, 0.82],
  coding:        [0.64, 0.48, 0.80],
  quality:       [0.82, 0.35, 0.35],
  deployment:    [0.78, 0.72, 0.38],
  evolution:     [0.35, 0.72, 0.48],
  ai:            [0.82, 0.55, 0.32],
  data:          [0.35, 0.52, 0.72],
  security:      [0.72, 0.35, 0.52],
  distributed:   [0.35, 0.48, 0.68],
  api:           [0.55, 0.55, 0.32],
  team:          [0.72, 0.52, 0.32],
  observability: [0.35, 0.65, 0.55],
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
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 200)
  }, [onClose])

  useEffect(() => { setClosing(false) }, [framework])

  // Touch swipe
  const touchStartX = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) {
      if (diff > 0 && hasNext) onNext()
      if (diff < 0 && hasPrev) onPrev()
    }
  }

  // Navigation hint
  useEffect(() => {
    if (framework && !sessionStorage.getItem(HINT_KEY)) {
      sessionStorage.setItem(HINT_KEY, '1')
      setShowHint(true)
      const timer = setTimeout(() => setShowHint(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [framework])

  // Keyboard navigation
  useEffect(() => {
    if (!framework) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [framework, handleClose, onPrev, onNext, hasPrev, hasNext])

  const shaderColor = useMemo(
    () => framework ? (CAT_COLORS[framework.category] || [0.6, 0.6, 0.6]) : [0.6, 0.6, 0.6],
    [framework?.category]
  )

  if (!framework) return null

  const category = getCategoryByKey(framework.category)
  const steps = locale === 'en' ? framework.steps : framework.steps_zh
  const formattedNumber = String(framework.id).padStart(2, '0')

  return (
    <div className={`${styles.overlay} ${closing ? styles.overlayClosing : ''}`} onClick={handleClose}>
      <div
        className={`${styles.modal} ${closing ? styles.modalClosing : ''}`}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button className={styles.close} onClick={handleClose}>&times;</button>

        {/* Left panel: shader + viz */}
        <div className={styles.leftPanel} key={`left-${framework.slug}`}>
          <div
            className={styles.catAccent}
            style={{ backgroundColor: catColorVar(framework.category, 'text') }}
          />
          <ShaderCanvas color={shaderColor} className={styles.shader} />
          <span className={styles.numberWatermark}>{formattedNumber}</span>
          <div className={styles.vizWrap}>
            <FrameworkViz type={framework.viz_type} size={260} animate labels={
              (locale === 'en' ? framework.viz_labels : framework.viz_labels_zh) || steps
            } />
          </div>
        </div>

        {/* Right panel: content */}
        <div className={styles.rightPanel} key={`right-${framework.slug}`}>
          {/* Meta line */}
          <div className={styles.meta}>
            <span className={styles.number}># {formattedNumber}</span>
            {category && (
              <span
                className={styles.catPill}
                style={{
                  backgroundColor: catColorVar(framework.category, 'bg'),
                  color: catColorVar(framework.category, 'text'),
                }}
              >
                {localized(category, 'name')}
              </span>
            )}
            {framework.ai_relevant && <span className={styles.aiTag}>AI</span>}
          </div>

          {/* Title */}
          <h2 className={styles.title}>{localized(framework, 'name')}</h2>
          {locale === 'zh' && <div className={styles.subtitle}>{framework.name}</div>}

          {/* Description */}
          <p className={styles.desc}>{localized(framework, 'desc')}</p>

          {/* Steps */}
          <div className={styles.stepsWrap}>
            <StepsList steps={steps} />
          </div>

          {/* Related */}
          {relatedFrameworks.length > 0 && (
            <div className={styles.related}>
              <h3>{t.relatedFrameworks}</h3>
              <RelatedFrameworks frameworks={relatedFrameworks} />
            </div>
          )}

          {/* CTA */}
          <Link to={`/frameworks/${framework.slug}`} className={styles.detailLink}>
            {t.viewDetails}
          </Link>
        </div>
      </div>

      {/* Prev/Next navigation */}
      {hasPrev && (
        <button className={styles.navPrev} onClick={e => { e.stopPropagation(); onPrev() }} aria-label="Previous">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {hasNext && (
        <button className={styles.navNext} onClick={e => { e.stopPropagation(); onNext() }} aria-label="Next">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      {/* Keyboard hint */}
      {showHint && <div className={styles.hint}>← → navigate &middot; esc close</div>}
    </div>
  )
}
