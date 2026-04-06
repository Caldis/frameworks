# Sprint S12 Retrospective

## Delivery
- Learning Paths page `/paths` — 5 curated paths with progress tracking
- Screenshot coverage: /compare and /selector added (S11 retro fix)
- 46/46 E2E tests passing

## What Went Well
1. **Single opus agent delivered complete feature again.** Learning paths with data file, types, i18n, page component, CSS, route, homepage link, E2E tests — all in one shot.
2. **S11 retro quick-win applied cleanly.** Screenshot spec extended before main work started.
3. **Gate 2 visual review included new pages.** Both /compare and /selector screenshots captured and reviewed — no more gaps.
4. **Sprint Boundary Discipline held.** Clean scope, no interruptions.

## What Went Wrong
1. **No paths page screenshot yet.** Added /compare and /selector but forgot to add /paths to the screenshot spec. Same gap pattern repeating — need to make "add screenshot for new page" a MANDATORY checklist item.

## Pattern Detected
The "new page without screenshot" gap has occurred 3 times:
- S09: Compare page added, no screenshot
- S11: Selector page added, no screenshot  
- S12: Paths page added, no screenshot (fixed for compare+selector but created same gap for paths)

**Fix**: Add to EVALUATION_RUBRIC Gate 1: "If sprint adds a new route, `e2e/visual-screenshot.spec.ts` MUST include a test for it."

## Metrics
| Metric | S10 | S11 | S12 |
|--------|-----|-----|-----|
| Model | sonnet | opus | opus |
| Agents | 2 | 1 | 1 |
| Time | ~8m | ~10m | ~10m |
| E2E tests | 40 | 42 | 46 |
| New pages | — | Selector | Paths |
| Screenshots | 10 | 10 | 12 |
