import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BASE_URL = 'https://sdframe.caldis.me'

interface StructuredData {
  type: 'Article' | 'WebPage'
  name: string
  author?: string
  datePublished?: string
}

export function usePageMeta(title: string, description?: string, structured?: StructuredData) {
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

    // JSON-LD structured data
    let ldScript = document.querySelector('script[data-page-ld]') as HTMLScriptElement
    if (structured) {
      if (!ldScript) {
        ldScript = document.createElement('script')
        ldScript.type = 'application/ld+json'
        ldScript.setAttribute('data-page-ld', '')
        document.head.appendChild(ldScript)
      }
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': structured.type,
        name: structured.name,
        headline: title,
        description: description || '',
        url: BASE_URL + pathname,
        ...(structured.author ? { author: { '@type': 'Person', name: structured.author } } : {}),
        ...(structured.datePublished ? { datePublished: structured.datePublished } : {}),
        isPartOf: { '@type': 'WebSite', name: 'SDFrame', url: BASE_URL },
      })
    } else if (ldScript) {
      ldScript.remove()
    }

    return () => {
      document.title = prev
      const ld = document.querySelector('script[data-page-ld]')
      if (ld) ld.remove()
    }
  }, [title, description, pathname, structured])
}
