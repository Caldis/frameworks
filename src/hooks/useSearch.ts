import { useState, useMemo } from 'react'
import type { Framework } from '../types'

export function useSearch(frameworks: Framework[]) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return frameworks
    const q = query.toLowerCase()
    return frameworks.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.name_zh.includes(q) ||
      f.desc.toLowerCase().includes(q) ||
      f.desc_zh.includes(q) ||
      f.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [frameworks, query])

  return { query, setQuery, filtered }
}
