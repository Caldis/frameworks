import { Link } from 'react-router-dom'
import type { Framework } from '../types'
import { getCategoryByKey } from '../data/categories'
import styles from './RelatedFrameworks.module.css'

interface RelatedFrameworksProps {
  frameworks: Framework[]
}

export default function RelatedFrameworks({ frameworks }: RelatedFrameworksProps) {
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
            <div className={styles.nameEn}>{fw.name}</div>
            <div className={styles.nameZh}>{fw.name_zh}</div>
            {category && (
              <span
                className={styles.pill}
                style={{
                  backgroundColor: category.colorBg,
                  color: category.colorText,
                }}
              >
                {category.name}
              </span>
            )}
            <div className={styles.descEn}>{fw.desc}</div>
            <div className={styles.descZh}>{fw.desc_zh}</div>
          </Link>
        )
      })}
    </div>
  )
}
