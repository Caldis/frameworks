import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Framework } from '../types'
import { categories, catColorVar } from '../data/categories'
import { getFrameworksByCategory, getAIRelevantFrameworks, getFrameworksFullByCategory } from '../data/loader'
import { useFavorites } from '../hooks/useFavorites'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import CardGrid from '../components/CardGrid'
import styles from './CategoryPage.module.css'

export default function CategoryPage() {
  const { locale, t, localized } = useI18n()
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()

  const category = categories.find(c => c.slug === slug)

  usePageMeta(
    category ? localized(category, 'name') : 'Category Not Found',
    category ? localized(category, 'description') : undefined
  )

  if (!category) {
    return (
      <div className={styles.notFound}>
        <h2>{t.categoryNotFound}</h2>
        <Link to="/">{t.backToHome}</Link>
      </div>
    )
  }

  const frameworks = getFrameworksByCategory(category.key)
  const aiCount = frameworks.filter(f => f.ai_relevant).length

  const [fullFrameworks, setFullFrameworks] = useState<Framework[]>([])

  useEffect(() => {
    if (category) {
      getFrameworksFullByCategory(category.key).then(setFullFrameworks)
    }
  }, [category])

  const categoryName = localized(category, 'name')
  const nameSubtitle = locale === 'en' ? category.name_zh : category.name

  // Build nth-child selectors for AI-relevant cards in the grid
  const aiIndices = frameworks
    .map((fw, i) => (fw.ai_relevant ? i + 1 : null))
    .filter((i): i is number => i !== null)
  const aiBorderCSS = aiIndices.length > 0
    ? `.${styles.gridWrap} > div > div { border-left: 3px solid transparent; }\n` +
      aiIndices
        .map(n => `.${styles.gridWrap} > div > div:nth-child(${n})`)
        .join(',\n') + ` { border-left-color: var(--cat-ai-bg); }`
    : ''

  const handleCardClick = (fw: Framework) => {
    navigate(`/frameworks/${fw.slug}`)
  }

  // For the AI category page, gather AI-relevant frameworks grouped by other categories
  const isAICategory = category.key === 'ai'
  const aiAcrossCategories = isAICategory
    ? getAIGroupedByCategory()
    : null

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        {t.backToHome}
      </Link>

      <div className={styles.header} style={{ '--cat-bg': catColorVar(category.key, 'bg') } as React.CSSProperties}>
        <div className={styles.nameRow}>
          <h1 className={styles.name} style={{ color: catColorVar(category.key, 'text') }}>
            {categoryName}
          </h1>
          <span className={styles.nameZh}>{nameSubtitle}</span>
        </div>
        <p className={styles.desc}>
          {localized(category, 'description')}
        </p>
        <div className={styles.stats}>
          {t.frameworksCount.replace('{count}', String(frameworks.length))} &middot; {t.aiRelevantCount.replace('{count}', String(aiCount))}
        </div>
      </div>

      {aiBorderCSS && <style>{aiBorderCSS}</style>}
      <div className={styles.gridWrap}>
        <CardGrid
          frameworks={frameworks}
          onCardClick={handleCardClick}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          hideCategoryTag={true}
        />
      </div>

      {/* Reading List */}
      {(() => {
        const sources = fullFrameworks
          .map(f => f.primary_source)
          .filter(Boolean)
          .filter((s, i, arr) => arr.indexOf(s) === i)
          .slice(0, 8)

        return sources.length > 0 ? (
          <section className={styles.readingList}>
            <h2 className={styles.readingTitle}>
              📚 {t.recommendedReading.replace('{category}', localized(category, 'name'))}
            </h2>
            <ol className={styles.readingItems}>
              {sources.map((s, i) => (
                <li key={i} className={styles.readingItem}>{s}</li>
              ))}
            </ol>
          </section>
        ) : null
      })()}

      {isAICategory && aiAcrossCategories && (
        <div className={styles.aiSection}>
          <h2 className={styles.aiSectionTitle}>{t.aiAcrossCategories}</h2>
          {aiAcrossCategories.map(group => (
            <div key={group.category.key} className={styles.aiGroup}>
              <div
                className={styles.aiGroupName}
                style={{ color: catColorVar(group.category.key, 'text') }}
              >
                {localized(group.category, 'name')}
              </div>
              <div>
                {group.frameworks.map(fw => (
                  <Link
                    key={fw.slug}
                    to={`/frameworks/${fw.slug}`}
                    className={styles.aiItem}
                    style={{ backgroundColor: catColorVar(group.category.key, 'bg') }}
                  >
                    {localized(fw, 'name')}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getAIGroupedByCategory() {
  const aiFrameworks = getAIRelevantFrameworks()
  const otherCategories = categories.filter(c => c.key !== 'ai')

  return otherCategories
    .map(cat => {
      const fws = aiFrameworks.filter(f => f.category === cat.key)
      return { category: cat, frameworks: fws }
    })
    .filter(group => group.frameworks.length > 0)
}
