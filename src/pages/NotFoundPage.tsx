import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const { locale } = useI18n()

  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>
        {locale === 'en' ? 'Page not found' : '页面未找到'}
      </h1>
      <p className={styles.desc}>
        {locale === 'en'
          ? 'The framework you\'re looking for doesn\'t exist or has been moved.'
          : '你正在寻找的框架不存在或已被移动。'
        }
      </p>
      <div className={styles.actions}>
        <Link to="/" className={styles.primary}>
          {locale === 'en' ? 'Browse all frameworks' : '浏览全部框架'}
        </Link>
        <Link to="/map" className={styles.secondary}>
          {locale === 'en' ? 'Explore the map' : '探索关系图'}
        </Link>
      </div>
    </div>
  )
}
