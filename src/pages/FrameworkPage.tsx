import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFrameworkBySlug, getFrameworksByCategory, getRelatedFrameworks, getTypedRelations, getSimilarFrameworks } from '../data/loader'
import { getCategoryByKey, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import { useFrameworkDetail } from '../hooks/useFrameworkDetail'
import FrameworkViz from '../components/FrameworkViz'
import StepsList from '../components/StepsList'
import RelatedFrameworks from '../components/RelatedFrameworks'
import SectionNav from '../components/SectionNav'
import FadeIn from '../components/FadeIn'
// import HeroShader from '../components/HeroShader'
import FilmGrain from '../components/FilmGrain'
import { Zap, Target, RefreshCw, Lightbulb, Rocket, XCircle, AlertTriangle } from 'lucide-react'
import styles from './FrameworkPage.module.css'

/* ── Helpers ── */

function hexToGL(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return [r, g, b]
}

function useCounterAnimation(ref: React.RefObject<HTMLSpanElement | null>, to: number, prefix = '', suffix = '') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const duration = 1500
      const startTime = performance.now()
      const step = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1)
        const ease = 1 - Math.pow(1 - t, 4)
        el.textContent = prefix + Math.round(ease * to) + suffix
        if (t < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
      io.unobserve(el)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, prefix, suffix])
}

/* ── Concept illustration SVGs ── */

function ConceptIllustration({ index }: { index: number }) {
  const i = index % 5
  const stroke = '#2d6a4f'
  const sw = 1.5
  if (i === 0) {
    // Map/grid diagram
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <line x1="10" y1="30" x2="90" y2="30" stroke={stroke} strokeWidth={sw} />
        <line x1="10" y1="50" x2="90" y2="50" stroke={stroke} strokeWidth={sw} />
        <line x1="10" y1="70" x2="90" y2="70" stroke={stroke} strokeWidth={sw} />
        <line x1="30" y1="10" x2="30" y2="90" stroke={stroke} strokeWidth={sw} />
        <line x1="50" y1="10" x2="50" y2="90" stroke={stroke} strokeWidth={sw} />
        <line x1="70" y1="10" x2="70" y2="90" stroke={stroke} strokeWidth={sw} />
        <circle cx="30" cy="30" r="4" fill={stroke} opacity="0.3" />
        <circle cx="70" cy="50" r="4" fill={stroke} opacity="0.3" />
        <circle cx="50" cy="70" r="4" fill={stroke} opacity="0.3" />
      </svg>
    )
  }
  if (i === 1) {
    // Overlapping cards
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="10" y="20" width="45" height="60" rx="4" stroke={stroke} strokeWidth={sw} />
        <rect x="30" y="15" width="45" height="60" rx="4" stroke={stroke} strokeWidth={sw} />
        <rect x="50" y="25" width="40" height="55" rx="4" stroke={stroke} strokeWidth={sw} />
        <line x1="38" y1="30" x2="65" y2="30" stroke={stroke} strokeWidth={sw} opacity="0.4" />
        <line x1="38" y1="40" x2="60" y2="40" stroke={stroke} strokeWidth={sw} opacity="0.4" />
      </svg>
    )
  }
  if (i === 2) {
    // Funnel / decision point
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <path d="M15 20 L85 20 L60 55 L60 85 L40 85 L40 55 Z" stroke={stroke} strokeWidth={sw} />
        <circle cx="50" cy="38" r="3" fill={stroke} opacity="0.3" />
        <line x1="30" y1="35" x2="70" y2="35" stroke={stroke} strokeWidth={sw} opacity="0.3" />
      </svg>
    )
  }
  if (i === 3) {
    // Screen / prototype
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <rect x="15" y="15" width="70" height="55" rx="4" stroke={stroke} strokeWidth={sw} />
        <line x1="15" y1="28" x2="85" y2="28" stroke={stroke} strokeWidth={sw} />
        <rect x="22" y="35" width="20" height="12" rx="2" stroke={stroke} strokeWidth={sw} opacity="0.5" />
        <rect x="48" y="35" width="30" height="28" rx="2" stroke={stroke} strokeWidth={sw} opacity="0.5" />
        <line x1="40" y1="80" x2="60" y2="80" stroke={stroke} strokeWidth={sw} />
        <line x1="50" y1="70" x2="50" y2="80" stroke={stroke} strokeWidth={sw} />
      </svg>
    )
  }
  // i === 4: User / testing circles
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="35" r="14" stroke={stroke} strokeWidth={sw} />
      <circle cx="30" cy="70" r="12" stroke={stroke} strokeWidth={sw} opacity="0.5" />
      <circle cx="70" cy="70" r="12" stroke={stroke} strokeWidth={sw} opacity="0.5" />
      <line x1="50" y1="49" x2="30" y2="58" stroke={stroke} strokeWidth={sw} opacity="0.3" />
      <line x1="50" y1="49" x2="70" y2="58" stroke={stroke} strokeWidth={sw} opacity="0.3" />
    </svg>
  )
}

/* ── Lucide icon arrays ── */

const whenIcons = [Zap, Target, RefreshCw, Lightbulb, Rocket]
const avoidIcons = [XCircle, AlertTriangle]

/* ══════════════════════════════════════════════════════
   FrameworkPage — Main Component
   ══════════════════════════════════════════════════════ */

export default function FrameworkPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale, t, localized } = useI18n()
  const framework = slug ? getFrameworkBySlug(slug) : undefined
  const { framework: fullFramework } = useFrameworkDetail(slug)

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Scroll progress
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mouse parallax effect (hero)
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = heroRef.current
    if (!el || window.innerWidth <= 768) return
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2
      el.style.setProperty('--mx', String(x))
      el.style.setProperty('--my', String(y))
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [])

  // Counter animation refs (case study metrics)
  const metricRef1 = useRef<HTMLSpanElement>(null)
  const metricRef2 = useRef<HTMLSpanElement>(null)
  const metricRef3 = useRef<HTMLSpanElement>(null)

  // Cursor glow effect (case study)
  const caseRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cs = caseRef.current
    const glow = glowRef.current
    if (!cs || !glow || window.innerWidth <= 768) return
    const handler = (e: MouseEvent) => {
      const r = cs.getBoundingClientRect()
      glow.style.left = (e.clientX - r.left) + 'px'
      glow.style.top = (e.clientY - r.top) + 'px'
    }
    cs.addEventListener('mousemove', handler)
    return () => cs.removeEventListener('mousemove', handler)
  }, [])

  // Compute counts safely for counter animations (framework may be undefined)
  const stepsCount = framework ? (locale === 'en' ? framework.steps : framework.steps_zh)?.length ?? 0 : 0
  const adoptersCount = framework?.adopters?.length ?? 0
  const relatedCount = framework?.related?.length ?? 0

  // Counter animations for case study metrics
  useCounterAnimation(metricRef1, stepsCount, '', '')
  useCounterAnimation(metricRef2, adoptersCount, '', '')
  useCounterAnimation(metricRef3, relatedCount, '', '')

  usePageMeta(
    framework ? localized(framework, 'name') : 'Framework Not Found',
    framework ? localized(framework, 'desc') : undefined,
    framework ? { type: 'Article', name: framework.name, author: framework.origin_author } : undefined
  )

  if (!framework) {
    return (
      <div className={styles.notFound}>
        <h2>{t.frameworkNotFound}</h2>
        <Link to="/">{t.backToHome}</Link>
      </div>
    )
  }

  // Use full data when available, fall back to stub
  const fw = fullFramework ?? framework

  const category = getCategoryByKey(framework.category)
  const categoryFrameworks = getFrameworksByCategory(framework.category)
  const currentIndex = categoryFrameworks.findIndex(f => f.slug === framework.slug)
  const prev = currentIndex > 0 ? categoryFrameworks[currentIndex - 1] : null
  const next = currentIndex < categoryFrameworks.length - 1 ? categoryFrameworks[currentIndex + 1] : null
  const related = getRelatedFrameworks(framework)
  const typedRelations = getTypedRelations(framework)
  const steps = locale === 'en' ? framework.steps : framework.steps_zh

  const subtitle = locale === 'en' ? framework.name_zh : framework.name

  const whenToUse = locale === 'en' ? fw.when_to_use : fw.when_to_use_zh
  const coreConcepts = locale === 'en' ? fw.core_concepts : fw.core_concepts_zh
  const timeline = locale === 'en' ? fw.timeline : fw.timeline_zh
  const dos = locale === 'en' ? fw.dos : fw.dos_zh
  const donts = locale === 'en' ? fw.donts : fw.donts_zh
  const caseStudyText = locale === 'en' ? fw.case_study : fw.case_study_zh
  const whenNotToUse = locale === 'en' ? fw.when_not_to_use : fw.when_not_to_use_zh
  const originSource = locale === 'en' ? fw.origin_source : fw.origin_source_zh

  const complexityLabel = framework.complexity === 'beginner'
    ? t.complexityBeginner
    : framework.complexity === 'intermediate'
      ? t.complexityIntermediate
      : t.complexityAdvanced

  const complexityClass = framework.complexity === 'beginner'
    ? styles.complexityBeginner
    : framework.complexity === 'intermediate'
      ? styles.complexityIntermediate
      : styles.complexityAdvanced

  // Shader color from category
  const shaderColor: [number, number, number] = category ? hexToGL(category.colorText) : [0.5, 0.45, 0.4]

  // Dynamic section nav
  const navSections = [
    ...(whenToUse?.length || whenNotToUse?.length ? [{ id: 'sec-decision', label: locale === 'en' ? 'Decision' : '\u51B3\u7B56' }] : []),
    ...(coreConcepts?.length ? [{ id: 'sec-concepts', label: locale === 'en' ? 'Concepts' : '\u6982\u5FF5' }] : []),
    ...(caseStudyText ? [{ id: 'sec-case', label: locale === 'en' ? 'Case Study' : '\u6848\u4F8B' }] : []),
    { id: 'sec-how', label: locale === 'en' ? 'How It Works' : '\u5B9E\u65BD' },
    ...(timeline?.length ? [{ id: 'sec-origin', label: locale === 'en' ? 'Origin' : '\u8D77\u6E90' }] : []),
    ...((framework.adopters?.length || fw.primary_source) ? [{ id: 'sec-context', label: locale === 'en' ? 'Context' : '\u80CC\u666F' }] : []),
    ...(related.length ? [{ id: 'sec-related', label: locale === 'en' ? 'Related' : '\u5173\u8054' }] : []),
  ]

  // Structured case study
  const hasStructuredCase = fw.case_study_challenge || fw.case_study_approach || fw.case_study_result
  const caseChallenge = locale === 'en' ? fw.case_study_challenge : fw.case_study_challenge_zh
  const caseApproach = locale === 'en' ? fw.case_study_approach : fw.case_study_approach_zh
  const caseResult = locale === 'en' ? fw.case_study_result : fw.case_study_result_zh
  const caseQuote = locale === 'en' ? fw.case_study_quote : fw.case_study_quote_zh

  // DNA strip data
  const complexityLevel = framework.complexity === 'beginner' ? 1 : framework.complexity === 'intermediate' ? 2 : 3
  const abstractionLevel = framework.abstraction_level === 'code' ? 1 : framework.abstraction_level === 'component' ? 2 : framework.abstraction_level === 'system' ? 3 : 4
  const maturityLevel = framework.maturity_ring === 'experimental' ? 1 : framework.maturity_ring === 'emerging' ? 2 : framework.maturity_ring === 'established' ? 3 : 4

  const catTextColor = category ? catColorVar(framework.category, 'text') : 'var(--muted)'
  const catBgColor = category ? catColorVar(framework.category, 'bg') : 'var(--surface)'

  return (
    <div className={styles.page} key={slug}>
      <FilmGrain />
      {/* HeroShader removed — WebGL too heavy for smooth scrolling */}

      {/* Scroll progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ transform: `scaleX(${progress})` }} />
      </div>

      <SectionNav sections={navSections} />

      {/* ══════════════════════════════════════════
          HERO — Cinematic Full-Viewport Portal
         ══════════════════════════════════════════ */}
      <header className={styles.hero} ref={heroRef}>
        {/* Gradient orbs */}
        <div className={styles.heroOrb1} style={{ background: catTextColor }} />
        <div className={styles.heroOrb2} style={{ background: 'var(--viz-accent)' }} />
        <div className={styles.heroOrb3} style={{ background: catTextColor }} />

        {/* Ghost watermark */}
        <div className={styles.heroWatermark}>
          {String(framework.id).padStart(3, '0')}
        </div>

        {/* Concentric rings — outer */}
        <svg className={styles.heroRings} viewBox="0 0 1000 1000" fill="none">
          <circle cx="500" cy="500" r="480" stroke="var(--border)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="500" cy="500" r="420" stroke="var(--border)" strokeWidth="0.5" opacity="0.25" />
          <circle cx="500" cy="500" r="360" stroke="var(--border)" strokeWidth="0.5" opacity="0.2" />
          <circle cx="500" cy="500" r="300" stroke="var(--border)" strokeWidth="0.5" opacity="0.15" />
        </svg>

        {/* Concentric rings — inner (counter-rotating) */}
        <svg className={styles.heroRingsInner} viewBox="0 0 660 660" fill="none">
          <circle cx="330" cy="330" r="310" stroke="var(--border)" strokeWidth="0.5" opacity="0.2" />
          <circle cx="330" cy="330" r="260" stroke="var(--border)" strokeWidth="0.5" opacity="0.15" />
          <circle cx="330" cy="330" r="210" stroke="var(--border)" strokeWidth="0.5" opacity="0.1" />
        </svg>

        <div className={styles.heroContent}>
          {/* Breadcrumb */}
          <div className={styles.heroCrumb}>
            <Link to="/">{t.allFrameworks}</Link>
            <span className={styles.heroCrumbSep}> / </span>
            {category && (
              <>
                <Link to={`/category/${category.slug}`}>{localized(category, 'name')}</Link>
                <span className={styles.heroCrumbSep}> / </span>
              </>
            )}
            <span>{localized(framework, 'name')}</span>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              {/* Category label */}
              <div className={styles.heroCat} style={{ color: catTextColor }}>
                {category ? localized(category, 'name') : framework.category}
              </div>

              {/* Title — single block fade-in */}
              <h1 className={styles.heroTitle}>
                {localized(framework, 'name')}
              </h1>

              {/* Subtitle */}
              <div className={styles.heroSub}>{subtitle}</div>

              {/* Badges */}
              <div className={styles.heroBadges}>
                {framework.origin_author && (
                  <span className={styles.badge}>
                    {t.originBy.replace('{author}', framework.origin_author)}
                  </span>
                )}
                {framework.complexity && (
                  <span className={`${styles.badge} ${complexityClass}`}>
                    {complexityLabel}
                  </span>
                )}
                {category && (
                  <span className={`${styles.badge} ${styles.badgeCat}`} style={{
                    background: catBgColor,
                    color: catTextColor,
                    borderColor: catBgColor,
                  }}>
                    {localized(category, 'name')}
                  </span>
                )}
                {framework.ai_relevant && (
                  <span className={styles.aiBadge}>{t.ai}</span>
                )}
              </div>

              {/* Origin source */}
              {originSource && (
                <div className={styles.heroOrigin}>{originSource}</div>
              )}

              {/* Description */}
              <div className={styles.heroDescWrap}>
                <p className={styles.heroDesc}>{localized(framework, 'desc')}</p>
              </div>
            </div>

            <div className={styles.heroVizCol}>
              {/* Visualization in frosted glass circle */}
              <div className={styles.heroVizWrap}>
                <div className={styles.heroVizGlow} />
                <div className={styles.heroViz}>
                  <FrameworkViz
                    type={framework.viz_type}
                    size={280}
                    animate
                    labels={(locale === 'en' ? (framework as any).viz_labels : (framework as any).viz_labels_zh) || steps}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className={styles.scrollCue}>
          <span>SCROLL</span>
          <div className={styles.scrollLine} />
        </div>
      </header>

      {/* ══════════════════════════════════════════
          DNA STRIP — Framework Fingerprint
         ══════════════════════════════════════════ */}
      <div className={styles.dna}>
        <div className={styles.dnaGroup}>
          <span className={styles.dnaLabel}>{t.complexity}</span>
          <div className={styles.dnaStrand}>
            {[1, 2, 3].map(n => (
              <div
                key={n}
                className={styles.dnaBit}
                style={{
                  height: `${8 + n * 6}px`,
                  background: n <= complexityLevel ? catTextColor : 'var(--border)',
                }}
              />
            ))}
          </div>
          <span className={styles.dnaValue}>{complexityLabel}</span>
        </div>
        <div className={styles.dnaGroup}>
          <span className={styles.dnaLabel}>{t.filterAbstraction}</span>
          <div className={styles.dnaStrand}>
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                className={styles.dnaBit}
                style={{
                  height: `${8 + n * 5}px`,
                  background: n <= abstractionLevel ? catTextColor : 'var(--border)',
                }}
              />
            ))}
          </div>
          <span className={styles.dnaValue}>
            {framework.abstraction_level === 'code' ? t.abstractionCode
              : framework.abstraction_level === 'component' ? t.abstractionComponent
              : framework.abstraction_level === 'system' ? t.abstractionSystem
              : t.abstractionOrganization}
          </span>
        </div>
        <div className={styles.dnaGroup}>
          <span className={styles.dnaLabel}>{t.filterMaturity}</span>
          <div className={styles.dnaStrand}>
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                className={styles.dnaBit}
                style={{
                  height: `${8 + n * 5}px`,
                  background: n <= maturityLevel ? catTextColor : 'var(--border)',
                }}
              />
            ))}
          </div>
          <span className={styles.dnaValue}>
            {framework.maturity_ring === 'experimental' ? t.maturityExperimental
              : framework.maturity_ring === 'emerging' ? t.maturityEmerging
              : framework.maturity_ring === 'established' ? t.maturityEstablished
              : t.maturityFoundational}
          </span>
        </div>
        <div className={styles.dnaGroup}>
          <span className={styles.dnaLabel}>{t.ai}</span>
          <div className={styles.dnaStrand}>
            <div
              className={styles.dnaBit}
              style={{
                height: '20px',
                background: framework.ai_relevant ? catTextColor : 'var(--border)',
              }}
            />
          </div>
          <span className={styles.dnaValue}>{framework.ai_relevant ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          THESIS — Manifesto Strip
         ══════════════════════════════════════════ */}
      <div className={styles.thesis} style={{ background: catBgColor }}>
        <p>{localized(framework, 'desc')}</p>
      </div>

      {/* ══════════════════════════════════════════
          STICKY NAV
         ══════════════════════════════════════════ */}
      <div className={styles.stickyNav}>
        <div className={styles.stickyInner}>
          <span className={styles.stickyName}>{localized(framework, 'name')}</span>
          <Link to="/" className={styles.stickyBack}>{t.backToHome}</Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          DECISION PANEL — Asymmetric Split
         ══════════════════════════════════════════ */}
      {(whenToUse?.length > 0 || whenNotToUse?.length > 0) && (
        <FadeIn as="section" id="sec-decision" className={styles.decisionWrap}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              {locale === 'en' ? 'Decision Guide' : '\u51B3\u7B56\u6307\u5357'}
            </h2>
            <div className={styles.sectionBar} style={{ background: catTextColor }} />
            <div className={styles.sectionSub}>
              {locale === 'en' ? 'WHEN TO USE \u2014 AND WHEN NOT TO' : '\u4F55\u65F6\u4F7F\u7528 \u2014 \u4F55\u65F6\u4E0D\u8BE5'}
            </div>
          </div>

          <div className={styles.decisionPanel} style={{ background: catBgColor }}>
            {/* Use side */}
            {whenToUse?.length > 0 && (
              <div className={styles.decisionUse} style={{ background: catBgColor }}>
                <h3>{t.whenToUse}</h3>
                <ul className={styles.decisionList}>
                  {whenToUse.map((item, i) => {
                    const Icon = whenIcons[i % whenIcons.length]
                    return (
                      <li className={styles.decisionItem} key={i}>
                        <div className={styles.decisionIcon}>
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <span>{item}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {/* Avoid side */}
            {whenNotToUse?.length > 0 && (
              <div className={styles.decisionAvoid}>
                <h3>{t.whenNotToUse}</h3>
                <ul className={styles.decisionList}>
                  {whenNotToUse.map((item, i) => {
                    const Icon = avoidIcons[i % avoidIcons.length]
                    return (
                      <li className={styles.decisionItem} key={i}>
                        <div className={styles.decisionIcon}>
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <span>{item}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ══════════════════════════════════════════
          CORE CONCEPTS — Magazine Spreads
         ══════════════════════════════════════════ */}
      {coreConcepts?.length > 0 && (
        <section id="sec-concepts">
          <FadeIn className={styles.sectionHead} style={{ padding: '100px 24px 0' }}>
            <h2 className={styles.sectionTitle}>{t.coreConceptsTitle}</h2>
            <div className={styles.sectionBar} style={{ background: catTextColor }} />
            <div className={styles.sectionSub}>
              {locale === 'en' ? 'THE BUILDING BLOCKS' : '\u6838\u5FC3\u6784\u5EFA\u5757'}
            </div>
          </FadeIn>
          <div className={styles.conceptsWrap}>
            {coreConcepts.map((concept, i) => {
              const colonIdx = concept.indexOf(':')
              const name = colonIdx > -1 ? concept.slice(0, colonIdx).trim() : concept
              const desc = colonIdx > -1 ? concept.slice(colonIdx + 1).trim() : ''
              return (
                <FadeIn key={i} className={`${styles.concept} ${styles.reveal}`}>
                  <div className={styles.conceptVis}>
                    <span className={styles.conceptVisNum}>{String(i + 1).padStart(2, '0')}</span>
                    <div className={styles.conceptOrb}>
                      <ConceptIllustration index={i} />
                    </div>
                  </div>
                  <div className={styles.conceptTxt}>
                    <div className={styles.conceptPhase} style={{ color: catTextColor }}>
                      {locale === 'en' ? `CONCEPT ${String(i + 1).padStart(2, '0')}` : `\u6982\u5FF5 ${String(i + 1).padStart(2, '0')}`}
                    </div>
                    <h3 className={styles.conceptName}>{name}</h3>
                    {desc && <p className={styles.conceptDesc}>{desc}</p>}
                    {framework.tags?.length > 0 && i === 0 && (
                      <div className={styles.conceptTags}>
                        {framework.tags.slice(0, 3).map((tag, ti) => (
                          <span className={styles.conceptTag} key={ti}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          INSIGHT — Pull Quote Break
         ══════════════════════════════════════════ */}
      {coreConcepts?.length > 0 && (
        <blockquote className={styles.insight}>
          <span className={styles.insightMark}>{'\u201C'}</span>
          <p>{localized(framework, 'desc')}</p>
          {framework.origin_author && (
            <cite>{'\u2014'} {framework.origin_author}</cite>
          )}
        </blockquote>
      )}

      {/* ══════════════════════════════════════════
          CASE STUDY — Dark Cinematic Zone
         ══════════════════════════════════════════ */}
      {caseStudyText && (
        <>
          <div className={styles.caseEdge}>
            <div className={styles.caseEdgeBg} />
          </div>
          <section className={styles.case} id="sec-case" ref={caseRef}>
            <div className={styles.caseGlow} ref={glowRef} />
            <div className={styles.caseInner}>
              <div className={styles.caseLabel}>{t.caseStudy}</div>
              <h2>{fw.case_study_company || (locale === 'en' ? 'In Practice' : '\u5B9E\u8DF5\u6848\u4F8B')}</h2>

              {/* Company header */}
              {fw.case_study_company && (
                <div className={styles.caseCompany}>
                  <div className={styles.caseLogo}>
                    <span style={{ fontSize: 28, opacity: 0.4 }}>{fw.case_study_company.charAt(0)}</span>
                  </div>
                  <div>
                    <div className={styles.caseCompanyName}>{fw.case_study_company}</div>
                    <div className={styles.caseCompanyMeta}>{t.caseStudy}</div>
                  </div>
                </div>
              )}

              {/* Metric counters */}
              <div className={styles.metricRow}>
                <div className={styles.metric}>
                  <div className={styles.metricNum}><span ref={metricRef1}>{steps.length}</span></div>
                  <div className={styles.metricBar}><div className={styles.metricBarFill} style={{ width: `${Math.min(steps.length / 7 * 100, 100)}%` }} /></div>
                  <div className={styles.metricLabel}>{locale === 'en' ? 'Steps' : '\u6B65\u9AA4'}</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricNum}><span ref={metricRef2}>{framework.adopters?.length || 0}</span></div>
                  <div className={styles.metricBar}><div className={styles.metricBarFill} style={{ width: `${Math.min((framework.adopters?.length || 0) / 10 * 100, 100)}%` }} /></div>
                  <div className={styles.metricLabel}>{t.notableAdopters}</div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricNum}><span ref={metricRef3}>{framework.related?.length || 0}</span></div>
                  <div className={styles.metricBar}><div className={styles.metricBarFill} style={{ width: `${Math.min((framework.related?.length || 0) / 8 * 100, 100)}%` }} /></div>
                  <div className={styles.metricLabel}>{t.relatedFrameworks}</div>
                </div>
              </div>

              {/* Sprint week bar — maps framework steps to a 5-day visual */}
              {steps.length >= 3 && (
                <div className={styles.sprintWeek}>
                  {steps.slice(0, 5).map((step, i) => {
                    const dayLabels = locale === 'en'
                      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                      : ['\u5468\u4E00', '\u5468\u4E8C', '\u5468\u4E09', '\u5468\u56DB', '\u5468\u4E94']
                    return (
                      <div
                        key={i}
                        className={`${styles.sprintDay}${i === Math.min(3, steps.length - 1) ? ` ${styles.sprintDayActive}` : ''}`}
                      >
                        <div className={styles.sprintDayName}>{dayLabels[i] || `D${i + 1}`}</div>
                        <div className={styles.sprintDayLabel}>
                          {step.split(/[：:,.，]/)[0].replace(/^\d+\.\s*/, '').slice(0, 12)}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Structured case study: triptych */}
              {hasStructuredCase && (
                <div className={styles.triptych}>
                  {caseChallenge && (
                    <div className={styles.triPanel}>
                      <div className={`${styles.triLabel} ${styles.triLabelChallenge}`}>{t.challenge}</div>
                      <p>{caseChallenge}</p>
                    </div>
                  )}
                  {caseApproach && (
                    <div className={styles.triPanel}>
                      <div className={`${styles.triLabel} ${styles.triLabelApproach}`}>{t.approach}</div>
                      <p>{caseApproach}</p>
                    </div>
                  )}
                  {caseResult && (
                    <div className={styles.triPanel}>
                      <div className={`${styles.triLabel} ${styles.triLabelResult}`}>{t.result}</div>
                      <p>{caseResult}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Pull quote */}
              {(caseQuote || (!hasStructuredCase && caseStudyText)) && (
                <blockquote className={styles.caseQuote}>
                  <span className={styles.caseQuoteMark}>{'\u201C'}</span>
                  <p>{caseQuote || caseStudyText}</p>
                </blockquote>
              )}
            </div>
          </section>
          <div className={styles.caseEdgeBottom}>
            <div className={styles.caseEdgeBottomBg} />
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════
          HOW IT WORKS — Pipeline + Steps + Do/Don't
         ══════════════════════════════════════════ */}
      <FadeIn as="section" id="sec-how" className={styles.howWrap}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>{t.howItWorks}</h2>
          <div className={styles.sectionBar} style={{ background: catTextColor }} />
          <div className={styles.sectionSub}>
            {locale === 'en' ? 'STEP BY STEP' : '\u5B9E\u65BD\u6B65\u9AA4'}
          </div>
        </div>

        {/* Pipeline circles */}
        {steps.length <= 7 && (
          <div className={styles.pipeline}>
            {steps.map((step, i) => (
              <div className={styles.pipeStep} key={i}>
                <div className={styles.pipeDot} style={{
                  borderColor: catTextColor,
                  boxShadow: `0 8px 32px color-mix(in srgb, ${catTextColor} 10%, transparent)`,
                }}>
                  {i + 1}
                </div>
                <div className={styles.pipeName}>{step}</div>
              </div>
            ))}
          </div>
        )}

        <StepsList steps={steps} />

        {/* Do / Don't columns */}
        {(dos?.length > 0 || donts?.length > 0) && (
          <div className={styles.doDont}>
            {dos?.length > 0 && (
              <div className={`${styles.doDontCol} ${styles.doDontDo}`}>
                <h3>
                  <span style={{ color: '#2d6a4f' }}>{'\u2713'}</span> {t.dosTitle}
                </h3>
                <ul className={styles.doDontList}>
                  {dos.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {donts?.length > 0 && (
              <div className={`${styles.doDontCol} ${styles.doDontDont}`}>
                <h3>
                  <span style={{ color: '#922b21' }}>{'\u2717'}</span> {t.dontsTitle}
                </h3>
                <ul className={styles.doDontList}>
                  {donts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </FadeIn>

      {/* ══════════════════════════════════════════
          TIMELINE — Horizontal Scroll
         ══════════════════════════════════════════ */}
      {timeline?.length > 0 && (
        <section id="sec-origin" className={styles.timelineWrap}>
          <FadeIn className={styles.sectionHead} style={{ padding: '0 24px' }}>
            <h2 className={styles.sectionTitle}>{t.originAndEvolution}</h2>
            <div className={styles.sectionBar} style={{ background: catTextColor }} />
            <div className={styles.sectionSub}>
              {locale === 'en' ? 'HISTORY' : '\u5386\u53F2\u6F14\u8FDB'}
            </div>
          </FadeIn>
          <div className={styles.timelineScroll}>
            {timeline.map(([year, event], i) => (
              <div className={styles.timelineCard} key={i}>
                <div className={styles.timelineLine} style={{ background: catTextColor }} />
                <div className={styles.timelineDot} style={{
                  background: catTextColor,
                  boxShadow: `0 0 0 5px var(--bg), 0 0 0 6px ${catTextColor}`,
                }} />
                <div className={styles.timelineYear}>{year}</div>
                <div className={styles.timelineEvent}>{event}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          SYNTHESIS — Closing Moment
         ══════════════════════════════════════════ */}
      <div className={styles.synthesis}>
        <div className={styles.synthLine} />
        <p>{localized(framework, 'desc')}</p>
        <div className={styles.synthMeta}>
          {framework.origin_author && `${framework.origin_author} \u00B7 `}
          {framework.name}
          {framework.name_zh && ` \u00B7 ${framework.name_zh}`}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CONTEXT — Adopters & Sources
         ══════════════════════════════════════════ */}
      {(framework.adopters?.length > 0 || fw.primary_source) && (
        <FadeIn as="section" id="sec-context" className={styles.context}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              {locale === 'en' ? 'Context' : '\u80CC\u666F'}
            </h2>
            <div className={styles.sectionBar} style={{ background: catTextColor }} />
          </div>
          <div className={styles.contextGrid}>
            {/* Adopters */}
            {framework.adopters?.length > 0 && (
              <div>
                <h3 className={styles.contextTitle}>{t.notableAdopters}</h3>
                <div className={styles.contextBar} style={{ background: catTextColor }} />
                <div className={styles.adopters}>
                  {framework.adopters.map((name, i) => (
                    <span className={styles.adopterPill} key={i}>{name}</span>
                  ))}
                </div>
              </div>
            )}
            {/* Sources */}
            {(fw.primary_source || fw.secondary_sources?.length) && (
              <div>
                <h3 className={styles.contextTitle}>{t.primarySource}</h3>
                <div className={styles.contextBar} style={{ background: 'var(--viz-accent)' }} />
                {fw.primary_source && (
                  <div className={styles.sourcePrimary}>{fw.primary_source}</div>
                )}
                {fw.secondary_sources && fw.secondary_sources.length > 0 && (
                  <div>
                    {fw.secondary_sources.map((s, i) => (
                      <div key={i} className={styles.sourceItem}>{s}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* ── AI Agent Integration ── */}
      <AgentSection slug={framework.slug} name={localized(framework, 'name')} locale={locale} />

      {/* ── Related Frameworks ── */}
      {related.length > 0 && (
        <FadeIn as="section" id="sec-related" style={{ maxWidth: 920, margin: '0 auto', padding: '72px 24px 0' }}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>{t.relatedFrameworks}</h2>
            <div className={styles.sectionBar} style={{ background: catTextColor }} />
          </div>
          <RelatedFrameworks frameworks={related} typedRelations={typedRelations} />
        </FadeIn>
      )}

      {/* ── You Might Also Like ── */}
      {(() => {
        const similar = getSimilarFrameworks(framework)
        if (similar.length === 0) return null
        return (
          <FadeIn as="section" style={{ maxWidth: 920, margin: '0 auto', padding: '56px 24px 0' }}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>
                {locale === 'en' ? 'You Might Also Like' : '\u4F60\u53EF\u80FD\u4E5F\u611F\u5174\u8DA3'}
              </h2>
              <div className={styles.sectionBar} style={{ background: catTextColor }} />
            </div>
            <div className={styles.similarGrid}>
              {similar.map(s => {
                const sCat = getCategoryByKey(s.category)
                return (
                  <Link key={s.slug} to={`/frameworks/${s.slug}`} className={styles.similarCard}>
                    <span className={styles.similarDot} style={{ backgroundColor: catColorVar(s.category, 'text') }} />
                    <span className={styles.similarName}>{localized(s, 'name')}</span>
                    {sCat && (
                      <span className={styles.similarCat}>{localized(sCat, 'name')}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </FadeIn>
        )
      })()}

      {/* ── Prev/Next Navigation ── */}
      <nav className={styles.pageNav}>
        <div>
          {prev && (
            <Link to={`/frameworks/${prev.slug}`} className={styles.navLink}>
              <span className={styles.navDir}>{t.previousFramework}</span>
              <span className={styles.navName}>{localized(prev, 'name')}</span>
            </Link>
          )}
        </div>
        <div className={styles.navRight}>
          {next && (
            <Link to={`/frameworks/${next.slug}`} className={styles.navLink}>
              <span className={styles.navDir}>{t.nextFramework}</span>
              <span className={styles.navName}>{localized(next, 'name')}</span>
            </Link>
          )}
        </div>
      </nav>

      {/* Back to category */}
      {category && (
        <Link to={`/category/${category.slug}`} className={styles.backLink}>
          {t.backToCategory.replace('{name}', localized(category, 'name'))}
        </Link>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   AI Agent Integration Section
   ══════════════════════════════════════════════════════ */

function AgentSection({ slug, name, locale }: { slug: string; name: string; locale: string }) {
  const zh = locale === 'zh'
  const [copied, setCopied] = useState<string | null>(null)

  const skillUrl = `https://sdframe.caldis.me/skill/references/frameworks/${slug}.md`
  const applyPrompt = zh
    ? `\u8BF7\u9605\u8BFB ${skillUrl} \u4F5C\u4E3A\u6307\u5F15\uFF0C\u5E2E\u6211\u5728\u5F53\u524D\u9879\u76EE\u4E2D\u5E94\u7528\u300C${name}\u300D\u6846\u67B6\u3002`
    : `Read ${skillUrl} as your guide and help me apply the ${name} framework to my project.`
  const selectPrompt = zh
    ? `\u8BF7\u9605\u8BFB https://sdframe.caldis.me/skill/SKILL.md \u4F5C\u4E3A\u6280\u80FD\u6307\u5F15\uFF0C\u5E2E\u6211\u8BC4\u4F30\u300C${name}\u300D\u662F\u5426\u9002\u5408\u6211\u7684\u9879\u76EE\uFF0C\u5E76\u63A8\u8350\u66FF\u4EE3\u65B9\u6848\u3002`
    : `Read https://sdframe.caldis.me/skill/SKILL.md as your skill guide, help me evaluate if ${name} fits my project, and suggest alternatives.`

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <FadeIn as="section" style={{ maxWidth: 920, margin: '0 auto', padding: '72px 24px 0' }}>
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>
          {zh ? '\u63A5\u5165 AI Agent' : 'Use with AI Agent'}
        </h2>
        <div className={styles.sectionBar} style={{ background: 'var(--viz-accent)' }} />
      </div>
      <p className={styles.agentDesc}>
        {zh
          ? '\u5C06\u8FD9\u4E2A\u6846\u67B6\u7684\u77E5\u8BC6\u5206\u4EAB\u7ED9\u4F60\u7684 AI \u52A9\u624B\uFF0C\u8BA9\u5B83\u5E2E\u4F60\u5B9E\u65BD\u6216\u8BC4\u4F30\u3002'
          : 'Share this framework with your AI assistant to help you apply or evaluate it.'}
      </p>

      <div className={styles.agentCards}>
        <div className={styles.agentCard}>
          <div className={styles.agentCardTitle}>
            {zh ? '\u6A21\u5F0F A\uFF1A\u76F4\u63A5\u5E94\u7528' : 'Mode A: Apply This Framework'}
          </div>
          <pre className={styles.agentPrompt}>{applyPrompt}</pre>
          <button
            className={styles.agentCopyBtn}
            onClick={() => copy(applyPrompt, 'apply')}
          >
            {copied === 'apply' ? '\u2713' : (zh ? '\u590D\u5236' : 'Copy')}
          </button>
        </div>

        <div className={styles.agentCard}>
          <div className={styles.agentCardTitle}>
            {zh ? '\u6A21\u5F0F B\uFF1A\u8BC4\u4F30\u9002\u7528\u6027' : 'Mode B: Evaluate Fit'}
          </div>
          <pre className={styles.agentPrompt}>{selectPrompt}</pre>
          <button
            className={styles.agentCopyBtn}
            onClick={() => copy(selectPrompt, 'select')}
          >
            {copied === 'select' ? '\u2713' : (zh ? '\u590D\u5236' : 'Copy')}
          </button>
        </div>
      </div>

      <a href={skillUrl} target="_blank" rel="noopener noreferrer" className={styles.agentFileLink}>
        {zh ? '\u67E5\u770B Skill \u539F\u59CB\u6587\u4EF6' : 'View skill reference file'} &rarr;
      </a>
      <Link to="/agent" className={styles.agentFileLink}>
        {zh ? '\u5B8C\u6574\u96C6\u6210\u6307\u5357' : 'Full integration guide'} &rarr;
      </Link>
    </FadeIn>
  )
}
