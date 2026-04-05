# 100 Software Design Frameworks — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static website showcasing 100 software design frameworks, organized by 7 lifecycle categories, with individual pages, category landings, search/filter, favorites, and a relationship graph.

**Architecture:** Vite + React 19 + TypeScript SSG. JSON data files for 100 frameworks, prerendered to ~110 static HTML pages. CSS Modules for scoped styling with CSS custom properties for theming. D3.js for the relationship graph. GitHub Pages deployment via GitHub Actions.

**Tech Stack:** Vite 6, React 19, TypeScript, vite-ssg, React Router v7, D3.js, CSS Modules, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-04-05-100-software-design-frameworks-design.md`

---

## File Structure

```
frameworks/
├── data/frameworks/          — 7 JSON files (one per category)
│   ├── thinking.json
│   ├── architecture.json
│   ├── coding.json
│   ├── quality.json
│   ├── deployment.json
│   ├── evolution.json
│   └── ai.json
├── src/
│   ├── main.tsx              — Entry point, React hydration
│   ├── App.tsx               — Router setup
│   ├── types.ts              — Framework, Category interfaces
│   ├── data/
│   │   ├── categories.ts     — Category metadata (key, name, colors)
│   │   └── loader.ts         — Import & merge all JSON, expose helpers
│   ├── components/
│   │   ├── Layout.tsx + Layout.module.css
│   │   ├── CardGrid.tsx + CardGrid.module.css
│   │   ├── FrameworkCard.tsx + FrameworkCard.module.css
│   │   ├── Modal.tsx + Modal.module.css
│   │   ├── SearchBar.tsx + SearchBar.module.css
│   │   ├── CategoryFilter.tsx + CategoryFilter.module.css
│   │   ├── Favorites.tsx + Favorites.module.css
│   │   ├── FrameworkViz.tsx + FrameworkViz.module.css
│   │   ├── StepsList.tsx + StepsList.module.css
│   │   ├── RelatedFrameworks.tsx
│   │   └── BilingualText.tsx
│   ├── pages/
│   │   ├── HomePage.tsx + HomePage.module.css
│   │   ├── FrameworkPage.tsx + FrameworkPage.module.css
│   │   ├── CategoryPage.tsx + CategoryPage.module.css
│   │   └── MapPage.tsx + MapPage.module.css
│   ├── hooks/
│   │   ├── useFavorites.ts
│   │   ├── useSearch.ts
│   │   └── useKeyboard.ts
│   └── styles/
│       └── globals.css        — CSS reset, custom properties, typography
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .github/workflows/deploy.yml
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`

- [ ] **Step 1: Initialize project**

```bash
cd D:/Code/frameworks
npm init -y
npm install react@19 react-dom@19 react-router-dom@7
npm install -D vite@6 @vitejs/plugin-react typescript @types/react @types/react-dom vite-ssg
```

- [ ] **Step 2: Create vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/frameworks/',
})
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>100 Software Design Frameworks</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

- [ ] **Step 5: Create src/main.tsx stub**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/frameworks">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 6: Create src/App.tsx stub**

```tsx
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home — 100 Software Design Frameworks</div>} />
    </Routes>
  )
}
```

- [ ] **Step 7: Create src/styles/globals.css**

```css
:root {
  --bg: #faf9f6;
  --text: #1a1916;
  --surface: #f8f7f4;
  --border: #e8e6e1;
  --font-serif: 'DM Serif Display', Georgia, serif;
  --font-sans: 'DM Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Category colors */
  --cat-thinking-bg: #e8f5ee; --cat-thinking-text: #2d6a4f;
  --cat-architecture-bg: #e8eef8; --cat-architecture-text: #1a5276;
  --cat-coding-bg: #ede8f8; --cat-coding-text: #6c3483;
  --cat-quality-bg: #fce8e8; --cat-quality-text: #922b21;
  --cat-deployment-bg: #fdf3e3; --cat-deployment-text: #7d6608;
  --cat-evolution-bg: #e8f8e8; --cat-evolution-text: #1e8449;
  --cat-ai-bg: #f8e8e3; --cat-ai-text: #a04000;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 { font-family: var(--font-serif); font-weight: 400; }
```

- [ ] **Step 8: Verify dev server starts**

```bash
npx vite --open
```

Expected: Browser opens showing "Home — 100 Software Design Frameworks"

- [ ] **Step 9: Initialize git and commit**

```bash
git init
echo "node_modules/\ndist/\n.superpowers/" > .gitignore
git add -A
git commit -m "feat: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Data Consolidation & Deduplication

**Files:**
- Create: `data/frameworks/thinking.json`, `architecture.json`, `coding.json`, `quality.json`, `deployment.json`, `evolution.json`, `ai.json`
- Create: `src/types.ts`, `src/data/categories.ts`, `src/data/loader.ts`

**Context:** 7 agents produced framework JSON files. 5 are saved in root (`design-thinking.json`, `architecture-decisions.json`, `phase5-deployment-operations.json`, `evolution-iteration.json`, `ai-collaboration-frameworks.json`). 2 (coding, quality) were returned as output only — their content is available from the agent results in the spec. 8 duplicates must be replaced.

- [ ] **Step 1: Create src/types.ts**

```typescript
export type CategoryKey = 'thinking' | 'architecture' | 'coding' | 'quality' | 'deployment' | 'evolution' | 'ai'

export type VizType = 'matrix' | 'flow' | 'pyramid' | 'cycle' | 'venn' | 'radar' | 'tree' | 'timeline'

export interface Framework {
  id: number
  name: string
  name_zh: string
  slug: string
  category: CategoryKey
  desc: string
  desc_zh: string
  steps: string[]
  steps_zh: string[]
  ai_relevant: boolean
  viz_type: VizType
  related: string[]
  tags: string[]
}

export interface Category {
  key: CategoryKey
  name: string
  name_zh: string
  slug: string
  colorBg: string
  colorText: string
  description: string
  description_zh: string
}
```

- [ ] **Step 2: Create src/data/categories.ts**

```typescript
import type { Category } from '../types'

export const categories: Category[] = [
  {
    key: 'thinking', name: 'Design Thinking', name_zh: '设计思考', slug: 'thinking',
    colorBg: '#e8f5ee', colorText: '#2d6a4f',
    description: 'Mental models, philosophies, and thinking tools for approaching software design problems.',
    description_zh: '用于思考软件设计问题的心智模型、设计哲学和思维工具。',
  },
  {
    key: 'architecture', name: 'Architecture Decisions', name_zh: '架构决策', slug: 'architecture',
    colorBg: '#e8eef8', colorText: '#1a5276',
    description: 'Making and documenting architectural decisions — choosing patterns, evaluating trade-offs.',
    description_zh: '架构决策的制定与记录——模式选择、权衡评估、系统宏观结构。',
  },
  {
    key: 'coding', name: 'Coding Practices', name_zh: '编码实践', slug: 'coding',
    colorBg: '#ede8f8', colorText: '#6c3483',
    description: 'Implementation-level design — structuring code, managing complexity, writing maintainable software.',
    description_zh: '实现层面的设计——代码结构、复杂性管理、可维护软件编写。',
  },
  {
    key: 'quality', name: 'Quality Engineering', name_zh: '质量保障', slug: 'quality',
    colorBg: '#fce8e8', colorText: '#922b21',
    description: 'Testing strategies, reliability patterns, observability, and verification approaches.',
    description_zh: '测试策略、可靠性模式、可观测性与验证方法。',
  },
  {
    key: 'deployment', name: 'Deployment & Operations', name_zh: '部署运维', slug: 'deployment',
    colorBg: '#fdf3e3', colorText: '#7d6608',
    description: 'Deploying, operating, and running software systems in production.',
    description_zh: '软件系统的部署、运行与生产环境运维。',
  },
  {
    key: 'evolution', name: 'Evolution & Iteration', name_zh: '演进迭代', slug: 'evolution',
    colorBg: '#e8f8e8', colorText: '#1e8449',
    description: 'How software evolves — refactoring, tech debt, migration, team scaling.',
    description_zh: '软件演进——重构策略、技术债务、迁移模式、团队扩展。',
  },
  {
    key: 'ai', name: 'AI Collaboration', name_zh: 'AI 协作', slug: 'ai',
    colorBg: '#f8e8e3', colorText: '#a04000',
    description: 'Frameworks for the AI Agent era — human-AI collaboration, agent architecture, LLM application design.',
    description_zh: 'AI 智能体时代的框架——人机协作、智能体架构、大模型应用设计。',
  },
]

export function getCategoryByKey(key: string): Category | undefined {
  return categories.find(c => c.key === key)
}
```

- [ ] **Step 3: Move and restructure existing JSON files into data/frameworks/**

Move the 5 existing JSON files from root into `data/frameworks/` with standardized names. Add `id`, `category`, `related`, and `tags` fields to each entry. Remove duplicates from categories 2 and 3, replacing with:

**Architecture replacements (5 slots):**
1. DDD → **CQRS Pattern**: "Separate read and write models for scalability"
2. Twelve-Factor → **Saga Pattern**: "Manage distributed transactions via compensating actions"
3. Strangler Fig → **Actor Model**: "Concurrent computation via message-passing actors"
4. ReAct → **Dependency Injection Pattern**: "Invert control by injecting dependencies externally"
5. Multi-Agent → **Service Mesh Pattern**: "Infrastructure layer for service-to-service communication"

**Coding replacements (2 slots):**
1. TDD → **Semantic Versioning (SemVer)**: "Version APIs with major.minor.patch convention"
2. Context Window Mgmt → **Contract Testing**: "Verify service integrations via consumer-driven contracts"

Each replacement needs full `name`, `name_zh`, `slug`, `desc`, `desc_zh`, `steps[5]`, `steps_zh[5]`, `ai_relevant`, `viz_type` fields.

- [ ] **Step 4: Create src/data/loader.ts**

```typescript
import type { Framework, CategoryKey } from '../types'

import thinkingData from '../../data/frameworks/thinking.json'
import architectureData from '../../data/frameworks/architecture.json'
import codingData from '../../data/frameworks/coding.json'
import qualityData from '../../data/frameworks/quality.json'
import deploymentData from '../../data/frameworks/deployment.json'
import evolutionData from '../../data/frameworks/evolution.json'
import aiData from '../../data/frameworks/ai.json'

const allFrameworks: Framework[] = [
  ...thinkingData,
  ...architectureData,
  ...codingData,
  ...qualityData,
  ...deploymentData,
  ...evolutionData,
  ...aiData,
] as Framework[]

export function getAllFrameworks(): Framework[] {
  return allFrameworks
}

export function getFrameworkBySlug(slug: string): Framework | undefined {
  return allFrameworks.find(f => f.slug === slug)
}

export function getFrameworksByCategory(category: CategoryKey): Framework[] {
  return allFrameworks.filter(f => f.category === category)
}

export function getAIRelevantFrameworks(): Framework[] {
  return allFrameworks.filter(f => f.ai_relevant)
}

export function getRelatedFrameworks(fw: Framework): Framework[] {
  return fw.related.map(slug => getFrameworkBySlug(slug)).filter(Boolean) as Framework[]
}

export function searchFrameworks(query: string): Framework[] {
  const q = query.toLowerCase()
  return allFrameworks.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.name_zh.includes(q) ||
    f.desc.toLowerCase().includes(q) ||
    f.desc_zh.includes(q) ||
    f.tags.some(t => t.toLowerCase().includes(q))
  )
}
```

- [ ] **Step 5: Validate all 100 frameworks load correctly**

```bash
# Add a temporary script to validate
node -e "
const fs = require('fs');
const cats = ['thinking','architecture','coding','quality','deployment','evolution','ai'];
let total = 0;
const slugs = new Set();
for (const c of cats) {
  const data = JSON.parse(fs.readFileSync('data/frameworks/' + c + '.json', 'utf8'));
  console.log(c + ': ' + data.length);
  total += data.length;
  data.forEach(f => {
    if (slugs.has(f.slug)) console.error('DUPLICATE SLUG: ' + f.slug);
    slugs.add(f.slug);
  });
}
console.log('Total: ' + total);
console.log('Unique slugs: ' + slugs.size);
"
```

Expected: Total 100, Unique slugs 100, no duplicates.

- [ ] **Step 6: Commit**

```bash
git add data/ src/types.ts src/data/
git commit -m "feat: add 100 framework data files with types and loader"
```

---

### Task 3: Layout & Global Components

**Files:**
- Create: `src/components/Layout.tsx`, `src/components/Layout.module.css`
- Create: `src/components/BilingualText.tsx`

- [ ] **Step 1: Create Layout component**

Layout wraps all pages with a header (domain badge, site title) and footer (copyright).

```tsx
// src/components/Layout.tsx
import { Link, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.domainBadge}>frameworks</Link>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <span className={styles.domainName}>frameworks</span>
        <span className={styles.copyright}>&copy; 2026</span>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Create Layout.module.css**

Style header with 64px top padding, max-width 1600px, footer with border-top. Domain badge in monospace. Domain name hover shows rainbow gradient with letter-spacing animation.

- [ ] **Step 3: Create BilingualText component**

```tsx
// src/components/BilingualText.tsx
import { useState } from 'react'

interface Props {
  en: string
  zh: string
  className?: string
}

export default function BilingualText({ en, zh, className }: Props) {
  const [showZh, setShowZh] = useState(false)
  return (
    <span
      className={className}
      onMouseEnter={() => setShowZh(true)}
      onMouseLeave={() => setShowZh(false)}
      style={{ transition: 'opacity 0.2s' }}
    >
      {showZh ? zh : en}
    </span>
  )
}
```

- [ ] **Step 4: Wire Layout into App.tsx with router**

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/frameworks/:slug" element={<div>Detail</div>} />
        <Route path="/category/:slug" element={<div>Category</div>} />
        <Route path="/map" element={<div>Map</div>} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 5: Verify and commit**

```bash
npx vite --open
# Verify layout renders with header + footer
git add src/components/ src/App.tsx
git commit -m "feat: add Layout component with header, footer, and routing"
```

---

### Task 4: Framework Card & Card Grid

**Files:**
- Create: `src/components/FrameworkCard.tsx`, `src/components/FrameworkCard.module.css`
- Create: `src/components/CardGrid.tsx`, `src/components/CardGrid.module.css`

- [ ] **Step 1: Create FrameworkCard component**

Renders: number (#01), star button (absolute top-right), ghost SVG placeholder, name (14px bold), category pill (colored), description (12.5px truncated). On click calls `onClick(framework)`.

- [ ] **Step 2: Create FrameworkCard.module.css**

Hover: background transitions to var(--surface), ghost opacity 0.07→0.13. Star appears on hover, stays visible when favorited (golden #e8a820).

- [ ] **Step 3: Create CardGrid component**

CSS Grid with `auto-fill, minmax(240px, 1fr)`, 1px borders between cards using the shared-border technique (negative margin or border-collapse on grid items).

- [ ] **Step 4: Verify with sample data on home page**

Import a few frameworks from loader, render in CardGrid. Verify hover effects and card layout.

- [ ] **Step 5: Commit**

```bash
git add src/components/FrameworkCard.* src/components/CardGrid.*
git commit -m "feat: add FrameworkCard and CardGrid components"
```

---

### Task 5: Search, Filter & Favorites

**Files:**
- Create: `src/components/SearchBar.tsx`, `src/components/SearchBar.module.css`
- Create: `src/components/CategoryFilter.tsx`, `src/components/CategoryFilter.module.css`
- Create: `src/components/Favorites.tsx`, `src/components/Favorites.module.css`
- Create: `src/hooks/useFavorites.ts`, `src/hooks/useSearch.ts`, `src/hooks/useKeyboard.ts`

- [ ] **Step 1: Create useSearch hook**

```typescript
// src/hooks/useSearch.ts
import { useState, useMemo } from 'react'
import type { Framework } from '../types'

export function useSearch(frameworks: Framework[]) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return frameworks
    const q = query.toLowerCase()
    return frameworks.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.name_zh.includes(q) ||
      f.desc.toLowerCase().includes(q) ||
      f.desc_zh.includes(q) ||
      f.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [frameworks, query])

  return { query, setQuery, filtered }
}
```

- [ ] **Step 2: Create useFavorites hook**

localStorage-backed Set of framework slugs. `toggleFavorite(slug)`, `isFavorite(slug)`, `favorites: string[]`.

- [ ] **Step 3: Create useKeyboard hook**

Listen for ⌘K/Ctrl+K → focus search. Escape → blur search / close modal.

- [ ] **Step 4: Create SearchBar component**

Input with magnifier icon, keyboard shortcut hint badge (⌘K), calls `onSearch(query)`. Debounce 150ms.

- [ ] **Step 5: Create CategoryFilter component**

Row of filter buttons: "All 100" + 7 category buttons with counts. Active state: dark background + white text. Each button shows category color on hover.

- [ ] **Step 6: Create Favorites component**

Conditional section: only renders when favorites exist. Shows golden star icon + count, then a CardGrid of favorited frameworks.

- [ ] **Step 7: Commit**

```bash
git add src/hooks/ src/components/SearchBar.* src/components/CategoryFilter.* src/components/Favorites.*
git commit -m "feat: add search, category filter, and favorites system"
```

---

### Task 6: Quick Preview Modal

**Files:**
- Create: `src/components/Modal.tsx`, `src/components/Modal.module.css`
- Create: `src/components/StepsList.tsx`, `src/components/StepsList.module.css`
- Create: `src/components/RelatedFrameworks.tsx`

- [ ] **Step 1: Create StepsList component**

Renders 5 numbered steps with bilingual toggle (EN default, ZH on hover per step).

- [ ] **Step 2: Create RelatedFrameworks component**

Renders 2-4 small linked cards for related frameworks. Each card links to `/frameworks/[slug]`.

- [ ] **Step 3: Create Modal component**

Fixed overlay with backdrop-filter blur(8px). Centered modal 640px max-width, 560px max-height, scrollable. Contains:
- Close button (top-right)
- Framework number + name + category pill + AI badge
- SVG visualization placeholder (will be filled in Task 8)
- StepsList
- RelatedFrameworks
- "View Details →" link to detail page
- Arrow navigation (← →) positioned outside modal (desktop only)

Keyboard: Escape to close, ← → to navigate. Touch: swipe >60px horizontal.

- [ ] **Step 4: Create Modal.module.css**

Slide-up animation: `transform: translateY(20px)` → `translateY(0)`, 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94). Backdrop blur. Navigation hint toast (once per session via sessionStorage).

- [ ] **Step 5: Commit**

```bash
git add src/components/Modal.* src/components/StepsList.* src/components/RelatedFrameworks.*
git commit -m "feat: add quick preview modal with steps and related frameworks"
```

---

### Task 7: Home Page Assembly

**Files:**
- Create: `src/pages/HomePage.tsx`, `src/pages/HomePage.module.css`

- [ ] **Step 1: Build HomePage**

Assembles all home components:
1. Hero section: serif h1 "100 Software Design Frameworks" + italic "for the AI Agent Era" + description + decorative circles (::before, ::after)
2. Sticky controls bar: SearchBar + CategoryFilter + count display + "/map" link
3. Favorites section (conditional)
4. CardGrid with all frameworks (filtered by search + category)
5. Modal (triggered by card click)
6. Empty state message when search returns no results

- [ ] **Step 2: Wire state management**

```tsx
const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null)
const [modalIndex, setModalIndex] = useState<number | null>(null)

// Filter chain: category → search
const byCategory = activeCategory
  ? getFrameworksByCategory(activeCategory)
  : getAllFrameworks()
const { query, setQuery, filtered } = useSearch(byCategory)
```

- [ ] **Step 3: Style HomePage.module.css**

Hero with 64px top padding, decorative circles (360px, 240px, semi-transparent, positioned absolute). Sticky controls with `position: sticky; top: 0; z-index: 10; background: var(--bg)`.

- [ ] **Step 4: Verify full home page flow**

Open dev server. Verify: hero renders, search filters in real-time, category buttons filter, cards render, clicking card opens modal, modal navigation works, favorites persist across refresh.

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.*
git commit -m "feat: assemble home page with hero, search, filter, grid, and modal"
```

---

### Task 8: SVG Visualizations

**Files:**
- Create: `src/components/FrameworkViz.tsx`, `src/components/FrameworkViz.module.css`

- [ ] **Step 1: Create FrameworkViz component**

Takes `viz_type` and `name` props. Renders a distinct SVG for each of 8 viz types:
- `matrix` — 3x3 grid of circles
- `flow` — left-to-right arrow chain (3-4 nodes)
- `pyramid` — 3-tier triangle
- `cycle` — circular arrows (3-4 nodes)
- `venn` — 2-3 overlapping circles
- `radar` — hexagonal radar chart outline
- `tree` — branching node hierarchy
- `timeline` — horizontal line with milestone dots

Each SVG is ~100x100px for card ghost, scalable to ~300x300px for modal/detail.

- [ ] **Step 2: Add assembly animation**

CSS keyframes: each SVG child element staggers in with `opacity: 0 → 1` and `transform: rotate(10deg) → rotate(0)`, delays from 0.05s to 0.7s. Animation triggers when `animate` prop is true (modal/detail page).

- [ ] **Step 3: Integrate into FrameworkCard (ghost) and Modal (large animated)**

Card: `<FrameworkViz type={fw.viz_type} size={100} opacity={0.07} />`
Modal: `<FrameworkViz type={fw.viz_type} size={300} animate />`

- [ ] **Step 4: Commit**

```bash
git add src/components/FrameworkViz.*
git commit -m "feat: add SVG visualizations for 8 framework viz types"
```

---

### Task 9: Framework Detail Page

**Files:**
- Create: `src/pages/FrameworkPage.tsx`, `src/pages/FrameworkPage.module.css`

- [ ] **Step 1: Build FrameworkPage**

Uses `useParams()` to get slug, looks up framework via `getFrameworkBySlug(slug)`.

Layout:
1. Breadcrumb: Home > Category > Framework Name
2. Title (serif large) + category pill + AI badge
3. FrameworkViz (large, animated)
4. BilingualText description (full, not truncated)
5. StepsList (5 steps)
6. RelatedFrameworks section
7. Prev/Next navigation within category

- [ ] **Step 2: Style FrameworkPage.module.css**

Max-width 720px centered. Breadcrumb in monospace 12px. Title clamp(28px, 4vw, 48px). Prev/next as text links at bottom.

- [ ] **Step 3: Handle 404 — framework not found**

If `getFrameworkBySlug` returns undefined, show "Framework not found" with link back to home.

- [ ] **Step 4: Verify and commit**

Navigate to `/frameworks/solid-principles`, verify all sections render. Test prev/next navigation. Test breadcrumb links.

```bash
git add src/pages/FrameworkPage.*
git commit -m "feat: add framework detail page with breadcrumb and navigation"
```

---

### Task 10: Category Landing Page

**Files:**
- Create: `src/pages/CategoryPage.tsx`, `src/pages/CategoryPage.module.css`

- [ ] **Step 1: Build CategoryPage**

Uses `useParams()` to get category slug. Looks up category metadata.

Layout:
1. Category name (serif, colored) + Chinese name
2. Category description (bilingual)
3. Stats: "14 frameworks, 5 AI-relevant"
4. CardGrid of category frameworks
5. AI-relevant items have a subtle left-border glow in the AI color

- [ ] **Step 2: Special handling for /category/ai**

After the main grid, add "AI Across All Categories" section:
- For each of the other 6 categories, show category name + its AI-tagged frameworks as small cards
- Grouped by category with category color accents

- [ ] **Step 3: Style and commit**

```bash
git add src/pages/CategoryPage.*
git commit -m "feat: add category landing page with AI cross-category view"
```

---

### Task 11: Relationship Map Page

**Files:**
- Create: `src/pages/MapPage.tsx`, `src/pages/MapPage.module.css`

- [ ] **Step 1: Install D3**

```bash
npm install d3 @types/d3
```

- [ ] **Step 2: Build MapPage with force-directed graph**

```tsx
// Core structure:
// - Nodes: all 100 frameworks, positioned by D3 forceSimulation
// - Node color: category color
// - Node size: proportional to related.length (connections)
// - Edges: lines between related frameworks
// - Category filter: toggle visibility by category
// - Click node: show tooltip → click again → navigate to detail
```

Use `useRef` for the SVG container, `useEffect` for D3 simulation. Category filter buttons along the top.

- [ ] **Step 3: Add zoom, pan, and tooltip**

D3 zoom behavior. Tooltip shows framework name + desc on hover. Click navigates with `useNavigate()`.

- [ ] **Step 4: Style MapPage.module.css**

Full viewport height (calc(100vh - header - footer)). Filter bar at top. SVG fills remaining space.

- [ ] **Step 5: Commit**

```bash
git add src/pages/MapPage.*
git commit -m "feat: add framework relationship map with D3 force graph"
```

---

### Task 12: SSG Configuration & Route Generation

**Files:**
- Modify: `vite.config.ts`
- Modify: `src/main.tsx`
- Create: `src/routes.ts` (route list for SSG)

- [ ] **Step 1: Create route list for prerendering**

```typescript
// src/routes.ts
import { getAllFrameworks } from './data/loader'
import { categories } from './data/categories'

export function getStaticRoutes(): string[] {
  const frameworkRoutes = getAllFrameworks().map(f => `/frameworks/${f.slug}`)
  const categoryRoutes = categories.map(c => `/category/${c.slug}`)
  return ['/', '/map', ...categoryRoutes, ...frameworkRoutes]
}
```

- [ ] **Step 2: Configure vite-ssg**

Update `vite.config.ts` to use vite-ssg plugin with the route list. Update `src/main.tsx` to use `ViteSSG` helper instead of `createRoot`.

- [ ] **Step 3: Test static build**

```bash
npm run build
# Verify dist/ contains:
# - index.html
# - frameworks/solid-principles/index.html (x100)
# - category/ai/index.html (x7)
# - map/index.html
ls dist/frameworks/ | wc -l  # should be 100
```

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts src/main.tsx src/routes.ts
git commit -m "feat: configure vite-ssg for static site generation"
```

---

### Task 13: Responsive Design

**Files:**
- Modify: all `.module.css` files

- [ ] **Step 1: Add media queries to all components**

```
@media (max-width: 1100px) — controls bar reorganize
@media (max-width: 900px) — header single column
@media (max-width: 768px) — modal arrows hidden, touch swipe
@media (max-width: 600px) — single column grid, full-width search, simplified modal
```

- [ ] **Step 2: Test at each breakpoint**

Use browser DevTools responsive mode. Verify all pages at 1200px, 1000px, 800px, 600px, 375px.

- [ ] **Step 3: Commit**

```bash
git add src/
git commit -m "feat: add responsive design for all breakpoints"
```

---

### Task 14: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `package.json` (add build script)

- [ ] **Step 1: Add build scripts to package.json**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite-ssg build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Create GitHub Actions workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Create GitHub repo and push**

```bash
gh repo create frameworks --public --source=. --push
```

- [ ] **Step 4: Enable GitHub Pages**

```bash
gh api repos/{owner}/frameworks/pages -X POST -f source.branch=gh-pages
```

Or: Settings → Pages → Source: GitHub Actions

- [ ] **Step 5: Verify deployment**

Wait for Actions to complete. Visit `https://{username}.github.io/frameworks/`.

- [ ] **Step 6: Commit**

```bash
git add .github/ package.json
git commit -m "ci: add GitHub Actions workflow for Pages deployment"
```

---

## Execution Dependencies

```
Task 1 (Scaffold) ──────┐
                         ├── Task 3 (Layout) ──┐
Task 2 (Data) ──────────┤                      ├── Task 7 (Home Page) ── Task 13 (Responsive)
                         ├── Task 4 (Cards) ───┤
                         ├── Task 5 (Search) ──┤
                         ├── Task 6 (Modal) ───┤
                         ├── Task 8 (SVG Viz) ─┤
                         │                      ├── Task 9 (Detail Page)
                         │                      ├── Task 10 (Category Page)
                         │                      └── Task 11 (Map Page)
                         │
                         └── Task 12 (SSG) ── Task 14 (Deploy)
```

**Parallelizable groups:**
- **Wave 1:** Task 1 + Task 2 (scaffold + data, independent)
- **Wave 2:** Tasks 3, 4, 5, 6, 8 (all components, independent of each other, depend on Wave 1)
- **Wave 3:** Tasks 7, 9, 10, 11, 12 (pages + SSG, depend on components)
- **Wave 4:** Tasks 13, 14 (polish + deploy, depend on pages)
