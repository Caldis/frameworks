import { useParams, Link } from 'react-router-dom'
import { getFrameworkBySlug, getFrameworksByCategory, getRelatedFrameworks, getTypedRelations } from '../data/loader'
import { getCategoryByKey } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import FrameworkViz from '../components/FrameworkViz'
import StepsList from '../components/StepsList'
import RelatedFrameworks from '../components/RelatedFrameworks'
import styles from './FrameworkPage.module.css'

export default function FrameworkPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale, t, localized } = useI18n()
  const framework = slug ? getFrameworkBySlug(slug) : undefined

  usePageMeta(
    framework ? localized(framework, 'name') : 'Framework Not Found',
    framework ? localized(framework, 'desc') : undefined
  )

  if (!framework) {
    return (
      <div className={styles.notFound}>
        <h2>{t.frameworkNotFound}</h2>
        <Link to="/">{t.backToHome}</Link>
      </div>
    )
  }

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

  const whenToUse = locale === 'en' ? framework.when_to_use : framework.when_to_use_zh
  const coreConcepts = locale === 'en' ? framework.core_concepts : framework.core_concepts_zh
  const timeline = locale === 'en' ? framework.timeline : framework.timeline_zh
  const dos = locale === 'en' ? framework.dos : framework.dos_zh
  const donts = locale === 'en' ? framework.donts : framework.donts_zh
  const caseStudyText = locale === 'en' ? framework.case_study : framework.case_study_zh
  const whenNotToUse = locale === 'en' ? framework.when_not_to_use : framework.when_not_to_use_zh
  const originSource = locale === 'en' ? framework.origin_source : framework.origin_source_zh

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
    ? { borderLeftColor: category.colorText }
    : undefined

  const whenIcons = ['\u26A1', '\uD83C\uDFAF', '\uD83D\uDD04', '\uD83D\uDCA1', '\uD83D\uDE80']

  return (
    <div className={styles.page}>
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
              backgroundColor: category.colorBg,
              color: category.colorText,
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
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.whenToUse}</h2>
          <div className={styles.whenGrid}>
            {whenToUse.map((item, i) => (
              <div className={styles.whenCard} key={i}>
                <span className={styles.whenIcon}>{whenIcons[i % whenIcons.length]}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 3. Core Concepts ── */}
      {coreConcepts?.length > 0 && (
        <section className={styles.section}>
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
        </section>
      )}

      {/* ── 4. Origin & Evolution ── */}
      {timeline?.length > 0 && (
        <section className={styles.section}>
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
        </section>
      )}

      {/* ── 5. How It Works ── */}
      <section className={styles.section}>
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
      </section>

      {/* ── 6. Case Study ── */}
      {caseStudyText && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.caseStudy}</h2>
          {framework.case_study_company && (
            <span className={styles.caseStudyCompany}>{framework.case_study_company}</span>
          )}
          <div
            className={styles.caseStudyCard}
            style={category ? { borderLeftColor: category.colorText } : undefined}
          >
            {caseStudyText}
          </div>
        </section>
      )}

      {/* ── 7. When NOT to Use ── */}
      {whenNotToUse?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.whenNotToUse}</h2>
          <div className={styles.warningList}>
            {whenNotToUse.map((item, i) => (
              <div className={styles.warningItem} key={i}>
                <span className={styles.warningMarker}>{'\u26A0'}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 8. Notable Adopters ── */}
      {framework.adopters?.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.notableAdopters}</h2>
          <div className={styles.adoptersRow}>
            {framework.adopters.map((name, i) => (
              <span className={styles.adopterPill} key={i}>{name}</span>
            ))}
          </div>
        </section>
      )}

      {/* ── 9. Sources ── */}
      {(framework.primary_source || framework.secondary_sources?.length) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>
            📚 {t.primarySource}
          </h2>
          {framework.primary_source && (
            <blockquote className={styles.sourceBlock}>
              {framework.primary_source}
            </blockquote>
          )}
          {framework.secondary_sources && framework.secondary_sources.length > 0 && (
            <>
              <h3 className={styles.subTitle}>{t.secondarySourcesTitle}</h3>
              <ul className={styles.sourceList}>
                {framework.secondary_sources.map((s, i) => (
                  <li key={i} className={styles.sourceItem}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {/* ── Related Frameworks ── */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.sectionTitle} style={sectionBorderStyle}>{t.relatedFrameworks}</h2>
          <RelatedFrameworks frameworks={related} typedRelations={typedRelations} />
        </section>
      )}

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
