import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllFrameworks, getFrameworksByCategory } from '../data/loader'
import { categories, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import type { CategoryKey, AbstractionLevel, QualityConcern, MaturityRing } from '../types'
import styles from './SelectorPage.module.css'

const ABSTRACTION_LEVELS: { key: AbstractionLevel; descEn: string; descZh: string }[] = [
  { key: 'code', descEn: 'Function/class level patterns', descZh: '函数/类级别的模式' },
  { key: 'component', descEn: 'Module/service level patterns', descZh: '模块/服务级别的模式' },
  { key: 'system', descEn: 'System-wide architecture patterns', descZh: '系统级架构模式' },
  { key: 'organization', descEn: 'Team and organization level', descZh: '团队和组织级别' },
]

const QUALITY_CONCERNS: QualityConcern[] = [
  'reliability', 'security', 'performance', 'maintainability',
  'scalability', 'usability', 'testability', 'observability', 'portability',
]

const MATURITY_LEVELS: { key: MaturityRing; descEn: string; descZh: string }[] = [
  { key: 'foundational', descEn: 'Time-tested, widely adopted', descZh: '经过时间验证，广泛采用' },
  { key: 'established', descEn: 'Proven in production', descZh: '已在生产中验证' },
  { key: 'emerging', descEn: 'Growing adoption', descZh: '正在增长中' },
  { key: 'experimental', descEn: 'Cutting edge, less proven', descZh: '前沿探索，尚未充分验证' },
]

export default function SelectorPage() {
  const { locale, t } = useI18n()
  usePageMeta('Framework Selector', 'Find the right software design framework for your situation')

  const [step, setStep] = useState(1)
  const [selectedCats, setSelectedCats] = useState<CategoryKey[]>([])
  const [selectedAbs, setSelectedAbs] = useState<AbstractionLevel[]>([])
  const [selectedQual, setSelectedQual] = useState<QualityConcern[]>([])
  const [selectedMat, setSelectedMat] = useState<MaturityRing[]>([])

  const allFrameworks = useMemo(() => getAllFrameworks(), [])

  // Filter chain
  const results = useMemo(() => {
    return allFrameworks.filter(f => {
      if (selectedCats.length && !selectedCats.includes(f.category)) return false
      if (selectedAbs.length && !selectedAbs.includes(f.abstraction_level)) return false
      if (selectedQual.length && !f.quality_concerns?.some(q => selectedQual.includes(q))) return false
      if (selectedMat.length && !selectedMat.includes(f.maturity_ring)) return false
      return true
    })
  }, [allFrameworks, selectedCats, selectedAbs, selectedQual, selectedMat])

  // Category framework counts
  const catCounts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const cat of categories) {
      map[cat.key] = getFrameworksByCategory(cat.key).length
    }
    return map
  }, [])

  const toggleCat = (key: CategoryKey) => {
    setSelectedCats(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : prev.length < 3 ? [...prev, key] : prev
    )
  }

  const toggleAbs = (key: AbstractionLevel) => {
    setSelectedAbs(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : prev.length < 2 ? [...prev, key] : prev
    )
  }

  const toggleQual = (key: QualityConcern) => {
    setSelectedQual(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : prev.length < 3 ? [...prev, key] : prev
    )
  }

  const toggleMat = (key: MaturityRing) => {
    setSelectedMat(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : prev.length < 2 ? [...prev, key] : prev
    )
  }

  const handleReset = () => {
    setStep(1)
    setSelectedCats([])
    setSelectedAbs([])
    setSelectedQual([])
    setSelectedMat([])
  }

  const abstractionLabel = (key: string) => {
    const map: Record<string, string> = {
      code: t.abstractionCode,
      component: t.abstractionComponent,
      system: t.abstractionSystem,
      organization: t.abstractionOrganization,
    }
    return map[key] ?? key
  }

  const maturityLabel = (key: string) => {
    const map: Record<string, string> = {
      foundational: t.maturityFoundational,
      established: t.maturityEstablished,
      emerging: t.maturityEmerging,
      experimental: t.maturityExperimental,
    }
    return map[key] ?? key
  }

  const qualityLabel = (key: string) => {
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
    return map[key] ?? key
  }

  const complexityLabel = (complexity: string) => {
    const map: Record<string, string> = {
      beginner: t.complexityBeginner,
      intermediate: t.complexityIntermediate,
      advanced: t.complexityAdvanced,
    }
    return map[complexity] ?? complexity
  }

  const getCategoryForFw = (catKey: string) => categories.find(c => c.key === catKey)

  // Determine step completion for dot styling
  const stepDone = (s: number) => {
    if (s === 1) return selectedCats.length > 0
    if (s === 2) return selectedAbs.length > 0
    if (s === 3) return selectedQual.length > 0
    if (s === 4) return selectedMat.length > 0
    return false
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.selectorTitle}</h1>
      <p className={styles.subtitle}>{t.selectorSubtitle}</p>

      {/* Step breadcrumbs */}
      <div className={styles.steps}>
        {[1, 2, 3, 4].map(s => (
          <button
            key={s}
            className={`${styles.stepDot} ${s === step ? styles.stepDotActive : ''} ${s !== step && stepDone(s) ? styles.stepDotDone : ''}`}
            onClick={() => setStep(s)}
          >
            {s}
          </button>
        ))}
        <span className={styles.stepLabel}>
          {t.selectorStep.replace('{n}', String(step))}
        </span>
      </div>

      {/* Step 1: Category */}
      {step === 1 && (
        <>
          <h2 className={styles.question}>{t.selectorQ1}</h2>
          <div className={styles.options}>
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`${styles.option} ${selectedCats.includes(cat.key) ? styles.optionActive : ''}`}
                onClick={() => toggleCat(cat.key)}
              >
                <div>
                  <span className={styles.optionDot} style={{ backgroundColor: catColorVar(cat.key, 'text') }} />
                  <span className={styles.optionName}>
                    {locale === 'en' ? cat.name : cat.name_zh}
                  </span>
                </div>
                <div className={styles.optionDesc}>
                  {locale === 'en' ? cat.description : cat.description_zh}
                </div>
                <div className={styles.optionCount}>
                  {catCounts[cat.key]} frameworks
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 2: Abstraction Level */}
      {step === 2 && (
        <>
          <h2 className={styles.question}>{t.selectorQ2}</h2>
          <div className={styles.options} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {ABSTRACTION_LEVELS.map(level => (
              <button
                key={level.key}
                className={`${styles.option} ${selectedAbs.includes(level.key) ? styles.optionActive : ''}`}
                onClick={() => toggleAbs(level.key)}
              >
                <div className={styles.optionName}>{abstractionLabel(level.key)}</div>
                <div className={styles.optionDesc}>
                  {locale === 'en' ? level.descEn : level.descZh}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 3: Quality Concerns */}
      {step === 3 && (
        <>
          <h2 className={styles.question}>{t.selectorQ3}</h2>
          <div className={styles.optionsPills}>
            {QUALITY_CONCERNS.map(q => (
              <button
                key={q}
                className={`${styles.optionPill} ${selectedQual.includes(q) ? styles.optionPillActive : ''}`}
                onClick={() => toggleQual(q)}
              >
                {qualityLabel(q)}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 4: Maturity */}
      {step === 4 && (
        <>
          <h2 className={styles.question}>{t.selectorQ4}</h2>
          <div className={styles.options} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {MATURITY_LEVELS.map(level => (
              <button
                key={level.key}
                className={`${styles.option} ${selectedMat.includes(level.key) ? styles.optionActive : ''}`}
                onClick={() => toggleMat(level.key)}
              >
                <div className={styles.optionName}>{maturityLabel(level.key)}</div>
                <div className={styles.optionDesc}>
                  {locale === 'en' ? level.descEn : level.descZh}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Navigation buttons */}
      <div className={styles.nav}>
        {step > 1 ? (
          <button className={styles.navBtn} onClick={() => setStep(s => s - 1)}>
            {locale === 'en' ? '\u2190 Back' : '\u2190 \u4e0a\u4e00\u6b65'}
          </button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <button
            className={`${styles.navBtn} ${styles.navBtnPrimary}`}
            onClick={() => setStep(s => s + 1)}
          >
            {locale === 'en' ? 'Next \u2192' : '\u4e0b\u4e00\u6b65 \u2192'}
          </button>
        ) : (
          <span />
        )}
      </div>

      {/* Results panel */}
      <div className={styles.results}>
        <div className={styles.resultsCount}>
          {results.length > 0
            ? t.selectorResults.replace('{count}', String(results.length))
            : t.selectorNoResults
          }
        </div>

        {results.length > 0 && (
          <div className={styles.resultGrid}>
            {results.map(fw => {
              const cat = getCategoryForFw(fw.category)
              return (
                <Link
                  key={fw.slug}
                  to={`/frameworks/${fw.slug}`}
                  className={styles.resultCard}
                >
                  <div className={styles.resultName}>
                    {locale === 'en' ? fw.name : fw.name_zh}
                  </div>
                  <div className={styles.resultMeta}>
                    {cat && (
                      <span
                        className={styles.resultCatPill}
                        style={{ background: catColorVar(cat.key, 'bg'), color: catColorVar(cat.key, 'text') }}
                      >
                        {locale === 'en' ? cat.name : cat.name_zh}
                      </span>
                    )}
                    <span className={styles.resultBadge}>
                      {complexityLabel(fw.complexity)}
                    </span>
                  </div>
                  <div className={styles.resultDesc}>
                    {locale === 'en' ? fw.desc : fw.desc_zh}
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {(selectedCats.length > 0 || selectedAbs.length > 0 || selectedQual.length > 0 || selectedMat.length > 0) && (
          <button className={styles.resetBtn} onClick={handleReset}>
            {t.selectorReset}
          </button>
        )}
      </div>
    </div>
  )
}
