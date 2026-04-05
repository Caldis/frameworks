import { useI18n } from '../i18n'
import styles from './LanguageSwitcher.module.css'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const toggle = () => {
    setLocale(locale === 'en' ? 'zh' : 'en')
  }

  return (
    <button className={styles.switcher} onClick={toggle} title="Switch language">
      <span className={locale === 'en' ? styles.active : styles.inactive}>EN</span>
      <span className={styles.separator}>/</span>
      <span className={locale === 'zh' ? styles.active : styles.inactive}>中</span>
    </button>
  )
}
