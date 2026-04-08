import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import styles from './MobileNav.module.css'

const tabs = [
  { path: '/', label: 'home', icon: '⬡' },
  { path: '/map', label: 'map', icon: '◉' },
  { path: '/compare', label: 'compare', icon: '⇔' },
  { path: '/insights', label: 'insights', icon: '◫' },
  { path: '/timeline', label: 'timeline', icon: '↕' },
]

export default function MobileNav() {
  const { pathname } = useLocation()
  const { t } = useI18n()

  const labelMap: Record<string, string> = {
    home: t.allFrameworks?.split(' ')[0] || 'Home',
    map: t.map,
    compare: t.compare,
    insights: t.insights,
    timeline: t.timeline,
  }

  return (
    <nav className={styles.bar}>
      {tabs.map(tab => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`${styles.tab} ${pathname === tab.path ? styles.tabActive : ''}`}
        >
          <span className={styles.icon}>{tab.icon}</span>
          <span className={styles.label}>{labelMap[tab.label]}</span>
        </Link>
      ))}
    </nav>
  )
}
