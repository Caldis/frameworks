# Agent Instructions for SDFrame

SDFrame is a static React/Vite site plus generated public data files. Treat
`data/frameworks/*.json` as the source of truth for framework records. Generated
outputs include `src/data/generated/stubs.json`, `SKILL.md`, `public/skill/**`,
`public/llms.txt`, `public/llms-full.txt`, `public/openapi.json`, and
`public/api/**`.

## Common Commands

- Install dependencies: `npm ci`
- Validate framework data: `node scripts/validate-data.js`
- Regenerate derived files: `node scripts/generate-all.js`
- Build production site: `npm run build`
- Run end-to-end tests: `npm run test:e2e`

## Editing Rules

- Do not edit generated files by hand when a generator owns them. Update the
  generator or source data, then run `node scripts/generate-all.js`.
- Keep public AI-facing files truthful. Do not claim that SDFrame has paid
  plans, OAuth, private accounts, official SDK packages, external registry
  listings, verified AI-platform integrations, or a live MCP transport unless
  those things exist.
- For crawler and agent-readiness changes, verify raw files under `dist/` after
  `npm run build`, not only the React development view.
- Prefer small, direct changes. Avoid unrelated visual redesigns when working on
  discoverability, API, SEO, or agent documentation.

## Public Integration Surface

- Website: `https://sdframe.caldis.me/`
- Developer portal: `/developers/`
- OpenAPI: `/openapi.json`
- Static API: `/api/frameworks.index.json`, `/api/frameworks.json`,
  `/api/frameworks/{slug}.json`, `/api/categories.json`
- Agent files: `/llms.txt`, `/llms-full.txt`, `/index.md`, `/pricing.md`,
  `/.well-known/agent.json`, `/.well-known/agent-card.json`,
  `/.well-known/ai-plugin.json`
