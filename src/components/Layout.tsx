import { Link, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.domainBadge}>frameworks</Link>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <span className={styles.domainName}>frameworks</span>
        <span className={styles.copyright}>© 2026</span>
      </footer>
    </div>
  )
}
