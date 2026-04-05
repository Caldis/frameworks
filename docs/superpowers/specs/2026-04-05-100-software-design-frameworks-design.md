# 100 Software Design Frameworks — Design Spec

## Overview

A curated collection of 100 software design frameworks organized across the software lifecycle, targeting engineers, architects, tech leads, and AI Agent developers. Replicates the architecture and visual experience of [pmframe.works](https://pmframe.works/) with enhanced features including individual framework pages, category landing pages, and a framework relationship graph.

**Audience**: Software engineers, architects, CTOs, AI Agent developers
**Language**: Bilingual (EN/ZH) with hover-toggle; English-first for terminology
**Deploy**: GitHub Pages via `username.github.io/frameworks`

---

## Information Architecture

```
/                           → Home (Hero + card grid + search/filter + favorites)
/frameworks/[slug]          → Individual framework detail page
/category/[cat-slug]        → Category landing page
/category/ai                → AI Collaboration flagship landing (cross-category AI roundup)
/map                        → Framework relationship graph (force-directed)
```

## Content Structure

### 7 Categories (Software Lifecycle)

| # | Key | Name (EN) | Name (ZH) | Color BG | Color Text | Count |
|---|-----|-----------|-----------|----------|------------|-------|
| 1 | thinking | Design Thinking | 设计思考 | #e8f5ee | #2d6a4f | 14 |
| 2 | architecture | Architecture Decisions | 架构决策 | #e8eef8 | #1a5276 | 14 |
| 3 | coding | Coding Practices | 编码实践 | #ede8f8 | #6c3483 | 15 |
| 4 | quality | Quality Engineering | 质量保障 | #fce8e8 | #922b21 | 15 |
| 5 | deployment | Deployment & Operations | 部署运维 | #fdf3e3 | #7d6608 | 14 |
| 6 | evolution | Evolution & Iteration | 演进迭代 | #e8f8e8 | #1e8449 | 14 |
| 7 | ai | AI Collaboration | AI 协作 | #f8e8e3 | #a04000 | 14 |

**Total: 100 frameworks**

### AI Content Distribution
- AI-relevant frameworks are **distributed across all 7 categories** (each category has 2-8 AI-tagged items)
- Category 7 (AI Collaboration) is the **flagship AI category** — all 14 entries are AI-native
- `/category/ai` landing page aggregates all AI-relevant frameworks across categories

### Data Model

```typescript
type CategoryKey = 'thinking' | 'architecture' | 'coding' | 'quality' | 'deployment' | 'evolution' | 'ai';
type VizType = 'matrix' | 'flow' | 'pyramid' | 'cycle' | 'venn' | 'radar' | 'tree' | 'timeline';

interface Framework {
  id: number;              // 1-100
  name: string;            // English canonical name
  name_zh: string;         // Chinese name (established translation or keep English)
  slug: string;            // URL-safe identifier
  category: CategoryKey;
  desc: string;            // ~60 char English description
  desc_zh: string;         // ~60 char Chinese description
  steps: string[];         // Exactly 5 implementation steps (EN)
  steps_zh: string[];      // Exactly 5 steps (ZH)
  ai_relevant: boolean;    // AI Agent relevance flag
  viz_type: VizType;       // SVG visualization type
  related: string[];       // Slugs of related frameworks (cross-links)
  tags: string[];          // Searchable tags
}
```

### Data Source

Framework data is stored as JSON files in `/data/frameworks/`:
- `data/frameworks/thinking.json` — 14 entries
- `data/frameworks/architecture.json` — 14 entries
- `data/frameworks/coding.json` — 15 entries
- `data/frameworks/quality.json` — 15 entries
- `data/frameworks/deployment.json` — 14 entries
- `data/frameworks/evolution.json` — 14 entries
- `data/frameworks/ai.json` — 14 entries

A build script merges all JSON into a single `data/all-frameworks.json` for the client.

### Duplicate Resolution

8 duplicates were identified across categories (from parallel research). These slots will be filled with unique replacements:

| Duplicate | In Category | Replace With |
|-----------|------------|--------------|
| DDD | architecture | CQRS Pattern |
| Twelve-Factor App | architecture | Saga Pattern |
| Strangler Fig | architecture | Actor Model |
| ReAct Agent | architecture | Dependency Injection |
| Multi-Agent Orch | architecture | Service Mesh Pattern |
| TDD | coding | CQRS at Code Level → replaced with: Semantic Versioning |
| Context Window Mgmt | coding | replaced with: Contract Testing |

Final list: 100 unique frameworks, no duplicates.

---

## Visual Design

### Style: Minimal Scholar
Faithful to pmframe.works aesthetic — serif + sans-serif typography pairing, warm neutral palette, academic elegance.

### Typography
- **Headlines**: DM Serif Display (serif), responsive `clamp(36px, 5vw, 64px)`
- **Body**: DM Sans (sans-serif), 15px base, line-height 1.6
- **Code/Labels/Numbers**: JetBrains Mono (monospace), used for framework IDs, category tags, metadata

### Colors
- Background: `#faf9f6` (warm white)
- Text: `#1a1916`
- Surface/hover: `#f8f7f4`
- Border: `#e8e6e1`
- 7 category colors: see table above (pastel background + dark text pill)

### Layout
- Max-width: `1600px`, centered
- Horizontal padding: `48px` desktop, `20px` mobile
- Vertical rhythm: `32px`

---

## Page Designs

### Home `/`

1. **Header** (64px top padding)
   - Domain badge (monospace)
   - `h1` serif title + italic subtitle
   - Description copy
   - Decorative semi-transparent circles (::before, ::after pseudo-elements)

2. **Sticky Controls Bar** (z-index 10)
   - Search input with magnifier icon + keyboard shortcut hint (⌘K / Ctrl+K)
   - 7 category filter buttons with counts + "All" button
   - Framework count display
   - Link to `/map`

3. **Favorites Section** (conditional, shown when favorites exist)
   - Golden star icon (#e8a820) + count
   - Separate grid for favorited frameworks
   - Persisted via localStorage

4. **Main Card Grid**
   - CSS Grid: `auto-fill, minmax(240px, 1fr)`
   - 1px border between cards (shared border technique)
   - Empty state for zero search results

5. **Framework Card**
   - Number: `# 01` (padded, monospace)
   - Star button: absolute top-right, appears on hover, persists when favorited
   - Ghost SVG: visualization type indicator, bottom-right, 100x100px, low opacity
   - Name: 14px bold
   - Category tag: colored pill (10px monospace)
   - Description: 12.5px, truncated ~60 chars
   - Click → opens Modal (quick preview)

6. **Quick Preview Modal**
   - Fixed overlay with backdrop blur
   - Centered, 640px max-width, 560px height
   - Arrow navigation (← →) desktop + keyboard + touch swipe
   - Content: large SVG with assembly animation + 5 steps + related frameworks
   - "View Details →" link to `/frameworks/[slug]`
   - Keyboard: Escape to close, ← → to navigate, ⌘K to search

7. **Footer**
   - Domain + copyright + creator link

### Framework Detail `/frameworks/[slug]`

1. Breadcrumb: Home > Category Name > Framework Name
2. Framework title (serif, large) + category pill + AI badge (if relevant)
3. SVG visualization (large, centered, with staggered assembly animation)
4. Bilingual description (EN default, ZH on hover with opacity transition)
5. 5 implementation steps (numbered, bilingual toggle)
6. Related frameworks section: 2-4 linked cards
7. Prev/Next framework navigation (within same category)
8. Back to category link

### Category Landing `/category/[slug]`

1. Category name (serif) + category color theme
2. Category description (what this lifecycle phase covers)
3. Stats: total count + AI-relevant count
4. Framework card grid (same component as home, filtered to this category)
5. AI-relevant frameworks highlighted with subtle border glow

### AI Landing `/category/ai`

Same as regular category landing, plus:
1. "AI Across All Categories" section below the main grid
2. Groups AI-relevant frameworks from other 6 categories
3. Each group shows category name + its AI-tagged frameworks

### Relationship Map `/map`

1. Force-directed graph (D3.js or react-force-graph)
2. Nodes = frameworks, colored by category, sized by connection count
3. Edges = `related` field connections
4. Category filter toggles visibility
5. Click node → tooltip with name + desc → click again → navigate to detail page
6. Zoom + pan controls

---

## Interactions & Animations

| Element | Trigger | Animation |
|---------|---------|-----------|
| Card | hover | bg transition to `#f8f7f4`, ghost SVG opacity 0.07→0.13 |
| Modal | open | slide-up 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94) + backdrop blur |
| SVG viz | modal/page open | staggered rotate/translate assembly, 0.05-0.7s delays |
| Search | input | real-time filter, debounced 150ms |
| Bilingual text | hover | opacity cross-fade EN↔ZH |
| Star | click | scale bounce 1.0→1.2→1.0, color fill animation |
| Category pill | hover | subtle scale 1.02 |
| Map nodes | hover | tooltip fade-in, connected edges highlight |
| Navigation hint | first visit | toast fade-in/out "⌨️ ← → to navigate" (once per session) |
| Domain name | hover | rainbow gradient + letter-spacing increase |

---

## Tech Stack

```
Vite 6 + React 19 + TypeScript
├── vite-ssg              — Static site generation (prerender all routes)
├── React Router v7        — Client-side routing (SPA after hydration)
├── D3.js                  — Force-directed relationship graph (/map)
├── CSS Modules            — Scoped styles, no utility framework
├── JSON data files        — Framework content (7 category files)
└── GitHub Actions → gh-pages  — CI/CD deployment
```

### No Tailwind
Intentional: the Minimal Scholar style relies on precise, hand-tuned CSS that matches the pmframe.works aesthetic. CSS Modules with CSS custom properties for theming.

### SSG Strategy
- All 100 framework detail pages + 7 category pages + home + map = ~110 static HTML pages
- Vite-ssg prerendrs at build time
- Client-side hydration enables SPA navigation, modal interactions, search
- Data embedded in each page's HTML for instant rendering, no API calls

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| > 1100px | Full desktop layout, all features |
| 900px | Header collapses to single column |
| 768px | Modal arrows hidden, touch swipe enabled, map simplified |
| 600px | Single-column card grid, full-width search, modal meta panel hidden |

---

## File Structure

```
frameworks/
├── public/
│   └── favicon.svg
├── data/
│   └── frameworks/
│       ├── thinking.json
│       ├── architecture.json
│       ├── coding.json
│       ├── quality.json
│       ├── deployment.json
│       ├── evolution.json
│       └── ai.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── routes.tsx
│   ├── types.ts                    — Framework, Category types
│   ├── data/
│   │   ├── loader.ts               — JSON import + merge
│   │   └── categories.ts           — Category metadata + colors
│   ├── components/
│   │   ├── Layout.tsx              — Header + Footer shell
│   │   ├── CardGrid.tsx            — Responsive card grid
│   │   ├── FrameworkCard.tsx        — Individual card
│   │   ├── Modal.tsx               — Quick preview modal
│   │   ├── SearchBar.tsx           — Search + keyboard shortcut
│   │   ├── CategoryFilter.tsx      — Filter buttons
│   │   ├── Favorites.tsx           — Favorites section
│   │   ├── FrameworkViz.tsx        — SVG visualization renderer
│   │   ├── StepsList.tsx           — 5-step implementation list
│   │   ├── RelatedFrameworks.tsx   — Cross-link cards
│   │   └── BilingualText.tsx       — EN/ZH hover toggle
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── FrameworkPage.tsx
│   │   ├── CategoryPage.tsx
│   │   └── MapPage.tsx
│   ├── hooks/
│   │   ├── useFavorites.ts         — localStorage persistence
│   │   ├── useSearch.ts            — Debounced search logic
│   │   └── useKeyboard.ts         — Keyboard shortcuts
│   └── styles/
│       ├── globals.css             — CSS custom properties, reset, typography
│       ├── card.module.css
│       ├── modal.module.css
│       ├── map.module.css
│       └── page.module.css
├── scripts/
│   └── merge-data.ts              — Build script: merge JSONs
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml             — GitHub Pages CI/CD
```

---

## Deployment

- **GitHub Actions** workflow triggers on push to `master`
- Runs `npm run build` (Vite SSG generates static files)
- Deploys `dist/` to `gh-pages` branch
- GitHub Pages serves from `gh-pages` branch
- Base URL: `/frameworks/` (configured in `vite.config.ts`)

---

## Scope Boundaries

**In scope:**
- 100 unique frameworks with full bilingual content
- All page types: home, detail, category, map
- Search, filter, favorites, modal, keyboard navigation
- SVG visualizations per framework (8 viz types)
- Responsive design (4 breakpoints)
- GitHub Pages deployment

**Out of scope (future):**
- User accounts / auth
- Comments or discussions
- Framework submission by users
- Dark mode toggle (single light theme)
- i18n beyond EN/ZH
- Analytics (can be added later)
- Custom domain
