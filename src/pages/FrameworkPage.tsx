import { useState, useEffect } from 'react'
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
import styles from './FrameworkPage.module.css'

export default function FrameworkPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale, t, localized } = useI18n()
  const framework = slug ? getFrameworkBySlug(slug) : undefined
  const { framework: fullFramework } = useFrameworkDetail(slug)

  // Removed useFadeIn — replaced by <FadeIn> component (react-intersection-observer)

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

  const formattedNumber = `#${String(framework.id).padStart(2, '0')}`
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

  const sectionBorderStyle = category
    ? { borderLeftColor: catColorVar(framework.category, 'text') }
    : undefined

  const whenIcons = ['\u26A1', '\uD83C\uDFAF', '\uD83D\uDD04', '\uD83D\uDCA1', '\uD83D\uDE80']

  return (
    <div className={styles.page} key={slug}>
      {/* Scroll progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ transform: `scaleX(${progress})` }} />
      </div>

      <SectionNav sections={[
        { id: 'sec-when', label: locale === 'en' ? 'When to Use' : '何时使用' },
        { id: 'sec-not', label: locale === 'en' ? 'When Not' : '何时不该' },
        { id: 'sec-concepts', label: locale === 'en' ? 'Core Concepts' : '核心概念' },
        { id: 'sec-how', label: locale === 'en' ? 'How It Works' : '实施方法' },
        { id: 'sec-origin', label: locale === 'en' ? 'Origin' : '起源' },
        { id: 'sec-case', label: locale === 'en' ? 'Case Study' : '真实案例' },
        { id: 'sec-adopters', label: locale === 'en' ? 'Adopters' : '采用者' },
        { id: 'sec-sources', label: locale === 'en' ? 'Sources' : '来源' },
        { id: 'sec-related', label: locale === 'en' ? 'Related' : '关联' },
      ]} />

      {/* ── 1. Hero Section ── */}
      <nav className={styles.breadcrumb}>
        <Link to="/">{t.allFrameworks}</Link>
        <span className={styles.separator}>/</span>
        {category && (
          <>
            <Link to={`/category/${category.slug}`}>{localized(category, 'name')}</Link>
            <span className={styles.separator}>/</span>
          </>
        )}
        <span>{localized(framework, 'name')}</span>
      </nav>

      <div className={styles.number}>{formattedNumber}</div>
      <h1 className={styles.title}>{localized(framework, 'name')}</h1>
      <div className={styles.subtitle}>{subtitle}</div>

      <div className={styles.metaBadges}>
        {framework.origin_author && (
          <span className={styles.metaBadge}>
            {t.originBy.replace('{author}', framework.origin_author)}
          </span>
        )}
        {framework.complexity && (
          <span className={`${styles.metaBadge} ${complexityClass}`}>
            {complexityLabel}
          </span>
        )}
        {category && (
          <span
            className={styles.categoryPill}
            style={{
              backgroundColor: catColorVar(framework.category, 'bg'),
              color: catColorVar(framework.category, 'text'),
            }}
          >
            {localized(category, 'name')}
          </span>
        )}
        {framework.ai_relevant && (
          <span className={styles.aiBadge}>{t.ai}</span>
        )}
      </div>

      {originSource && (
        <div className={styles.originSource}>{originSource}</div>
      )}

      {/* ── Visualization (first, before text content) ── */}
      <section className={styles.vizSection}>
        <div className={styles.viz}>
          <FrameworkViz type={framework.viz_type} size={300} animate labels={steps} />
        </div>
      </section>

      {/* Description */}
      <p className={styles.desc}>{localized(framework, 'desc')}</p>
      <p className={styles.descAlt}>{locale === 'en' ? framework.desc_zh : framework.desc}</p>

      {/* ── Sticky Navigation Bar ── */}
      <div className={styles.stickyNav}>
        <span className={styles.stickyName}>{localized(framework, 'name')}</span>
        <Link to="/" className={styles.stickyBack}>{t.backToHome}</Link>
      </div>

      {/* ── 2. When to Use ── */}
      {whenToUse?.length > 0 && (
        <FadeIn as="section" id="sec-when" className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.whenToUse}</h2>
          <div className={styles.whenGrid}>
            {whenToUse.map((item, i) => (
              <div className={styles.whenCard} key={i}>
                <span className={styles.whenIcon}>{whenIcons[i % whenIcons.length]}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ── 3. When NOT to Use (decision pair with When to Use) ── */}
      {whenNotToUse?.length > 0 && (
        <FadeIn as="section" id="sec-not" className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.whenNotToUse}</h2>
          <div className={styles.warningList}>
            {whenNotToUse.map((item, i) => (
              <div className={styles.warningItem} key={i}>
                <span className={styles.warningMarker}>{'\u26A0'}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ── 4. Core Concepts ── */}
      {coreConcepts?.length > 0 && (
        <FadeIn as="section" id="sec-concepts" className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.coreConceptsTitle}</h2>
          <div className={styles.conceptsList}>
            {coreConcepts.map((concept, i) => {
              const colonIdx = concept.indexOf(':')
              const name = colonIdx > -1 ? concept.slice(0, colonIdx).trim() : concept
              const desc = colonIdx > -1 ? concept.slice(colonIdx + 1).trim() : ''
              return (
                <div className={styles.conceptItem} key={i}>
                  <span className={styles.conceptNumber}>{i + 1}</span>
                  <div>
                    <span className={styles.conceptName}>{name}</span>
                    {desc && <span className={styles.conceptDesc}> — {desc}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      )}

      {/* ── 4. Origin & Evolution ── */}
      {timeline?.length > 0 && (
        <FadeIn as="section" id="sec-origin" className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.originAndEvolution}</h2>
          <div className={styles.timeline}>
            {timeline.map(([year, event], i) => (
              <div className={styles.timelineItem} key={i}>
                <div className={styles.timelineDot} />
                <span className={styles.timelineYear}>{year}</span>
                <span className={styles.timelineText}>{event}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ── 5. How It Works ── */}
      <FadeIn as="section" id="sec-how" className={styles.section}>
        <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.howItWorks}</h2>
        <StepsList steps={steps} />

        {(dos?.length > 0 || donts?.length > 0) && (
          <div className={styles.doDontGrid}>
            {dos?.length > 0 && (
              <div className={styles.doColumn}>
                <div className={`${styles.doDontTitle} ${styles.doTitle}`}>{t.dosTitle}</div>
                <ul className={styles.doDontList}>
                  {dos.map((item, i) => (
                    <li className={styles.doDontItem} key={i}>
                      <span className={styles.doMarker}>{'\u2713'}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {donts?.length > 0 && (
              <div className={styles.dontColumn}>
                <div className={`${styles.doDontTitle} ${styles.dontTitle}`}>{t.dontsTitle}</div>
                <ul className={styles.doDontList}>
                  {donts.map((item, i) => (
                    <li className={styles.doDontItem} key={i}>
                      <span className={styles.dontMarker}>{'\u2717'}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </FadeIn>

      {/* ── 6. Case Study ── */}
      {caseStudyText && (
        <FadeIn as="section" id="sec-case" className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.caseStudy}</h2>
          {fw.case_study_company && (
            <span className={styles.caseStudyCompany}>{fw.case_study_company}</span>
          )}
          <div
            className={styles.caseStudyCard}
            style={category ? { borderLeftColor: catColorVar(framework.category, 'text') } : undefined}
          >
            {caseStudyText}
          </div>
        </FadeIn>
      )}

      {/* ── 8. Notable Adopters ── */}
      {framework.adopters?.length > 0 && (
        <FadeIn as="section" id="sec-adopters" className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.notableAdopters}</h2>
          <div className={styles.adoptersRow}>
            {framework.adopters.map((name, i) => (
              <span className={styles.adopterPill} key={i}>{name}</span>
            ))}
          </div>
        </FadeIn>
      )}

      {/* ── 9. Sources ── */}
      {(fw.primary_source || fw.secondary_sources?.length) && (
        <FadeIn as="section" id="sec-sources" className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>
            📚 {t.primarySource}
          </h2>
          {fw.primary_source && (
            <blockquote className={styles.sourceBlock}>
              {fw.primary_source}
            </blockquote>
          )}
          {fw.secondary_sources && fw.secondary_sources.length > 0 && (
            <>
              <h3 className={styles.subTitle}>{t.secondarySourcesTitle}</h3>
              <ul className={styles.sourceList}>
                {fw.secondary_sources.map((s, i) => (
                  <li key={i} className={styles.sourceItem}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </FadeIn>
      )}

      {/* ── Related Frameworks ── */}
      {related.length > 0 && (
        <section id="sec-related" className={styles.relatedSection}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.relatedFrameworks}</h2>
          <RelatedFrameworks frameworks={related} typedRelations={typedRelations} />
        </section>
      )}

      {/* ── You Might Also Like ── */}
      {(() => {
        const similar = getSimilarFrameworks(framework)
        if (similar.length === 0) return null
        return (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle} style={sectionBorderStyle}>
              {locale === 'en' ? 'You Might Also Like' : '你可能也感兴趣'}
            </h2>
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
          </section>
        )
      })()}

      {/* ── 12. Prev/Next Navigation ── */}
      <nav className={styles.nav}>
        <div>
          {prev && (
            <Link to={`/frameworks/${prev.slug}`} className={styles.navLink}>
              {t.previous.replace('{name}', localized(prev, 'name'))}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link to={`/frameworks/${next.slug}`} className={styles.navLink}>
              {t.next.replace('{name}', localized(next, 'name'))}
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
