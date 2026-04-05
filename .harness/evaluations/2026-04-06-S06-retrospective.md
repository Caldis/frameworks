# Sprint S06 Retrospective

## Delivery
- Playwright E2E smoke tests: 9/9 passing
- Tests cover: homepage, search, category filter, detail page, category page, map, language switch, advanced filters, modal
- SSG deferred (SPA + 404 redirect works fine, SSG has compatibility risks with Vite 6 + React 19)

## What Went Well
1. **9/9 tests pass on first run** — Well-structured test specs that match actual DOM structure.
2. **E2E debt finally paid** — Noted in S02, S03, S04, S05 retros. Took 4 sprints of nagging but it's done.
3. **Tests validate real user flows** — Not just "build passes" anymore. Language switch, search, modal, advanced filters all verified.
4. **Agent created solid test code** — Even though it got stuck on installation, the .spec.ts and config were production-quality.

## What Went Wrong
1. **Agent stuck on Playwright install** — Output stayed at 0 bytes for 12+ minutes. Had to take over manually. Root cause: likely the puppeteer/chromium download is slow or blocks the agent's shell.
2. **SSG skipped** — Decided the compatibility risk wasn't worth it right now. The SPA + 404 redirect approach works. This is a conscious deferral, not a failure.

## Process Improvement: Agent + Manual Handoff
When an agent gets stuck on infrastructure (install, download, system config), it's faster to take over manually than to restart. New pattern: **give agents 10 minutes for infra tasks, then intervene directly**.

## Key Milestone
This is the first sprint where we have **automated verification** of the entire user experience. Every future sprint can now run `npx playwright test` before committing.

## Metrics
| Metric | S00 | S01 | S02 | S03 | S04 | S05 | S06 |
|--------|-----|-----|-----|-----|-----|-----|-----|
| Agents | ~20 | 2 | 6 | 6 | 3 | 3 | 1 (+manual) |
| Failures | 4 | 0 | 0 | 1 | 0 | 0 | 1 (stuck) |
| Time | ~3h | ~5m | ~10m | ~15m | ~7m | ~7m | ~15m |
| E2E tests | 0 | 0 | 0 | 0 | 0 | 0 | **9 passing** |
| Fields/fw | 13 | 13 | 33 | 33 | 36 | 38 | 38 |
