import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Framework } from '../types'
import type { TypedRelation, RelationType } from '../types'
import { getCategoryByKey, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import styles from './RelatedFrameworks.module.css'

interface RelatedFrameworksProps {
  frameworks: Framework[]
  typedRelations?: TypedRelation[]
}

export default function RelatedFrameworks({ frameworks, typedRelations }: RelatedFrameworksProps) {
  const { localized, t } = useI18n()

  const relTypeLabels: Record<RelationType, string> = {
    related: t.relTypeRelated,
    alternative: t.relTypeAlternative,
    complement: t.relTypeComplement,
    extends: t.relTypeExtends,
    prerequisite: t.relTypePrerequisite,
  }

  const typeMap = typedRelations
    ? Object.fromEntries(typedRelations.map(r => [r.slug, r.type]))
    : {}

  // Wheel → horizontal scroll, stop propagation to modal/page
  const rowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const handler = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        e.stopPropagation()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [])

  return (
    <div className={styles.row} ref={rowRef}>
      {frameworks.map((fw) => {
        const category = getCategoryByKey(fw.category)
        const relType = typeMap[fw.slug] as RelationType | undefined
        const typeLabel = relType ? relTypeLabels[relType] : undefined
        const showBadge = relType && relType !== 'related'
        return (
          <Link
            key={fw.slug}
            to={`/frameworks/${fw.slug}`}
            className={styles.card}
          >
            <div className={styles.name}>
              {localized(fw, 'name')}
              {showBadge && (
                <span className={styles.relType}>{typeLabel}</span>
              )}
            </div>
            {category && (
              <span
                className={styles.pill}
                style={{
                  backgroundColor: catColorVar(fw.category, 'bg'),
                  color: catColorVar(fw.category, 'text'),
                }}
              >
                {localized(category, 'name')}
              </span>
            )}
            <div className={styles.desc}>{localized(fw, 'desc')}</div>
          </Link>
        )
      })}
    </div>
  )
}
