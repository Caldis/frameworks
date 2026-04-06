import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import * as d3 from 'd3'
import { getAllFrameworks } from '../data/loader'
import { categories, getCategoryByKey } from '../data/categories'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import type { CategoryKey } from '../types'
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
    const svg = d3.select(svgRef.current)
    if (!svg.node()) return

    svg.selectAll<SVGCircleElement, SimNode>('.node-circle')
      .transition()
      .duration(300)
      .attr('opacity', d => activeCategories.has(d.category) ? 1 : 0.1)

    const showLabels = zoomLevelRef.current > 1.2
    svg.selectAll<SVGTextElement, SimNode>('.node-label')
      .transition()
      .duration(300)
      .attr('opacity', d =>
        showLabels && activeCategories.has(d.category) && d.related.length >= 2 ? 1 : 0
      )

    svg.selectAll<SVGLineElement, SimLink>('.link-line')
      .transition()
      .duration(300)
      .attr('opacity', d => {
        const s = d.source as SimNode
        const t = d.target as SimNode
        return activeCategories.has(s.category) && activeCategories.has(t.category) ? 0.4 : 0.05
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
      f.related.forEach(r => {
        if (f.slug < r && nodeMap.has(r)) {
          links.push({ source: f.slug, target: r })
        }
      })
    })

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
        .attr('stroke', '#eee')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '4,4')
    }

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
        .attr('fill', cat.colorText)
        .text(localized(cat, 'name'))
    })

    // Draw Y-axis label (vertical text along left edge)
    bgLayer.append('text')
      .attr('transform', `translate(12, ${margin.top + innerHeight / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle')
      .attr('font-size', 11)
      .attr('font-family', 'monospace')
      .attr('fill', '#bbb')
      .text(`${t.mapAxisFundamental} → ${t.mapAxisAdvanced}`)

    // Zoom container (for nodes and links)
    const g = svg.append('g')

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
        // Also transform background layer so axes stay aligned with nodes
        bgLayer.attr('transform', event.transform)

        // Track zoom level and update label visibility threshold
        const k: number = event.transform.k
        zoomLevelRef.current = k
        const showLabels = k > 1.2
        const currentCategories = activeCategoriesRef.current
        svg.selectAll<SVGTextElement, SimNode>('.node-label')
          .attr('opacity', (d: SimNode) =>
            showLabels && currentCategories.has(d.category) && d.related.length >= 2 ? 1 : 0
          )
      })

    svg.call(zoom)
    zoomRef.current = zoom

    // Simulation with category-based X and complexity-based Y
    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links).id(d => d.slug).distance(80))
      .force('charge', d3.forceManyBody().strength(-120))
      .force('x', d3.forceX<SimNode>(d => catTargetX(d.category)).strength(0.4))
      .force('y', d3.forceY<SimNode>(d => complexityTargetY(d)).strength(0.15))
      .force('collision', d3.forceCollide().radius(18))

    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('class', 'link-line')
      .attr('stroke', '#ddd')
      .attr('stroke-width', 1)
      .attr('opacity', 0.4)

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
      .attr('fill', d => {
        const cat = getCategoryByKey(d.category)
        return cat ? cat.colorText : '#999'
      })
      .attr('stroke', 'white')
      .attr('stroke-width', 2)

    // Node labels: persistent for nodes with >= 2 connections, hidden for others
    const truncateLabel = (d: SimNode) => {
      const name = localized(d, 'name')
      const maxLen = locale === 'zh' ? 5 : 10
      return name.length > maxLen ? name.slice(0, maxLen) + '…' : name
    }

    node.append('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => (6 + Math.min(d.related.length, 4) * 2) + 10)
      .attr('font-size', 8)
      .attr('font-family', 'var(--font-mono)')
      .attr('fill', d => {
        const cat = getCategoryByKey(d.category)
        return cat ? cat.colorText : '#666'
      })
      .attr('opacity', 0)
      .attr('pointer-events', 'none')
      .text(d => truncateLabel(d))

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

        // Highlight connected edges
        const connectedSlugs = new Set(d.related)
        link
          .attr('stroke', l => {
            const s = (l.source as SimNode).slug
            const t = (l.target as SimNode).slug
            return (s === d.slug || t === d.slug) ? '#666' : '#ddd'
          })
          .attr('stroke-width', l => {
            const s = (l.source as SimNode).slug
            const t = (l.target as SimNode).slug
            return (s === d.slug || t === d.slug) ? 2 : 1
          })
          .attr('opacity', l => {
            const s = (l.source as SimNode).slug
            const t = (l.target as SimNode).slug
            return (s === d.slug || t === d.slug) ? 0.8 : 0.15
          })

        // Show labels of connected nodes and the hovered node; keep persistent labels visible at zoom
        const showLabels = zoomLevelRef.current > 1.2
        svg.selectAll<SVGTextElement, SimNode>('.node-label')
          .attr('opacity', n =>
            n.slug === d.slug || connectedSlugs.has(n.slug) ? 1 : (showLabels && n.related.length >= 2 ? 0.3 : 0)
          )

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
        // Reset links
        link
          .attr('stroke', '#ddd')
          .attr('stroke-width', 1)
          .attr('opacity', 0.4)

        // Restore labels based on zoom level; only show for well-connected nodes when zoomed in
        const showLabels = zoomLevelRef.current > 1.2
        svg.selectAll<SVGTextElement, SimNode>('.node-label')
          .attr('opacity', n => showLabels && n.related.length >= 2 ? 1 : 0)

        // Hide tooltip
        const tooltip = tooltipRef.current
        if (tooltip) {
          tooltip.classList.remove(styles.tooltipVisible)
        }
      })
      .on('click', (_event, d) => {
        navigate(`/frameworks/${d.slug}`)
      })
      .on('touchstart', (event, d) => {
        event.preventDefault()
        event.stopPropagation()

        // Show label for this node
        d3.select(event.currentTarget).select('.node-label')
          .attr('opacity', 1)

        // Highlight connected edges
        const connectedSlugs = new Set(d.related)
        link
          .attr('stroke', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? '#666' : '#ddd'
          })
          .attr('stroke-width', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 2 : 1
          })
          .attr('opacity', l => {
            const s = (l.source as SimNode).slug
            const tgt = (l.target as SimNode).slug
            return (s === d.slug || tgt === d.slug) ? 0.8 : 0.15
          })

        // Show labels of connected nodes and the hovered node
        const showLabels = zoomLevelRef.current > 1.2
        svg.selectAll<SVGTextElement, SimNode>('.node-label')
          .attr('opacity', n =>
            n.slug === d.slug || connectedSlugs.has(n.slug) ? 1 : (showLabels && n.related.length >= 2 ? 0.3 : 0)
          )

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
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as SimNode).x!)
        .attr('y1', d => (d.source as SimNode).y!)
        .attr('x2', d => (d.target as SimNode).x!)
        .attr('y2', d => (d.target as SimNode).y!)

      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

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
      </div>
      <div className={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategories.has(cat.key) ? styles.filterBtnActive : ''}`}
            onClick={() => toggleCategory(cat.key)}
          >
            <span className={styles.filterDot} style={{ background: cat.colorText }} />
            {localized(cat, 'name')}
          </button>
        ))}
      </div>
      <div className={styles.svgContainer} ref={containerRef}>
        <svg ref={svgRef} />
        <div ref={tooltipRef} className={styles.tooltip} />
        <div className={styles.zoomControls}>
          <button className={styles.zoomBtn} onClick={handleZoomIn} aria-label="Zoom in">+</button>
          <button className={styles.zoomBtn} onClick={handleZoomOut} aria-label="Zoom out">&minus;</button>
        </div>
      </div>
      <Link to="/" className={styles.backLink}>{t.backToHome}</Link>
    </div>
  )
}
