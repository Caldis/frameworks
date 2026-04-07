import type { Framework } from '../types'

const SIZE = 24
const CENTER = SIZE / 2
const RADIUS = 9
const AXES = 5

// Map framework dimensions to 0-1 values on 5 axes
function scores(fw: Framework): number[] {
  const complexity = { beginner: 0.3, intermediate: 0.6, advanced: 1 }[fw.complexity] ?? 0.5
  const abstraction = { code: 0.25, component: 0.5, system: 0.75, organization: 1 }[fw.abstraction_level] ?? 0.5
  const maturity = { experimental: 0.25, emerging: 0.5, established: 0.75, foundational: 1 }[fw.maturity_ring] ?? 0.5
  const quality = Math.min((fw.quality_concerns?.length ?? 0) / 5, 1)
  const connections = Math.min(fw.related.length / 6, 1)
  return [complexity, abstraction, maturity, quality, connections]
}

function toPoints(values: number[]): string {
  return values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / AXES - Math.PI / 2
    const r = RADIUS * Math.max(v, 0.1)
    return `${CENTER + r * Math.cos(angle)},${CENTER + r * Math.sin(angle)}`
  }).join(' ')
}

interface FingerprintProps {
  framework: Framework
  color: string
}

export default function Fingerprint({ framework, color }: FingerprintProps) {
  const s = scores(framework)
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <polygon
        points={toPoints(s)}
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
    </svg>
  )
}
