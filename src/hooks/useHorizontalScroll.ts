import { useRef, useState, useCallback, useEffect } from 'react'

interface ScrollState {
  canScrollLeft: boolean
  canScrollRight: boolean
}

const LERP = 0.12
const STOP_THRESHOLD = 0.5

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const target = useRef(0)
  const current = useRef(0)
  const raf = useRef<number | null>(null)
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollLeft: false,
    canScrollRight: true,
  })

  const sync = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    setScrollState({
      canScrollLeft: el.scrollLeft > 1,
      canScrollRight: el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
    })
  }, [])

  const tick = useCallback(() => {
    const el = containerRef.current
    if (!el) { raf.current = null; return }

    const diff = target.current - current.current
    if (Math.abs(diff) < STOP_THRESHOLD) {
      current.current = target.current
      el.scrollLeft = target.current
      raf.current = null
      sync()
      return
    }

    current.current += diff * LERP
    el.scrollLeft = current.current
    sync()
    raf.current = requestAnimationFrame(tick)
  }, [sync])

  const ensureRunning = useCallback(() => {
    if (raf.current === null) raf.current = requestAnimationFrame(tick)
  }, [tick])

  const clamp = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    target.current = Math.max(0, Math.min(target.current, el.scrollWidth - el.clientWidth))
  }, [])

  const onWheel = useCallback((e: React.WheelEvent) => {
    const el = containerRef.current
    if (!el) return

    const max = el.scrollWidth - el.clientWidth
    // Use whichever axis has greater magnitude (wheel=deltaY, trackpad swipe=deltaX)
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY

    // Pass through to page scroll if at boundary
    if (delta > 0 && target.current >= max - 1) return
    if (delta < 0 && target.current <= 1) return

    e.preventDefault()
    target.current += delta
    clamp()
    ensureRunning()
  }, [clamp, ensureRunning])

  const scrollBy = useCallback((direction: 1 | -1) => {
    const el = containerRef.current
    if (!el) return
    target.current += direction * el.clientWidth * 0.75
    clamp()
    ensureRunning()
  }, [clamp, ensureRunning])

  const reset = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (raf.current !== null) { cancelAnimationFrame(raf.current); raf.current = null }
    target.current = 0
    current.current = 0
    el.scrollLeft = 0
    sync()
  }, [sync])

  // Init + resize observer
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    current.current = el.scrollLeft
    target.current = el.scrollLeft
    sync()

    const ro = new ResizeObserver(() => { clamp(); sync() })
    ro.observe(el)
    return () => ro.disconnect()
  }, [sync, clamp])

  // Cleanup
  useEffect(() => () => {
    if (raf.current !== null) cancelAnimationFrame(raf.current)
  }, [])

  return { containerRef, scrollState, scrollBy, onWheel, reset }
}
