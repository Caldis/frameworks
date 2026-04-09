import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
import type { VizType } from '../types'
import styles from './FrameworkViz.module.css'

interface FrameworkVizProps {
  type: VizType
  size?: number
  animate?: boolean
  className?: string
  labels?: string[]
}

/* ── Helpers ── */

function isChinese(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text)
}

function shortLabel(text: string, maxLen?: number): string {
  const zh = isChinese(text)
  // Strip parenthetical and quoted content
  let cleaned = text.replace(/[（(][^）)]*[）)]/g, '').replace(/「[^」]*」/g, '').trim()

  if (zh) {
    const limit = maxLen ?? 6
    if (cleaned.length <= limit) return cleaned

    // Visual width: Chinese char ≈ 1.0, Latin/digit ≈ 0.6
    const vw = (s: string) => {
      let w = 0
      for (let i = 0; i < s.length; i++)
        w += /[\u4e00-\u9fff]/.test(s[i]) ? 1 : 0.6
      return w
    }
    const vPos = (s: string, maxW: number) => {
      let w = 0, p = 0
      for (let i = 0; i < s.length; i++) {
        const c = /[\u4e00-\u9fff]/.test(s[i]) ? 1 : 0.6
        if (w + c > maxW) break
        w += c; p = i + 1
      }
      return p
    }
    const vLimit = vPos(cleaned, limit)

    // 1. Colon split (min 2 — intentional labels like 红灯：)
    const colonIdx = cleaned.indexOf('：')
    if (colonIdx >= 2 && colonIdx <= vLimit) return cleaned.slice(0, colonIdx).trim()

    // 2. Delimiter splits (min 3 — avoid generic 2-char verbs)
    const seps = ['，', '、', '；', '——', '从而', '直至', '以便', '以确保', '用于', '并将', '并对', '并', '及']
    let best = ''
    for (const d of seps) {
      const idx = cleaned.indexOf(d)
      if (idx >= 3 && idx <= vLimit && idx > best.length) best = cleaned.slice(0, idx).trim()
    }
    if (best) return best.replace(/[，、；：]$/, '')

    // 3. Truncate at visual limit, try to keep complete English words
    let pos = vLimit
    if (pos < cleaned.length && /[a-zA-Z0-9]/.test(cleaned[pos])) {
      let wordEnd = pos
      while (wordEnd < cleaned.length && /[a-zA-Z0-9]/.test(cleaned[wordEnd])) wordEnd++
      if (vw(cleaned.slice(0, wordEnd)) <= limit + 1.2) {
        pos = wordEnd
      } else {
        let ws = pos
        while (ws > 0 && /[a-zA-Z0-9]/.test(cleaned[ws - 1])) ws--
        if (ws >= 4) { pos = ws; while (pos > 0 && cleaned[pos - 1] === ' ') pos-- }
      }
    }
    return cleaned.slice(0, pos).trim().replace(/[，、；：]$/, '')
  } else {
    const limit = maxLen ?? 14
    const colonIdx = cleaned.indexOf(':')
    if (colonIdx > 0 && colonIdx <= limit) {
      const r = cleaned.slice(0, colonIdx).trim()
      if (r.length >= 3) return r
    }
    if (cleaned.length <= limit) return cleaned

    const tokens = cleaned.split(/\s+/).map(t => t.replace(/[,;:]$/, ''))
    const skip = (['the', 'a', 'an'] as string[]).includes(tokens[0]?.toLowerCase()) ? 1 : 0
    for (let n = 3; n >= 2; n--) {
      const p = tokens.slice(skip, skip + n).join(' ')
      if (p.length <= limit) return p
    }
    const first = tokens[skip] || ''
    const genericVerbs = ['add', 'use', 'run', 'set', 'map', 'for', 'get', 'put', 'if']
    if (genericVerbs.includes(first.toLowerCase()) && tokens.length > skip + 1) {
      const obj = tokens[skip + 1]
      const verbObj = first + ' ' + obj.split('-')[0]
      if (verbObj.length <= limit) return verbObj
      const objPart = obj.split('-')[0]
      if (objPart.length >= 4 && objPart.length <= limit) return objPart
    }
    return first.length > limit ? first.slice(0, limit) : first
  }
}

/* ── Color palette (CSS variables for dark mode support) ── */

const COLORS = {
  bg: 'var(--bg)',
  border: 'var(--border)',
  fill1: 'var(--viz-bg)',
  fill2: 'var(--viz-node)',
  fill3: 'var(--viz-line)',
  accent: 'var(--viz-accent)',
  sage: 'var(--viz-sage)',
  slate: 'var(--viz-slate)',
  text: 'var(--viz-text)',
  textMuted: 'var(--muted)',
}

const PYRAMID_COLORS = [
  'var(--viz-line)',    // top - darkest
  'var(--viz-node)',
  'var(--viz-bg)',
  'var(--surface)',
  'var(--bg)',          // bottom - lightest
]

/* ── Labeled renderers (size >= 200 with labels) ── */

function LabeledFlow({ labels }: { labels: string[] }) {
  const steps = labels.slice(0, 5)
  return (
    <div className={styles.flowContainer}>
      {steps.map((label, i) => (
        <div key={i} className={styles.flowItem}>
          <div className={styles.flowStep}>
            <span className={styles.stepBadge}>{i + 1}</span>
            <span className={styles.stepLabel}>{shortLabel(label)}</span>
          </div>
          {i < steps.length - 1 && <span className={styles.flowArrowDown}>{'\u2193'}</span>}
        </div>
      ))}
    </div>
  )
}

function LabeledCycle({ labels, size }: { labels: string[]; size: number }) {
  const steps = labels.slice(0, 5)
  const n = steps.length
  const r = size * 0.34 // radius for placing nodes
  const cx = size / 2
  const cy = size / 2

  // Calculate positions for each node in a circle
  const positions = steps.map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    }
  })

  // Build curved arrow paths between nodes
  const arrowPaths = positions.map((p, i) => {
    const next = positions[(i + 1) % n]
    const mx = (p.x + next.x) / 2
    const my = (p.y + next.y) / 2
    // Push control point outward from center
    const dx = mx - cx
    const dy = my - cy
    const dist = Math.sqrt(dx * dx + dy * dy) || 1
    const cpx = mx + (dx / dist) * 18
    const cpy = my + (dy / dist) * 18
    return `M${p.x},${p.y} Q${cpx},${cpy} ${next.x},${next.y}`
  })

  return (
    <div className={styles.cycleContainer} style={{ width: size, height: size }}>
      <svg className={styles.cycleSvg} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <marker id="cycle-arrow" markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
            <path d="M0,0.5 L8,3 L0,5.5 Z" fill={COLORS.accent} opacity={0.6} />
          </marker>
        </defs>
        {arrowPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={COLORS.accent}
            strokeWidth={1.5}
            strokeOpacity={0.4}
            markerEnd="url(#cycle-arrow)"
          />
        ))}
      </svg>
      {positions.map((pos, i) => (
        <div
          key={i}
          className={styles.cycleNode}
          style={{ left: pos.x, top: pos.y }}
        >
          <span className={styles.stepBadge}>{i + 1}</span>
          <span className={styles.stepLabel}>{shortLabel(labels[i], isChinese(labels[i]) ? 6 : 10)}</span>
        </div>
      ))}
    </div>
  )
}

function LabeledPyramid({ labels, size }: { labels: string[]; size: number }) {
  const steps = labels.slice(0, 5)
  const totalSteps = steps.length
  // Pyramid: step 0 is the widest (bottom), step N-1 is narrowest (top)
  // But labels[0] is step 1 which goes at the top
  // Reverse so that label[0] is at top (narrowest)
  const maxWidth = Math.min(size * 0.95, 300)
  const minWidth = Math.max(maxWidth * 0.3, 50)

  return (
    <div className={styles.pyramidContainer} style={{ width: size }}>
      {steps.map((label, i) => {
        const fraction = totalSteps > 1 ? i / (totalSteps - 1) : 0
        const width = minWidth + (maxWidth - minWidth) * fraction
        const bgColor = PYRAMID_COLORS[i] ?? PYRAMID_COLORS[PYRAMID_COLORS.length - 1]
        return (
          <div
            key={i}
            className={styles.pyramidBar}
            style={{ width, background: bgColor }}
          >
            <span className={styles.stepBadge}>{i + 1}</span>
            <span className={styles.pyramidLabel}>{shortLabel(label)}</span>
          </div>
        )
      })}
    </div>
  )
}

function LabeledMatrix({ labels }: { labels: string[] }) {
  const steps = labels.slice(0, 6)
  return (
    <div className={styles.gridContainer}>
      {steps.map((label, i) => {
        const isEven = i % 2 === 0
        return (
          <div
            key={i}
            className={`${styles.gridCell} ${isEven ? styles.gridCellEven : styles.gridCellOdd}`}
          >
            <span className={styles.stepBadge}>{i + 1}</span>
            <span className={styles.gridLabel}>{shortLabel(label)}</span>
          </div>
        )
      })}
    </div>
  )
}

function LabeledVenn({ labels, size }: { labels: string[]; size: number }) {
  const vbW = 360
  const vbH = 240
  const cr = 75
  const lx = vbW / 2 - 45
  const rx = vbW / 2 + 45
  const cy = vbH / 2

  return (
    <div className={styles.vennContainer} style={{ width: size, height: size * 0.67 }}>
      <svg className={styles.vennSvg} viewBox={`0 0 ${vbW} ${vbH}`}>
        <defs>
          <radialGradient id="venn-left" cx="40%" cy="40%">
            <stop offset="0%" stopColor={COLORS.slate} stopOpacity="0.3" />
            <stop offset="100%" stopColor={COLORS.slate} stopOpacity="0.15" />
          </radialGradient>
          <radialGradient id="venn-right" cx="60%" cy="40%">
            <stop offset="0%" stopColor={COLORS.sage} stopOpacity="0.3" />
            <stop offset="100%" stopColor={COLORS.sage} stopOpacity="0.15" />
          </radialGradient>
        </defs>
        {/* Circles */}
        <circle cx={lx} cy={cy} r={cr} fill="url(#venn-left)" stroke={COLORS.slate} strokeWidth={1.2} strokeOpacity={0.5} />
        <circle cx={rx} cy={cy} r={cr} fill="url(#venn-right)" stroke={COLORS.sage} strokeWidth={1.2} strokeOpacity={0.5} />
        {/* Labels outside */}
        {labels[0] && (
          <text x={lx - cr + 10} y={25} textAnchor="start" fontSize={11} fill={COLORS.text} fontFamily="system-ui, sans-serif">
            {shortLabel(labels[0], isChinese(labels[0]) ? 8 : 16)}
          </text>
        )}
        {labels[1] && (
          <text x={rx + cr - 10} y={25} textAnchor="end" fontSize={11} fill={COLORS.text} fontFamily="system-ui, sans-serif">
            {shortLabel(labels[1], isChinese(labels[1]) ? 8 : 16)}
          </text>
        )}
        {labels[2] && (
          <text x={vbW / 2} y={cy + 4} textAnchor="middle" fontSize={11} fontWeight="600" fill={COLORS.text} fontFamily="system-ui, sans-serif">
            {shortLabel(labels[2], isChinese(labels[2]) ? 8 : 14)}
          </text>
        )}
      </svg>
    </div>
  )
}

function LabeledRadar({ labels, size }: { labels: string[]; size: number }) {
  const steps = labels.slice(0, 5)
  const dataRadii = [70, 85, 60, 90, 75]
  const data = steps.map((label, i) => ({
    subject: shortLabel(label, isChinese(label) ? 6 : 10),
    value: dataRadii[i] ?? 70,
    fullMark: 100,
  }))

  return (
    <div className={styles.radarContainer} style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke={COLORS.border} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: COLORS.text, fontSize: 10, fontFamily: 'system-ui, sans-serif' }}
          />
          <Radar
            dataKey="value"
            stroke={COLORS.slate}
            fill={COLORS.slate}
            fillOpacity={0.25}
            strokeWidth={1.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

function LabeledTree({ labels }: { labels: string[] }) {
  const n = Math.min(labels.length, 5)
  // Dynamic tree: root + children + optional leaves
  // 3 labels: root → 2 children
  // 4 labels: root → child → 2 leaves, root → child
  // 5 labels: root → 2 children → 2 leaves
  const root = labels[0]
  const children = labels.slice(1, n <= 3 ? n : 3)
  const leaves = n > 3 ? labels.slice(3, n) : []

  return (
    <div className={styles.treeContainer}>
      {/* Root */}
      <div className={styles.treeLevel}>
        <div className={`${styles.treeNode} ${styles.treeNodeRoot}`}>
          <span className={styles.stepBadge}>1</span>
          <span className={styles.treeNodeLabel}>{shortLabel(root)}</span>
        </div>
      </div>
      {/* Connector lines root -> children */}
      <svg className={styles.treeSvgLines} viewBox="0 0 200 24" preserveAspectRatio="none">
        {children.length === 1 && <line x1="100" y1="0" x2="100" y2="24" stroke={COLORS.fill3} strokeWidth="1.5" />}
        {children.length >= 2 && <>
          <line x1="100" y1="0" x2="60" y2="24" stroke={COLORS.fill3} strokeWidth="1.5" />
          <line x1="100" y1="0" x2="140" y2="24" stroke={COLORS.fill3} strokeWidth="1.5" />
        </>}
      </svg>
      {/* Children */}
      <div className={styles.treeLevel}>
        {children.map((label, i) => (
          <div key={i} className={styles.treeNode}>
            <span className={styles.stepBadge}>{i + 2}</span>
            <span className={styles.treeNodeLabel}>{shortLabel(label)}</span>
          </div>
        ))}
      </div>
      {/* Leaves (if any) */}
      {leaves.length > 0 && <>
        <svg className={styles.treeSvgLines} viewBox="0 0 200 24" preserveAspectRatio="none">
          {leaves.length === 1 && <line x1="60" y1="0" x2="100" y2="24" stroke={COLORS.fill3} strokeWidth="1.5" />}
          {leaves.length >= 2 && <>
            <line x1="60" y1="0" x2="60" y2="24" stroke={COLORS.fill3} strokeWidth="1.5" />
            <line x1="140" y1="0" x2="140" y2="24" stroke={COLORS.fill3} strokeWidth="1.5" />
          </>}
        </svg>
        <div className={styles.treeLevel}>
          {leaves.map((label, i) => (
            <div key={i} className={styles.treeNode}>
              <span className={styles.stepBadge}>{children.length + i + 2}</span>
              <span className={styles.treeNodeLabel}>{shortLabel(label)}</span>
            </div>
          ))}
        </div>
      </>}
    </div>
  )
}

function LabeledTimeline({ labels, size }: { labels: string[]; size: number }) {
  const steps = labels.slice(0, 5)
  // Compute even spacing percentages
  const n = steps.length
  const leftPad = 10 // percent
  const rightPad = 10 // percent
  const usable = 100 - leftPad - rightPad

  return (
    <div className={styles.timelineContainer} style={{ width: size, height: size * 0.45, minHeight: 100 }}>
      <div className={styles.timelineLine} />
      <div className={styles.timelinePoints}>
        {steps.map((label, i) => {
          const above = i % 2 === 0
          const pct = n > 1 ? leftPad + usable * (i / (n - 1)) : 50
          return (
            <div
              key={i}
              className={`${styles.timelinePoint} ${above ? styles.timelinePointAbove : ''}`}
              style={{ left: `${pct}%`, position: 'absolute', transform: 'translateX(-50%)' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span className={styles.stepBadge}>{i + 1}</span>
                <span className={styles.timelineLabel}>{shortLabel(label, isChinese(label) ? 6 : 10)}</span>
              </div>
              <div className={styles.timelineDot} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Generic (small / decorative) SVG renderers ── */

const PALETTE = {
  border: 'var(--border)',
  borderLight: 'var(--surface)',
  warmGray1: 'var(--bg)',
  warmGray2: 'var(--viz-bg)',
  warmGray3: 'var(--viz-node)',
  warmGray4: 'var(--viz-line)',
  warmGray5: 'var(--viz-accent)',
  warmWhite: 'var(--bg)',
  accent1: 'var(--viz-text)',
  accent3: 'var(--viz-slate)',
}

function GenericFlow() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx={20} cy={50} r={10} fill={PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.6} />
      <line x1={32} y1={50} x2={38} y2={50} stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} />
      <circle cx={50} cy={50} r={10} fill={PALETTE.warmGray3} stroke={PALETTE.border} strokeWidth={0.6} />
      <line x1={62} y1={50} x2={68} y2={50} stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} />
      <circle cx={80} cy={50} r={10} fill={PALETTE.warmGray4} stroke={PALETTE.border} strokeWidth={0.6} />
    </svg>
  )
}

function GenericCycle() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx={50} cy={54} r={34} fill="none" stroke={PALETTE.borderLight} strokeWidth={0.6} strokeDasharray="2 4" />
      <circle cx={50} cy={22} r={9} fill={PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.6} />
      <circle cx={26} cy={72} r={9} fill={PALETTE.warmGray3} stroke={PALETTE.border} strokeWidth={0.6} />
      <circle cx={74} cy={72} r={9} fill={PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.6} />
      <path d="M58,28 Q78,42 76,60" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} />
      <path d="M65,76 Q50,90 35,76" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} />
      <path d="M24,60 Q22,42 42,28" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} />
    </svg>
  )
}

function GenericPyramid() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,18 38,42 62,42" fill={PALETTE.warmGray4} stroke={PALETTE.border} strokeWidth={0.6} />
      <polygon points="38,44 26,68 74,68 62,44" fill={PALETTE.warmGray3} stroke={PALETTE.border} strokeWidth={0.6} />
      <polygon points="26,70 14,92 86,92 74,70" fill={PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.6} />
    </svg>
  )
}

function GenericMatrix() {
  const positions = [
    [25, 25], [50, 25], [75, 25],
    [25, 50], [50, 50], [75, 50],
    [25, 75], [50, 75], [75, 75],
  ]
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <line x1={50} y1={12} x2={50} y2={88} stroke={PALETTE.borderLight} strokeWidth={0.5} strokeDasharray="2 4" />
      <line x1={12} y1={50} x2={88} y2={50} stroke={PALETTE.borderLight} strokeWidth={0.5} strokeDasharray="2 4" />
      {positions.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={8} fill={i === 4 ? PALETTE.warmGray4 : PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.5} />
      ))}
    </svg>
  )
}

function GenericVenn() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx={38} cy={50} r={26} fill={PALETTE.accent3} fillOpacity={0.2} stroke={PALETTE.accent3} strokeWidth={1} strokeOpacity={0.4} />
      <circle cx={62} cy={50} r={26} fill="#8baa8b" fillOpacity={0.2} stroke="#8baa8b" strokeWidth={1} strokeOpacity={0.4} />
    </svg>
  )
}

function GenericRadar() {
  const hexPoints = [
    [50, 14], [80, 32], [80, 68], [50, 86], [20, 68], [20, 32],
  ]
  const hexStr = hexPoints.map(([x, y]) => `${x},${y}`).join(' ')
  const innerHex = hexPoints.map(([x, y]) => `${50 + (x! - 50) * 0.5},${50 + (y! - 50) * 0.5}`).join(' ')
  const dataStr = '50,26 70,38 72,62 50,72 30,58 28,36'

  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points={innerHex} fill="none" stroke={PALETTE.borderLight} strokeWidth={0.6} strokeDasharray="2 3" />
      <polygon points={hexStr} fill="none" stroke={PALETTE.warmGray3} strokeWidth={1.2} />
      {hexPoints.map(([x, y], i) => (
        <line key={i} x1={50} y1={50} x2={x} y2={y} stroke={PALETTE.borderLight} strokeWidth={0.6} />
      ))}
      <polygon points={dataStr} fill={PALETTE.accent3} fillOpacity={0.2} stroke={PALETTE.accent3} strokeWidth={1.2} strokeOpacity={0.5} />
    </svg>
  )
}

function GenericTree() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <path d="M50,29 C50,38 30,38 30,48" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.5} />
      <path d="M50,29 C50,38 70,38 70,48" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.5} />
      <path d="M30,54 C30,63 18,63 18,74" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.2} />
      <path d="M30,54 C30,63 42,63 42,74" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.2} />
      <circle cx={50} cy={22} r={7} fill={PALETTE.warmGray4} stroke={PALETTE.border} strokeWidth={0.6} />
      <circle cx={30} cy={48} r={6} fill={PALETTE.warmGray3} stroke={PALETTE.border} strokeWidth={0.5} />
      <circle cx={70} cy={48} r={6} fill={PALETTE.warmGray3} stroke={PALETTE.border} strokeWidth={0.5} />
      <circle cx={18} cy={74} r={5} fill={PALETTE.warmGray1} stroke={PALETTE.border} strokeWidth={0.5} />
      <circle cx={42} cy={74} r={5} fill={PALETTE.warmGray1} stroke={PALETTE.border} strokeWidth={0.5} />
    </svg>
  )
}

function GenericTimeline() {
  const xPositions = [18, 39, 61, 82]
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <line x1={10} y1={50} x2={90} y2={50} stroke={PALETTE.warmGray3} strokeWidth={2} strokeLinecap="round" />
      {xPositions.map((x, i) => (
        <circle key={i} cx={x} cy={50} r={5} fill={PALETTE.warmGray3} stroke={PALETTE.border} strokeWidth={0.5} />
      ))}
    </svg>
  )
}

/* ── New chart types: Concentric, Quadrant, Sankey, HexGrid ── */

function LabeledConcentric({ labels, size }: { labels: string[]; size: number }) {
  const steps = labels.slice(0, 5)
  const cx = size / 2, cy = size / 2
  const maxR = size * 0.42
  const n = steps.length
  return (
    <div className={styles.concentricContainer} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
        {steps.map((label, i) => {
          const r = maxR - (maxR * 0.65 * i / (n - 1 || 1))
          const opacity = 0.12 + 0.06 * i
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill={COLORS.accent} fillOpacity={opacity} stroke={COLORS.fill3} strokeWidth={1} />
              <text x={cx} y={cy - r + 14} textAnchor="middle" fontSize={9} fill={COLORS.text} fontFamily="system-ui, sans-serif">
                {shortLabel(label, isChinese(label) ? 6 : 10)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function LabeledQuadrant({ labels, size }: { labels: string[]; size: number }) {
  const items = labels.slice(0, 4)
  const pad = 8
  const half = size / 2
  const positions = [
    { x: pad, y: pad, w: half - pad * 1.5, h: half - pad * 1.5 },
    { x: half + pad * 0.5, y: pad, w: half - pad * 1.5, h: half - pad * 1.5 },
    { x: pad, y: half + pad * 0.5, w: half - pad * 1.5, h: half - pad * 1.5 },
    { x: half + pad * 0.5, y: half + pad * 0.5, w: half - pad * 1.5, h: half - pad * 1.5 },
  ]
  const fills = [COLORS.fill1, COLORS.fill2, COLORS.fill2, COLORS.fill3]
  return (
    <div className={styles.quadrantContainer} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
        <line x1={half} y1={4} x2={half} y2={size - 4} stroke={COLORS.border} strokeWidth={1} />
        <line x1={4} y1={half} x2={size - 4} y2={half} stroke={COLORS.border} strokeWidth={1} />
        {items.map((label, i) => {
          const p = positions[i]
          return (
            <g key={i}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={6} fill={fills[i]} fillOpacity={0.6} />
              <text x={p.x + p.w / 2} y={p.y + p.h / 2 + 4} textAnchor="middle" fontSize={10} fill={COLORS.text} fontFamily="system-ui, sans-serif">
                {shortLabel(label, isChinese(label) ? 6 : 10)}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function LabeledSankey({ labels }: { labels: string[] }) {
  const steps = labels.slice(0, 5)
  return (
    <div className={styles.sankeyContainer}>
      {steps.map((label, i) => (
        <div key={i} className={styles.sankeyRow}>
          <div className={styles.sankeyBar} style={{ width: `${90 - i * 8}%`, opacity: 0.85 - i * 0.1 }}>
            <span className={styles.stepBadge}>{i + 1}</span>
            <span className={styles.sankeyLabel}>{shortLabel(label, isChinese(label) ? 8 : 14)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function LabeledHexGrid({ labels }: { labels: string[] }) {
  const steps = labels.slice(0, 6)
  return (
    <div className={styles.hexContainer}>
      {steps.map((label, i) => (
        <div key={i} className={styles.hexCell}>
          <span className={styles.stepBadge}>{i + 1}</span>
          <span className={styles.hexLabel}>{shortLabel(label, isChinese(label) ? 4 : 8)}</span>
        </div>
      ))}
    </div>
  )
}

function GenericConcentric() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <circle cx={50} cy={50} r={40} fill={PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.6} />
      <circle cx={50} cy={50} r={28} fill={PALETTE.warmGray3} stroke={PALETTE.border} strokeWidth={0.6} />
      <circle cx={50} cy={50} r={16} fill={PALETTE.warmGray4} stroke={PALETTE.border} strokeWidth={0.6} />
      <circle cx={50} cy={50} r={6} fill={PALETTE.warmGray5} stroke={PALETTE.border} strokeWidth={0.6} />
    </svg>
  )
}

function GenericQuadrant() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <line x1={50} y1={10} x2={50} y2={90} stroke={PALETTE.warmGray3} strokeWidth={1.5} />
      <line x1={10} y1={50} x2={90} y2={50} stroke={PALETTE.warmGray3} strokeWidth={1.5} />
      <rect x={14} y={14} width={32} height={32} rx={4} fill={PALETTE.warmGray2} />
      <rect x={54} y={14} width={32} height={32} rx={4} fill={PALETTE.warmGray3} />
      <rect x={14} y={54} width={32} height={32} rx={4} fill={PALETTE.warmGray3} />
      <rect x={54} y={54} width={32} height={32} rx={4} fill={PALETTE.warmGray4} />
    </svg>
  )
}

function GenericSankey() {
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      <rect x={10} y={15} width={80} height={12} rx={3} fill={PALETTE.warmGray2} />
      <rect x={10} y={33} width={65} height={12} rx={3} fill={PALETTE.warmGray3} />
      <rect x={10} y={51} width={50} height={12} rx={3} fill={PALETTE.warmGray3} />
      <rect x={10} y={69} width={35} height={12} rx={3} fill={PALETTE.warmGray4} />
    </svg>
  )
}

function GenericHexGrid() {
  const hexR = 14
  const positions = [[30,28],[58,28],[44,50],[72,50],[30,72],[58,72]]
  return (
    <svg className={styles.genericSvg} viewBox="0 0 100 100" width="100%" height="100%">
      {positions.map(([cx,cy], i) => {
        const pts = Array.from({length:6}, (_,j) => {
          const a = Math.PI/3*j - Math.PI/6
          return `${cx+hexR*Math.cos(a)},${cy+hexR*Math.sin(a)}`
        }).join(' ')
        return <polygon key={i} points={pts} fill={i===2?PALETTE.warmGray4:PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.6} />
      })}
    </svg>
  )
}

const genericRenderers: Record<VizType, () => React.JSX.Element> = {
  flow: GenericFlow,
  cycle: GenericCycle,
  pyramid: GenericPyramid,
  matrix: GenericMatrix,
  venn: GenericVenn,
  radar: GenericRadar,
  tree: GenericTree,
  timeline: GenericTimeline,
  concentric: GenericConcentric,
  quadrant: GenericQuadrant,
  sankey: GenericSankey,
  hexgrid: GenericHexGrid,
}

/* ── Main Component ── */

export default function FrameworkViz({
  type,
  size = 100,
  animate = false,
  className,
  labels,
}: FrameworkVizProps) {
  const classes = [
    styles.viz,
    animate ? styles.animate : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  const useLabeled = labels && labels.length > 0 && size >= 200

  if (useLabeled) {
    return (
      <div
        className={classes}
        style={{ width: size, height: size }}
        role="img"
        aria-label={`${type} visualization`}
      >
        {type === 'flow' && <LabeledFlow labels={labels} />}
        {type === 'cycle' && <LabeledCycle labels={labels} size={size} />}
        {type === 'pyramid' && <LabeledPyramid labels={labels} size={size} />}
        {type === 'matrix' && <LabeledMatrix labels={labels} />}
        {type === 'venn' && <LabeledVenn labels={labels} size={size} />}
        {type === 'radar' && <LabeledRadar labels={labels} size={size} />}
        {type === 'tree' && <LabeledTree labels={labels} />}
        {type === 'timeline' && <LabeledTimeline labels={labels} size={size} />}
        {type === 'concentric' && <LabeledConcentric labels={labels} size={size} />}
        {type === 'quadrant' && <LabeledQuadrant labels={labels} size={size} />}
        {type === 'sankey' && <LabeledSankey labels={labels} />}
        {type === 'hexgrid' && <LabeledHexGrid labels={labels} />}
      </div>
    )
  }

  // Small / decorative version — simple SVG, no labels
  const GenericRenderer = genericRenderers[type]
  return (
    <svg
      className={classes}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${type} visualization`}
    >
      <GenericRenderer />
    </svg>
  )
}
