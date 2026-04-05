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

## Current State (as of 2026-04-05)

### What Exists
- 100 software design frameworks across 7 lifecycle categories
- Each framework has 33 fields: basic (name, desc, steps) + extended (origin, when_to_use, core_concepts, timeline, dos/donts, case_study, when_not_to_use, adopters)
- Full bilingual content (EN/ZH) with i18n system (useI18n hook, locale files)
- Pages: Home (card grid + search + filter + favorites + modal), Framework Detail (11-section progressive layout), Category Landing (with AI cross-category view), Relationship Map (D3 force graph with lifecycle X-axis + complexity Y-axis)
- LanguageSwitcher in header, browser auto-detection, localStorage persistence
- FrameworkViz: Recharts RadarChart + HTML/CSS layouts for 8 viz types
- GitHub Actions CI/CD, SPA 404 redirect, CNAME for custom domain

### Known Issues
- Build warning: chunks > 500KB (needs code splitting)
- Some viz types may still have label issues with very long Chinese text
- No SSG yet (vite-ssg was planned but not implemented — currently client-side only)

### Architecture Decisions Made
- CSS Modules over Tailwind (Minimal Scholar aesthetic)
- JSON data files over CMS/API (static site, zero runtime dependencies)
- Category colors as CSS custom properties
- _zh suffix convention for bilingual data fields
- Recharts for charts, D3 only for the force graph

## Expansion Plan (approved but not started)

### Phase 1: Expand to 200 frameworks
- Add 6 new categories: Data Architecture, Security & Privacy, Distributed Systems, API Design, Team & Organization, Observability & DX
- Deepen existing 7 categories with +40 frameworks
- Total: ~200 frameworks

### Phase 2: Multi-dimensional taxonomy
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
