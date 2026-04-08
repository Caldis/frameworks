import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BASE_URL = 'https://sdframe.caldis.me'

export function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation()

  useEffect(() => {
    const prev = document.title
    document.title = title + ' — SDFrame'

    // Meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }

    // OG title + description
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement
    if (ogTitle) ogTitle.content = title + ' — SDFrame'
    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement
    if (ogDesc && description) ogDesc.content = description

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = BASE_URL + pathname

    // OG URL
    const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement
    if (ogUrl) ogUrl.content = BASE_URL + pathname

    return () => { document.title = prev }
  }, [title, description, pathname])
}
