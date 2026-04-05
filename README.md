# sdframe

100 Software Design Frameworks — a curated collection for engineers, architects, and AI agents.

**[Live Site](https://caldis.github.io/frameworks/)** | **Inspired by [pmframe.works](https://pmframe.works/)**

## Overview

sdframe organizes 100 software design frameworks across the full software lifecycle, from design thinking to AI-native collaboration patterns. Each framework includes bilingual (EN/ZH) descriptions, 5 actionable implementation steps, and cross-references to related frameworks.

## Categories

| # | Category | Count | Description |
|---|----------|-------|-------------|
| 1 | Design Thinking | 14 | Mental models, design philosophies, problem framing |
| 2 | Architecture Decisions | 14 | Architectural patterns, trade-off analysis, system decomposition |
| 3 | Coding Practices | 15 | Code-level design, patterns, API design, implementation |
| 4 | Quality Engineering | 15 | Testing strategies, reliability, observability |
| 5 | Deployment & Operations | 14 | DevOps, SRE, infrastructure patterns |
| 6 | Evolution & Iteration | 14 | Refactoring, tech debt, migration, team scaling |
| 7 | AI Collaboration | 14 | Agent architecture, LLM design, human-AI workflows |

AI-relevant frameworks are distributed across all categories, with Category 7 as the flagship AI-native collection.

## Features

- **100 frameworks** with bilingual content (EN/ZH)
- **Search & filter** by category, keyword, or AI-relevance
- **Favorites** with localStorage persistence
- **Quick preview modal** with keyboard navigation (Arrow keys, Esc, Cmd+K)
- **Individual framework pages** with SVG visualizations and 5-step implementation guides
- **Category landing pages** with AI cross-category aggregation
- **Relationship map** — D3 force-directed graph of framework connections
- **i18n** — full language switching with browser auto-detection
- **Responsive** — 4 breakpoints from desktop to mobile

## Tech Stack

- **Vite 6** + **React 19** + **TypeScript**
- **React Router 7** — client-side routing
- **D3.js** — force-directed relationship graph
- **CSS Modules** — scoped styles, no utility framework
- **GitHub Actions** — CI/CD to GitHub Pages

## Development

```bash
# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── data/frameworks/     # 7 JSON files (one per category, 100 total)
├── src/
│   ├── i18n/            # Internationalization (locales, context, types)
│   ├── components/      # Reusable UI components
│   ├── pages/           # Route pages (Home, Framework, Category, Map)
│   ├── hooks/           # Custom hooks (search, favorites, keyboard)
│   ├── data/            # Data loader and category metadata
│   └── styles/          # Global CSS and custom properties
├── public/              # Static assets + SPA 404 redirect
└── .github/workflows/   # GitHub Actions deployment
```

## Adding a New Language

1. Create `src/i18n/locales/<lang>.ts` implementing the `LocaleStrings` interface
2. Add the locale to the `Locale` type in `src/i18n/types.ts`
3. Register it in `src/i18n/context.tsx` locales map
4. Update `LanguageSwitcher` component for the new option
5. Add `_<lang>` suffix fields to framework data if needed

## License

MIT
