# S25: Horizontal Scroll Cards — Design Spec

## Goal
Replace the homepage's vertical card grid per category with a horizontal scrollable card row. All scroll interactions (wheel, arrows, touch) go through a single lerp engine for silk-smooth motion. "Show All" expands the row into a full grid with FLIP animation.

## Current State
- `CategorySection` renders header + `CardGrid` (sliced to 6 cards) + "View all → category page" link
- `CardGrid` is a CSS `grid` with `repeat(auto-fill, minmax(240px, 1fr))`
- 13 categories × 15-27 cards = 239 cards all rendered vertically

## Design

### Default: Horizontal Scroll Row
Each category section shows a single horizontal row of ALL its cards (not sliced).

**Container:**
- `display: flex; flex-wrap: nowrap; overflow: hidden` (hidden because we own scrolling)
- Cards have fixed width (~220px) and no shrink
- Left/right arrow buttons overlay the edges (fade out when at boundary)

**Scroll Engine (`useHorizontalScroll` hook):**
- Single lerp loop drives ALL scroll: `current += (target - current) * 0.12`
- `requestAnimationFrame` loop runs only when `|target - current| > 0.5`
- Three input sources, all setting `target`:
  1. **Wheel**: `onWheel` → `preventDefault()`, `target += deltaY * multiplier`
  2. **Arrow buttons**: click → `target += containerWidth * 0.8` (scroll ~80% of visible area)
  3. **Touch**: native overflow-x scroll (no lerp on mobile — native momentum is better)
- `target` clamped to `[0, scrollWidth - clientWidth]`

**Arrow Buttons:**
- Left `‹` / Right `›` positioned absolute at container edges
- Semi-transparent background with blur
- Fade out (opacity 0, pointer-events none) when at scroll boundary
- Match Minimal Scholar aesthetic (mono font, muted colors)

### Show All: Expand to Grid
A "Show all N" button below the horizontal row. On click:

1. **FLIP Phase 1 (First):** Record each card's current `getBoundingClientRect()`
2. **Layout Change:** Toggle state → container switches to `flex-wrap: wrap` (or CSS grid)
3. **FLIP Phase 2 (Last):** Record each card's new position
4. **FLIP Phase 3 (Invert + Play):** Apply `transform` offset to each card, then animate `transform` to `none` with `transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)`

Clicking "Show all" again collapses back to horizontal row (reverse FLIP).

### Edge Cases
- **Search/filter active:** Keep existing flat grid layout (CategorySection not rendered when single category or search active — HomePage renders `CardGrid` directly)
- **Mobile (≤768px):** No wheel interception. Container uses `overflow-x: auto` with `-webkit-overflow-scrolling: touch`. Arrow buttons hidden. "Show all" still works.
- **0 or 1 card:** No arrows, no horizontal scroll (container fits without scrolling)

## Files

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useHorizontalScroll.ts` | Create | Lerp scroll engine hook |
| `src/components/CategorySection.tsx` | Rewrite | Horizontal row + arrows + show all toggle |
| `src/components/CategorySection.module.css` | Rewrite | Horizontal layout + arrows + grid expand |
| `src/components/CardGrid.tsx` | No change | Still used by other pages and search results |

## Success Criteria
- Homepage scroll height reduced ~70% (13 single rows vs 13 full grids)
- All scroll motion (wheel, arrow, touch) is smooth — no jerky jumps
- "Show all" FLIP animation is fluid, no layout thrash
- 51+ E2E tests pass
- Build clean, no new dependencies
