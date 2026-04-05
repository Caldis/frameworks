import type { VizType } from '../types'
import styles from './FrameworkViz.module.css'

interface FrameworkVizProps {
  type: VizType
  size?: number
  animate?: boolean
  className?: string
  labels?: string[]
}

function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen - 1) + '\u2026' : text
}

/* ── Shared SVG defs for polished visuals ── */

const PALETTE = {
  bg: '#faf9f6',
  border: '#e8e6e1',
  borderLight: '#f0eeea',
  text: '#4a4640',
  textLight: '#7a756d',
  accent1: '#8b7e6a',    // warm brown
  accent2: '#7a8b6a',    // sage green
  accent3: '#6a7a8b',    // slate blue
  accent4: '#8b6a7a',    // dusty rose
  accent5: '#6a8b8b',    // teal
  warmWhite: '#faf9f6',
  warmGray1: '#f5f3ef',
  warmGray2: '#ede9e3',
  warmGray3: '#e2ddd5',
  warmGray4: '#d5cfc5',
  warmGray5: '#c5bfb3',
}

function SharedDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-shadow`} x="-8%" y="-8%" width="120%" height="130%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#4a4640" floodOpacity="0.08" />
      </filter>
      <linearGradient id={`${id}-grad1`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={PALETTE.warmGray1} />
        <stop offset="100%" stopColor={PALETTE.warmGray3} />
      </linearGradient>
      <linearGradient id={`${id}-grad2`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8e0d4" />
        <stop offset="100%" stopColor="#d5cbbf" />
      </linearGradient>
      <linearGradient id={`${id}-grad3`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#dce4ed" />
        <stop offset="100%" stopColor="#b8c8d8" />
      </linearGradient>
      <linearGradient id={`${id}-grad4`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#dce8dc" />
        <stop offset="100%" stopColor="#b8ccb8" />
      </linearGradient>
      <linearGradient id={`${id}-accentGrad`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={PALETTE.accent1} stopOpacity="0.15" />
        <stop offset="100%" stopColor={PALETTE.accent1} stopOpacity="0.3" />
      </linearGradient>
      <marker id={`${id}-arrow`} markerWidth={8} markerHeight={6} refX={7} refY={3} orient="auto">
        <path d="M0,0.5 Q1,3 0,5.5 L8,3 Z" fill={PALETTE.accent1} opacity={0.7} />
      </marker>
      <marker id={`${id}-arrowSm`} markerWidth={6} markerHeight={5} refX={5} refY={2.5} orient="auto">
        <path d="M0,0.4 Q0.8,2.5 0,4.6 L6,2.5 Z" fill={PALETTE.accent1} opacity={0.6} />
      </marker>
    </defs>
  )
}

const TEXT_STYLE = {
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  letterSpacing: '0.02em',
}

/* ── Labeled (data-driven) renderers ── */

function LabeledFlowSvg({ labels }: { labels: string[] }) {
  const nodeCount = 5
  const vbW = 400, vbH = 120
  const pillW = 64, pillH = 34, pillR = 17
  const startX = 22, gap = (vbW - 2 * startX - pillW) / (nodeCount - 1)
  const cy = vbH / 2 + 6
  const stepNums = ['\u2460', '\u2461', '\u2462', '\u2463', '\u2464']

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="lflow" />
      <defs>
        {Array.from({ length: nodeCount }).map((_, i) => {
          const t = i / (nodeCount - 1)
          const topColor = `rgb(${245 - t * 20}, ${241 - t * 18}, ${235 - t * 16})`
          const bottomColor = `rgb(${230 - t * 25}, ${224 - t * 22}, ${215 - t * 20})`
          return (
            <linearGradient key={i} id={`lflow-pill-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={topColor} />
              <stop offset="100%" stopColor={bottomColor} />
            </linearGradient>
          )
        })}
      </defs>
      {Array.from({ length: nodeCount }).map((_, i) => {
        const x = startX + i * gap
        const label = truncate(labels[i] ?? '', 12)
        return (
          <g key={i} className={styles.vizElement}>
            {/* Step number circle */}
            <circle cx={x + pillW / 2} cy={cy - pillH / 2 - 12} r={8} fill={PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.5} />
            <text x={x + pillW / 2} y={cy - pillH / 2 - 8} textAnchor="middle" fontSize={9} fill={PALETTE.textLight} {...TEXT_STYLE}>{stepNums[i]}</text>
            {/* Pill shape */}
            <rect
              x={x} y={cy - pillH / 2} width={pillW} height={pillH} rx={pillR}
              fill={`url(#lflow-pill-${i})`} stroke={PALETTE.border} strokeWidth={0.8}
              filter="url(#lflow-shadow)"
            />
            <text x={x + pillW / 2} y={cy + 4} textAnchor="middle" fontSize={10} fill={PALETTE.text} {...TEXT_STYLE}>{label}</text>
            {/* Curved connector arrow */}
            {i < nodeCount - 1 && (
              <path
                d={`M${x + pillW + 3},${cy} Q${x + pillW + (gap - pillW) / 2},${cy - 8} ${x + gap - 3},${cy}`}
                fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5}
                markerEnd="url(#lflow-arrow)"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

function LabeledCycleSvg({ labels }: { labels: string[] }) {
  const vbS = 300, ctr = 150, r = 100, nr = 32
  const pts = Array.from({ length: 5 }).map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / 5
    return { x: ctr + r * Math.cos(angle), y: ctr + r * Math.sin(angle) }
  })

  return (
    <svg viewBox={`0 0 ${vbS} ${vbS}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="lcycle" />
      <defs>
        {Array.from({ length: 5 }).map((_, i) => {
          const colors = [
            ['#eae4dc', '#d8cfc3'], ['#dce4dc', '#c8d4c4'], ['#dcdce8', '#c4c4d4'],
            ['#e8dce0', '#d4c4cc'], ['#dce8e8', '#c4d4d4'],
          ]
          return (
            <linearGradient key={i} id={`lcycle-node-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[i][0]} />
              <stop offset="100%" stopColor={colors[i][1]} />
            </linearGradient>
          )
        })}
      </defs>
      {/* Subtle dashed circle guideline */}
      <circle className={styles.vizElement} cx={ctr} cy={ctr} r={r} fill="none" stroke={PALETTE.borderLight} strokeWidth={1} strokeDasharray="4 6" />
      {/* Curved arrows */}
      {pts.map((p, i) => {
        const next = pts[(i + 1) % 5]
        const dx = next.x - p.x, dy = next.y - p.y
        const len = Math.sqrt(dx * dx + dy * dy)
        const nx = -dy / len, ny = dx / len
        const mx = (p.x + next.x) / 2, my = (p.y + next.y) / 2
        const cpx = mx + nx * 28, cpy = my + ny * 28
        const sFrac = (nr + 4) / len, eFrac = 1 - (nr + 6) / len
        const sx = p.x + dx * sFrac, sy = p.y + dy * sFrac
        const ex = p.x + dx * eFrac, ey = p.y + dy * eFrac
        return (
          <path
            key={`arrow-${i}`}
            className={styles.vizElement}
            d={`M${sx},${sy} Q${cpx},${cpy} ${ex},${ey}`}
            fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5}
            markerEnd="url(#lcycle-arrow)"
          />
        )
      })}
      {/* Nodes */}
      {pts.map((p, i) => {
        const label = labels[i] ?? ''
        const line1 = truncate(label, 12)
        const line2 = label.length > 12 ? truncate(label.slice(12).trim(), 12) : ''
        return (
          <g key={i} className={styles.vizElement}>
            <circle cx={p.x} cy={p.y} r={nr} fill={`url(#lcycle-node-${i})`} stroke={PALETTE.border} strokeWidth={0.8} filter="url(#lcycle-shadow)" />
            <text x={p.x} y={line2 ? p.y - 1 : p.y + 4} textAnchor="middle" fontSize={10} fill={PALETTE.text} {...TEXT_STYLE}>{line1}</text>
            {line2 && <text x={p.x} y={p.y + 11} textAnchor="middle" fontSize={9} fill={PALETTE.textLight} {...TEXT_STYLE}>{line2}</text>}
          </g>
        )
      })}
    </svg>
  )
}

function LabeledPyramidSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 260
  const tierCount = 5
  const tierH = (vbH - 20) / tierCount
  const minW = 70, maxW = 310
  const startY = 10

  const tierGradColors = [
    ['#c8bfb0', '#b8ad9c'], // top - darkest
    ['#d5cbbf', '#c8bfb0'],
    ['#e0d8cc', '#d5cbbf'],
    ['#ebe5da', '#e0d8cc'],
    ['#f5f1eb', '#ebe5da'], // bottom - lightest
  ]

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="lpyr" />
      <defs>
        {tierGradColors.map((colors, i) => (
          <linearGradient key={i} id={`lpyr-tier-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        ))}
      </defs>
      {Array.from({ length: tierCount }).map((_, i) => {
        const stepIdx = tierCount - 1 - i
        const wTop = minW + (maxW - minW) * (i / (tierCount - 1))
        const wBot = i < tierCount - 1 ? minW + (maxW - minW) * ((i + 1) / (tierCount - 1)) : wTop
        const actualWTop = i === 0 ? wTop * 0.7 : wTop
        const xTop = (vbW - actualWTop) / 2
        const xBot = (vbW - wBot) / 2
        const y = startY + i * tierH
        const gap = 2
        const label = truncate(labels[stepIdx] ?? '', 30)
        // Trapezoid points
        const pts = `${xTop},${y + gap} ${xTop + actualWTop},${y + gap} ${xBot + wBot},${y + tierH - gap} ${xBot},${y + tierH - gap}`
        return (
          <g key={i} className={styles.vizElement}>
            <polygon points={pts} fill={`url(#lpyr-tier-${i})`} stroke={PALETTE.border} strokeWidth={0.8} filter="url(#lpyr-shadow)" />
            {/* Step badge */}
            <circle cx={xBot - 12} cy={y + tierH / 2} r={9} fill={PALETTE.warmGray2} stroke={PALETTE.border} strokeWidth={0.5} />
            <text x={xBot - 12} y={y + tierH / 2 + 4} textAnchor="middle" fontSize={9} fill={PALETTE.textLight} fontWeight="500" {...TEXT_STYLE}>{tierCount - i}</text>
            {/* Label */}
            <text x={vbW / 2} y={y + tierH / 2 + 4} textAnchor="middle" fontSize={11} fill={PALETTE.text} {...TEXT_STYLE}>{label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LabeledMatrixSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 260
  const cols = 3, rows = 2
  const cellW = 100, cellH = 90
  const gapX = (vbW - cols * cellW) / (cols + 1)
  const gapY = (vbH - rows * cellH) / (rows + 1)

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="lmat" />
      <defs>
        <linearGradient id="lmat-cell-even" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray2} />
        </linearGradient>
        <linearGradient id="lmat-cell-odd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8f6f2" />
          <stop offset="100%" stopColor={PALETTE.warmGray1} />
        </linearGradient>
      </defs>
      {/* Subtle dashed grid separators */}
      {Array.from({ length: cols - 1 }).map((_, c) => {
        const x = gapX + (c + 1) * (cellW + gapX) - gapX / 2
        return (
          <line key={`vl-${c}`} className={styles.vizElement}
            x1={x} y1={gapY * 0.5} x2={x} y2={vbH - gapY * 0.5}
            stroke={PALETTE.borderLight} strokeWidth={0.8} strokeDasharray="3 5"
          />
        )
      })}
      {Array.from({ length: rows - 1 }).map((_, r) => {
        const y = gapY + (r + 1) * (cellH + gapY) - gapY / 2
        return (
          <line key={`hl-${r}`} className={styles.vizElement}
            x1={gapX * 0.5} y1={y} x2={vbW - gapX * 0.5} y2={y}
            stroke={PALETTE.borderLight} strokeWidth={0.8} strokeDasharray="3 5"
          />
        )
      })}
      {/* Cells */}
      {Array.from({ length: rows * cols }).map((_, i) => {
        const col = i % cols, row = Math.floor(i / cols)
        const x = gapX + col * (cellW + gapX)
        const y = gapY + row * (cellH + gapY)
        const isEven = (row + col) % 2 === 0
        const label = i < labels.length ? truncate(labels[i], 18) : (i === 5 ? '\u2026' : '')
        return (
          <g key={i} className={styles.vizElement}>
            <rect
              x={x} y={y} width={cellW} height={cellH} rx={8}
              fill={isEven ? 'url(#lmat-cell-even)' : 'url(#lmat-cell-odd)'}
              stroke={PALETTE.border} strokeWidth={0.8}
              filter="url(#lmat-shadow)"
            />
            <text x={x + cellW / 2} y={y + cellH / 2 + 4} textAnchor="middle" fontSize={10} fill={PALETTE.text} {...TEXT_STYLE}>{label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LabeledVennSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 240
  const cr = 75
  const lx = vbW / 2 - 45, rx = vbW / 2 + 45, cy = vbH / 2

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="lvenn" />
      <defs>
        <radialGradient id="lvenn-left" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#b8c8d8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8ba4be" stopOpacity="0.25" />
        </radialGradient>
        <radialGradient id="lvenn-right" cx="60%" cy="40%">
          <stop offset="0%" stopColor="#b8ccb8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#8baa8b" stopOpacity="0.25" />
        </radialGradient>
      </defs>
      {/* Circles */}
      <g className={styles.vizElement}>
        <circle cx={lx} cy={cy} r={cr} fill="url(#lvenn-left)" stroke="#8ba4be" strokeWidth={1.2} strokeOpacity={0.5} />
      </g>
      <g className={styles.vizElement}>
        <circle cx={rx} cy={cy} r={cr} fill="url(#lvenn-right)" stroke="#8baa8b" strokeWidth={1.2} strokeOpacity={0.5} />
      </g>
      {/* Labels outside with leader lines */}
      <g className={styles.vizElement}>
        <text x={lx - cr + 5} y={cy - cr - 12} textAnchor="start" fontSize={10} fill={PALETTE.accent3} fontWeight="500" {...TEXT_STYLE}>{truncate(labels[0] ?? '', 18)}</text>
        <line x1={lx - cr + 20} y1={cy - cr - 6} x2={lx - 20} y2={cy - 30} stroke={PALETTE.accent3} strokeWidth={0.8} strokeOpacity={0.4} strokeDasharray="2 3" />
        <circle cx={lx - 20} cy={cy - 30} r={2} fill={PALETTE.accent3} fillOpacity={0.4} />
      </g>
      <g className={styles.vizElement}>
        <text x={rx + cr - 5} y={cy - cr - 12} textAnchor="end" fontSize={10} fill={PALETTE.accent2} fontWeight="500" {...TEXT_STYLE}>{truncate(labels[1] ?? '', 18)}</text>
        <line x1={rx + cr - 20} y1={cy - cr - 6} x2={rx + 20} y2={cy - 30} stroke={PALETTE.accent2} strokeWidth={0.8} strokeOpacity={0.4} strokeDasharray="2 3" />
        <circle cx={rx + 20} cy={cy - 30} r={2} fill={PALETTE.accent2} fillOpacity={0.4} />
      </g>
      {/* Overlap label */}
      <g className={styles.vizElement}>
        <text x={vbW / 2} y={cy + 4} textAnchor="middle" fontSize={10} fontWeight="600" fill={PALETTE.text} {...TEXT_STYLE}>{truncate(labels[2] ?? '', 16)}</text>
      </g>
    </svg>
  )
}

function LabeledRadarSvg({ labels }: { labels: string[] }) {
  const vbS = 300, cx = 150, cy = 150, outerR = 110, labelR = 130
  const n = 5
  const angles = Array.from({ length: n }).map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / n)

  const ringPts = (radius: number) =>
    angles.map(a => `${cx + radius * Math.cos(a)},${cy + radius * Math.sin(a)}`).join(' ')

  const dataRadii = [0.7, 0.85, 0.6, 0.9, 0.75]
  const dataPts = angles.map((a, i) => {
    const rad = outerR * dataRadii[i]
    return { x: cx + rad * Math.cos(a), y: cy + rad * Math.sin(a) }
  })
  const dataStr = dataPts.map(p => `${p.x},${p.y}`).join(' ')

  const vertexPts = angles.map(a => ({
    ox: cx + outerR * Math.cos(a), oy: cy + outerR * Math.sin(a),
    lx: cx + labelR * Math.cos(a), ly: cy + labelR * Math.sin(a),
  }))

  return (
    <svg viewBox={`0 0 ${vbS} ${vbS}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="lradar" />
      <defs>
        <linearGradient id="lradar-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.accent3} stopOpacity="0.3" />
          <stop offset="100%" stopColor={PALETTE.accent3} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {/* Concentric rings */}
      {[0.33, 0.66, 1.0].map((frac, i) => (
        <polygon key={`ring-${i}`} className={styles.vizElement}
          points={ringPts(outerR * frac)}
          fill="none" stroke={PALETTE.borderLight}
          strokeWidth={i === 2 ? 1.2 : 0.7}
          strokeDasharray={i < 2 ? '3 4' : 'none'}
        />
      ))}
      {/* Spokes */}
      {vertexPts.map((p, i) => (
        <line key={`spoke-${i}`} className={styles.vizElement}
          x1={cx} y1={cy} x2={p.ox} y2={p.oy}
          stroke={PALETTE.borderLight} strokeWidth={0.8}
        />
      ))}
      {/* Data polygon */}
      <g className={styles.vizElement}>
        <polygon points={dataStr} fill="url(#lradar-data)" stroke={PALETTE.accent3} strokeWidth={1.5} strokeOpacity={0.6} />
      </g>
      {/* Data points */}
      {dataPts.map((p, i) => (
        <g key={`dp-${i}`} className={styles.vizElement}>
          <circle cx={p.x} cy={p.y} r={3.5} fill={PALETTE.warmWhite} stroke={PALETTE.accent3} strokeWidth={1.2} />
        </g>
      ))}
      {/* Labels */}
      {vertexPts.map((p, i) => {
        const anchor = Math.abs(p.lx - cx) < 5 ? 'middle' : p.lx > cx ? 'start' : 'end'
        const dy = p.ly < cy ? -2 : p.ly > cy + 10 ? 8 : 4
        return (
          <g key={`lbl-${i}`} className={styles.vizElement}>
            <text x={p.lx} y={p.ly + dy} textAnchor={anchor} fontSize={10} fill={PALETTE.text} {...TEXT_STYLE}>{truncate(labels[i] ?? '', 16)}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LabeledTreeSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 280
  const nodes = [
    { x: 180, y: 40, label: labels[0] ?? '', isRoot: true },
    { x: 100, y: 140, label: labels[1] ?? '', isRoot: false },
    { x: 260, y: 140, label: labels[2] ?? '', isRoot: false },
    { x: 60, y: 230, label: labels[3] ?? '', isRoot: false },
    { x: 140, y: 230, label: labels[4] ?? '', isRoot: false },
  ]
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4]]
  const nw = 70, nh = 32, rootNw = 80, rootNh = 36

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="ltree" />
      <defs>
        <linearGradient id="ltree-root" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0dbd2" />
          <stop offset="100%" stopColor="#cec6ba" />
        </linearGradient>
        <linearGradient id="ltree-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray2} />
        </linearGradient>
        <linearGradient id="ltree-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#faf9f6" />
          <stop offset="100%" stopColor={PALETTE.warmGray1} />
        </linearGradient>
      </defs>
      {/* Curved bezier connector lines */}
      {edges.map(([a, b], i) => {
        const pa = nodes[a], pb = nodes[b]
        const aH = pa.isRoot ? rootNh : nh
        const bH = nh
        const sy = pa.y + aH / 2
        const ey = pb.y - bH / 2
        const midY = (sy + ey) / 2
        return (
          <path
            key={`e-${i}`}
            className={styles.vizElement}
            d={`M${pa.x},${sy} C${pa.x},${midY} ${pb.x},${midY} ${pb.x},${ey}`}
            fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.5}
          />
        )
      })}
      {/* Connector dots at branch points */}
      {edges.map(([_a, b], i) => {
        const pb = nodes[b]
        const bH = nh
        return (
          <circle key={`dot-${i}`} className={styles.vizElement}
            cx={pb.x} cy={pb.y - bH / 2} r={2}
            fill={PALETTE.warmGray4}
          />
        )
      })}
      {/* Nodes */}
      {nodes.map((n, i) => {
        const w = n.isRoot ? rootNw : nw
        const h = n.isRoot ? rootNh : nh
        const isLeaf = i >= 3
        const gradId = n.isRoot ? 'ltree-root' : isLeaf ? 'ltree-leaf' : 'ltree-mid'
        return (
          <g key={i} className={styles.vizElement}>
            <rect
              x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx={8}
              fill={`url(#${gradId})`} stroke={PALETTE.border} strokeWidth={0.8}
              filter="url(#ltree-shadow)"
            />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={n.isRoot ? 11 : 10} fill={PALETTE.text} fontWeight={n.isRoot ? '600' : '400'} {...TEXT_STYLE}>
              {truncate(n.label, 14)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function LabeledTimelineSvg({ labels }: { labels: string[] }) {
  const vbW = 420, vbH = 140
  const nodeCount = 5
  const startX = 45, endX = vbW - 45
  const gap = (endX - startX) / (nodeCount - 1)
  const lineY = 70

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <SharedDefs id="ltl" />
      <defs>
        {Array.from({ length: nodeCount }).map((_, i) => {
          const t = i / (nodeCount - 1)
          const topColor = `rgb(${220 - t * 30}, ${215 - t * 28}, ${205 - t * 25})`
          const botColor = `rgb(${200 - t * 30}, ${194 - t * 28}, ${184 - t * 25})`
          return (
            <linearGradient key={i} id={`ltl-dot-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={topColor} />
              <stop offset="100%" stopColor={botColor} />
            </linearGradient>
          )
        })}
      </defs>
      {/* Main horizontal line with rounded caps */}
      <g className={styles.vizElement}>
        <line x1={startX - 15} y1={lineY} x2={endX + 15} y2={lineY} stroke={PALETTE.warmGray3} strokeWidth={2.5} strokeLinecap="round" />
      </g>
      {/* Milestones */}
      {Array.from({ length: nodeCount }).map((_, i) => {
        const x = startX + i * gap
        const above = i % 2 === 0
        const label = truncate(labels[i] ?? '', 18)
        return (
          <g key={i} className={styles.vizElement}>
            {/* Dashed helper line */}
            <line x1={x} y1={above ? lineY - 12 : lineY + 12} x2={x} y2={above ? lineY - 28 : lineY + 28}
              stroke={PALETTE.borderLight} strokeWidth={0.8} strokeDasharray="2 3"
            />
            {/* Step number */}
            <text x={x} y={above ? lineY - 32 : lineY + 50}
              textAnchor="middle" fontSize={9} fill={PALETTE.textLight} fontWeight="500" {...TEXT_STYLE}
            >
              {`${i + 1}`}
            </text>
            {/* Label */}
            <text x={x} y={above ? lineY - 44 : lineY + 38}
              textAnchor="middle" fontSize={10} fill={PALETTE.text} {...TEXT_STYLE}
            >
              {label}
            </text>
            {/* Milestone dot */}
            <circle cx={x} cy={lineY} r={7} fill={`url(#ltl-dot-${i})`} stroke={PALETTE.border} strokeWidth={0.8} filter="url(#ltl-shadow)" />
            {/* Inner dot accent */}
            <circle cx={x} cy={lineY - 1} r={2.5} fill={PALETTE.warmWhite} fillOpacity={0.6} />
          </g>
        )
      })}
    </svg>
  )
}

/* ── Generic (polished) renderers ── */

function MatrixSvg() {
  const positions = [
    [25, 25], [50, 25], [75, 25],
    [25, 50], [50, 50], [75, 50],
    [25, 75], [50, 75], [75, 75],
  ]

  return (
    <>
      <SharedDefs id="gmat" />
      <defs>
        <radialGradient id="gmat-center" cx="50%" cy="40%">
          <stop offset="0%" stopColor={PALETTE.warmGray3} />
          <stop offset="100%" stopColor={PALETTE.warmGray5} />
        </radialGradient>
        <radialGradient id="gmat-mid" cx="50%" cy="40%">
          <stop offset="0%" stopColor={PALETTE.warmGray2} />
          <stop offset="100%" stopColor={PALETTE.warmGray4} />
        </radialGradient>
        <radialGradient id="gmat-outer" cx="50%" cy="40%">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray3} />
        </radialGradient>
      </defs>
      {/* Subtle cross lines */}
      <line className={styles.vizElement} x1={50} y1={12} x2={50} y2={88} stroke={PALETTE.borderLight} strokeWidth={0.5} strokeDasharray="2 4" />
      <line className={styles.vizElement} x1={12} y1={50} x2={88} y2={50} stroke={PALETTE.borderLight} strokeWidth={0.5} strokeDasharray="2 4" />
      {positions.map(([cx, cy], i) => {
        const isCenter = i === 4
        const isMid = [1, 3, 5, 7].includes(i)
        const grad = isCenter ? 'url(#gmat-center)' : isMid ? 'url(#gmat-mid)' : 'url(#gmat-outer)'
        return (
          <circle
            key={i}
            className={styles.vizElement}
            cx={cx}
            cy={cy}
            r={8}
            fill={grad}
            stroke={PALETTE.border}
            strokeWidth={0.5}
            filter="url(#gmat-shadow)"
          />
        )
      })}
    </>
  )
}

function FlowSvg() {
  return (
    <>
      <SharedDefs id="gflow" />
      <defs>
        <linearGradient id="gflow-n1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray3} />
        </linearGradient>
        <linearGradient id="gflow-n2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray2} />
          <stop offset="100%" stopColor={PALETTE.warmGray4} />
        </linearGradient>
        <linearGradient id="gflow-n3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray3} />
          <stop offset="100%" stopColor={PALETTE.warmGray5} />
        </linearGradient>
      </defs>
      <circle className={styles.vizElement} cx={20} cy={50} r={10} fill="url(#gflow-n1)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gflow-shadow)" />
      <path className={styles.vizElement} d="M32,50 Q37.5,44 43,50" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} markerEnd="url(#gflow-arrowSm)" />
      <circle className={styles.vizElement} cx={50} cy={50} r={10} fill="url(#gflow-n2)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gflow-shadow)" />
      <path className={styles.vizElement} d="M62,50 Q67.5,44 73,50" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} markerEnd="url(#gflow-arrowSm)" />
      <circle className={styles.vizElement} cx={80} cy={50} r={10} fill="url(#gflow-n3)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gflow-shadow)" />
    </>
  )
}

function PyramidSvg() {
  return (
    <>
      <SharedDefs id="gpyr" />
      <defs>
        <linearGradient id="gpyr-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray4} />
          <stop offset="100%" stopColor={PALETTE.warmGray5} />
        </linearGradient>
        <linearGradient id="gpyr-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray2} />
          <stop offset="100%" stopColor={PALETTE.warmGray4} />
        </linearGradient>
        <linearGradient id="gpyr-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray2} />
        </linearGradient>
      </defs>
      <polygon className={styles.vizElement} points="50,18 38,42 62,42" fill="url(#gpyr-top)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gpyr-shadow)" />
      <polygon className={styles.vizElement} points="38,44 26,68 74,68 62,44" fill="url(#gpyr-mid)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gpyr-shadow)" />
      <polygon className={styles.vizElement} points="26,70 14,92 86,92 74,70" fill="url(#gpyr-bot)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gpyr-shadow)" />
    </>
  )
}

function CycleSvg() {
  const cx1 = 50, cy1 = 22
  const cx2 = 26, cy2 = 72
  const cx3 = 74, cy3 = 72

  return (
    <>
      <SharedDefs id="gcycle" />
      <defs>
        <radialGradient id="gcycle-n1" cx="50%" cy="40%">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray3} />
        </radialGradient>
        <radialGradient id="gcycle-n2" cx="50%" cy="40%">
          <stop offset="0%" stopColor={PALETTE.warmGray2} />
          <stop offset="100%" stopColor={PALETTE.warmGray4} />
        </radialGradient>
        <radialGradient id="gcycle-n3" cx="50%" cy="40%">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray3} />
        </radialGradient>
      </defs>
      {/* Subtle circular guideline */}
      <circle className={styles.vizElement} cx={50} cy={54} r={34} fill="none" stroke={PALETTE.borderLight} strokeWidth={0.6} strokeDasharray="2 4" />
      {/* Nodes */}
      <circle className={styles.vizElement} cx={cx1} cy={cy1} r={9} fill="url(#gcycle-n1)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gcycle-shadow)" />
      <circle className={styles.vizElement} cx={cx2} cy={cy2} r={9} fill="url(#gcycle-n2)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gcycle-shadow)" />
      <circle className={styles.vizElement} cx={cx3} cy={cy3} r={9} fill="url(#gcycle-n3)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gcycle-shadow)" />
      {/* Curved arrows */}
      <path className={styles.vizElement} d="M58,28 Q78,42 76,60" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} markerEnd="url(#gcycle-arrowSm)" />
      <path className={styles.vizElement} d="M65,76 Q50,90 35,76" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} markerEnd="url(#gcycle-arrowSm)" />
      <path className={styles.vizElement} d="M24,60 Q22,42 42,28" fill="none" stroke={PALETTE.accent1} strokeWidth={1.5} strokeOpacity={0.5} markerEnd="url(#gcycle-arrowSm)" />
    </>
  )
}

function VennSvg() {
  return (
    <>
      <SharedDefs id="gvenn" />
      <defs>
        <radialGradient id="gvenn-left" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#b8c8d8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8ba4be" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="gvenn-right" cx="60%" cy="40%">
          <stop offset="0%" stopColor="#b8ccb8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8baa8b" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <circle className={styles.vizElement} cx={38} cy={50} r={26} fill="url(#gvenn-left)" stroke="#8ba4be" strokeWidth={1} strokeOpacity={0.5} />
      <circle className={styles.vizElement} cx={62} cy={50} r={26} fill="url(#gvenn-right)" stroke="#8baa8b" strokeWidth={1} strokeOpacity={0.5} />
    </>
  )
}

function RadarSvg() {
  const hexPoints = [
    [50, 14], [80, 32], [80, 68], [50, 86], [20, 68], [20, 32],
  ]
  const hexStr = hexPoints.map(([x, y]) => `${x},${y}`).join(' ')
  const innerHex = hexPoints.map(([x, y]) => `${50 + (x! - 50) * 0.5},${50 + (y! - 50) * 0.5}`).join(' ')

  const dataPoints = [
    [50, 26], [70, 38], [72, 62], [50, 72], [30, 58], [28, 36],
  ]
  const dataStr = dataPoints.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <>
      <SharedDefs id="gradar" />
      <defs>
        <linearGradient id="gradar-data" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.accent3} stopOpacity="0.3" />
          <stop offset="100%" stopColor={PALETTE.accent3} stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* Inner ring */}
      <polygon className={styles.vizElement} points={innerHex} fill="none" stroke={PALETTE.borderLight} strokeWidth={0.6} strokeDasharray="2 3" />
      {/* Outer ring */}
      <polygon className={styles.vizElement} points={hexStr} fill="none" stroke={PALETTE.warmGray3} strokeWidth={1.2} />
      {/* Spokes */}
      {hexPoints.map(([x, y], i) => (
        <line key={i} className={styles.vizElement} x1={50} y1={50} x2={x} y2={y} stroke={PALETTE.borderLight} strokeWidth={0.6} />
      ))}
      {/* Data polygon */}
      <polygon className={styles.vizElement} points={dataStr} fill="url(#gradar-data)" stroke={PALETTE.accent3} strokeWidth={1.2} strokeOpacity={0.5} />
      {/* Data dots */}
      {dataPoints.map(([x, y], i) => (
        <circle key={`dp-${i}`} className={styles.vizElement} cx={x} cy={y} r={2.5} fill={PALETTE.warmWhite} stroke={PALETTE.accent3} strokeWidth={0.8} />
      ))}
    </>
  )
}

function TreeSvg() {
  return (
    <>
      <SharedDefs id="gtree" />
      <defs>
        <linearGradient id="gtree-root" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray3} />
          <stop offset="100%" stopColor={PALETTE.warmGray4} />
        </linearGradient>
        <linearGradient id="gtree-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={PALETTE.warmGray1} />
          <stop offset="100%" stopColor={PALETTE.warmGray3} />
        </linearGradient>
        <linearGradient id="gtree-leaf" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#faf9f6" />
          <stop offset="100%" stopColor={PALETTE.warmGray1} />
        </linearGradient>
      </defs>
      {/* Edges as curves */}
      <path className={styles.vizElement} d="M50,29 C50,38 30,38 30,48" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.5} />
      <path className={styles.vizElement} d="M50,29 C50,38 70,38 70,48" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.5} />
      <path className={styles.vizElement} d="M30,54 C30,63 18,63 18,74" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.2} />
      <path className={styles.vizElement} d="M30,54 C30,63 42,63 42,74" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.2} />
      <path className={styles.vizElement} d="M70,54 C70,63 58,63 58,74" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.2} />
      <path className={styles.vizElement} d="M70,54 C70,63 82,63 82,74" fill="none" stroke={PALETTE.warmGray4} strokeWidth={1.2} />
      {/* Nodes */}
      <circle className={styles.vizElement} cx={50} cy={22} r={7} fill="url(#gtree-root)" stroke={PALETTE.border} strokeWidth={0.6} filter="url(#gtree-shadow)" />
      <circle className={styles.vizElement} cx={30} cy={48} r={6} fill="url(#gtree-mid)" stroke={PALETTE.border} strokeWidth={0.5} filter="url(#gtree-shadow)" />
      <circle className={styles.vizElement} cx={70} cy={48} r={6} fill="url(#gtree-mid)" stroke={PALETTE.border} strokeWidth={0.5} filter="url(#gtree-shadow)" />
      <circle className={styles.vizElement} cx={18} cy={74} r={5} fill="url(#gtree-leaf)" stroke={PALETTE.border} strokeWidth={0.5} />
      <circle className={styles.vizElement} cx={42} cy={74} r={5} fill="url(#gtree-leaf)" stroke={PALETTE.border} strokeWidth={0.5} />
      <circle className={styles.vizElement} cx={58} cy={74} r={5} fill="url(#gtree-leaf)" stroke={PALETTE.border} strokeWidth={0.5} />
      <circle className={styles.vizElement} cx={82} cy={74} r={5} fill="url(#gtree-leaf)" stroke={PALETTE.border} strokeWidth={0.5} />
    </>
  )
}

function TimelineSvg() {
  const xPositions = [18, 39, 61, 82]
  return (
    <>
      <SharedDefs id="gtl" />
      <defs>
        {xPositions.map((_, i) => {
          const t = i / (xPositions.length - 1)
          return (
            <radialGradient key={i} id={`gtl-dot-${i}`} cx="50%" cy="40%">
              <stop offset="0%" stopColor={`rgb(${220 - t * 30}, ${215 - t * 28}, ${205 - t * 25})`} />
              <stop offset="100%" stopColor={`rgb(${195 - t * 30}, ${189 - t * 28}, ${179 - t * 25})`} />
            </radialGradient>
          )
        })}
      </defs>
      {/* Main line */}
      <line className={styles.vizElement} x1={10} y1={50} x2={90} y2={50} stroke={PALETTE.warmGray3} strokeWidth={2} strokeLinecap="round" />
      {/* Tick marks (dashed) */}
      {xPositions.map((x, i) => (
        <line key={`tick-${i}`} className={styles.vizElement} x1={x} y1={42} x2={x} y2={58} stroke={PALETTE.borderLight} strokeWidth={1} strokeDasharray="1.5 2" />
      ))}
      {/* Milestone dots */}
      {xPositions.map((x, i) => (
        <g key={`dot-${i}`}>
          <circle className={styles.vizElement} cx={x} cy={50} r={5} fill={`url(#gtl-dot-${i})`} stroke={PALETTE.border} strokeWidth={0.5} filter="url(#gtl-shadow)" />
          <circle className={styles.vizElement} cx={x} cy={49} r={1.8} fill={PALETTE.warmWhite} fillOpacity={0.5} />
        </g>
      ))}
    </>
  )
}

const vizRenderers: Record<VizType, () => React.JSX.Element> = {
  matrix: MatrixSvg,
  flow: FlowSvg,
  pyramid: PyramidSvg,
  cycle: CycleSvg,
  venn: VennSvg,
  radar: RadarSvg,
  tree: TreeSvg,
  timeline: TimelineSvg,
}

const labeledVizRenderers: Record<VizType, (props: { labels: string[] }) => React.JSX.Element> = {
  matrix: LabeledMatrixSvg,
  flow: LabeledFlowSvg,
  pyramid: LabeledPyramidSvg,
  cycle: LabeledCycleSvg,
  venn: LabeledVennSvg,
  radar: LabeledRadarSvg,
  tree: LabeledTreeSvg,
  timeline: LabeledTimelineSvg,
}

export default function FrameworkViz({
  type,
  size = 100,
  animate = false,
  className,
  labels,
}: FrameworkVizProps) {
  const svgClasses = [
    styles.viz,
    animate ? styles.animate : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const useLabeled = labels && labels.length > 0 && size >= 200

  if (useLabeled) {
    const LabeledRenderer = labeledVizRenderers[type]
    return (
      <div
        className={svgClasses}
        style={{ width: size, height: size }}
        role="img"
        aria-label={`${type} visualization`}
      >
        <LabeledRenderer labels={labels} />
      </div>
    )
  }

  const Renderer = vizRenderers[type]
  return (
    <svg
      className={svgClasses}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${type} visualization`}
    >
      <Renderer />
    </svg>
  )
}
