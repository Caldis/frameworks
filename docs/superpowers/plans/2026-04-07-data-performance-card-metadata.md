# S24: Data Performance + Card Metadata — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut initial page load from 2.2MB to ~535KB (76% reduction) by splitting framework data into listing stubs + lazy-loaded details, and enrich homepage cards with complexity badge + author.

**Architecture:** A generate script extracts 20 "listing" fields from each framework into `stubs.json` (loaded upfront). Full data stays in per-category JSON files, loaded on demand via dynamic `import()` when users visit detail pages. Stubs include empty defaults for detail fields so they satisfy the existing `Framework` type — zero type signature changes needed.

**Tech Stack:** Node.js generate script, Vite dynamic imports, React state for async loading, existing CSS Modules.

**Measurements:**
- Full data: 2,257 KB raw → stubs: 535 KB raw (76% reduction)
- Estimated gzip: 848 KB → ~200 KB
- Detail data loaded per-category on demand: 120-270 KB per category

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `scripts/generate-stubs.js` | Create | Extract stub fields from all JSON, write stubs.json |
| `src/data/generated/stubs.json` | Generated | 239 framework stubs with listing fields + empty detail defaults |
| `src/data/loader.ts` | Modify | Import stubs sync; add `getFrameworkFull()` async |
| `src/hooks/useSearch.ts` | Modify | Simplify to search stub fields only |
| `src/hooks/useFrameworkDetail.ts` | Create | Shared hook for async detail loading |
| `src/pages/FrameworkPage.tsx` | Modify | Use `useFrameworkDetail` for full data |
| `src/pages/ComparePage.tsx` | Modify | Load full data for selected frameworks |
| `src/pages/MapPage.tsx` | Modify | Load full data for side panel |
| `src/pages/CategoryPage.tsx` | Modify | Load full data for reading list |
| `src/components/FrameworkCard.tsx` | Modify | Add complexity badge + origin_author |
| `src/components/FrameworkCard.module.css` | Modify | Styles for new card elements |
| `vite.config.ts` | Modify | Remove framework-data manual chunk |
| `package.json` | Modify | Add stubs generation to prebuild |

---

## Task 1: Generate Script

**Files:**
- Create: `scripts/generate-stubs.js`
- Modify: `package.json`

- [ ] **Step 1: Create the generate script**

```js
// scripts/generate-stubs.js
const fs = require('fs')
const path = require('path')

const CATEGORIES = ['thinking','architecture','coding','quality','deployment','evolution','ai','data','security','distributed','api','team','observability']

const STUB_FIELDS = [
  'id','name','name_zh','slug','category','desc','desc_zh','ai_relevant','tags',
  'complexity','abstraction_level','maturity_ring','quality_concerns','related',
  'typed_relations','origin_author','viz_type','steps','steps_zh','adopters'
]

const DETAIL_DEFAULTS = {
  origin_source: '', origin_source_zh: '',
  when_to_use: [], when_to_use_zh: [],
  core_concepts: [], core_concepts_zh: [],
  timeline: [], timeline_zh: [],
  dos: [], dos_zh: [],
  donts: [], donts_zh: [],
  case_study_company: '', case_study: '', case_study_zh: '',
  when_not_to_use: [], when_not_to_use_zh: [],
  primary_source: '', secondary_sources: []
}

const allStubs = []

for (const cat of CATEGORIES) {
  const filePath = path.join(__dirname, '..', 'data', 'frameworks', `${cat}.json`)
  const frameworks = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  for (const fw of frameworks) {
    const stub = {}
    for (const field of STUB_FIELDS) {
      stub[field] = fw[field] ?? (Array.isArray(DETAIL_DEFAULTS[field]) ? [] : '')
    }
    // Fill detail fields with empty defaults so stubs satisfy Framework type
    Object.assign(stub, DETAIL_DEFAULTS)
    allStubs.push(stub)
  }
}

const outDir = path.join(__dirname, '..', 'src', 'data', 'generated')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(
  path.join(outDir, 'stubs.json'),
  JSON.stringify(allStubs, null, 0),
  'utf-8'
)

console.log(`Generated ${allStubs.length} stubs (${(Buffer.byteLength(JSON.stringify(allStubs)) / 1024).toFixed(0)} KB)`)
```

- [ ] **Step 2: Run the script to generate stubs**

Run: `node scripts/generate-stubs.js`
Expected: "Generated 239 stubs (535 KB)"
Verify: `src/data/generated/stubs.json` exists and is valid JSON

- [ ] **Step 3: Add prebuild hook in package.json**

In `package.json`, change the `prebuild` script to run both sitemap and stubs generation:

```json
"prebuild": "node scripts/generate-stubs.js && node scripts/generate-sitemap.js",
```

- [ ] **Step 4: Add .gitignore entry for generated stubs**

Add to `.gitignore`:
```
src/data/generated/
```

The stubs file is derived from source data — it should be regenerated, not checked in.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-stubs.js package.json .gitignore
git commit -m "feat: add stubs generation script for data splitting"
```

---

## Task 2: Rewrite Loader with Stub Import + Async Detail

**Files:**
- Modify: `src/data/loader.ts`
- Modify: `vite.config.ts`

- [ ] **Step 1: Rewrite loader.ts**

Replace the entire contents of `src/data/loader.ts`:

```ts
import type { Framework, CategoryKey, TypedRelation, RelationType } from '../types'
import stubsData from './generated/stubs.json'

const allStubs: Framework[] = stubsData as Framework[]

// Category detail cache — populated on first access per category
const detailCache = new Map<CategoryKey, Framework[]>()

// --- Synchronous API (uses stubs — always available) ---

export function getAllFrameworks() { return allStubs }
export function getFrameworkBySlug(slug: string) { return allStubs.find(f => f.slug === slug) }
export function getFrameworksByCategory(cat: CategoryKey) { return allStubs.filter(f => f.category === cat) }
export function getAIRelevantFrameworks() { return allStubs.filter(f => f.ai_relevant) }
export function getRelatedFrameworks(fw: Framework) { return fw.related.map(s => getFrameworkBySlug(s)).filter(Boolean) as Framework[] }
export function getTypedRelations(fw: Framework): TypedRelation[] {
  if (fw.typed_relations?.length) return fw.typed_relations
  return fw.related.map(slug => ({ slug, type: 'related' as RelationType }))
}

// --- Async API (loads full category data on demand) ---

const categoryImports: Record<CategoryKey, () => Promise<{ default: Framework[] }>> = {
  thinking: () => import('../../data/frameworks/thinking.json'),
  architecture: () => import('../../data/frameworks/architecture.json'),
  coding: () => import('../../data/frameworks/coding.json'),
  quality: () => import('../../data/frameworks/quality.json'),
  deployment: () => import('../../data/frameworks/deployment.json'),
  evolution: () => import('../../data/frameworks/evolution.json'),
  ai: () => import('../../data/frameworks/ai.json'),
  data: () => import('../../data/frameworks/data.json'),
  security: () => import('../../data/frameworks/security.json'),
  distributed: () => import('../../data/frameworks/distributed.json'),
  api: () => import('../../data/frameworks/api.json'),
  team: () => import('../../data/frameworks/team.json'),
  observability: () => import('../../data/frameworks/observability.json'),
}

async function loadCategoryDetail(cat: CategoryKey): Promise<Framework[]> {
  if (detailCache.has(cat)) return detailCache.get(cat)!
  const mod = await categoryImports[cat]()
  const frameworks = mod.default as Framework[]
  detailCache.set(cat, frameworks)
  return frameworks
}

export async function getFrameworkFull(slug: string): Promise<Framework | undefined> {
  const stub = getFrameworkBySlug(slug)
  if (!stub) return undefined
  const categoryData = await loadCategoryDetail(stub.category)
  return categoryData.find(f => f.slug === slug)
}

export async function getFrameworksFullByCategory(cat: CategoryKey): Promise<Framework[]> {
  return loadCategoryDetail(cat)
}
```

- [ ] **Step 2: Update vite.config.ts — remove framework-data chunk**

Replace the `manualChunks` function:

```ts
manualChunks(id) {
  if (id.includes('node_modules/react-router')) return 'vendor'
  if (id.includes('node_modules/react-dom')) return 'vendor'
  if (id.includes('node_modules/react/')) return 'vendor'
  if (id.includes('node_modules/recharts')) return 'charts'
  if (id.includes('node_modules/d3')) return 'd3'
  // framework-data is no longer a single chunk — stubs are in index,
  // full category data is split by Vite into per-category lazy chunks
},
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: No errors. Multiple small category chunks instead of one 2.2MB chunk. Stubs included in index chunk.

- [ ] **Step 4: Commit**

```bash
git add src/data/loader.ts vite.config.ts
git commit -m "feat: two-tier data loading — stubs upfront, details lazy per-category"
```

---

## Task 3: Simplify Search to Stub Fields

**Files:**
- Modify: `src/hooks/useSearch.ts`

- [ ] **Step 1: Update useSearch to only search stub fields**

Replace the `useSearch` filter to remove detail-only fields:

```ts
import { useState, useMemo } from 'react'
import type { Framework } from '../types'

export function useSearch(frameworks: Framework[]) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return frameworks
    const q = query.toLowerCase()
    return frameworks.filter(f => {
      if (f.name.toLowerCase().includes(q)) return true
      if (f.name_zh.includes(q)) return true
      if (f.desc.toLowerCase().includes(q)) return true
      if (f.desc_zh.includes(q)) return true
      if (f.tags.some(t => t.toLowerCase().includes(q))) return true
      if (f.origin_author?.toLowerCase().includes(q)) return true
      if (f.adopters?.some(a => a.toLowerCase().includes(q))) return true
      return false
    })
  }, [frameworks, query])

  return { query, setQuery, filtered }
}
```

Fields removed from search: `case_study_company`, `case_study`, `case_study_zh`, `when_to_use`, `when_to_use_zh`, `core_concepts`, `core_concepts_zh`. These are now detail-only. The 95%+ common search patterns (name, description, tags, author, adopter) still work.

- [ ] **Step 2: Verify E2E search test still passes**

Run: `npx playwright test e2e/smoke.spec.ts -g "search finds frameworks"`
Expected: PASS (test searches "Netflix" which is in `adopters` — still in stubs)

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useSearch.ts
git commit -m "refactor: simplify search to stub fields only"
```

---

## Task 4: Create useFrameworkDetail Hook

**Files:**
- Create: `src/hooks/useFrameworkDetail.ts`

- [ ] **Step 1: Create the shared hook**

```ts
import { useState, useEffect } from 'react'
import type { Framework } from '../types'
import { getFrameworkFull } from '../data/loader'

export function useFrameworkDetail(slug: string | undefined | null): {
  framework: Framework | undefined
  loading: boolean
} {
  const [framework, setFramework] = useState<Framework | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slug) {
      setFramework(undefined)
      return
    }
    setLoading(true)
    getFrameworkFull(slug).then(fw => {
      setFramework(fw)
      setLoading(false)
    })
  }, [slug])

  return { framework, loading }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useFrameworkDetail.ts
git commit -m "feat: add useFrameworkDetail hook for async detail loading"
```

---

## Task 5: Update FrameworkPage to Use Async Detail

**Files:**
- Modify: `src/pages/FrameworkPage.tsx`

The FrameworkPage currently calls `getFrameworkBySlug(slug)` which returns stub data (empty detail fields). It needs to load full data async for the detail sections.

- [ ] **Step 1: Add async detail loading**

Add import at top of FrameworkPage.tsx:

```ts
import { useFrameworkDetail } from '../hooks/useFrameworkDetail'
```

Find the line where `framework` is derived from the slug (it will be something like `const framework = getFrameworkBySlug(slug!)`). After that line, add:

```ts
const { framework: fullFramework } = useFrameworkDetail(slug)
```

Then create a merged framework that uses full data when available:

```ts
const fw = fullFramework ?? framework
```

Use `fw` instead of `framework` for rendering all detail sections (When to Use, Core Concepts, Timeline, Dos/Don'ts, Case Study, When Not to Use, Primary Source, Secondary Sources). Keep using `framework` (stub) for the header/nav that renders immediately.

- [ ] **Step 2: Verify the page works**

Run: `npx playwright test e2e/smoke.spec.ts -g "framework detail page loads"`
Expected: PASS

Run: `npx playwright test e2e/data-display.spec.ts -g "framework detail page renders content sections"`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/FrameworkPage.tsx
git commit -m "feat: FrameworkPage loads detail data async"
```

---

## Task 6: Update ComparePage to Use Async Detail

**Files:**
- Modify: `src/pages/ComparePage.tsx`

ComparePage needs full data for: `when_to_use`, `when_not_to_use`, `adopters` (already in stubs), `origin_source`. When frameworks are selected, load their full data.

- [ ] **Step 1: Add async loading for selected frameworks**

Add imports:

```ts
import { getFrameworkFull } from '../data/loader'
```

After the existing `selectedFrameworks` memo, add a state + effect for full data:

```ts
const [fullFrameworks, setFullFrameworks] = useState<Framework[]>([])

useEffect(() => {
  if (selectedFrameworks.length < 2) {
    setFullFrameworks([])
    return
  }
  Promise.all(selectedFrameworks.map(fw => getFrameworkFull(fw.slug))).then(results => {
    setFullFrameworks(results.filter(Boolean) as Framework[])
  })
}, [selectedFrameworks])

// Use full data for table rendering when available, stubs otherwise
const displayFrameworks = fullFrameworks.length === selectedFrameworks.length
  ? fullFrameworks
  : selectedFrameworks
```

Replace `selectedFrameworks` with `displayFrameworks` in the radar chart data calculation and the table rows rendering.

- [ ] **Step 2: Verify compare test passes**

Run: `npx playwright test e2e/data-display.spec.ts -g "compare"`
Expected: Both compare tests PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/ComparePage.tsx
git commit -m "feat: ComparePage loads detail data async for selected frameworks"
```

---

## Task 7: Update MapPage Side Panel to Use Async Detail

**Files:**
- Modify: `src/pages/MapPage.tsx`

The MapPage side panel shows `when_to_use` (first 2 items) when a node is clicked. This is a detail field.

- [ ] **Step 1: Add async loading for selected node**

Add import:

```ts
import { getFrameworkFull } from '../data/loader'
```

Find the side panel state (where `selectedNode` is used). Add a state for the full framework:

```ts
const [selectedDetail, setSelectedDetail] = useState<Framework | null>(null)

useEffect(() => {
  if (!selectedNode) {
    setSelectedDetail(null)
    return
  }
  getFrameworkFull(selectedNode).then(fw => {
    if (fw) setSelectedDetail(fw)
  })
}, [selectedNode])
```

In the side panel rendering, use `selectedDetail` for `when_to_use` display. Fall back to stub data for immediate fields (name, category, complexity).

- [ ] **Step 2: Verify map test passes**

Run: `npx playwright test e2e/smoke.spec.ts -g "map page loads"`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/MapPage.tsx
git commit -m "feat: MapPage side panel loads detail data async"
```

---

## Task 8: Update CategoryPage Reading List to Use Async Detail

**Files:**
- Modify: `src/pages/CategoryPage.tsx`

CategoryPage uses `primary_source` for the reading list section. This is a detail field.

- [ ] **Step 1: Add async loading for category data**

Add import:

```ts
import { getFrameworksFullByCategory } from '../data/loader'
```

Add state for full category data:

```ts
const [fullFrameworks, setFullFrameworks] = useState<Framework[]>([])

useEffect(() => {
  if (categoryKey) {
    getFrameworksFullByCategory(categoryKey as CategoryKey).then(setFullFrameworks)
  }
}, [categoryKey])
```

Use `fullFrameworks` for the reading list section (extracting `primary_source`). The card grid continues using stub data from `getFrameworksByCategory()`.

- [ ] **Step 2: Verify category test passes**

Run: `npx playwright test e2e/smoke.spec.ts -g "category page loads"`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/pages/CategoryPage.tsx
git commit -m "feat: CategoryPage loads detail data async for reading list"
```

---

## Task 9: Card Metadata — Complexity Badge + Author

**Files:**
- Modify: `src/components/FrameworkCard.tsx`
- Modify: `src/components/FrameworkCard.module.css`

- [ ] **Step 1: Add complexity badge and author to FrameworkCard.tsx**

After the existing `tagRow` div, add a new metadata row:

```tsx
<div className={styles.meta}>
  <span className={`${styles.complexity} ${styles[`complexity${framework.complexity.charAt(0).toUpperCase()}${framework.complexity.slice(1)}`]}`}>
    {framework.complexity === 'beginner' ? '~' : framework.complexity === 'intermediate' ? '~~' : '~~~'}
  </span>
  {framework.origin_author && (
    <span className={styles.author}>{framework.origin_author}</span>
  )}
</div>
```

The complexity uses tilde notation (`~` / `~~` / `~~~`) as a minimal, scholarly complexity indicator. The author is shown in muted text.

- [ ] **Step 2: Add CSS styles**

Add to `FrameworkCard.module.css` before the `@media` rule:

```css
.meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}

.complexity {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 1px;
}

.complexityBeginner { color: #2d6a4f; }
.complexityIntermediate { color: #7d6608; }
.complexityAdvanced { color: #922b21; }

.author {
  font-size: 11px;
  color: var(--muted-light);
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 160px;
}
```

- [ ] **Step 3: Verify homepage screenshot**

Run: `npx playwright test e2e/visual-screenshot.spec.ts -g "homepage — desktop"`
Then review: `test-results/screenshots/home-desktop.png`
Verify: cards show complexity indicator and author text

- [ ] **Step 4: Commit**

```bash
git add src/components/FrameworkCard.tsx src/components/FrameworkCard.module.css
git commit -m "feat: add complexity badge and author to framework cards"
```

---

## Task 10: Gate 1 — Build + Tests

- [ ] **Step 1: Regenerate stubs and build**

Run: `node scripts/generate-stubs.js && npm run build`
Expected: Build passes. Check the output for:
- No single chunk > 1000 KB (the old 2.2MB framework-data chunk should be gone)
- Multiple smaller category chunks (13 lazy-loaded chunks, ~100-270 KB each)
- Index chunk includes stubs data (~535 KB raw)

- [ ] **Step 2: Run full E2E test suite**

Run: `npx playwright test`
Expected: All 51 tests pass

- [ ] **Step 3: Fix any failures**

If any tests fail, diagnose and fix. Common issues:
- Async loading timing — add `waitForTimeout` or `waitForSelector` in tests
- Missing data in stubs — check generate script STUB_FIELDS list
- Dynamic import paths — verify Vite resolves them correctly

- [ ] **Step 4: Final commit with all fixes**

---

## Task 11: Gate 2 — Screenshot Review + Ship

- [ ] **Step 1: Run screenshot tests**

Run: `npx playwright test e2e/visual-screenshot.spec.ts`
Review all screenshots in `test-results/screenshots/`:
- `home-desktop.png` — cards should show complexity + author metadata
- `detail-solid.png` — detail sections should render (async loaded)
- `compare-active.png` — comparison table should show full data
- `category-arch.png` — reading list should appear
- All other screenshots should be unchanged

- [ ] **Step 2: Verify bundle size improvement**

Compare before/after:
- Before: `framework-data` chunk 2,276 KB (848 KB gzip)
- After: stubs in index (~535 KB raw), 13 lazy chunks (~100-270 KB each)
- Target: initial load < 800 KB total (vs 2,276 KB before)

- [ ] **Step 3: Update harness docs + commit + push**

Update `.harness/PROJECT_STATE.md` and `.harness/SPRINT_BACKLOG.md` with S24 results.

```bash
git add -A
git commit -m "feat: data performance 76% reduction + card metadata (Sprint S24)"
git push
```
