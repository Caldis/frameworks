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

## Current State (as of 2026-04-05, end of Sprint S03)

### What Exists
- 194 software design frameworks across 13 categories
- Each framework has 33 fields: basic (name, desc, steps) + extended (origin, when_to_use, core_concepts, timeline, dos/donts, case_study, when_not_to_use, adopters)
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

### Known Issues
- Map page designed for 7 categories — 13 categories may be crowded (not verified)
- No SSG yet (client-side only, planned for S06)
- Related field cross-references not always bidirectional
- No E2E browser test automation (manual verification only)

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
