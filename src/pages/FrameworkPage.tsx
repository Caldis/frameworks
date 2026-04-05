import { useParams, Link } from 'react-router-dom'
import { getFrameworkBySlug, getFrameworksByCategory, getRelatedFrameworks } from '../data/loader'
import { getCategoryByKey } from '../data/categories'
import FrameworkViz from '../components/FrameworkViz'
import StepsList from '../components/StepsList'
import RelatedFrameworks from '../components/RelatedFrameworks'
import styles from './FrameworkPage.module.css'

export default function FrameworkPage() {
  const { slug } = useParams<{ slug: string }>()
  const framework = slug ? getFrameworkBySlug(slug) : undefined

  if (!framework) {
    return (
      <div className={styles.notFound}>
        <h2>Framework not found</h2>
        <Link to="/">&larr; Back to Home</Link>
      </div>
    )
  }

  const category = getCategoryByKey(framework.category)
  const categoryFrameworks = getFrameworksByCategory(framework.category)
  const currentIndex = categoryFrameworks.findIndex(f => f.slug === framework.slug)
  const prev = currentIndex > 0 ? categoryFrameworks[currentIndex - 1] : null
  const next = currentIndex < categoryFrameworks.length - 1 ? categoryFrameworks[currentIndex + 1] : null
  const related = getRelatedFrameworks(framework)

  const formattedNumber = `#${String(framework.id).padStart(2, '0')}`

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span className={styles.separator}>/</span>
        {category && (
          <>
            <Link to={`/category/${category.slug}`}>{category.name}</Link>
            <span className={styles.separator}>/</span>
          </>
        )}
        <span>{framework.name}</span>
      </nav>

      {/* Header */}
      <div className={styles.number}>{formattedNumber}</div>
      <h1 className={styles.title}>{framework.name}</h1>
      <div className={styles.titleZh}>{framework.name_zh}</div>
      <div className={styles.tags}>
        {category && (
          <span
            className={styles.tag}
            style={{
              backgroundColor: category.colorBg,
              color: category.colorText,
            }}
          >
            {category.name}
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
      <p className={styles.desc}>{framework.desc}</p>
      <p className={styles.descZh}>{framework.desc_zh}</p>

      {/* Implementation Steps */}
      <section className={styles.stepsSection}>
        <h2 className={styles.stepsTitle}>Implementation Steps</h2>
        <StepsList steps={framework.steps} steps_zh={framework.steps_zh} />
      </section>

      {/* Related Frameworks */}
      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h2 className={styles.stepsTitle}>Related Frameworks</h2>
          <RelatedFrameworks frameworks={related} />
        </section>
      )}

      {/* Prev/Next Navigation */}
      <nav className={styles.nav}>
        <div>
          {prev && (
            <Link to={`/frameworks/${prev.slug}`} className={styles.navLink}>
              &larr; Previous: {prev.name}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link to={`/frameworks/${next.slug}`} className={styles.navLink}>
              Next: {next.name} &rarr;
            </Link>
          )}
        </div>
      </nav>

      {/* Back to category */}
      {category && (
        <Link to={`/category/${category.slug}`} className={styles.backLink}>
          &larr; Back to {category.name}
        </Link>
      )}
    </div>
  )
}
