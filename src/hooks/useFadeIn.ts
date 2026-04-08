import { useEffect, useRef } from 'react'

/**
 * Adds 'fade-visible' class to [data-fade] children as they enter the viewport.
 * Uses MutationObserver to pick up dynamically rendered sections (e.g. async data).
 */
export function useFadeIn<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const observeNew = () => {
      el.querySelectorAll('[data-fade]').forEach(child => {
        if (!child.classList.contains('fade-visible')) {
          io.observe(child)
        }
      })
    }

    // Observe existing elements
    observeNew()

    // Watch for dynamically added [data-fade] elements (async data loading)
    const mo = new MutationObserver(observeNew)
    mo.observe(el, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return ref
}
