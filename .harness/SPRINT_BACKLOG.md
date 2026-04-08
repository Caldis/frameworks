# SDFrame — Sprint Backlog

> Prioritized feature sprints. Each sprint has a clear "done" contract.
> Agents: pick the next READY sprint, execute it, update status.

## Sprint Queue

### Sprint S01: Code Splitting & Performance [DONE 2026-04-05]
**Priority**: High (blocks good UX)
**Contract**: Build produces no chunk > 500KB warning. Lazy-load MapPage and FrameworkPage.
**Tasks**:
- [ ] Add React.lazy + Suspense for MapPage (D3 is heavy)
- [ ] Add React.lazy + Suspense for FrameworkPage
- [ ] Configure Vite manualChunks to separate vendor (react, recharts, d3)
- [ ] Verify: `npm run build` shows no chunk warnings
**Estimate**: Small

### Sprint S02: Add 6 New Categories + 60 Frameworks [DONE 2026-04-05]
**Priority**: High (core content expansion)
**Contract**: 160 total frameworks across 13 categories, all with full 33-field content, bilingual.
**Tasks**:
- [ ] Define 6 new categories in categories.ts (Data Architecture, Security & Privacy, Distributed Systems, API Design, Team & Organization, Observability & DX)
- [ ] Create 6 new JSON data files in data/frameworks/
- [ ] Generate ~10 frameworks per new category with full extended content
- [ ] Update i18n with new category names
- [ ] Update category colors (6 new colors)
- [ ] Validate: all 160 frameworks load, no duplicates, valid JSON
**Estimate**: Large (parallel agents needed)

### Sprint S03: Deepen Existing Categories + 34 Frameworks [DONE 2026-04-05]
**Priority**: Medium
**Contract**: 200 total frameworks. Existing 7 categories each gain 4-8 new entries.
**Tasks**:
- [ ] Research gaps in each existing category
- [ ] Add frameworks from authoritative sources (Kleppmann, Nygard, Richards/Ford)
- [ ] Full 33-field content for each new entry
- [ ] Update IDs (renumber to 1-200)
**Estimate**: Large

### Sprint S04: Multi-Dimensional Taxonomy [DONE 2026-04-06]
**Priority**: Medium (architecture change)
**Contract**: Frameworks tagged with abstraction_level, quality_concerns, maturity_ring. UI supports multi-filter.
**Tasks**:
- [ ] Extend Framework type with: abstraction_level, quality_concerns[], maturity_ring
- [ ] Add new fields to all framework JSON entries
- [ ] Build multi-filter UI (pills/toggles for each dimension)
- [ ] Update HomePage to support combined filtering
- [ ] Update MapPage to visualize by abstraction level
**Estimate**: Medium

### Sprint S05: Provenance & Reading List [DONE 2026-04-06]
**Priority**: Medium
**Contract**: Every framework has primary_source citation. Category pages have curated reading lists.
**Tasks**:
- [ ] Extend Framework type with: primary_source, secondary_sources[], source_url
- [ ] Add source data to all frameworks
- [ ] Render provenance block on FrameworkPage
- [ ] Create reading list section on CategoryPage
**Estimate**: Medium

### Sprint S06: E2E Tests (SSG deferred) [DONE 2026-04-06]
**Priority**: Medium (SEO, performance)
**Contract**: All ~200+ pages pre-rendered at build time. Works without JS for initial render.
**Tasks**:
- [ ] Install and configure vite-ssg
- [ ] Generate route list from framework + category data
- [ ] Update main.tsx for SSG entry
- [ ] Test: dist/ contains individual HTML files per route
- [ ] Verify GitHub Pages deployment works with SSG output
**Estimate**: Medium

### Sprint S07: Design Debt — Homepage Grouping, Map Labels, Mobile UX [DONE 2026-04-06]
### Sprint S08: Design Debt Cleanup — Detail Polish, Map Fix, Sticky Nav [DONE 2026-04-06]
**Priority**: Low
**Contract**: WCAG 2.1 AA contrast compliance. Keyboard-navigable throughout. Print-friendly detail pages.
**Tasks**:
- [ ] Audit all color contrasts
- [ ] Add focus-visible styles to all interactive elements
- [ ] Add aria-labels where needed
- [ ] Add print CSS for FrameworkPage
- [ ] Test with screen reader
**Estimate**: Medium

### Sprint S10: Map UX Overhaul + Data Display Tests [DONE 2026-04-06]
### Sprint S11: Framework Selector Wizard [DONE 2026-04-06]
### Sprint S12: Learning Paths + Screenshot Coverage [DONE 2026-04-06]
### Sprint S13: SEO + Open Graph + Favicon + Sitemap [DONE 2026-04-06]
### Sprint S14: OG Image + Sitemap Automation + Hero Polish [DONE 2026-04-06]
### Sprint S15: Expand 6 New Categories to 15 Each (+30) [DONE 2026-04-06]
### Sprint S16: Full-Text Search + KP-Map R1 (Side Panel, Labels, Hint) [DONE 2026-04-06]
### Sprint S17: Category Accessibility + Footer Nav + KP-Map R2 (Edges, Spacing) [DONE 2026-04-06]
### Sprint S18: Relation Type Labels + KP-Map R3 (Bounds, Zoom, Fit-to-View) [DONE 2026-04-06]
### Sprint S19: Typed Relations 100% Coverage (224/224) [DONE 2026-04-06]
### Sprint S20: Typed Edges on Map + KP-Map R4 (Edge Styles, Legend, Labels) [DONE 2026-04-06]
### Sprint S21: +15 Classic Design Patterns + KP-Map R5 Partial [DONE 2026-04-06]
### Sprint S22: Visual Fixes — Chart 5-char Labels, Title Dedup, Viz-First [DONE 2026-04-06]
### Sprint S23: Compare Page Enhancement — Radar Chart + Suggestions + Diff Highlighting [DONE 2026-04-07]
### Sprint S24: Data Performance 76% Reduction + Card Metadata [DONE 2026-04-07]
**Priority**: High (2.2MB initial load was largest technical debt)
**Contract**: Initial bundle reduced from 2,276KB to 664KB (76% raw, gzip 848→206KB). Per-category detail loaded on demand. Framework cards show complexity + author. 51 E2E tests pass.
**Tasks**:
- [x] Generate stubs script (scripts/generate-stubs.js) — extracts 20 listing fields, fills detail defaults
- [x] Rewrite loader.ts — stubs sync API + async getFrameworkFull/getFrameworksFullByCategory
- [x] Simplify useSearch to stub fields only (name, desc, tags, origin_author, adopters)
- [x] Create useFrameworkDetail hook for shared async loading
- [x] FrameworkPage async detail loading (detail sections populate on demand)
- [x] ComparePage async detail loading (comparison table + radar use full data)
- [x] MapPage side panel async detail loading (when_to_use on demand)
- [x] CategoryPage reading list async detail loading (primary_source on demand)
- [x] Card metadata: complexity indicator (~, ~~, ~~~) + origin_author
- [x] vite.config.ts: removed framework-data chunk → 13 per-category lazy chunks
- [x] 51/51 E2E tests pass, build clean, no chunk > 500KB
**Estimate**: Medium

### Sprint S25: Horizontal Scroll Cards + Lerp Engine + FLIP Expand [DONE 2026-04-07]
### Sprint S26: Map Label Collision Detection [DONE 2026-04-07]
### Sprint S27: Dark Mode — Warm-Tinted Palette [DONE 2026-04-08]
### Sprint S28: Insights Page — Editorial Data Visualizations [DONE 2026-04-08]
### Sprint S29: Search Autocomplete + Visual Fixes [DONE 2026-04-08]
### Sprint S30: Timeline Page — Frameworks by Origin Year [DONE 2026-04-08]
### Sprint S31: Keyboard Shortcuts Help Panel [DONE 2026-04-08]
### Sprint S32: PWA — Service Worker + Offline Caching [DONE 2026-04-08]
### Sprint S33: Hero Countup Animation [DONE 2026-04-08]
### Sprint S34: Staggered Card Entrance Animation [DONE 2026-04-08]
### Sprint S35: Framework Fingerprint Radar on Cards [DONE 2026-04-08]
### Sprint S36: Compare Deep Links + Search Highlighting [DONE 2026-04-08]
### Sprint S37: Similar Frameworks Recommendation [DONE 2026-04-08]
### Sprint S38: UI Interaction Polish — 6 Refinements [DONE 2026-04-08]
### Sprint S39: Sticky Section Nav + Back to Top + Autocomplete Stagger [DONE 2026-04-08]
### Sprint S40: Scroll Reset + Section Entrance + Mobile Nav + Compare Picker [DONE 2026-04-08]
### Sprint S41: Loading Skeleton + 404 Page + Detail Transition [DONE 2026-04-08]
### Sprint S42: Footer Version + CI Fix + README v2.0.0 [DONE 2026-04-08]
**Contract**: Compare page shows radar chart overlay for 2-3 frameworks, 6 curated comparison suggestions on empty state, diff highlighting in table. 51 E2E tests pass.
**Tasks**:
- [x] Add Recharts RadarChart comparing frameworks on 5 dimensions (complexity, abstraction, maturity, quality breadth, adoption)
- [x] Add 6 curated comparison suggestions on empty state (SOLID vs GRASP, TDD vs BDD, Microservices vs Monolith, DDD vs Hexagonal, Circuit Breaker vs Bulkhead, REST vs GraphQL vs gRPC)
- [x] Add diff highlighting for categorical rows (warm background + dot indicator for differing values)
- [x] Color-code framework names in table header to match radar chart colors
- [x] Add i18n strings for new UI elements (EN + ZH)
- [x] Add E2E tests: suggestion click loads radar chart + screenshot capture for active comparison
- [x] 51/51 tests pass, build clean
**Estimate**: Small

---

## Completed Sprints

### Sprint S00: Initial Build [DONE 2026-04-05]
- 100 frameworks, 7 categories, full bilingual content
- All pages: Home, Framework Detail, Category, Map
- i18n system, Recharts viz, D3 map with axes
- GitHub Pages deployment with custom domain
