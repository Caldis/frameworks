import type { VizType } from '../types'
import styles from './FrameworkViz.module.css'

interface FrameworkVizProps {
  type: VizType
  size?: number
  animate?: boolean
  className?: string
}

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

export default function FrameworkViz({
  type,
  size = 100,
  animate = false,
  className,
}: FrameworkVizProps) {
  const Renderer = vizRenderers[type]

  const svgClasses = [
    styles.viz,
    animate ? styles.animate : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

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
