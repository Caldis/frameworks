import { useState, useRef, useLayoutEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { Category, Framework } from '../types'
import { catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import { useHorizontalScroll } from '../hooks/useHorizontalScroll'
import FrameworkCard from './FrameworkCard'
import styles from './CategorySection.module.css'

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
  const { locale, localized } = useI18n()
  const [expanded, setExpanded] = useState(false)
  const { containerRef, scrollState, scrollBy, reset } = useHorizontalScroll(!expanded)
  const flipRef = useRef<Map<string, DOMRect> | null>(null)
  const showToggle = frameworks.length > 4

  const handleToggle = useCallback(() => {
    // FLIP phase 1: capture First positions
    if (containerRef.current) {
      const rects = new Map<string, DOMRect>()
      containerRef.current.querySelectorAll<HTMLElement>('[data-card]').forEach(el => {
        rects.set(el.dataset.card!, el.getBoundingClientRect())
      })
      flipRef.current = rects
    }
    setExpanded(prev => !prev)
  }, [containerRef])

  // FLIP phases 2-4: Last → Invert → Play
  useLayoutEffect(() => {
    const first = flipRef.current
    const container = containerRef.current
    if (!first || !container) return
    flipRef.current = null

    container.querySelectorAll<HTMLElement>('[data-card]').forEach(el => {
      const prev = first.get(el.dataset.card!)
      if (!prev) return
      const next = el.getBoundingClientRect()
      const dx = prev.left - next.left
      const dy = prev.top - next.top
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return

      el.style.transform = `translate(${dx}px, ${dy}px)`

      requestAnimationFrame(() => {
        el.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
        el.style.transform = 'none'

        const done = () => {
          el.style.transition = ''
          el.style.transform = ''
          el.removeEventListener('transitionend', done)
        }
        el.addEventListener('transitionend', done)
      })
    })

    if (!expanded) reset()
  }, [expanded, containerRef, reset])

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header} style={{ borderLeftColor: catColorVar(category.key, 'text') }}>
        <Link to={`/category/${category.slug}`} className={styles.nameLink}>
          {localized(category, 'name')}
        </Link>
        <span className={styles.nameAlt}>
          {locale === 'en' ? category.name_zh : category.name}
        </span>
        <span className={styles.count}>{frameworks.length}</span>
        {showToggle && (
          <button className={styles.toggle} onClick={handleToggle}>
            {expanded
              ? (locale === 'en' ? 'Collapse' : '收起')
              : (locale === 'en' ? `Show all ${frameworks.length}` : `展开全部 ${frameworks.length}`)
            }
          </button>
        )}
        <Link to={`/category/${category.slug}`} className={styles.catPageLink}>
          {locale === 'en' ? 'View category →' : '查看分类 →'}
        </Link>
      </div>

      {/* Scroll area */}
      <div className={`${styles.track} ${expanded ? styles.trackExpanded : ''}`}>
        {/* Arrows */}
        {!expanded && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft} ${scrollState.canScrollLeft ? '' : styles.arrowHidden}`}
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight} ${scrollState.canScrollRight ? '' : styles.arrowHidden}`}
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
            >
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        {/* Edge fades */}
        {!expanded && (
          <>
            <div className={`${styles.fade} ${styles.fadeLeft} ${scrollState.canScrollLeft ? '' : styles.fadeHidden}`} />
            <div className={`${styles.fade} ${styles.fadeRight} ${scrollState.canScrollRight ? '' : styles.fadeHidden}`} />
          </>
        )}

        {/* Cards */}
        <div
          ref={containerRef}
          className={`${styles.row} ${expanded ? styles.rowExpanded : ''}`}
        >
          {frameworks.map((fw, i) => (
            <div key={fw.slug} data-card={fw.slug} className={styles.slot} style={{ '--i': i } as React.CSSProperties}>
              <FrameworkCard
                framework={fw}
                onClick={onCardClick}
                isFavorite={favorites.includes(fw.slug)}
                onToggleFavorite={onToggleFavorite}
                hideCategoryTag
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
