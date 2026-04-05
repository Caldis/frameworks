import { useEffect } from 'react'

export function useKeyboard(handlers: {
  onSearch?: () => void
  onEscape?: () => void
  onLeft?: () => void
  onRight?: () => void
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        handlers.onSearch?.()
      }
      if (e.key === 'Escape') handlers.onEscape?.()
      if (e.key === 'ArrowLeft') handlers.onLeft?.()
      if (e.key === 'ArrowRight') handlers.onRight?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
