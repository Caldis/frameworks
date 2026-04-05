import { Link } from 'react-router-dom'
import type { Framework } from '../types'
import { getCategoryByKey } from '../data/categories'
import { useI18n } from '../i18n'
import styles from './RelatedFrameworks.module.css'

interface RelatedFrameworksProps {
  frameworks: Framework[]
}

export default function RelatedFrameworks({ frameworks }: RelatedFrameworksProps) {
  const { localized } = useI18n()

  return (
    <div className={styles.row}>
      {frameworks.map((fw) => {
        const category = getCategoryByKey(fw.category)
        return (
          <Link
            key={fw.slug}
            to={`/frameworks/${fw.slug}`}
            className={styles.card}
          >
            <div className={styles.name}>{localized(fw, 'name')}</div>
            {category && (
              <span
                className={styles.pill}
                style={{
                  backgroundColor: category.colorBg,
                  color: category.colorText,
                }}
              >
                {localized(category, 'name')}
              </span>
            )}
            <div className={styles.desc}>{localized(fw, 'desc')}</div>
          </Link>
        )
      })}
    </div>
  )
}
