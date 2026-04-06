import { useState, useMemo } from 'react'
import { getAllFrameworks } from '../data/loader'
import { categories } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import type { Framework, CategoryKey } from '../types'
import styles from './ComparePage.module.css'

const MAX_SLOTS = 3

export default function ComparePage() {
  const { locale, t, localized } = useI18n()
  usePageMeta('Compare Frameworks', 'Compare 2-3 software design frameworks side by side')
  const [selected, setSelected] = useState<string[]>([])

  const allFrameworks = useMemo(() => getAllFrameworks(), [])

  // Group frameworks by category for optgroups
  const grouped = useMemo(() => {
    const map = new Map<CategoryKey, Framework[]>()
    for (const cat of categories) {
      const fws = allFrameworks.filter(f => f.category === cat.key)
      if (fws.length > 0) map.set(cat.key, fws)
    }
    return map
  }, [allFrameworks])

  const selectedFrameworks = useMemo(
    () => selected.map(slug => allFrameworks.find(f => f.slug === slug)).filter(Boolean) as Framework[],
    [selected, allFrameworks]
  )

  const handleSelect = (index: number, slug: string) => {
    setSelected(prev => {
      const next = [...prev]
      if (slug === '') {
        // Remove this slot and shift remaining
        next.splice(index, 1)
      } else {
        next[index] = slug
      }
      return next
    })
  }

  const handleClear = () => setSelected([])

  // How many selector slots to show: selected count + 1 (up to MAX_SLOTS)
  const slotCount = Math.min(selected.length + 1, MAX_SLOTS)

  const complexityLabel = (fw: Framework) =>
    fw.complexity === 'beginner'
      ? t.complexityBeginner
      : fw.complexity === 'intermediate'
        ? t.complexityIntermediate
        : t.complexityAdvanced

  const complexityClass = (fw: Framework) =>
    fw.complexity === 'beginner'
      ? styles.badgeBeginner
      : fw.complexity === 'intermediate'
        ? styles.badgeIntermediate
        : styles.badgeAdvanced

  const abstractionLabel = (fw: Framework) => {
    const map: Record<string, string> = {
      code: t.abstractionCode,
      component: t.abstractionComponent,
      system: t.abstractionSystem,
      organization: t.abstractionOrganization,
    }
    return map[fw.abstraction_level] ?? fw.abstraction_level
  }

  const maturityLabel = (fw: Framework) => {
    const map: Record<string, string> = {
      foundational: t.maturityFoundational,
      established: t.maturityEstablished,
      emerging: t.maturityEmerging,
      experimental: t.maturityExperimental,
    }
    return map[fw.maturity_ring] ?? fw.maturity_ring
  }

  const maturityClass = (fw: Framework) => {
    const map: Record<string, string> = {
      foundational: styles.badgeFoundational,
      established: styles.badgeEstablished,
      emerging: styles.badgeEmerging,
      experimental: styles.badgeExperimental,
    }
    return map[fw.maturity_ring] ?? ''
  }

  const qualityLabels = (fw: Framework) =>
    (fw.quality_concerns ?? []).map(q => {
      const map: Record<string, string> = {
        reliability: t.qualityReliability,
        security: t.qualitySecurity,
        performance: t.qualityPerformance,
        maintainability: t.qualityMaintainability,
        scalability: t.qualityScalability,
        usability: t.qualityUsability,
        testability: t.qualityTestability,
        observability: t.qualityObservability,
        portability: t.qualityPortability,
      }
      return map[q] ?? q
    }).join(', ')

  const getCategoryName = (fw: Framework) => {
    const cat = categories.find(c => c.key === fw.category)
    if (!cat) return ''
    return locale === 'en' ? cat.name : cat.name_zh
  }

  const getOrigin = (fw: Framework) => {
    const source = locale === 'en' ? fw.origin_source : fw.origin_source_zh
    return `${fw.origin_author} — ${source}`
  }

  const getWhenToUse = (fw: Framework) =>
    locale === 'en' ? fw.when_to_use : fw.when_to_use_zh

  const getWhenNotToUse = (fw: Framework) =>
    locale === 'en' ? fw.when_not_to_use : fw.when_not_to_use_zh

  // Build rows
  type Row = {
    label: string
    render: (fw: Framework) => React.ReactNode
  }

  const rows: Row[] = [
    {
      label: locale === 'en' ? 'Category' : '分类',
      render: fw => getCategoryName(fw),
    },
    {
      label: t.complexity,
      render: fw => (
        <span className={`${styles.badge} ${complexityClass(fw)}`}>
          {complexityLabel(fw)}
        </span>
      ),
    },
    {
      label: t.filterAbstraction,
      render: fw => abstractionLabel(fw),
    },
    {
      label: t.filterMaturity,
      render: fw => (
        <span className={`${styles.badge} ${maturityClass(fw)}`}>
          {maturityLabel(fw)}
        </span>
      ),
    },
    {
      label: t.filterQuality,
      render: fw => qualityLabels(fw),
    },
    {
      label: locale === 'en' ? 'Origin' : '起源',
      render: fw => getOrigin(fw),
    },
    {
      label: t.whenToUse,
      render: fw => {
        const items = getWhenToUse(fw)
        return items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li key={i} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        ) : '—'
      },
    },
    {
      label: t.whenNotToUse,
      render: fw => {
        const items = getWhenNotToUse(fw)
        return items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((item, i) => (
              <li key={i} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        ) : '—'
      },
    },
    {
      label: t.notableAdopters,
      render: fw =>
        fw.adopters.length > 0 ? fw.adopters.join(', ') : '—',
    },
  ]

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.compareTitle}</h1>
      <p className={styles.subtitle}>{t.compareSubtitle}</p>

      <div className={styles.selectors}>
        {Array.from({ length: slotCount }, (_, i) => (
          <div key={i} className={styles.selector}>
            <select
              className={styles.select}
              value={selected[i] ?? ''}
              onChange={e => handleSelect(i, e.target.value)}
            >
              <option value="">{t.compareSelect}</option>
              {Array.from(grouped.entries()).map(([catKey, fws]) => {
                const cat = categories.find(c => c.key === catKey)!
                const label = locale === 'en' ? cat.name : cat.name_zh
                return (
                  <optgroup key={catKey} label={label}>
                    {fws.map(fw => {
                      // Disable if already selected in another slot
                      const isSelectedElsewhere = selected.includes(fw.slug) && selected[i] !== fw.slug
                      return (
                        <option
                          key={fw.slug}
                          value={fw.slug}
                          disabled={isSelectedElsewhere}
                        >
                          {localized(fw, 'name')}
                        </option>
                      )
                    })}
                  </optgroup>
                )
              })}
            </select>
          </div>
        ))}
        {selected.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            {t.compareClear}
          </button>
        )}
      </div>

      {selectedFrameworks.length < 2 ? (
        <div className={styles.empty}>{t.compareEmpty}</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}></th>
                {selectedFrameworks.map(fw => (
                  <th key={fw.slug} className={styles.th}>
                    <span className={styles.fwName}>{localized(fw, 'name')}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  <td className={styles.tdLabel}>{row.label}</td>
                  {selectedFrameworks.map(fw => (
                    <td key={fw.slug} className={styles.td}>
                      {row.render(fw)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
