import { useState, useEffect, useRef } from 'react'
import styles from './SectionNav.module.css'

interface Section {
  id: string
  label: string
}

interface SectionNavProps {
  sections: Section[]
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (sections.length === 0) return

    observerRef.current = new IntersectionObserver(
      entries => {
        // Find the topmost visible section
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observerRef.current!.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [sections])

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (sections.length < 3) return null

  return (
    <nav className={styles.nav} aria-label="Page sections">
      {sections.map(s => (
        <button
          key={s.id}
          className={`${styles.dot} ${active === s.id ? styles.dotActive : ''}`}
          onClick={() => handleClick(s.id)}
          title={s.label}
          aria-label={s.label}
        />
      ))}
    </nav>
  )
}
