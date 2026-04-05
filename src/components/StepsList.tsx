import styles from './StepsList.module.css'

interface StepsListProps {
  steps: string[]
}

export default function StepsList({ steps }: StepsListProps) {
  return (
    <ol className={styles.list}>
      {steps.map((step, i) => (
        <li key={i} className={styles.step}>
          <span className={styles.number}>{i + 1}</span>
          <span className={styles.text}>{step}</span>
        </li>
      ))}
    </ol>
  )
}
