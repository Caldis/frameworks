import { useEffect, useRef } from 'react'

/**
 * Adds a 'visible' class to children as they enter the viewport.
 * Returns a ref to attach to the container element.
 */
export function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe all direct children with data-fade attribute
    el.querySelectorAll('[data-fade]').forEach(child => observer.observe(child))

    return () => observer.disconnect()
  }, [])

  return ref
}
