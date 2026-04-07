import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllFrameworks } from '../data/loader'
import { catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import styles from './TimelinePage.module.css'

export default function TimelinePage() {
  const { locale, localized } = useI18n()
  usePageMeta('Timeline', 'The evolution of software design thinking')

  const decades = useMemo(() => {
    const frameworks = getAllFrameworks()
      .filter(f => (f as any).origin_year > 0)
      .sort((a, b) => (a as any).origin_year - (b as any).origin_year)

    const groups = new Map<string, typeof frameworks>()
    for (const fw of frameworks) {
      const year = (fw as any).origin_year as number
      const decade = `${Math.floor(year / 10) * 10}s`
      if (!groups.has(decade)) groups.set(decade, [])
      groups.get(decade)!.push(fw)
    }
    return Array.from(groups.entries())
  }, [])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {locale === 'en' ? 'Timeline' : '时间线'}
      </h1>
      <p className={styles.subtitle}>
        {locale === 'en'
          ? 'The evolution of software design thinking'
          : '软件设计思想的演变'}
      </p>

      <div className={styles.timeline}>
        {decades.map(([decade, fws]) => (
          <div key={decade} className={styles.decade}>
            <div className={styles.decadeLabel}>{decade}</div>
            <div className={styles.entries}>
              {fws.map(fw => (
                <Link
                  key={fw.slug}
                  to={`/frameworks/${fw.slug}`}
                  className={styles.entry}
                >
                  <span className={styles.year}>{(fw as any).origin_year}</span>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: catColorVar(fw.category, 'text') }}
                  />
                  <span className={styles.name}>{localized(fw, 'name')}</span>
                  {fw.origin_author && (
                    <span className={styles.author}>{fw.origin_author}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
