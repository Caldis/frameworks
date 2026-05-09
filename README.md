# SDFrame

317 Software Design Frameworks — a curated, bilingual knowledge base for engineers, architects, and AI agents.

**[sdframe.caldis.me](https://sdframe.caldis.me/)** | Inspired by [PMFrame.works](https://pmframe.works/)

## Overview

SDFrame organizes software design frameworks across 13 categories, spanning the full software lifecycle from design thinking to AI-native collaboration patterns. Each framework includes:

- Bilingual content (EN/ZH) with natural translations
- 5 actionable implementation steps with visual diagrams
- Multi-dimensional taxonomy (abstraction level, maturity, quality concerns)
- Provenance citations to authoritative sources
- Typed relationships to related frameworks (alternative, complement, extends, prerequisite)

## Categories

| # | Category | Frameworks | Description |
|---|----------|-----------|-------------|
| 1 | Design Thinking | 23 | Mental models, design philosophies, problem framing |
| 2 | Architecture Decisions | 31 | Architectural patterns, trade-off analysis, system decomposition |
| 3 | Coding Practices | 46 | Code-level design, GoF patterns, implementation |
| 4 | Quality Engineering | 25 | Testing strategies, reliability, observability |
| 5 | Deployment & Operations | 20 | DevOps, SRE, infrastructure patterns |
| 6 | Evolution & Iteration | 21 | Refactoring, tech debt, migration, team scaling |
| 7 | AI Collaboration | 25 | Agent architecture, LLM design, human-AI workflows |
| 8 | Data Architecture | 20 | Storage, streaming, data modeling patterns |
| 9 | Security & Privacy | 21 | Threat modeling, zero trust, privacy by design |
| 10 | Distributed Systems | 22 | Consensus, consistency, fault tolerance |
| 11 | API Design & Integration | 21 | REST, GraphQL, gRPC, versioning |
| 12 | Team & Organization | 21 | Team topologies, engineering culture, inner source |
| 13 | Observability & DX | 21 | Tracing, SLOs, developer experience |

## Features

### Knowledge Base
- **317 frameworks** with 39 fields each — bilingual, authoritative, cross-referenced
- **Multi-dimensional taxonomy** — filter by abstraction level (Code/Component/System/Organization), maturity ring, quality concerns (ISO 25010)
- **Typed relationships** — 5 relation types: alternative, complement, extends, prerequisite, related
- **Provenance** — primary source citations and recommended reading per category

### Pages
- **Home** — horizontal scroll card rows with lerp engine, staggered entrance, fingerprint radars
- **Framework Detail** — 11-section layout, scroll progress bar, section nav dots, entrance animations, similarity recommendations
- **Category Landing** — category overview with AI cross-reference and reading list
- **Relationship Map** — D3 force graph with label collision detection, typed edges, search, side panel
- **Compare** — searchable framework picker, radar chart overlay, deep links, diff highlighting
- **Selector** — 4-step wizard to find frameworks matching your situation
- **Learning Paths** — curated sequences to master software design step by step
- **Insights** — editorial data visualizations (category bars, dimension triptych, quality grid, heatmap, adopter sizing)
- **Timeline** — frameworks plotted by origin year, grouped by decade

### Technical
- **Dark mode** — warm-tinted palette, auto-detect + manual toggle, 55+ CSS variables
- **Two-tier data loading** — listing stubs generated upfront; detail data lazy-loaded per category
- **Search autocomplete** — dropdown suggestions with keyboard navigation and text highlighting
- **PWA** — service worker, manifest, offline caching
- **i18n** — full language switching with browser auto-detection
- **SEO** — Open Graph meta tags, sitemap, per-page titles
- **54 E2E tests** — smoke, visual/a11y, interaction state, data display, screenshots
- **Mobile** — bottom tab navigation, responsive layouts, touch scroll snap

## Tech Stack

- **Vite 6** + **React 19** + **TypeScript**
- **React Router 7** — client-side routing with lazy-loaded pages
- **Recharts** — radar charts, data visualization
- **D3.js** — force-directed relationship graph
- **Playwright** — E2E testing
- **CSS Modules** — Minimal Scholar aesthetic (serif headers, warm palette)
- **GitHub Actions** — CI/CD to GitHub Pages

## Development

```bash
npm install
npm run dev        # Dev server
npm run build      # Production build
npm run test:e2e   # Run Playwright E2E tests
```

### Data Pipeline

Framework data lives in `data/frameworks/*.json` (one file per category). A pre-build script generates lightweight listing stubs for fast initial load:

```
data/frameworks/*.json  →  scripts/generate-stubs.js  →  src/data/generated/stubs.json (upfront)
                        →  dynamic import() per category (on demand)
```

### Project Structure

```
data/frameworks/         # 13 JSON files (317 frameworks)
scripts/                 # Build scripts (stubs, sitemap)
src/
  components/            # Reusable UI (cards, filters, modal, viz)
  data/                  # Loader (sync stubs + async detail), categories
  hooks/                 # useSearch, useFavorites, useFrameworkDetail
  i18n/                  # Internationalization (EN/ZH)
  pages/                 # Route pages (7 pages)
  styles/                # Global CSS and custom properties
e2e/                     # Playwright E2E tests
.harness/                # AI agent workflow (sprint planning, evaluation)
```

### Adding Frameworks

1. Add entries to the appropriate `data/frameworks/<category>.json`
2. Run `node scripts/generate-stubs.js` to regenerate listing stubs
3. Verify: `npm run build && npx playwright test`

### Adding a Language

1. Create `src/i18n/locales/<lang>.ts` implementing `LocaleStrings`
2. Add the locale to `Locale` type in `src/i18n/types.ts`
3. Register in `src/i18n/context.tsx`
4. Update `LanguageSwitcher` component
5. Add `_<lang>` suffix fields to framework data

## License

MIT
