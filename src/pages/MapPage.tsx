import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import * as d3 from 'd3'
import { getAllFrameworks, getFrameworkBySlug, getTypedRelations, getFrameworkFull } from '../data/loader'
import { categories, getCategoryByKey, catColorVar } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import type { CategoryKey, Framework, RelationType } from '../types'
import styles from './MapPage.module.css'

interface SimNode extends d3.SimulationNodeDatum {
  slug: string
  name: string
  name_zh: string
  desc: string
  desc_zh: string
  category: CategoryKey
  related: string[]
  id: number
  ai_relevant: boolean
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: string | SimNode
  target: string | SimNode
  relType: RelationType
}

// Greedy label placement with bounding-box collision detection.
// Returns the set of slugs whose labels can be displayed without overlap.
function computeVisibleLabels(
  nodes: SimNode[],
  zoomLevel: number,
  activeCategories: Set<CategoryKey>,
  lang: 'en' | 'zh',
): Set<string> {
  const minConn = zoomLevel > 2.5 ? 0 : zoomLevel > 1.5 ? 1 : zoomLevel > 0.8 ? 2 : 3

  const candidates = nodes
    .filter(n => activeCategories.has(n.category) && n.related.length >= minConn && n.x != null)
    .sort((a, b) => b.related.length - a.related.length)

  const charW = 5.5
  const labelH = 14
  const pad = 8

  type Rect = { x: number; y: number; w: number; h: number }
  const placed: Rect[] = []
  const visible = new Set<string>()

  for (const node of candidates) {
    const name = lang === 'zh' ? node.name_zh : node.name
    const maxLen = lang === 'zh' ? 8 : 12
    const len = Math.min(name.length, maxLen)
    const nodeR = 6 + Math.min(node.related.length, 4) * 2
    const w = len * charW + pad
    const h = labelH
    const x = node.x! - w / 2
    const y = node.y! + nodeR + 2

    const rect: Rect = { x, y, w, h }
    const hit = placed.some(p =>
      !(rect.x + rect.w < p.x || p.x + p.w < rect.x ||
        rect.y + rect.h < p.y || p.y + p.h < rect.y)
    )

    if (!hit) {
      placed.push(rect)
      visible.add(node.slug)
    }
  }
  return visible
}

export default function MapPage() {
  const { t, localized, locale } = useI18n()
  usePageMeta('Framework Relationship Map', 'Interactive map of 194 software design frameworks and their connections')
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const zoomLevelRef = useRef<number>(1)
  const [activeCategories, setActiveCategories] = useState<Set<CategoryKey>>(
    () => new Set(categories.map(c => c.key))
  )
  const activeCategoriesRef = useRef<Set<CategoryKey>>(new Set(categories.map(c => c.key)))
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedDetail, setSelectedDetail] = useState<Framework | null>(null)
  const [showHint, setShowHint] = useState(() => {
    return !sessionStorage.getItem('mapHintDismissed')
  })

  // Auto-dismiss hint after 5 seconds
  useEffect(() => {
    if (!showHint) return
    const timer = setTimeout(() => {
      setShowHint(false)
      sessionStorage.setItem('mapHintDismissed', '1')
    }, 5000)
    return () => clearTimeout(timer)
  }, [showHint])

  const dismissHint = useCallback(() => {
    setShowHint(false)
    sessionStorage.setItem('mapHintDismissed', '1')
  }, [])

  // Load full detail when a node is selected
  useEffect(() => {
    if (!selectedNode) {
      setSelectedDetail(null)
      return
    }
    getFrameworkFull(selectedNode).then(fw => {
      if (fw) setSelectedDetail(fw)
    })
  }, [selectedNode])

  const toggleCategory = useCallback((key: CategoryKey) => {
    setActiveCategories(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }, [])

  // Update visibility when activeCategories changes (without rebuilding the graph)
  useEffect(() => {
    activeCategoriesRef.current = activeCategories
    const svgEl = svgRef.current
    const svg = d3.select(svgEl)
    if (!svg.node()) return

    svg.selectAll<SVGCircleElement, SimNode>('.node-circle')
      .transition()
      .duration(300)
      .attr('opacity', d => activeCategories.has(d.category) ? 1 : 0.1)

    // Recompute collision-free labels
    const updateFn = (svgEl as any)?.__updateLabels
    if (typeof updateFn === 'function') updateFn()

    svg.selectAll<SVGLineElement, SimLink>('.link-line')
      .transition()
      .duration(300)
      .attr('opacity', d => {
        const s = d.source as SimNode
        const t = d.target as SimNode
        return activeCategories.has(s.category) && activeCategories.has(t.category) ? 0.2 : 0.05
      })
  }, [activeCategories])

  // Highlight matching nodes when searchQuery changes
  useEffect(() => {
    const svg = d3.select(svgRef.current)
    if (!svg.node()) return
    const q = searchQuery.toLowerCase()
    svg.selectAll<SVGCircleElement, SimNode>('.node-circle')
      .attr('opacity', d => !q || d.name.toLowerCase().includes(q) || d.name_zh.includes(q) ? 1 : 0.15)
      .attr('r', d => {
        const baseR = 6 + Math.min(d.related.length, 4) * 2
        return (!q || d.name.toLowerCase().includes(q) || d.name_zh.includes(q)) ? baseR : baseR * 0.7
      })
  }, [searchQuery])

  // Build graph once
  useEffect(() => {
    const svgEl = svgRef.current
    const containerEl = containerRef.current
    if (!svgEl || !containerEl) return

    const rect = containerEl.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Clear previous
    d3.select(svgEl).selectAll('*').remove()

    const frameworks = getAllFrameworks()
    const nodes: SimNode[] = frameworks.map(f => ({
      slug: f.slug,
      name: f.name,
      name_zh: f.name_zh,
      desc: f.desc,
      desc_zh: f.desc_zh,
      category: f.category,
      related: f.related,
      id: f.id,
      ai_relevant: f.ai_relevant,
    }))

    const nodeMap = new Map(nodes.map(n => [n.slug, n]))
    const links: SimLink[] = []
    frameworks.forEach(f => {
      const typed = getTypedRelations(f)
      typed.forEach(r => {
        if (f.slug < r.slug && nodeMap.has(r.slug)) {
          links.push({ source: f.slug, target: r.slug, relType: r.type })
        }
      })
    })

    // Edge colors by relation type
    const edgeStyles: Record<string, { color: string; dash: string; width: number }> = {
      complement: { color: '#8faa8f', dash: '', width: 1.5 },
      alternative: { color: '#c4a882', dash: '4,3', width: 1.5 },
      extends: { color: '#8f9faa', dash: '', width: 2 },
      prerequisite: { color: '#aa8f8f', dash: '2,2', width: 1 },
      related: { color: '#d4cdc4', dash: '', width: 1 },
    }

    // Layout margins for axis labels
    const margin = { top: 20, right: 20, bottom: 40, left: 36 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
    const colWidth = innerWidth / categories.length

    // Build a map from category key to column index — use ALL categories
    const categoryOrder: CategoryKey[] = categories.map(c => c.key)
    const catIndex = new Map<CategoryKey, number>(categoryOrder.map((k, i) => [k, i]))

    // Compute target X for each category (center of its column)
    const catTargetX = (cat: CategoryKey) => margin.left + (catIndex.get(cat)! + 0.5) * colWidth

    // Compute complexity rank for Y positioning
    // Group nodes by category, sort by id within category, then assign a normalized Y
    const nodesByCategory = new Map<CategoryKey, SimNode[]>()
    for (const n of nodes) {
      if (!nodesByCategory.has(n.category)) nodesByCategory.set(n.category, [])
      nodesByCategory.get(n.category)!.push(n)
    }
    // Sort each group: more connections + ai_relevant + higher id = more complex = toward top
    for (const [, group] of nodesByCategory) {
      group.sort((a, b) => {
        const scoreA = a.id + a.related.length * 2 + (a.ai_relevant ? 3 : 0)
        const scoreB = b.id + b.related.length * 2 + (b.ai_relevant ? 3 : 0)
        return scoreA - scoreB
      })
    }
    // Assign target Y: bottom = fundamental (high Y value), top = advanced (low Y value)
    const complexityTargetY = (node: SimNode) => {
      const group = nodesByCategory.get(node.category)!
      const idx = group.indexOf(node)
      const ratio = group.length > 1 ? idx / (group.length - 1) : 0.5
      // ratio 0 = simplest (bottom), 1 = most complex (top)
      // Map to Y: bottom of inner area to top
      return margin.top + innerHeight * (1 - ratio)
    }

    const svg = d3.select(svgEl)
      .attr('width', width)
      .attr('height', height)

    // Define a glow filter for highlighted edges
    const defs = svg.append('defs')
    const glowFilter = defs.append('filter').attr('id', 'edge-glow')
    glowFilter.append('feGaussianBlur').attr('stdDeviation', '2').attr('result', 'coloredBlur')
    const feMerge = glowFilter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Static background layer (not affected by zoom)
    const bgLayer = svg.append('g').attr('class', 'bg-layer')

    // Draw vertical dividers between category zones
    for (let i = 1; i < categories.length; i++) {
      const x = margin.left + i * colWidth
      bgLayer.append('line')
        .attr('x1', x)
        .attr('y1', margin.top)
        .attr('x2', x)
        .attr('y2', margin.top + innerHeight)
        .style('stroke', 'var(--map-grid)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,4')
    }

    // Alternating column background tint
    categoryOrder.forEach((_catKey, i) => {
      if (i % 2 === 0) {
        bgLayer.append('rect')
          .attr('x', margin.left + i * colWidth)
          .attr('y', margin.top)
          .attr('width', colWidth)
          .attr('height', innerHeight)
          .style('fill', 'var(--map-col-tint)')
      }
    })

    // Draw X-axis labels (category names at bottom)
    categoryOrder.forEach((catKey, i) => {
      const cat = getCategoryByKey(catKey)
      if (!cat) return
      bgLayer.append('text')
        .attr('x', margin.left + (i + 0.5) * colWidth)
        .attr('y', height - 8)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
        .attr('font-family', 'monospace')
        .style('fill', catColorVar(catKey, 'text'))
        .text(localized(cat, 'name'))
    })

    // Draw Y-axis label (vertical text along left edge)
    bgLayer.append('text')
      .attr('transform', `translate(12, ${margin.top + innerHeight / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle')
      .attr('font-size', 11)
      .attr('font-family', 'monospace')
      .style('fill', 'var(--muted-light)')
      .text(`${t.mapAxisFundamental} → ${t.mapAxisAdvanced}`)

    // Zoom container (for nodes and links)
    const g = svg.append('g')

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        const t = event.transform
        // Clamp translation to keep graph somewhat visible
        const maxPan = 200
        t.x = Math.max(-width * t.k + maxPan, Math.min(width - maxPan, t.x))
        t.y = Math.max(-height * t.k + maxPan, Math.min(height - maxPan, t.y))

        g.attr('transform', t)
        // Also transform background layer so axes stay aligned with nodes
        bgLayer.attr('transform', t)

        // Track zoom level and recompute collision-free labels
        zoomLevelRef.current = event.transform.k
        const updateFn = (svgEl as any)?.__updateLabels
        if (typeof updateFn === 'function') updateFn()
      })

    svg.call(zoom)
    zoomRef.current = zoom

    // Simulation with category-based X and complexity-based Y
    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links).id(d => d.slug).distance(80))
      .force('charge', d3.forceManyBody().strength(-180))
      .force('x', d3.forceX<SimNode>(d => catTargetX(d.category)).strength(0.4))
      .force('y', d3.forceY<SimNode>(d => complexityTargetY(d)).strength(0.2))
      .force('collision', d3.forceCollide().radius(22))

    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('class', 'link-line')
      .attr('stroke', d => edgeStyles[d.relType]?.color || '#d4cdc4')
      .attr('stroke-width', d => edgeStyles[d.relType]?.width || 1)
      .attr('stroke-dasharray', d => edgeStyles[d.relType]?.dash || '')
      .attr('opacity', 0.2)

    // Node groups
    const node = g.append('g')
      .selectAll<SVGGElement, SimNode>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(
        d3.drag<SVGGElement, SimNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          })
      )

    // Node circles
    node.append('circle')
      .attr('class', 'node-circle')
      .attr('r', d => 6 + Math.min(d.related.length, 4) * 2)
      .style('fill', d => catColorVar(d.category, 'text'))
      .style('stroke', 'var(--bg)')
      .attr('stroke-width', 2)

    // Node labels — initially hidden, collision detection determines which to show
    const truncateLabel = (d: SimNode) => {
      const name = localized(d, 'name')
      const maxLen = locale === 'zh' ? 8 : 12
      return name.length > maxLen ? name.slice(0, maxLen) + '...' : name
    }

    node.append('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => (6 + Math.min(d.related.length, 4) * 2) + 10)
      .attr('font-size', d => d.related.length >= 4 ? 10 : 9)
      .attr('font-family', 'var(--font-mono)')
      .style('fill', d => catColorVar(d.category, 'text'))
      .attr('opacity', 0)
      .attr('pointer-events', 'none')
      .text(d => truncateLabel(d))

    // Collision-free label update — shared across zoom, filter, and simulation end
    const updateLabels = () => {
      const visible = computeVisibleLabels(
        nodes,
        zoomLevelRef.current,
        activeCategoriesRef.current,
        locale as 'en' | 'zh',
      )
      svg.selectAll<SVGTextElement, SimNode>('.node-label')
        .transition()
        .duration(200)
        .attr('opacity', d => {
          if (!activeCategoriesRef.current.has(d.category)) return 0
          return visible.has(d.slug) ? 1 : 0
        })
    }
    ;(svgEl as any).__updateLabels = updateLabels

    // Hide tooltip when tapping empty SVG background
    svg.on('touchstart', () => {
      tooltipRef.current?.classList.remove(styles.tooltipVisible)
    })

    // Interactions
    node
      .on('mouseenter', (event, d) => {
        // Show label for this node
        d3.select(event.currentTarget).select('.node-label')
          .attr('opacity', 1)

        // Highlight connected edges — show typed styling with thicker lines + glow
        const connectedSlugs = new Set(d.related)
        link
          .attr('stroke', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            if (s === d.slug || tgt === d.slug) return edgeStyles[l.relType]?.color || '#d4cdc4'
            return edgeStyles[l.relType]?.color || '#d4cdc4'
          })
          .attr('stroke-width', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 3 : (edgeStyles[l.relType]?.width || 1)
          })
          .attr('stroke-dasharray', l => edgeStyles[l.relType]?.dash || '')
          .attr('opacity', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 1 : 0.05
          })
          .attr('filter', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 'url(#edge-glow)' : 'none'
          })

        // Show labels of connected nodes and the hovered node
        const currentVisible = computeVisibleLabels(
          nodes, zoomLevelRef.current, activeCategoriesRef.current, locale as 'en' | 'zh'
        )
        svg.selectAll<SVGTextElement, SimNode>('.node-label')
          .attr('opacity', n => {
            if (n.slug === d.slug || connectedSlugs.has(n.slug)) return 1
            if (currentVisible.has(n.slug)) return 0.3
            return 0
          })

        // Tooltip
        const tooltip = tooltipRef.current
        if (tooltip) {
          tooltip.innerHTML = `
            <div class="${styles.tooltipName}">${localized(d, 'name')}</div>
            <div class="${styles.tooltipNameZh}">${localized(d, 'name') === d.name ? d.name_zh : d.name}</div>
            <div class="${styles.tooltipDesc}">${localized(d, 'desc')}</div>
          `
          tooltip.classList.add(styles.tooltipVisible)

          // Position relative to container
          const containerRect = containerEl.getBoundingClientRect()
          const nodeX = event.clientX - containerRect.left
          const nodeY = event.clientY - containerRect.top

          const tooltipWidth = tooltip.offsetWidth
          const tooltipHeight = tooltip.offsetHeight

          let left = nodeX + 12
          let top = nodeY - tooltipHeight / 2

          // Keep tooltip in bounds
          if (left + tooltipWidth > containerRect.width) {
            left = nodeX - tooltipWidth - 12
          }
          if (top < 0) top = 4
          if (top + tooltipHeight > containerRect.height) {
            top = containerRect.height - tooltipHeight - 4
          }

          tooltip.style.left = `${left}px`
          tooltip.style.top = `${top}px`
        }
      })
      .on('mouseleave', () => {
        // Reset links to typed edge styles
        link
          .attr('stroke', l => edgeStyles[l.relType]?.color || '#d4cdc4')
          .attr('stroke-width', l => edgeStyles[l.relType]?.width || 1)
          .attr('stroke-dasharray', l => edgeStyles[l.relType]?.dash || '')
          .attr('opacity', 0.2)
          .attr('filter', 'none')

        // Restore collision-based labels
        updateLabels()

        // Hide tooltip
        const tooltip = tooltipRef.current
        if (tooltip) {
          tooltip.classList.remove(styles.tooltipVisible)
        }
      })
      .on('click', (_event, d) => {
        setSelectedNode(d.slug)
      })
      .on('touchstart', (event, d) => {
        event.preventDefault()
        event.stopPropagation()

        // Show label for this node
        d3.select(event.currentTarget).select('.node-label')
          .attr('opacity', 1)

        // Highlight connected edges — show typed styling with thicker lines + glow
        const connectedSlugs = new Set(d.related)
        link
          .attr('stroke', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            if (s === d.slug || tgt === d.slug) return edgeStyles[l.relType]?.color || '#d4cdc4'
            return edgeStyles[l.relType]?.color || '#d4cdc4'
          })
          .attr('stroke-width', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 3 : (edgeStyles[l.relType]?.width || 1)
          })
          .attr('stroke-dasharray', l => edgeStyles[l.relType]?.dash || '')
          .attr('opacity', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 1 : 0.05
          })
          .attr('filter', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 'url(#edge-glow)' : 'none'
          })

        // Show labels of connected nodes and the touched node
        const currentVisible = computeVisibleLabels(
          nodes, zoomLevelRef.current, activeCategoriesRef.current, locale as 'en' | 'zh'
        )
        svg.selectAll<SVGTextElement, SimNode>('.node-label')
          .attr('opacity', n => {
            if (n.slug === d.slug || connectedSlugs.has(n.slug)) return 1
            if (currentVisible.has(n.slug)) return 0.3
            return 0
          })

        // Tooltip
        const tooltip = tooltipRef.current
        if (tooltip) {
          tooltip.innerHTML = `
            <div class="${styles.tooltipName}">${localized(d, 'name')}</div>
            <div class="${styles.tooltipNameZh}">${localized(d, 'name') === d.name ? d.name_zh : d.name}</div>
            <div class="${styles.tooltipDesc}">${localized(d, 'desc')}</div>
          `
          tooltip.classList.add(styles.tooltipVisible)

          const containerRect = containerEl.getBoundingClientRect()
          const touch = event.touches[0]
          const nodeX = touch.clientX - containerRect.left
          const nodeY = touch.clientY - containerRect.top

          const tooltipWidth = tooltip.offsetWidth
          const tooltipHeight = tooltip.offsetHeight

          let left = nodeX + 12
          let top = nodeY - tooltipHeight / 2

          if (left + tooltipWidth > containerRect.width) {
            left = nodeX - tooltipWidth - 12
          }
          if (top < 0) top = 4
          if (top + tooltipHeight > containerRect.height) {
            top = containerRect.height - tooltipHeight - 4
          }

          tooltip.style.left = `${left}px`
          tooltip.style.top = `${top}px`
        }
      })

    // Tick
    let labelsRevealed = false
    simulation.on('tick', () => {
      // Clamp node positions to SVG bounds
      nodes.forEach(d => {
        d.x = Math.max(margin.left + 10, Math.min(width - margin.right - 10, d.x!))
        d.y = Math.max(margin.top + 10, Math.min(height - margin.bottom - 10, d.y!))
      })

      // Show collision-free labels once positions stabilize (alpha < 0.15)
      if (!labelsRevealed && simulation.alpha() < 0.15) {
        labelsRevealed = true
        updateLabels()
      }

      link
        .attr('x1', d => (d.source as SimNode).x!)
        .attr('y1', d => (d.source as SimNode).y!)
        .attr('x2', d => (d.target as SimNode).x!)
        .attr('y2', d => (d.target as SimNode).y!)

      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // Fit-to-view helper: calculate bounding box and apply zoom transform
    const fitToView = () => {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
      nodes.forEach(n => {
        if (n.x! < minX) minX = n.x!
        if (n.x! > maxX) maxX = n.x!
        if (n.y! < minY) minY = n.y!
        if (n.y! > maxY) maxY = n.y!
      })

      const padding = 40
      const bboxWidth = maxX - minX + padding * 2
      const bboxHeight = maxY - minY + padding * 2
      const scale = Math.min(width / bboxWidth, height / bboxHeight, 1) // don't zoom in beyond 1x
      const centerX = (minX + maxX) / 2
      const centerY = (minY + maxY) / 2

      const transform = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(scale)
        .translate(-centerX, -centerY)

      svg.transition().duration(500).call(zoom.transform, transform)
    }

    // After simulation settles, fit view and compute collision-free labels
    simulation.on('end', () => {
      fitToView()
      updateLabels()
    })

    // Expose fitToView for external use (reset view button)
    ;(svgEl as any).__fitToView = fitToView

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [navigate, localized, t, locale])

  const handleZoomIn = useCallback(() => {
    const svgEl = svgRef.current
    const zoomBehavior = zoomRef.current
    if (!svgEl || !zoomBehavior) return
    d3.select(svgEl).transition().duration(300).call(zoomBehavior.scaleBy, 1.4)
  }, [])

  const handleZoomOut = useCallback(() => {
    const svgEl = svgRef.current
    const zoomBehavior = zoomRef.current
    if (!svgEl || !zoomBehavior) return
    d3.select(svgEl).transition().duration(300).call(zoomBehavior.scaleBy, 1 / 1.4)
  }, [])

  const handleFitToView = useCallback(() => {
    const svgEl = svgRef.current
    if (!svgEl) return
    const fitFn = (svgEl as any).__fitToView
    if (typeof fitFn === 'function') fitFn()
  }, [])

  // Resolve selected framework details
  const selectedFramework = selectedNode ? getFrameworkBySlug(selectedNode) : null
  const selectedCategory = selectedFramework ? getCategoryByKey(selectedFramework.category) : null

  // Complexity label
  const complexityLabel = selectedFramework
    ? selectedFramework.complexity === 'beginner' ? t.complexityBeginner
      : selectedFramework.complexity === 'intermediate' ? t.complexityIntermediate
      : t.complexityAdvanced
    : ''

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.mapTitle}</h1>
      <div className={styles.searchRow}>
        <input
          className={styles.mapSearch}
          type="search"
          placeholder={t.mapSearch}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className={styles.searchClear} onClick={() => setSearchQuery('')}>×</button>
        )}
      </div>
      <div className={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategories.has(cat.key) ? styles.filterBtnActive : ''}`}
            onClick={() => toggleCategory(cat.key)}
          >
            <span className={styles.filterDot} style={{ background: catColorVar(cat.key, 'text') }} />
            {localized(cat, 'name')}
          </button>
        ))}
      </div>
      <div className={styles.edgeLegend}>
        <span className={styles.edgeLegendItem}>
          <span className={styles.edgeLine} style={{ background: '#8faa8f' }} /> complement
        </span>
        <span className={styles.edgeLegendItem}>
          <span className={styles.edgeLine} style={{ background: '#c4a882', borderStyle: 'dashed' }} /> alternative
        </span>
        <span className={styles.edgeLegendItem}>
          <span className={styles.edgeLine} style={{ background: '#8f9faa', height: '3px' }} /> extends
        </span>
        <span className={styles.edgeLegendItem}>
          <span className={styles.edgeLine} style={{ background: '#aa8f8f', borderStyle: 'dotted' }} /> prerequisite
        </span>
      </div>
      <div className={styles.mapLayout}>
        <div className={styles.svgContainer} ref={containerRef} style={selectedNode ? { flex: 1 } : undefined}>
          <svg ref={svgRef} />
          <div ref={tooltipRef} className={styles.tooltip} />
          <div className={styles.zoomControls}>
            <button className={styles.zoomBtn} onClick={handleZoomIn} aria-label="Zoom in" title="Zoom in">+</button>
            <button className={styles.zoomBtn} onClick={handleZoomOut} aria-label="Zoom out" title="Zoom out">&minus;</button>
            <button className={styles.zoomBtn} onClick={handleFitToView} aria-label="Fit to view" title="Reset view">&#8865;</button>
          </div>
          {showHint && (
            <div className={styles.hint} onClick={dismissHint}>
              {t.mapHint}
            </div>
          )}
        </div>
        {selectedFramework && selectedCategory && (
          <div className={styles.sidePanel} key={selectedFramework.slug}>
            <button className={styles.panelClose} onClick={() => setSelectedNode(null)} aria-label="Close">
              &times;
            </button>
            <div className={styles.panelName}>{localized(selectedFramework, 'name')}</div>
            <div className={styles.panelNameZh}>
              {localized(selectedFramework, 'name') === selectedFramework.name
                ? selectedFramework.name_zh
                : selectedFramework.name}
            </div>
            <div className={styles.panelMeta}>
              <span className={styles.panelCategoryPill}>
                <span className={styles.connectionDot} style={{ background: catColorVar(selectedCategory.key, 'text') }} />
                {localized(selectedCategory, 'name')}
              </span>
              <span className={styles.panelComplexity}>{complexityLabel}</span>
            </div>
            <div className={styles.panelDesc}>
              {localized(selectedFramework, 'desc')}
            </div>
            {((selectedDetail?.when_to_use?.length ?? 0) > 0 || (selectedDetail?.when_to_use_zh?.length ?? 0) > 0) && (
              <div className={styles.panelSection}>
                <div className={styles.panelSectionTitle}>{t.whenToUse}</div>
                <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.6 }}>
                  {(locale === 'zh' ? selectedDetail!.when_to_use_zh : selectedDetail!.when_to_use)
                    .slice(0, 2)
                    .map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
            {selectedFramework.related.length > 0 && (() => {
              const typedRels = getTypedRelations(selectedFramework)
              return (
                <div className={styles.panelSection}>
                  <div className={styles.panelSectionTitle}>{t.mapConnections}</div>
                  {typedRels.map(({ slug, type }) => {
                    const relFw = getFrameworkBySlug(slug)
                    if (!relFw) return null
                    const relCat = getCategoryByKey(relFw.category)
                    return (
                      <div
                        key={slug}
                        className={styles.connectionItem}
                        onClick={() => setSelectedNode(slug)}
                      >
                        <span
                          className={styles.connectionDot}
                          style={{ background: relCat ? catColorVar(relCat.key, 'text') : '#999' }}
                        />
                        {localized(relFw, 'name')}
                        <span className={styles.relTypeBadge}>{type}</span>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
            <Link
              to={`/frameworks/${selectedFramework.slug}`}
              className={styles.panelViewBtn}
            >
              {t.mapViewDetails} &rarr;
            </Link>
          </div>
        )}
      </div>
      <Link to="/" className={styles.backLink}>{t.backToHome}</Link>
    </div>
  )
}
