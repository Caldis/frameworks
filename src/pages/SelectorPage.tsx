import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllFrameworks } from '../data/loader'
import { categories, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCountUp } from '../hooks/useCountUp'
import type { CategoryKey, AbstractionLevel, QualityConcern, MaturityRing } from '../types'
import styles from './SelectorPage.module.css'

const ABSTRACTION_LEVELS: { key: AbstractionLevel; descEn: string; descZh: string }[] = [
  { key: 'code', descEn: 'Function/class level', descZh: '函数/类级别' },
  { key: 'component', descEn: 'Module/service level', descZh: '模块/服务级别' },
  { key: 'system', descEn: 'System-wide architecture', descZh: '系统级架构' },
  { key: 'organization', descEn: 'Team & org level', descZh: '团队与组织级别' },
]

const QUALITY_CONCERNS: QualityConcern[] = [
  'reliability', 'security', 'performance', 'maintainability',
  'scalability', 'usability', 'testability', 'observability', 'portability',
]

const MATURITY_LEVELS: { key: MaturityRing; descEn: string; descZh: string }[] = [
  { key: 'foundational', descEn: 'Time-tested', descZh: '经过时间验证' },
  { key: 'established', descEn: 'Production-proven', descZh: '生产验证' },
  { key: 'emerging', descEn: 'Growing adoption', descZh: '正在增长' },
  { key: 'experimental', descEn: 'Cutting edge', descZh: '前沿探索' },
]

export default function SelectorPage() {
  const { locale, t, localized } = useI18n()
  usePageMeta('Framework Selector', 'Find the right software design framework for your situation')

  const [selectedCats, setSelectedCats] = useState<CategoryKey[]>([])
  const [selectedAbs, setSelectedAbs] = useState<AbstractionLevel[]>([])
  const [selectedQual, setSelectedQual] = useState<QualityConcern[]>([])
  const [selectedMat, setSelectedMat] = useState<MaturityRing[]>([])

  const allFrameworks = useMemo(() => getAllFrameworks(), [])
  const hasFilter = selectedCats.length + selectedAbs.length + selectedQual.length + selectedMat.length > 0

  const results = useMemo(() => {
    return allFrameworks.filter(f => {
      if (selectedCats.length && !selectedCats.includes(f.category)) return false
      if (selectedAbs.length && !selectedAbs.includes(f.abstraction_level)) return false
      if (selectedQual.length && !f.quality_concerns?.some(q => selectedQual.includes(q))) return false
      if (selectedMat.length && !selectedMat.includes(f.maturity_ring)) return false
      return true
    })
  }, [allFrameworks, selectedCats, selectedAbs, selectedQual, selectedMat])

  const animatedCount = useCountUp(results.length, 300)

  const toggle = <T extends string>(setter: React.Dispatch<React.SetStateAction<T[]>>, key: T) => {
    setter(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  const handleReset = () => {
    setSelectedCats([])
    setSelectedAbs([])
    setSelectedQual([])
    setSelectedMat([])
  }

  const labelMap: Record<string, Record<string, string>> = {
    abstraction: { code: t.abstractionCode, component: t.abstractionComponent, system: t.abstractionSystem, organization: t.abstractionOrganization },
    maturity: { foundational: t.maturityFoundational, established: t.maturityEstablished, emerging: t.maturityEmerging, experimental: t.maturityExperimental },
    quality: { reliability: t.qualityReliability, security: t.qualitySecurity, performance: t.qualityPerformance, maintainability: t.qualityMaintainability, scalability: t.qualityScalability, usability: t.qualityUsability, testability: t.qualityTestability, observability: t.qualityObservability, portability: t.qualityPortability },
    complexity: { beginner: t.complexityBeginner, intermediate: t.complexityIntermediate, advanced: t.complexityAdvanced },
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.title}>{t.selectorTitle}</h1>
        <p className={styles.subtitle}>{t.selectorSubtitle}</p>
      </div>

      {/* Live result count */}
      <div className={styles.resultBanner}>
        <span className={styles.resultCount}>{animatedCount}</span>
        <span className={styles.resultLabel}>
          {locale === 'en' ? 'frameworks match' : '个框架匹配'}
        </span>
        {hasFilter && (
          <button className={styles.resetBtn} onClick={handleReset}>
            {t.selectorReset}
          </button>
        )}
      </div>

      {/* Filter panels — all visible at once */}
      <div className={styles.filters}>
        {/* Category */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>{t.selectorQ1}</h2>
          <div className={styles.chips}>
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`${styles.chip} ${selectedCats.includes(cat.key) ? styles.chipActive : ''}`}
                onClick={() => toggle(setSelectedCats, cat.key)}
                style={selectedCats.includes(cat.key) ? {
                  backgroundColor: catColorVar(cat.key, 'bg'),
                  borderColor: catColorVar(cat.key, 'text'),
                  color: catColorVar(cat.key, 'text'),
                } : undefined}
              >
                <span className={styles.chipDot} style={{ backgroundColor: catColorVar(cat.key, 'text') }} />
                {locale === 'en' ? cat.name : cat.name_zh}
              </button>
            ))}
          </div>
        </div>

        {/* Abstraction */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>{t.selectorQ2}</h2>
          <div className={styles.cards}>
            {ABSTRACTION_LEVELS.map(level => (
              <button
                key={level.key}
                className={`${styles.card} ${selectedAbs.includes(level.key) ? styles.cardActive : ''}`}
                onClick={() => toggle(setSelectedAbs, level.key)}
              >
                <span className={styles.cardName}>{labelMap.abstraction[level.key]}</span>
                <span className={styles.cardDesc}>{locale === 'en' ? level.descEn : level.descZh}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quality */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>{t.selectorQ3}</h2>
          <div className={styles.chips}>
            {QUALITY_CONCERNS.map(q => (
              <button
                key={q}
                className={`${styles.chip} ${selectedQual.includes(q) ? styles.chipActive : ''}`}
                onClick={() => toggle(setSelectedQual, q)}
              >
                {labelMap.quality[q]}
              </button>
            ))}
          </div>
        </div>

        {/* Maturity */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>{t.selectorQ4}</h2>
          <div className={styles.cards}>
            {MATURITY_LEVELS.map(level => (
              <button
                key={level.key}
                className={`${styles.card} ${selectedMat.includes(level.key) ? styles.cardActive : ''}`}
                onClick={() => toggle(setSelectedMat, level.key)}
              >
                <span className={styles.cardName}>{labelMap.maturity[level.key]}</span>
                <span className={styles.cardDesc}>{locale === 'en' ? level.descEn : level.descZh}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={styles.results}>
        {results.length === 0 ? (
          <div className={styles.empty}>{t.selectorNoResults}</div>
        ) : (
          <div className={styles.resultGrid}>
            {results.map(fw => {
              const cat = categories.find(c => c.key === fw.category)
              return (
                <Link key={fw.slug} to={`/frameworks/${fw.slug}`} className={styles.resultCard}>
                  <div className={styles.resultName}>{localized(fw, 'name')}</div>
                  <div className={styles.resultMeta}>
                    {cat && (
                      <span className={styles.resultCatPill}
                        style={{ background: catColorVar(fw.category, 'bg'), color: catColorVar(fw.category, 'text') }}>
                        {localized(cat, 'name')}
                      </span>
                    )}
                    <span className={styles.resultBadge}>{labelMap.complexity[fw.complexity]}</span>
                  </div>
                  <div className={styles.resultDesc}>{localized(fw, 'desc')}</div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
