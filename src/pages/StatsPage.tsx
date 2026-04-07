import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllFrameworks } from '../data/loader'
import { categories, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCountUp } from '../hooks/useCountUp'
import type { CategoryKey } from '../types'
import styles from './StatsPage.module.css'

export default function StatsPage() {
  const { locale, t, localized } = useI18n()
  usePageMeta('Insights', 'SDFrame collection statistics and data patterns')

  const frameworks = useMemo(() => getAllFrameworks(), [])

  // ── Category distribution ──
  const catStats = useMemo(() =>
    categories.map(c => ({
      key: c.key,
      name: locale === 'en' ? c.name : c.name_zh,
      count: frameworks.filter(f => f.category === c.key).length,
    })).sort((a, b) => b.count - a.count),
  [frameworks, locale])

  const maxCatCount = Math.max(...catStats.map(c => c.count))

  // ── Dimension distributions ──
  const count = (arr: string[]) => {
    const m: Record<string, number> = {}
    arr.forEach(v => { m[v] = (m[v] || 0) + 1 })
    return m
  }

  const complexityDist = useMemo(() => count(frameworks.map(f => f.complexity)), [frameworks])
  const abstractionDist = useMemo(() => count(frameworks.map(f => f.abstraction_level)), [frameworks])
  const maturityDist = useMemo(() => count(frameworks.map(f => f.maturity_ring)), [frameworks])

  const complexityLabels: Record<string, string> = { beginner: t.complexityBeginner, intermediate: t.complexityIntermediate, advanced: t.complexityAdvanced }
  const abstractionLabels: Record<string, string> = { code: t.abstractionCode, component: t.abstractionComponent, system: t.abstractionSystem, organization: t.abstractionOrganization }
  const maturityLabels: Record<string, string> = { foundational: t.maturityFoundational, established: t.maturityEstablished, emerging: t.maturityEmerging, experimental: t.maturityExperimental }

  // ── Quality concerns coverage ──
  const qualityStats = useMemo(() => {
    const qm: Record<string, number> = {}
    frameworks.forEach(f => f.quality_concerns?.forEach(q => { qm[q] = (qm[q] || 0) + 1 }))
    return Object.entries(qm).sort((a, b) => b[1] - a[1])
  }, [frameworks])
  const maxQuality = qualityStats.length > 0 ? qualityStats[0][1] : 1

  const qualityLabels: Record<string, string> = {
    reliability: t.qualityReliability, security: t.qualitySecurity,
    performance: t.qualityPerformance, maintainability: t.qualityMaintainability,
    scalability: t.qualityScalability, usability: t.qualityUsability,
    testability: t.qualityTestability, observability: t.qualityObservability,
    portability: t.qualityPortability,
  }

  // ── Top connected frameworks ──
  const topConnected = useMemo(() =>
    [...frameworks].sort((a, b) => b.related.length - a.related.length).slice(0, 10),
  [frameworks])

  // ── Top authors ──
  const topAuthors = useMemo(() => {
    const am: Record<string, number> = {}
    frameworks.forEach(f => {
      if (f.origin_author) am[f.origin_author] = (am[f.origin_author] || 0) + 1
    })
    return Object.entries(am).sort((a, b) => b[1] - a[1]).slice(0, 12)
  }, [frameworks])

  // ── Top adopters ──
  const topAdopters = useMemo(() => {
    const am: Record<string, number> = {}
    frameworks.forEach(f => f.adopters?.forEach(a => { am[a] = (am[a] || 0) + 1 }))
    return Object.entries(am).sort((a, b) => b[1] - a[1]).slice(0, 20)
  }, [frameworks])
  const maxAdopter = topAdopters.length > 0 ? topAdopters[0][1] : 1

  // ── Category × Complexity heatmap ──
  const heatmap = useMemo(() => {
    const grid: Record<string, Record<string, number>> = {}
    categories.forEach(c => {
      grid[c.key] = { beginner: 0, intermediate: 0, advanced: 0 }
    })
    frameworks.forEach(f => {
      if (grid[f.category]) grid[f.category][f.complexity]++
    })
    return grid
  }, [frameworks])

  const heatmapMax = useMemo(() =>
    Math.max(...Object.values(heatmap).flatMap(row => Object.values(row))),
  [heatmap])

  // ── AI relevance ──
  const aiCount = frameworks.filter(f => f.ai_relevant).length

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroNumber}>{useCountUp(frameworks.length, 1600)}</div>
        <p className={styles.heroSub}>
          {locale === 'en'
            ? `frameworks across ${categories.length} categories, distilled`
            : `个框架，横跨 ${categories.length} 个分类，浓缩呈现`
          }
        </p>
        {/* Category spectrum strip */}
        <div className={styles.spectrum}>
          {catStats.map(c => (
            <div
              key={c.key}
              className={styles.spectrumBar}
              style={{
                flex: c.count,
                backgroundColor: catColorVar(c.key, 'text'),
              }}
              title={`${c.name}: ${c.count}`}
            />
          ))}
        </div>
      </div>

      {/* ── By Category ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'By Category' : '分类分布'}
        </h2>
        <div className={styles.catList}>
          {catStats.map(c => (
            <Link
              key={c.key}
              to={`/category/${c.key}`}
              className={styles.catRow}
            >
              <span className={styles.catName}>{c.name}</span>
              <span className={styles.catBar}>
                <span
                  className={styles.catFill}
                  style={{
                    width: `${(c.count / maxCatCount) * 100}%`,
                    backgroundColor: catColorVar(c.key, 'text'),
                  }}
                />
              </span>
              <span className={styles.catCount}>{c.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Dimensions Triptych ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Dimensions' : '维度分布'}
        </h2>
        <div className={styles.triptych}>
          <DimChart
            title={t.complexity}
            data={complexityDist}
            labels={complexityLabels}
            order={['beginner', 'intermediate', 'advanced']}
            colors={['var(--cat-thinking-text)', 'var(--cat-deployment-text)', 'var(--cat-quality-text)']}
          />
          <DimChart
            title={t.filterAbstraction}
            data={abstractionDist}
            labels={abstractionLabels}
            order={['code', 'component', 'system', 'organization']}
            colors={['var(--cat-coding-text)', 'var(--cat-architecture-text)', 'var(--cat-distributed-text)', 'var(--cat-team-text)']}
          />
          <DimChart
            title={t.filterMaturity}
            data={maturityDist}
            labels={maturityLabels}
            order={['foundational', 'established', 'emerging', 'experimental']}
            colors={['var(--cat-architecture-text)', 'var(--cat-thinking-text)', 'var(--cat-deployment-text)', 'var(--cat-quality-text)']}
          />
        </div>
      </section>

      {/* ── Quality Focus ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Quality Focus' : '质量关注'}
        </h2>
        <div className={styles.qualityGrid}>
          {qualityStats.map(([key, val]) => (
            <div key={key} className={styles.qualityItem}>
              <div className={styles.qualityBar}>
                <div
                  className={styles.qualityFill}
                  style={{ height: `${(val / maxQuality) * 100}%` }}
                />
              </div>
              <span className={styles.qualityCount}>{val}</span>
              <span className={styles.qualityLabel}>{qualityLabels[key] ?? key}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Two-column: Connected + Authors ── */}
      <div className={styles.columns}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {locale === 'en' ? 'Most Connected' : '连接最多'}
          </h2>
          <ol className={styles.rankList}>
            {topConnected.map((fw, i) => (
              <li key={fw.slug} className={styles.rankItem}>
                <span className={styles.rankNum}>{i + 1}</span>
                <Link to={`/frameworks/${fw.slug}`} className={styles.rankName}>
                  {localized(fw, 'name')}
                </Link>
                <span className={styles.rankBar}>
                  <span
                    className={styles.rankFill}
                    style={{
                      width: `${(fw.related.length / topConnected[0].related.length) * 100}%`,
                      backgroundColor: catColorVar(fw.category, 'text'),
                    }}
                  />
                </span>
                <span className={styles.rankVal}>{fw.related.length}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {locale === 'en' ? 'The Thinkers' : '创作者'}
          </h2>
          <ol className={styles.rankList}>
            {topAuthors.map(([name, cnt], i) => (
              <li key={name} className={styles.rankItem}>
                <span className={styles.rankNum}>{i + 1}</span>
                <span className={styles.rankName}>{name}</span>
                <span className={styles.rankVal}>{cnt}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* ── Industry Adoption ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Industry Adoption' : '行业采用'}
        </h2>
        <div className={styles.adopters}>
          {topAdopters.map(([name, cnt]) => (
            <span
              key={name}
              className={styles.adopter}
              style={{
                fontSize: `${Math.max(11, 11 + (cnt / maxAdopter) * 18)}px`,
                opacity: 0.4 + (cnt / maxAdopter) * 0.6,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ── Category × Complexity Heatmap ── */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {locale === 'en' ? 'Category × Complexity' : '分类 × 复杂度'}
        </h2>
        <div className={styles.heatmap}>
          <div className={styles.heatmapHeader}>
            <div className={styles.heatmapCorner} />
            {['beginner', 'intermediate', 'advanced'].map(c => (
              <div key={c} className={styles.heatmapColLabel}>{complexityLabels[c]}</div>
            ))}
          </div>
          {categories.map(cat => (
            <div key={cat.key} className={styles.heatmapRow}>
              <div className={styles.heatmapRowLabel}>
                {locale === 'en' ? cat.name : cat.name_zh}
              </div>
              {['beginner', 'intermediate', 'advanced'].map(c => {
                const val = heatmap[cat.key]?.[c] ?? 0
                const intensity = heatmapMax > 0 ? val / heatmapMax : 0
                return (
                  <div
                    key={c}
                    className={styles.heatmapCell}
                    style={{
                      backgroundColor: val > 0
                        ? catColorVar(cat.key, 'text')
                        : undefined,
                      opacity: val > 0 ? 0.15 + intensity * 0.85 : 1,
                    }}
                  >
                    {val > 0 ? val : ''}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer stat ── */}
      <div className={styles.coda}>
        <span className={styles.codaStat}>{useCountUp(aiCount, 1000)}</span>
        <span className={styles.codaLabel}>
          {locale === 'en'
            ? `of ${frameworks.length} are AI-relevant`
            : `/ ${frameworks.length} 个框架与 AI 相关`
          }
        </span>
      </div>
    </div>
  )
}

// ── Small bar chart component for dimension distributions ──
function DimChart({ title, data, labels, order, colors }: {
  title: string
  data: Record<string, number>
  labels: Record<string, string>
  order: string[]
  colors: string[]
}) {
  const max = Math.max(...order.map(k => data[k] ?? 0))
  return (
    <div className={styles.dimChart}>
      <h3 className={styles.dimTitle}>{title}</h3>
      <div className={styles.dimBars}>
        {order.map((key, i) => {
          const val = data[key] ?? 0
          return (
            <div key={key} className={styles.dimBar}>
              <div className={styles.dimFill} style={{
                height: `${max > 0 ? (val / max) * 100 : 0}%`,
                backgroundColor: colors[i],
              }} />
              <span className={styles.dimVal}>{val}</span>
              <span className={styles.dimLabel}>{labels[key] ?? key}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
