import { useInView } from 'react-intersection-observer'
import type { ReactNode, CSSProperties } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: keyof HTMLElementTagNameMap
  id?: string
}

export default function FadeIn({ children, className, style, as: Tag = 'div', id }: FadeInProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const fadeStyle: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(12px)',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    ...style,
  }

  return (
    <Tag ref={ref} className={className} style={fadeStyle} id={id}>
      {children}
    </Tag>
  )
}
