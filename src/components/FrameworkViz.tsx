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

/* ── Labeled (data-driven) renderers ── */

function LabeledFlowSvg({ labels }: { labels: string[] }) {
  const nodeCount = 5
  const vbW = 400, vbH = 120
  const rw = 60, rh = 40
  const startX = 30, gap = (vbW - 2 * startX - rw) / (nodeCount - 1)
  const cy = vbH / 2

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="lblFlowArrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#999" />
        </marker>
      </defs>
      {Array.from({ length: nodeCount }).map((_, i) => {
        const x = startX + i * gap
        const bg = i % 2 === 0 ? '#f0f0f0' : '#e8e8e8'
        const label = truncate(labels[i] ?? '', 20)
        return (
          <g key={i} className={styles.vizElement}>
            <rect x={x} y={cy - rh / 2} width={rw} height={rh} rx={6} fill={bg} stroke="#ccc" strokeWidth={1} />
            <text x={x + rw / 2} y={cy + 4} textAnchor="middle" fontSize={10} fill="#333">{label}</text>
            {i < nodeCount - 1 && (
              <line
                x1={x + rw + 2} y1={cy}
                x2={x + gap - 2} y2={cy}
                stroke="#999" strokeWidth={2}
                markerEnd="url(#lblFlowArrow)"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

function LabeledCycleSvg({ labels }: { labels: string[] }) {
  const vbS = 300, ctr = 150, r = 100, nr = 35
  // Pentagon vertices (start from top, clockwise)
  const pts = Array.from({ length: 5 }).map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / 5
    return { x: ctr + r * Math.cos(angle), y: ctr + r * Math.sin(angle) }
  })

  return (
    <svg viewBox={`0 0 ${vbS} ${vbS}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="lblCycleArrow" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#999" />
        </marker>
      </defs>
      {pts.map((p, i) => {
        const next = pts[(i + 1) % 5]
        // Control point for curve: offset perpendicular to midpoint
        const mx = (p.x + next.x) / 2
        const my = (p.y + next.y) / 2
        const dx = next.x - p.x, dy = next.y - p.y
        const len = Math.sqrt(dx * dx + dy * dy)
        const nx = -dy / len, ny = dx / len
        const cpx = mx + nx * 30, cpy = my + ny * 30
        // Shorten start/end to not overlap with circles
        const sFrac = nr / len, eFrac = 1 - nr / len
        const sx = p.x + dx * sFrac, sy = p.y + dy * sFrac
        const ex = p.x + dx * eFrac, ey = p.y + dy * eFrac
        return (
          <path
            key={`arrow-${i}`}
            className={styles.vizElement}
            d={`M${sx},${sy} Q${cpx},${cpy} ${ex},${ey}`}
            fill="none" stroke="#999" strokeWidth={2}
            markerEnd="url(#lblCycleArrow)"
          />
        )
      })}
      {pts.map((p, i) => {
        const label = labels[i] ?? ''
        const line1 = truncate(label, 15)
        const line2 = label.length > 15 ? truncate(label.slice(15).trim(), 15) : ''
        return (
          <g key={i} className={styles.vizElement}>
            <circle cx={p.x} cy={p.y} r={nr} fill="#f0f0f0" stroke="#ccc" strokeWidth={1} />
            <text x={p.x} y={line2 ? p.y - 2 : p.y + 3} textAnchor="middle" fontSize={9} fill="#333">{line1}</text>
            {line2 && <text x={p.x} y={p.y + 10} textAnchor="middle" fontSize={9} fill="#333">{line2}</text>}
          </g>
        )
      })}
    </svg>
  )
}

function LabeledPyramidSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 240
  const tierCount = 5
  const tierH = vbH / tierCount
  const minW = 60, maxW = 320
  const colors = ['#f0f0f0', '#e8e8e8', '#e0e0e0', '#d8d8d8', '#d0d0d0']

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: tierCount }).map((_, i) => {
        // i=0 is top (step 5), i=4 is bottom (step 1) -> reversed
        const stepIdx = tierCount - 1 - i
        const w = minW + (maxW - minW) * (i / (tierCount - 1))
        const x = (vbW - w) / 2
        const y = i * tierH
        const label = truncate(labels[stepIdx] ?? '', 30)
        return (
          <g key={i} className={styles.vizElement}>
            <rect x={x} y={y + 2} width={w} height={tierH - 4} rx={4} fill={colors[i]} stroke="#ccc" strokeWidth={1} />
            <text x={vbW / 2} y={y + tierH / 2 + 4} textAnchor="middle" fontSize={10} fill="#333">{label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LabeledMatrixSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 240
  const cols = 3, rows = 2
  const cellW = 100, cellH = 90
  const gapX = (vbW - cols * cellW) / (cols + 1)
  const gapY = (vbH - rows * cellH) / (rows + 1)

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: rows * cols }).map((_, i) => {
        const col = i % cols, row = Math.floor(i / cols)
        const x = gapX + col * (cellW + gapX)
        const y = gapY + row * (cellH + gapY)
        const bg = (row + col) % 2 === 0 ? '#f0f0f0' : '#e8e8e8'
        const label = i < labels.length ? truncate(labels[i], 18) : (i === 5 ? '\u2026' : '')
        return (
          <g key={i} className={styles.vizElement}>
            <rect x={x} y={y} width={cellW} height={cellH} rx={8} fill={bg} stroke="#ccc" strokeWidth={1} />
            <text x={x + cellW / 2} y={y + cellH / 2 + 3} textAnchor="middle" fontSize={9} fill="#333">{label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LabeledVennSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 240
  const cr = 80
  const lx = vbW / 2 - 50, rx = vbW / 2 + 50, cy = vbH / 2

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <g className={styles.vizElement}>
        <circle cx={lx} cy={cy} r={cr} fill="#ccc" fillOpacity={0.4} stroke="#bbb" strokeWidth={1.5} />
      </g>
      <g className={styles.vizElement}>
        <circle cx={rx} cy={cy} r={cr} fill="#999" fillOpacity={0.35} stroke="#999" strokeWidth={1.5} />
      </g>
      <g className={styles.vizElement}>
        <text x={lx - 30} y={cy + 4} textAnchor="middle" fontSize={10} fill="#333">{truncate(labels[0] ?? '', 18)}</text>
      </g>
      <g className={styles.vizElement}>
        <text x={rx + 30} y={cy + 4} textAnchor="middle" fontSize={10} fill="#333">{truncate(labels[1] ?? '', 18)}</text>
      </g>
      <g className={styles.vizElement}>
        <text x={vbW / 2} y={cy + 4} textAnchor="middle" fontSize={9} fontWeight="bold" fill="#444">{truncate(labels[2] ?? '', 16)}</text>
      </g>
    </svg>
  )
}

function LabeledRadarSvg({ labels }: { labels: string[] }) {
  const vbS = 300, cx = 150, cy = 150, outerR = 110, labelR = 130
  const pts = Array.from({ length: 5 }).map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / 5
    return {
      ox: cx + outerR * Math.cos(angle),
      oy: cy + outerR * Math.sin(angle),
      lx: cx + labelR * Math.cos(angle),
      ly: cy + labelR * Math.sin(angle),
    }
  })
  // Irregular inner data polygon
  const dataRadii = [0.7, 0.85, 0.6, 0.9, 0.75]
  const dataPts = Array.from({ length: 5 }).map((_, i) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / 5
    const r = outerR * dataRadii[i]
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })
  const outerStr = pts.map(p => `${p.ox},${p.oy}`).join(' ')
  const dataStr = dataPts.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg viewBox={`0 0 ${vbS} ${vbS}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <g className={styles.vizElement}>
        <polygon points={outerStr} fill="none" stroke="#ccc" strokeWidth={1.5} />
      </g>
      {pts.map((p, i) => (
        <g key={i} className={styles.vizElement}>
          <line x1={cx} y1={cy} x2={p.ox} y2={p.oy} stroke="#ddd" strokeWidth={1} />
        </g>
      ))}
      <g className={styles.vizElement}>
        <polygon points={dataStr} fill="#999" fillOpacity={0.35} stroke="#999" strokeWidth={1.5} />
      </g>
      {pts.map((p, i) => (
        <g key={`lbl-${i}`} className={styles.vizElement}>
          <text x={p.lx} y={p.ly + 4} textAnchor="middle" fontSize={9} fill="#333">{truncate(labels[i] ?? '', 18)}</text>
        </g>
      ))}
    </svg>
  )
}

function LabeledTreeSvg({ labels }: { labels: string[] }) {
  const vbW = 360, vbH = 280
  // Root at top, 2 mid-level, 2 leaves
  const nodes = [
    { x: 180, y: 40, label: labels[0] ?? '' },   // root
    { x: 100, y: 130, label: labels[1] ?? '' },   // mid-left
    { x: 260, y: 130, label: labels[2] ?? '' },   // mid-right
    { x: 60, y: 220, label: labels[3] ?? '' },    // leaf-1
    { x: 140, y: 220, label: labels[4] ?? '' },   // leaf-2
  ]
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4]]
  const nr = 30

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {edges.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          className={styles.vizElement}
          x1={nodes[a].x} y1={nodes[a].y + nr}
          x2={nodes[b].x} y2={nodes[b].y - nr}
          stroke="#bbb" strokeWidth={2}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i} className={styles.vizElement}>
          <circle cx={n.x} cy={n.y} r={nr} fill={i === 0 ? '#e0e0e0' : '#f0f0f0'} stroke="#ccc" strokeWidth={1} />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize={9} fill="#333">{truncate(n.label, 16)}</text>
        </g>
      ))}
    </svg>
  )
}

function LabeledTimelineSvg({ labels }: { labels: string[] }) {
  const vbW = 400, vbH = 120
  const nodeCount = 5
  const startX = 40, endX = vbW - 40
  const gap = (endX - startX) / (nodeCount - 1)
  const lineY = 60

  return (
    <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <g className={styles.vizElement}>
        <line x1={startX - 10} y1={lineY} x2={endX + 10} y2={lineY} stroke="#bbb" strokeWidth={2} />
      </g>
      {Array.from({ length: nodeCount }).map((_, i) => {
        const x = startX + i * gap
        const above = i % 2 === 0
        const label = truncate(labels[i] ?? '', 20)
        return (
          <g key={i} className={styles.vizElement}>
            <circle cx={x} cy={lineY} r={6} fill={i === 0 ? '#999' : i === nodeCount - 1 ? '#666' : '#bbb'} />
            <text
              x={x} y={above ? lineY - 16 : lineY + 22}
              textAnchor="middle" fontSize={9} fill="#333"
            >{label}</text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Generic (original) renderers ── */

function MatrixSvg() {
  const positions = [
    [25, 25], [50, 25], [75, 25],
    [25, 50], [50, 50], [75, 50],
    [25, 75], [50, 75], [75, 75],
  ]
  const fills = ['#ccc', '#999', '#ccc', '#999', '#666', '#999', '#ccc', '#999', '#ccc']
  return (
    <>
      {positions.map(([cx, cy], i) => (
        <circle
          key={i}
          className={styles.vizElement}
          cx={cx}
          cy={cy}
          r={8}
          fill={fills[i]}
        />
      ))}
    </>
  )
}

function FlowSvg() {
  return (
    <>
      <circle className={styles.vizElement} cx={20} cy={50} r={10} fill="#ccc" />
      <line className={styles.vizElement} x1={32} y1={50} x2={43} y2={50} stroke="#999" strokeWidth={2} markerEnd="url(#flowArrow)" />
      <circle className={styles.vizElement} cx={50} cy={50} r={10} fill="#999" />
      <line className={styles.vizElement} x1={62} y1={50} x2={73} y2={50} stroke="#999" strokeWidth={2} markerEnd="url(#flowArrow)" />
      <circle className={styles.vizElement} cx={80} cy={50} r={10} fill="#666" />
      <defs>
        <marker id="flowArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#999" />
        </marker>
      </defs>
    </>
  )
}

function PyramidSvg() {
  return (
    <>
      <polygon className={styles.vizElement} points="50,18 38,42 62,42" fill="#999" />
      <polygon className={styles.vizElement} points="38,42 26,66 74,66 62,42" fill="#bbb" />
      <polygon className={styles.vizElement} points="26,66 14,90 86,90 74,66" fill="#ddd" />
    </>
  )
}

function CycleSvg() {
  // Three circles arranged in a triangle
  const cx1 = 50, cy1 = 22 // top
  const cx2 = 26, cy2 = 72 // bottom-left
  const cx3 = 74, cy3 = 72 // bottom-right

  return (
    <>
      <circle className={styles.vizElement} cx={cx1} cy={cy1} r={9} fill="#ccc" />
      <circle className={styles.vizElement} cx={cx2} cy={cy2} r={9} fill="#999" />
      <circle className={styles.vizElement} cx={cx3} cy={cy3} r={9} fill="#bbb" />
      {/* Curved arrow: top -> bottom-right */}
      <path
        className={styles.vizElement}
        d="M58,28 Q78,42 76,60"
        fill="none"
        stroke="#999"
        strokeWidth={2}
        markerEnd="url(#cycleArrow)"
      />
      {/* Curved arrow: bottom-right -> bottom-left */}
      <path
        className={styles.vizElement}
        d="M65,76 Q50,90 35,76"
        fill="none"
        stroke="#999"
        strokeWidth={2}
        markerEnd="url(#cycleArrow)"
      />
      {/* Curved arrow: bottom-left -> top */}
      <path
        className={styles.vizElement}
        d="M24,60 Q22,42 42,28"
        fill="none"
        stroke="#999"
        strokeWidth={2}
        markerEnd="url(#cycleArrow)"
      />
      <defs>
        <marker id="cycleArrow" markerWidth={6} markerHeight={6} refX={5} refY={3} orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#999" />
        </marker>
      </defs>
    </>
  )
}

function VennSvg() {
  return (
    <>
      <circle className={styles.vizElement} cx={38} cy={50} r={26} fill="#ccc" fillOpacity={0.6} stroke="#bbb" strokeWidth={1.5} />
      <circle className={styles.vizElement} cx={62} cy={50} r={26} fill="#999" fillOpacity={0.5} stroke="#999" strokeWidth={1.5} />
    </>
  )
}

function RadarSvg() {
  // Hexagonal outline
  const hexPoints = [
    [50, 14], [80, 32], [80, 68], [50, 86], [20, 68], [20, 32],
  ]
  const hexStr = hexPoints.map(([x, y]) => `${x},${y}`).join(' ')

  // Inner "data" polygon (irregular)
  const dataPoints = [
    [50, 26], [70, 38], [72, 62], [50, 72], [30, 58], [28, 36],
  ]
  const dataStr = dataPoints.map(([x, y]) => `${x},${y}`).join(' ')

  return (
    <>
      <polygon className={styles.vizElement} points={hexStr} fill="none" stroke="#ccc" strokeWidth={1.5} />
      {/* Cross lines from center to each vertex */}
      {hexPoints.map(([x, y], i) => (
        <line
          key={i}
          className={styles.vizElement}
          x1={50}
          y1={50}
          x2={x}
          y2={y}
          stroke="#ddd"
          strokeWidth={1}
        />
      ))}
      <polygon className={styles.vizElement} points={dataStr} fill="#999" fillOpacity={0.4} stroke="#999" strokeWidth={1.5} />
    </>
  )
}

function TreeSvg() {
  return (
    <>
      {/* Edges first (behind nodes) */}
      <line className={styles.vizElement} x1={50} y1={22} x2={30} y2={48} stroke="#bbb" strokeWidth={2} />
      <line className={styles.vizElement} x1={50} y1={22} x2={70} y2={48} stroke="#bbb" strokeWidth={2} />
      <line className={styles.vizElement} x1={30} y1={48} x2={18} y2={74} stroke="#bbb" strokeWidth={2} />
      <line className={styles.vizElement} x1={30} y1={48} x2={42} y2={74} stroke="#bbb" strokeWidth={2} />
      <line className={styles.vizElement} x1={70} y1={48} x2={58} y2={74} stroke="#bbb" strokeWidth={2} />
      <line className={styles.vizElement} x1={70} y1={48} x2={82} y2={74} stroke="#bbb" strokeWidth={2} />
      {/* Nodes */}
      <circle className={styles.vizElement} cx={50} cy={22} r={7} fill="#999" />
      <circle className={styles.vizElement} cx={30} cy={48} r={6} fill="#bbb" />
      <circle className={styles.vizElement} cx={70} cy={48} r={6} fill="#bbb" />
      <circle className={styles.vizElement} cx={18} cy={74} r={5} fill="#ccc" />
      <circle className={styles.vizElement} cx={42} cy={74} r={5} fill="#ccc" />
      <circle className={styles.vizElement} cx={58} cy={74} r={5} fill="#ccc" />
      <circle className={styles.vizElement} cx={82} cy={74} r={5} fill="#ccc" />
    </>
  )
}

function TimelineSvg() {
  const xPositions = [18, 39, 61, 82]
  return (
    <>
      {/* Main horizontal line */}
      <line className={styles.vizElement} x1={10} y1={50} x2={90} y2={50} stroke="#bbb" strokeWidth={2} />
      {/* Tick marks */}
      {xPositions.map((x, i) => (
        <line
          key={`tick-${i}`}
          className={styles.vizElement}
          x1={x}
          y1={42}
          x2={x}
          y2={58}
          stroke="#bbb"
          strokeWidth={2}
        />
      ))}
      {/* Milestone dots */}
      {xPositions.map((x, i) => (
        <circle
          key={`dot-${i}`}
          className={styles.vizElement}
          cx={x}
          cy={50}
          r={5}
          fill={i === 0 ? '#999' : i === 3 ? '#666' : '#bbb'}
        />
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
