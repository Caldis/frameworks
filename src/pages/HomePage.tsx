import { useState, useMemo, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { CategoryKey, Framework } from '../types'
import { getAllFrameworks, getFrameworksByCategory, getRelatedFrameworks } from '../data/loader'
import { categories } from '../data/categories'
import { useSearch } from '../hooks/useSearch'
import { useFavorites } from '../hooks/useFavorites'
import { useKeyboard } from '../hooks/useKeyboard'
import { useI18n } from '../i18n'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import DimensionFilter from '../components/DimensionFilter'
import Favorites from '../components/Favorites'
import CardGrid from '../components/CardGrid'
import CategorySection from '../components/CategorySection'
import Modal from '../components/Modal'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [absFilter, setAbsFilter] = useState<string[]>([])
  const [matFilter, setMatFilter] = useState<string[]>([])
  const [qualFilter, setQualFilter] = useState<string[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  // Dimension filter options
  const abstractionOptions = useMemo(() => [
    { key: 'code', label: t.abstractionCode },
    { key: 'component', label: t.abstractionComponent },
    { key: 'system', label: t.abstractionSystem },
    { key: 'organization', label: t.abstractionOrganization },
  ], [t])

  const maturityOptions = useMemo(() => [
    { key: 'foundational', label: t.maturityFoundational },
    { key: 'established', label: t.maturityEstablished },
    { key: 'emerging', label: t.maturityEmerging },
    { key: 'experimental', label: t.maturityExperimental },
  ], [t])

  const qualityOptions = useMemo(() => [
    { key: 'reliability', label: t.qualityReliability },
    { key: 'security', label: t.qualitySecurity },
    { key: 'performance', label: t.qualityPerformance },
    { key: 'maintainability', label: t.qualityMaintainability },
    { key: 'scalability', label: t.qualityScalability },
    { key: 'usability', label: t.qualityUsability },
    { key: 'testability', label: t.qualityTestability },
    { key: 'observability', label: t.qualityObservability },
    { key: 'portability', label: t.qualityPortability },
  ], [t])

  // Get frameworks by category
  const byCategory = activeCategory
    ? getFrameworksByCategory(activeCategory)
    : getAllFrameworks()

  // Filter chain: category -> abstraction -> maturity -> quality
  const dimensionFiltered = useMemo(() => {
    let result = byCategory
    if (absFilter.length > 0)
      result = result.filter(f => absFilter.includes(f.abstraction_level ?? ''))
    if (matFilter.length > 0)
      result = result.filter(f => matFilter.includes(f.maturity_ring ?? ''))
    if (qualFilter.length > 0)
      result = result.filter(f => f.quality_concerns?.some(q => qualFilter.includes(q)) ?? false)
    return result
  }, [byCategory, absFilter, matFilter, qualFilter])

  // Search within filtered results
  const { query, setQuery, filtered } = useSearch(dimensionFiltered)

  // Favorites
  const { favorites, toggleFavorite } = useFavorites()

  // Keyboard
  useKeyboard({
    onSearch: () => searchRef.current?.focus(),
    onEscape: () => {
      setModalIndex(null)
      searchRef.current?.blur()
    },
    onLeft: () => {
      setModalIndex(prev =>
        prev !== null && prev > 0 ? prev - 1 : prev
      )
    },
    onRight: () => {
      setModalIndex(prev =>
        prev !== null && prev < filtered.length - 1 ? prev + 1 : prev
      )
    },
  })

  // Category counts
  const allFrameworks = getAllFrameworks()
  const counts = {
    all: allFrameworks.length,
    ...Object.fromEntries(
      categories.map(c => [c.key, getFrameworksByCategory(c.key).length])
    ),
  } as Record<CategoryKey | 'all', number>

  // Modal navigation
  const currentFw = modalIndex !== null ? filtered[modalIndex] : null
  const relatedFws = currentFw ? getRelatedFrameworks(currentFw) : []

  const handleCardClick = useCallback(
    (fw: Framework) => {
      const idx = filtered.findIndex(f => f.slug === fw.slug)
      if (idx !== -1) setModalIndex(idx)
    },
    [filtered]
  )

  return (
    <>
      {/* Hero section */}
      <div className={styles.hero}>
        <h1 className={styles.title}>
          {t.siteTitleLine1}
          <br />
          <span className={styles.titleItalic}>{t.siteTitleLine2}</span>
        </h1>
        <p className={styles.subtitle}>
          {t.siteSubtitle}
        </p>
        <a
          href="https://pmframe.works/"
          className={styles.inspiredBy}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.inspiredBy}
        </a>
      </div>

      {/* Sticky controls bar */}
      <div className={styles.controls}>
        <SearchBar value={query} onChange={setQuery} inputRef={searchRef} />
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          counts={counts}
        />
        <span className={styles.count}>
          {t.showingXofY.replace('{shown}', String(filtered.length)).replace('{total}', String(allFrameworks.length))}
        </span>
        <button
          className={styles.filterToggle}
          onClick={() => setShowAdvanced(prev => !prev)}
        >
          Filters {showAdvanced ? '\u25b4' : '\u25be'}
        </button>
        <Link to="/map" className={styles.mapLink}>
          {t.map}
        </Link>
        {showAdvanced && (
          <div className={styles.advancedFilters}>
            <DimensionFilter
              label={t.filterAbstraction}
              options={abstractionOptions}
              active={absFilter}
              onChange={setAbsFilter}
            />
            <DimensionFilter
              label={t.filterMaturity}
              options={maturityOptions}
              active={matFilter}
              onChange={setMatFilter}
            />
            <DimensionFilter
              label={t.filterQuality}
              options={qualityOptions}
              active={qualFilter}
              onChange={setQualFilter}
            />
          </div>
        )}
      </div>

      {/* Favorites section */}
      <Favorites
        favorites={favorites}
        frameworks={allFrameworks}
        onCardClick={handleCardClick}
        onToggleFavorite={toggleFavorite}
      />

      {/* Main card grid or empty state */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          {t.noResults.replace('{query}', query)}
        </div>
      ) : activeCategory === null && !query ? (
        // Grouped view: render per-category sections
        categories.map(cat => {
          const catFrameworks = dimensionFiltered.filter(f => f.category === cat.key)
          if (catFrameworks.length === 0) return null
          return (
            <CategorySection
              key={cat.key}
              category={cat}
              frameworks={catFrameworks}
              onCardClick={handleCardClick}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )
        })
      ) : (
        // Single category or search results: flat grid
        <CardGrid
          frameworks={filtered}
          onCardClick={handleCardClick}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Modal */}
      <Modal
        framework={currentFw}
        onClose={() => setModalIndex(null)}
        onPrev={() =>
          setModalIndex(prev =>
            prev !== null && prev > 0 ? prev - 1 : prev
          )
        }
        onNext={() =>
          setModalIndex(prev =>
            prev !== null && prev < filtered.length - 1 ? prev + 1 : prev
          )
        }
        hasPrev={modalIndex !== null && modalIndex > 0}
        hasNext={modalIndex !== null && modalIndex < filtered.length - 1}
        relatedFrameworks={relatedFws}
      />
    </>
  )
}
