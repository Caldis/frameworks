import { useState, useMemo, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts'
import { getAllFrameworks, getFrameworkFull } from '../data/loader'
import { categories } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import type { Framework, CategoryKey } from '../types'
import FrameworkPicker from '../components/FrameworkPicker'
import styles from './ComparePage.module.css'

const MAX_SLOTS = 3
const RADAR_COLORS = ['#2d6a4f', '#1a5276', '#922b21']

const SUGGESTIONS = [
  { slugs: ['solid-principles', 'grasp-patterns'], en: 'SOLID vs GRASP', zh: 'SOLID vs GRASP 原则' },
  { slugs: ['tdd', 'bdd'], en: 'TDD vs BDD', zh: '测试驱动 vs 行为驱动' },
  { slugs: ['microservices-decomposition', 'modular-monolith'], en: 'Microservices vs Monolith', zh: '微服务 vs 模块化单体' },
  { slugs: ['domain-driven-design', 'hexagonal-architecture'], en: 'DDD vs Hexagonal', zh: 'DDD vs 六边形架构' },
  { slugs: ['circuit-breaker-pattern', 'bulkhead-pattern'], en: 'Circuit Breaker vs Bulkhead', zh: '熔断器 vs 隔板模式' },
  { slugs: ['richardson-maturity-model', 'graphql-schema-design', 'grpc-protocol-buffers'], en: 'REST vs GraphQL vs gRPC', zh: 'REST vs GraphQL vs gRPC' },
]

function toRadarScore(fw: Framework) {
  const complexity = { beginner: 33, intermediate: 66, advanced: 100 }[fw.complexity] ?? 50
  const abstraction = { code: 25, component: 50, system: 75, organization: 100 }[fw.abstraction_level] ?? 50
  const maturity = { experimental: 25, emerging: 50, established: 75, foundational: 100 }[fw.maturity_ring] ?? 50
  const quality = Math.round(((fw.quality_concerns?.length ?? 0) / 9) * 100)
  const adoption = Math.min(fw.adopters.length * 20, 100)
  return { complexity, abstraction, maturity, quality, adoption }
}

export default function ComparePage() {
  const { locale, t, localized } = useI18n()
  usePageMeta('Compare Frameworks', 'Compare 2-3 software design frameworks side by side')
  const [searchParams, setSearchParams] = useSearchParams()

  // Read initial selection from URL (?fw=slug1,slug2)
  const [selected, setSelectedState] = useState<string[]>(() => {
    const param = searchParams.get('fw')
    return param ? param.split(',').filter(Boolean).slice(0, MAX_SLOTS) : []
  })

  // Sync selection to URL
  const setSelected = useCallback((updater: string[] | ((prev: string[]) => string[])) => {
    setSelectedState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      if (next.length > 0) {
        setSearchParams({ fw: next.join(',') }, { replace: true })
      } else {
        setSearchParams({}, { replace: true })
      }
      return next
    })
  }, [setSearchParams])

  const allFrameworks = useMemo(() => getAllFrameworks(), [])

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

  const [fullFrameworks, setFullFrameworks] = useState<Framework[]>([])

  useEffect(() => {
    if (selectedFrameworks.length < 2) {
      setFullFrameworks([])
      return
    }
    Promise.all(selectedFrameworks.map(fw => getFrameworkFull(fw.slug))).then(results => {
      setFullFrameworks(results.filter(Boolean) as Framework[])
    })
  }, [selectedFrameworks])

  // Use full data for table/radar when available, stubs otherwise
  const displayFrameworks = fullFrameworks.length === selectedFrameworks.length
    ? fullFrameworks
    : selectedFrameworks

  // Radar chart data
  const radarData = useMemo(() => {
    if (displayFrameworks.length < 2) return []
    const dimKeys = ['complexity', 'abstraction', 'maturity', 'quality', 'adoption'] as const
    const dimLabels: Record<string, string> = {
      complexity: t.compareDimComplexity,
      abstraction: t.compareDimAbstraction,
      maturity: t.compareDimMaturity,
      quality: t.compareDimQuality,
      adoption: t.compareDimAdoption,
    }
    const scores = displayFrameworks.map(fw => toRadarScore(fw))
    return dimKeys.map(key => {
      const entry: Record<string, string | number> = { dimension: dimLabels[key] }
      displayFrameworks.forEach((fw, i) => {
        entry[fw.slug] = scores[i][key]
      })
      return entry
    })
  }, [displayFrameworks, t])

  // Detect differing values for highlighting
  const isDiff = (values: unknown[]) => {
    if (values.length < 2) return false
    const strs = values.map(v => JSON.stringify(v))
    return strs.some(s => s !== strs[0])
  }

  const handleSelect = (index: number, slug: string) => {
    setSelected(prev => {
      const next = [...prev]
      if (slug === '') {
        next.splice(index, 1)
      } else {
        next[index] = slug
      }
      return next
    })
  }

  const handleClear = () => setSelected([])

  const slotCount = Math.min(selected.length + 1, MAX_SLOTS)

  const complexityLabel = (fw: Framework) =>
    fw.complexity === 'beginner' ? t.complexityBeginner
      : fw.complexity === 'intermediate' ? t.complexityIntermediate
        : t.complexityAdvanced

  const complexityClass = (fw: Framework) =>
    fw.complexity === 'beginner' ? styles.badgeBeginner
      : fw.complexity === 'intermediate' ? styles.badgeIntermediate
        : styles.badgeAdvanced

  const abstractionLabel = (fw: Framework) => {
    const map: Record<string, string> = {
      code: t.abstractionCode, component: t.abstractionComponent,
      system: t.abstractionSystem, organization: t.abstractionOrganization,
    }
    return map[fw.abstraction_level] ?? fw.abstraction_level
  }

  const maturityLabel = (fw: Framework) => {
    const map: Record<string, string> = {
      foundational: t.maturityFoundational, established: t.maturityEstablished,
      emerging: t.maturityEmerging, experimental: t.maturityExperimental,
    }
    return map[fw.maturity_ring] ?? fw.maturity_ring
  }

  const maturityClass = (fw: Framework) => {
    const map: Record<string, string> = {
      foundational: styles.badgeFoundational, established: styles.badgeEstablished,
      emerging: styles.badgeEmerging, experimental: styles.badgeExperimental,
    }
    return map[fw.maturity_ring] ?? ''
  }

  const qualityLabels = (fw: Framework) =>
    (fw.quality_concerns ?? []).map(q => {
      const map: Record<string, string> = {
        reliability: t.qualityReliability, security: t.qualitySecurity,
        performance: t.qualityPerformance, maintainability: t.qualityMaintainability,
        scalability: t.qualityScalability, usability: t.qualityUsability,
        testability: t.qualityTestability, observability: t.qualityObservability,
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

  type Row = {
    label: string
    render: (fw: Framework) => React.ReactNode
    diffKey: (fw: Framework) => unknown
  }

  const rows: Row[] = [
    {
      label: locale === 'en' ? 'Category' : '分类',
      render: fw => getCategoryName(fw),
      diffKey: fw => fw.category,
    },
    {
      label: t.complexity,
      render: fw => (
        <span className={`${styles.badge} ${complexityClass(fw)}`}>
          {complexityLabel(fw)}
        </span>
      ),
      diffKey: fw => fw.complexity,
    },
    {
      label: t.filterAbstraction,
      render: fw => abstractionLabel(fw),
      diffKey: fw => fw.abstraction_level,
    },
    {
      label: t.filterMaturity,
      render: fw => (
        <span className={`${styles.badge} ${maturityClass(fw)}`}>
          {maturityLabel(fw)}
        </span>
      ),
      diffKey: fw => fw.maturity_ring,
    },
    {
      label: t.filterQuality,
      render: fw => qualityLabels(fw),
      diffKey: fw => fw.quality_concerns?.join(','),
    },
    {
      label: locale === 'en' ? 'Origin' : '起源',
      render: fw => getOrigin(fw),
      diffKey: () => null, // always different, never highlight
    },
    {
      label: t.whenToUse,
      render: fw => {
        const items = getWhenToUse(fw)
        return items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((item, i) => <li key={i} className={styles.listItem}>{item}</li>)}
          </ul>
        ) : '—'
      },
      diffKey: () => null,
    },
    {
      label: t.whenNotToUse,
      render: fw => {
        const items = getWhenNotToUse(fw)
        return items.length > 0 ? (
          <ul className={styles.list}>
            {items.map((item, i) => <li key={i} className={styles.listItem}>{item}</li>)}
          </ul>
        ) : '—'
      },
      diffKey: () => null,
    },
    {
      label: t.notableAdopters,
      render: fw => fw.adopters.length > 0 ? fw.adopters.join(', ') : '—',
      diffKey: () => null,
    },
  ]

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.compareTitle}</h1>
      <p className={styles.subtitle}>{t.compareSubtitle}</p>

      <div className={styles.selectors}>
        {Array.from({ length: slotCount }, (_, i) => (
          <FrameworkPicker
            key={i}
            frameworks={allFrameworks}
            value={selected[i] ?? ''}
            onChange={slug => handleSelect(i, slug)}
            disabledSlugs={selected.filter((_, j) => j !== i)}
            placeholder={t.compareSelect}
          />
        ))}
        {selected.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            {t.compareClear}
          </button>
        )}
      </div>

      {selectedFrameworks.length < 2 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>{t.compareEmpty}</p>
          <div className={styles.suggestionsSection}>
            <h2 className={styles.suggestionsTitle}>{t.compareSuggestions}</h2>
            <p className={styles.suggestionsHint}>{t.compareSuggestionsHint}</p>
            <div className={styles.suggestionsGrid}>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className={styles.suggestionCard}
                  onClick={() => setSelected(s.slugs)}
                >
                  <span className={styles.suggestionLabel}>
                    {locale === 'en' ? s.en : s.zh}
                  </span>
                  <span className={styles.suggestionCount}>
                    {s.slugs.length} frameworks
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Radar Chart */}
          <div className={styles.radarSection}>
            <h2 className={styles.radarTitle}>{t.compareRadarTitle}</h2>
            <div className={styles.radarChart}>
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="#e0ddd8" />
                  <PolarAngleAxis
                    dataKey="dimension"
                    tick={{ fontSize: 12, fontFamily: 'var(--font-mono)', fill: '#6b6560' }}
                  />
                  {displayFrameworks.map((fw, i) => (
                    <Radar
                      key={fw.slug}
                      name={localized(fw, 'name')}
                      dataKey={fw.slug}
                      stroke={RADAR_COLORS[i]}
                      fill={RADAR_COLORS[i]}
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  ))}
                  <Legend
                    wrapperStyle={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Table */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}></th>
                  {selectedFrameworks.map((fw, i) => (
                    <th key={fw.slug} className={styles.th}>
                      <span className={styles.fwName} style={{ color: RADAR_COLORS[i] }}>
                        {localized(fw, 'name')}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => {
                  const diffValues = displayFrameworks.map(fw => row.diffKey(fw))
                  const hasDiff = diffValues[0] !== null && isDiff(diffValues)
                  return (
                    <tr key={ri} className={hasDiff ? styles.diffRow : undefined}>
                      <td className={styles.tdLabel}>
                        {row.label}
                        {hasDiff && <span className={styles.diffDot} />}
                      </td>
                      {displayFrameworks.map(fw => (
                        <td key={fw.slug} className={styles.td}>
                          {row.render(fw)}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
