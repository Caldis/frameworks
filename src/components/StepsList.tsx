import { useState } from 'react'
import styles from './StepsList.module.css'

interface StepsListProps {
  steps: string[]
  steps_zh: string[]
}

export default function StepsList({ steps, steps_zh }: StepsListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <ol className={styles.list}>
      {steps.map((step, i) => (
        <li key={i} className={styles.step}>
          <span className={styles.number}>{i + 1}</span>
          <span
            className={styles.text}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === i ? steps_zh[i] : step}
          </span>
        </li>
      ))}
    </ol>
  )
}
