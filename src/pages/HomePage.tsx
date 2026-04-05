import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import type { CategoryKey, Framework } from '../types'
import { getAllFrameworks, getFrameworksByCategory, getRelatedFrameworks } from '../data/loader'
import { categories } from '../data/categories'
import { useSearch } from '../hooks/useSearch'
import { useFavorites } from '../hooks/useFavorites'
import { useKeyboard } from '../hooks/useKeyboard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import Favorites from '../components/Favorites'
import CardGrid from '../components/CardGrid'
import Modal from '../components/Modal'
import styles from './HomePage.module.css'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null)
  const [modalIndex, setModalIndex] = useState<number | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Get frameworks by category
  const byCategory = activeCategory
    ? getFrameworksByCategory(activeCategory)
    : getAllFrameworks()

  // Search within category
  const { query, setQuery, filtered } = useSearch(byCategory)

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
          100 Software Design
          <br />
          <span className={styles.titleItalic}>Frameworks</span>
        </h1>
        <p className={styles.subtitle}>
          A curated collection for engineers, architects, and AI agents
        </p>
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
          Showing {filtered.length} of {allFrameworks.length}
        </span>
        <Link to="/map" className={styles.mapLink}>
          Map
        </Link>
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
          No frameworks found for &lsquo;{query}&rsquo;
        </div>
      ) : (
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
