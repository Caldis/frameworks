import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Uses ease-out-quint for natural deceleration.
 */
export function useCountUp(target: number, duration = 1200): number {
  const [value, setValue] = useState(0)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (target <= 0) { setValue(0); return }
    startTime.current = null

    const tick = (now: number) => {
      if (startTime.current === null) startTime.current = now
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out-quint: 1 - (1 - t)^5
      const eased = 1 - Math.pow(1 - progress, 5)
      setValue(Math.round(eased * target))

      if (progress < 1) {
        raf.current = requestAnimationFrame(tick)
      }
    }

    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current !== null) cancelAnimationFrame(raf.current) }
  }, [target, duration])

  return value
}
