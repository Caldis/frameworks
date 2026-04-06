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

## Current State (as of 2026-04-06, end of Sprint S10)

### What Exists
- 194 software design frameworks across 13 categories
- Each framework has 38 fields: basic + extended + taxonomy (abstraction_level, quality_concerns, maturity_ring) + provenance (primary_source, secondary_sources)
- 13 categories: 7 original lifecycle + 6 new (Data Architecture, Security & Privacy, Distributed Systems, API Design, Team & Organization, Observability & DX)
- Full bilingual content (EN/ZH) with i18n system (useI18n hook, locale files)
- Pages: Home (card grid + search + filter + favorites + modal), Framework Detail (11-section progressive layout), Category Landing (with AI cross-category view), Relationship Map (D3 force graph with lifecycle X-axis + complexity Y-axis)
- LanguageSwitcher in header, browser auto-detection, localStorage persistence
- FrameworkViz: Recharts RadarChart + HTML/CSS layouts for 8 viz types
- Code splitting: lazy routes + manual chunks (vendor, charts, d3, framework-data)
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

### What Exists (continued)
- Pages: Home (grouped by category + multi-dimension filter), Framework Detail (11 sections), Category Landing, Map (search + touch + 13 categories), Compare (side-by-side)
- 40 E2E tests: smoke(9) + visual/a11y(8) + interaction(6) + data-display(7) + screenshots(10)
- Harness: 4-gate evaluation, sprint boundary discipline, model selection guide, operational patterns

### Known Issues
- **Nothing Design visual overhaul incomplete** — S23 changed tokens/fonts but missed the core aesthetic: needs OLED dark mode, Doto hero numbers, segmented progress bars, instrument-panel feel. Current result is "monochrome light theme" not "Nothing industrial". Needs fresh session with full design rethink.
- No SSG yet (client-side only, SPA + 404 redirect)

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
