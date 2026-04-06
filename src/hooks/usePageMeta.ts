import { useEffect } from 'react'

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prev = document.title
    document.title = title + ' — SDFrame'

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }

    return () => { document.title = prev }
  }, [title, description])
}
