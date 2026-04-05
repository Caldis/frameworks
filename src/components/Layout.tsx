import { Link, Outlet } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '../i18n'
import styles from './Layout.module.css'

export default function Layout() {
  const { t } = useI18n()

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.domainBadge}>sdframe</Link>
        <LanguageSwitcher />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerBrand}>{t.footerTitle}</span>
          <a
            href="https://pmframe.works/"
            className={styles.footerInspired}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.inspiredBy}
          </a>
        </div>
        <div className={styles.footerRight}>
          <a
            href="https://github.com/Caldis"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.builtBy}
          </a>
          <span className={styles.separator}>·</span>
          <a
            href="https://github.com/Caldis/frameworks"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className={styles.githubIcon}
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            {t.source}
          </a>
        </div>
      </footer>
    </div>
  )
}
