import { useState, type ElementType, type ComponentPropsWithoutRef } from 'react'

interface Props {
  en: string
  zh: string
  className?: string
  as?: ElementType
}

export default function BilingualText({ en, zh, className, as: Tag = 'span' }: Props) {
  const [showZh, setShowZh] = useState(false)
  return (
    <Tag
      className={className}
      onMouseEnter={() => setShowZh(true)}
      onMouseLeave={() => setShowZh(false)}
      style={{ cursor: 'default', transition: 'opacity 0.15s ease' }}
    >
      {showZh ? zh : en}
    </Tag>
  )
}
