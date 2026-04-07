import styles from './KeyboardHelp.module.css'

interface KeyboardHelpProps {
  visible: boolean
  onClose: () => void
}

export default function KeyboardHelp({ visible, onClose }: KeyboardHelpProps) {
  if (!visible) return null

  return (
    <div className={styles.panel} onClick={onClose}>
      <div className={styles.title}>Keyboard Shortcuts</div>
      <div className={styles.row}>
        <kbd className={styles.key}>/</kbd>
        <span className={styles.desc}>Focus search</span>
      </div>
      <div className={styles.row}>
        <kbd className={styles.key}>?</kbd>
        <span className={styles.desc}>Toggle this help</span>
      </div>
      <div className={styles.row}>
        <kbd className={styles.key}>Esc</kbd>
        <span className={styles.desc}>Close modal / blur</span>
      </div>
      <div className={styles.row}>
        <kbd className={styles.key}>←→</kbd>
        <span className={styles.desc}>Navigate modal</span>
      </div>
    </div>
  )
}
