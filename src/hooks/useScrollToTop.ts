import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset scroll position on every route change */
export function useScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
}
