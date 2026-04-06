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
### Sprint S22: Visual Fixes — Chart 5-char Labels, Title Dedup, Viz-First, 28 viz_type Fixes [DONE 2026-04-06]
### Sprint S23: Nothing Design System Visual Overhaul (21 CSS files rewritten) [DONE 2026-04-06]
**Priority**: High (S09 retro — map bug hid for 5 sprints)
**Contract**: Map fully functional for 13 categories. Data display correctness tests prevent regressions.
**Tasks**:
- [ ] Add E2E data-display correctness tests (map has 13 category columns, home has 13 section headers, compare has all frameworks in dropdown)
- [ ] Map: add search/highlight for specific frameworks
- [ ] Map: touch-friendly tooltip (tap instead of hover)
- [ ] Map: X-axis labels readable at 13 categories (may need horizontal scroll or 2-row layout)
- [ ] Map: verify node distribution across all 13 columns
- [ ] Audit all pages for hardcoded category lists — replace with imports from categories.ts
**Estimate**: Medium

---

## Completed Sprints

### Sprint S00: Initial Build [DONE 2026-04-05]
- 100 frameworks, 7 categories, full bilingual content
- All pages: Home, Framework Detail, Category, Map
- i18n system, Recharts viz, D3 map with axes
- GitHub Pages deployment with custom domain
