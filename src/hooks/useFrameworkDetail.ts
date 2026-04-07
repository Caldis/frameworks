import { useState, useEffect } from 'react'
import type { Framework } from '../types'
import { getFrameworkFull } from '../data/loader'

export function useFrameworkDetail(slug: string | undefined | null): {
  framework: Framework | undefined
  loading: boolean
} {
  const [framework, setFramework] = useState<Framework | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slug) {
      setFramework(undefined)
      setLoading(false)
      return
    }
    setLoading(true)
    getFrameworkFull(slug).then(fw => {
      setFramework(fw)
      setLoading(false)
    })
  }, [slug])

  return { framework, loading }
}
