# SDFrame — Project State

> This file is the **single source of truth** for any agent session resuming work on SDFrame.
> Read this FIRST before doing anything. Updated after each sprint.

## Project Identity

- **Name**: SDFrame
- **Domain**: sdframe.caldis.me
- **Repo**: github.com/Caldis/frameworks
- **Stack**: Vite 6 + React 19 + TypeScript + Recharts + D3 + CSS Modules
- **Deploy**: GitHub Actions → GitHub Pages (custom domain)
- **Inspired by**: pmframe.works

## Current State (as of 2026-04-08, end of Sprint S35)

### What Exists
- 239 software design frameworks across 13 categories, 39 fields per framework
- Full bilingual content (EN/ZH) with i18n system (useI18n hook, locale files)
- 11 pages: Home (horizontal scroll cards + lerp engine), Framework Detail (11-section progressive layout + async detail loading), Category Landing (AI cross-category + reading list), Map (D3 force graph + label collision detection), Compare (radar chart + suggestions + diff highlighting), Selector (4-step wizard), Paths (learning sequences), Insights (editorial data viz), Timeline (by origin year), plus Layout shell
- Dark mode: warm-tinted dark palette, prefers-color-scheme auto-detect + manual toggle (☽/☀), 55+ CSS variables, all category colors adapted
- Two-tier data loading: stubs upfront (603KB), 13 per-category detail chunks loaded on demand
- Search autocomplete: dropdown suggestions with keyboard nav (↑/↓/Enter/Esc), category dots, author tags
- PWA: Service worker (cache-first assets, network-first navigation), manifest.json, offline support
- Keyboard shortcuts: ? toggle help panel
- LanguageSwitcher + ThemeToggle in header
- FrameworkViz: Recharts RadarChart + HTML/CSS layouts for 8 viz types
- Code splitting: lazy routes + manual chunks (vendor, charts, d3)
- GitHub Actions CI/CD, SPA 404 redirect, CNAME for custom domain

### Completed Sprints
- S00: Initial build (100 frameworks, 7 categories)
- S01: Code splitting (index 1019KB → 36KB)
- S02: Expand to 160 frameworks, 13 categories (+60)
- S03: Deepen to 194 frameworks (+34, from authoritative sources)
- S04: Multi-dimensional taxonomy (abstraction, quality, maturity)
- S05: Provenance citations + reading lists
- S06: Playwright E2E tests (33 tests)
- S07: Homepage category grouping + Map labels + Mobile UX
- S08: Design Debt cleanup (H2 hierarchy, focus-visible, modal, warnings)
- S09: Compare page + Map 13-category fix
- S10-S22: Map UX, Selector, Paths, SEO, typed relations, design patterns, visual fixes
- S23: Compare Page Enhancement (radar chart, suggestions, diff highlighting)
- S24: Data Performance 76% + Card Metadata (two-tier loading, complexity/author on cards)
- S25: Horizontal scroll cards + lerp engine + FLIP expand animation
- S26: Map label collision detection (greedy placement + zoom-aware thresholds)
- S27: Dark Mode (warm-tinted palette, 71 hardcoded colors → CSS variables)
- S28: Insights page (editorial data viz — 8 pure CSS visualization sections)
- S29: Search autocomplete (dropdown, keyboard nav, quick-jump)
- S30: Timeline page (frameworks by origin year, grouped by decade)
- S31: Keyboard shortcuts help panel (? toggle)
- S32: PWA (service worker, manifest, offline caching)
- S33: Hero countup animation (ease-out-quint number reveal)
- S34: Staggered card entrance animation (CSS @keyframes + --i delay)
- S35: Framework fingerprint radar (5-axis SVG glyph per card)

### Test Coverage
- 54 E2E tests: smoke(9) + visual/a11y(8) + interaction(6) + data-display(8) + screenshots(14, incl. dark mode + insights)
- Harness: 4-gate evaluation, sprint boundary discipline, model selection guide, operational patterns

### Known Issues
- No SSG yet (client-side only, SPA + 404 redirect)
- PROJECT_STATE file structure section outdated (still says "7 category data files")

### Key Lessons Learned (see .harness/evaluations/ for details)
- "Build passes" ≠ "works correctly" (S00 route bug, S09 map bug)
- Don't hardcode data lists — import from single source of truth
- When adding data, test ALL consumer pages
- Sonnet for CSS/content, Opus for components/logic
- Pre-sprint data audit prevents downstream issues
- Quick-win-after-retro prevents debt accumulation

### Architecture Decisions Made
- CSS Modules over Tailwind (Minimal Scholar aesthetic)
- JSON data files over CMS/API (static site, zero runtime dependencies)
- Category colors as CSS custom properties
- _zh suffix convention for bilingual data fields
- Recharts for charts, D3 only for the force graph

## Expansion Plan

### Phase 1: Expand to ~200 frameworks [DONE]
- Added 6 new categories (S02) + deepened 7 original (S03)
- Current: 194 frameworks across 13 categories

### Phase 2: Multi-dimensional taxonomy [NEXT — Sprint S04]
- Primary axis: Abstraction level (Code → Component → System → Organization)
- Secondary facets: Lifecycle stage, Quality concern (ISO 25010), Maturity ring
- Multi-filter UI on homepage

### Phase 3: Credibility layer
- Provenance block per framework (primary source, secondary sources, maturity)
- Reading list per category
- Link to original papers/books

## File Structure Quick Reference

```
data/frameworks/*.json     — 7 category data files (100 entries total)
src/i18n/locales/{en,zh}.ts — UI strings
src/i18n/types.ts           — LocaleStrings interface
src/types.ts                — Framework, Category interfaces
src/data/categories.ts      — 7 category definitions with colors
src/data/loader.ts          — Data access helpers
src/components/             — Reusable UI components
src/pages/                  — Route pages (Home, Framework, Category, Map)
src/hooks/                  — useSearch, useFavorites, useKeyboard
.github/workflows/deploy.yml — CI/CD
```
