import { useState, useMemo } from 'react'
import type { Framework } from '../types'

export function useSearch(frameworks: Framework[]) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return frameworks
    const q = query.toLowerCase()
    return frameworks.filter(f => {
      if (f.name.toLowerCase().includes(q)) return true
      if (f.name_zh.includes(q)) return true
      if (f.desc.toLowerCase().includes(q)) return true
      if (f.desc_zh.includes(q)) return true
      if (f.tags.some(t => t.toLowerCase().includes(q))) return true
      if (f.origin_author?.toLowerCase().includes(q)) return true
      if (f.adopters?.some(a => a.toLowerCase().includes(q))) return true
      return false
    })
  }, [frameworks, query])

  return { query, setQuery, filtered }
}
