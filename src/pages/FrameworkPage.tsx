import { useParams, Link } from 'react-router-dom'
import { getFrameworkBySlug, getFrameworksByCategory, getRelatedFrameworks } from '../data/loader'
import { getCategoryByKey } from '../data/categories'
import { useI18n } from '../i18n'
import FrameworkViz from '../components/FrameworkViz'
import StepsList from '../components/StepsList'
import RelatedFrameworks from '../components/RelatedFrameworks'
import styles from './FrameworkPage.module.css'

export default function FrameworkPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale, t, localized } = useI18n()
  const framework = slug ? getFrameworkBySlug(slug) : undefined

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
  const steps = locale === 'en' ? framework.steps : framework.steps_zh

  const formattedNumber = `#${String(framework.id).padStart(2, '0')}`
  const subtitle = locale === 'en' ? framework.name_zh : framework.name

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
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

      {/* Header */}
      <div className={styles.number}>{formattedNumber}</div>
      <h1 className={styles.title}>{localized(framework, 'name')}</h1>
      <div className={styles.titleZh}>{subtitle}</div>
      <div className={styles.tags}>
        {category && (
          <span
            className={styles.tag}
            style={{
              backgroundColor: category.colorBg,
              color: category.colorText,
            }}
          >
            {localized(category, 'name')}
          </span>
        )}
        {framework.ai_relevant && (
          <span className={styles.aiTag}>AI</span>
        )}
      </div>

      {/* SVG Visualization */}
      <div className={styles.viz}>
        <FrameworkViz type={framework.viz_type} size={300} animate />
      </div>

      {/* Description */}
      <p className={styles.desc}>{localized(framework, 'desc')}</p>
      <p className={styles.descZh}>{locale === 'en' ? framework.desc_zh : framework.desc}</p>

      {/* Implementation Steps */}
      <section className={styles.stepsSection}>
        <h2 className={styles.stepsTitle}>{t.implementationSteps}</h2>
        <StepsList steps={steps} />
      </section>

      {/* Related Frameworks */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.stepsTitle}>{t.relatedFrameworks}</h2>
          <RelatedFrameworks frameworks={related} />
        </section>
      )}

      {/* Prev/Next Navigation */}
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
