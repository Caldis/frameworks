import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import * as d3 from 'd3'
import { getAllFrameworks } from '../data/loader'
import { categories, getCategoryByKey } from '../data/categories'
import type { Framework, CategoryKey } from '../types'
import styles from './MapPage.module.css'

interface SimNode extends d3.SimulationNodeDatum {
  slug: string
  name: string
  name_zh: string
  desc: string
  category: CategoryKey
  related: string[]
}

interface SimLink extends d3.SimulationLinkDatum<SimNode> {
  source: string | SimNode
  target: string | SimNode
}

export default function MapPage() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [activeCategories, setActiveCategories] = useState<Set<CategoryKey>>(
    () => new Set(categories.map(c => c.key))
  )

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
    const svg = d3.select(svgRef.current)
    if (!svg.node()) return

    svg.selectAll<SVGCircleElement, SimNode>('.node-circle')
      .transition()
      .duration(300)
      .attr('opacity', d => activeCategories.has(d.category) ? 1 : 0.1)

    svg.selectAll<SVGTextElement, SimNode>('.node-label')
      .transition()
      .duration(300)
      .attr('opacity', d => activeCategories.has(d.category) ? 1 : 0)

    svg.selectAll<SVGLineElement, SimLink>('.link-line')
      .transition()
      .duration(300)
      .attr('opacity', d => {
        const s = d.source as SimNode
        const t = d.target as SimNode
        return activeCategories.has(s.category) && activeCategories.has(t.category) ? 0.4 : 0.05
      })
  }, [activeCategories])

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
      category: f.category,
      related: f.related,
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

    const svg = d3.select(svgEl)
      .attr('width', width)
      .attr('height', height)

    // Zoom container
    const g = svg.append('g')

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Simulation
    const simulation = d3.forceSimulation<SimNode>(nodes)
      .force('link', d3.forceLink<SimNode, SimLink>(links).id(d => d.slug).distance(80))
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(width / 2, height / 2))
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

    // Node labels (hidden by default, shown on hover via interaction)
    node.append('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => -(8 + Math.min(d.related.length, 4) * 2))
      .attr('font-size', 10)
      .attr('font-family', 'var(--font-mono)')
      .attr('fill', '#333')
      .attr('opacity', 0)
      .attr('pointer-events', 'none')
      .text(d => d.name)

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

        // Show labels of connected nodes
        svg.selectAll<SVGTextElement, SimNode>('.node-label')
          .attr('opacity', n => connectedSlugs.has(n.slug) ? 1 : (n.slug === d.slug ? 1 : 0))

        // Tooltip
        const tooltip = tooltipRef.current
        if (tooltip) {
          tooltip.innerHTML = `
            <div class="${styles.tooltipName}">${d.name}</div>
            <div class="${styles.tooltipNameZh}">${d.name_zh}</div>
            <div class="${styles.tooltipDesc}">${d.desc}</div>
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

        // Hide all labels
        svg.selectAll('.node-label')
          .attr('opacity', 0)

        // Hide tooltip
        const tooltip = tooltipRef.current
        if (tooltip) {
          tooltip.classList.remove(styles.tooltipVisible)
        }
      })
      .on('click', (_event, d) => {
        navigate(`/frameworks/${d.slug}`)
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
  }, [navigate])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Relationship Map</h1>
      <div className={styles.filters}>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategories.has(cat.key) ? styles.filterBtnActive : ''}`}
            style={
              activeCategories.has(cat.key)
                ? { background: cat.colorText, borderColor: cat.colorText, color: 'white' }
                : undefined
            }
            onClick={() => toggleCategory(cat.key)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <div className={styles.svgContainer} ref={containerRef}>
        <svg ref={svgRef} />
        <div ref={tooltipRef} className={styles.tooltip} />
      </div>
      <Link to="/" className={styles.backLink}>&larr; Back to all frameworks</Link>
    </div>
  )
}
