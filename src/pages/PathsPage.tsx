import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import { getFrameworkBySlug } from '../data/loader'
import { getCategoryByKey, catColorVar } from '../data/categories'
import learningPathsData from '../../data/learning-paths.json'
import type { LearningPath } from '../types'
import styles from './PathsPage.module.css'

const learningPaths: LearningPath[] = learningPathsData

export default function PathsPage() {
  const { t, localized } = useI18n()
  usePageMeta('Learning Paths', 'Curated learning sequences to master software design step by step')
  const [expandedPath, setExpandedPath] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, string[]>>(() => {
    try {
      const raw = localStorage.getItem('path-progress')
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  })

  const toggleComplete = (pathId: string, slug: string) => {
    setProgress(prev => {
      const done = prev[pathId] || []
      const next = done.includes(slug) ? done.filter(s => s !== slug) : [...done, slug]
      const updated = { ...prev, [pathId]: next }
      localStorage.setItem('path-progress', JSON.stringify(updated))
      return updated
    })
  }

  // Resolve frameworks for each path
  const resolvedPaths = useMemo(() => {
    return learningPaths.map(path => ({
      ...path,
      resolvedFrameworks: path.frameworks.map(slug => getFrameworkBySlug(slug)).filter(Boolean),
    }))
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.learningPathsTitle}</h1>
      <p className={styles.subtitle}>{t.learningPathsSubtitle}</p>

      <div className={styles.pathGrid}>
        {resolvedPaths.map(path => {
          const done = progress[path.id] || []
          const total = path.frameworks.length
          const doneCount = done.length
          const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0
          const isExpanded = expandedPath === path.id

          return (
            <div
              key={path.id}
              className={`${styles.pathCard} ${isExpanded ? styles.pathCardExpanded : ''}`}
              onClick={() => setExpandedPath(isExpanded ? null : path.id)}
            >
              <div className={styles.pathIcon}>{path.icon}</div>
              <div className={styles.pathName}>{localized(path, 'name')}</div>
              <div className={styles.pathDesc}>{localized(path, 'desc')}</div>
              <div className={styles.pathMeta}>
                <svg className={styles.progressRing} width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="var(--border)" strokeWidth="2" />
                  <circle cx="10" cy="10" r="8" fill="none" stroke="var(--viz-accent)" strokeWidth="2"
                    strokeDasharray={`${pct * 0.5} 50`}
                    strokeLinecap="round"
                    transform="rotate(-90 10 10)"
                    style={{ transition: 'stroke-dasharray 0.4s ease-out' }}
                  />
                </svg>
                {t.pathProgress.replace('{done}', String(doneCount)).replace('{total}', String(total))}
              </div>

              {isExpanded && (
                <ul className={styles.stepList} onClick={e => e.stopPropagation()}>
                  {path.resolvedFrameworks.map((fw, i) => {
                    if (!fw) return null
                    const isDone = done.includes(fw.slug)
                    const category = getCategoryByKey(fw.category)

                    return (
                      <li key={fw.slug} className={styles.stepItem}>
                        <span className={styles.stepNumber}>
                          {t.pathStep.replace('{n}', String(i + 1))}
                        </span>
                        <button
                          className={`${styles.stepCheckbox} ${isDone ? styles.stepChecked : ''}`}
                          onClick={() => toggleComplete(path.id, fw.slug)}
                          aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {isDone && '✓'}
                        </button>
                        <Link
                          to={`/frameworks/${fw.slug}`}
                          className={styles.stepLink}
                        >
                          <span className={`${styles.stepName} ${isDone ? styles.stepNameDone : ''}`}>
                            {localized(fw, 'name')}
                          </span>
                        </Link>
                        {category && (
                          <span
                            className={styles.categoryPill}
                            style={{ background: catColorVar(category.key, 'bg'), color: catColorVar(category.key, 'text') }}
                          >
                            {localized(category, 'name')}
                          </span>
                        )}
                        <span className={styles.complexityBadge}>
                          {fw.complexity === 'beginner' ? t.complexityBeginner :
                           fw.complexity === 'intermediate' ? t.complexityIntermediate :
                           t.complexityAdvanced}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
