# Sprint S08 Retrospective

## Delivery
- 8/10 Design Debt items resolved
- First all-sonnet sprint (3 agents, all completed, build passed)
- 33/33 E2E tests passing

## What Went Well
1. **All-sonnet agents worked** — CSS/style tasks executed correctly by sonnet, saving tokens. Zero quality compromise on styling changes.
2. **Pre-sprint data audit clean** — 0 broken refs, 0 missing fields. Pre-sprint hygiene paying off.
3. **Design Debt tracking with numbered items** — Easy to verify "which items resolved" by checking against the list.
4. **Gate 1 → Gate 2 pipeline smooth** — 23 tests → 10 screenshots → visual review → ship. Under 15 minutes total.

## What Went Wrong
1. **Map filter pills not fully fixed** — Sonnet agent may not have changed the inline JS-generated styles for the category toggle buttons. Only CSS was changed, but the buttons set backgroundColor via JS in the D3 code. Need to check MapPage.tsx D3 code for inline style setting.
2. **Sticky nav dots are static** — No IntersectionObserver, so dots don't actually track scroll position. Functional but misleading — they look like a progress indicator but don't update. Either add real tracking or remove the dots.

## Process Improvements Validated
- **Model selection guide works** — sonnet for CSS, opus for components. Clear decision framework.
- **Operational patterns documented** — "10-minute rule", "incremental delivery", "pre-sprint audit" all followed naturally this sprint because they're written down.
- **Quick-win-after-retro** — Map pills issue logged, will fix inline next sprint instead of full agent dispatch.

## Metrics
| Metric | S04 | S05 | S06 | S07 | S08 |
|--------|-----|-----|-----|-----|-----|
| Model | opus | opus | opus+manual | opus | **sonnet** |
| Agents | 3 | 3 | 1 | 3 | 3 |
| Failures | 0 | 0 | 1 | 0 | 0 |
| Time | ~7m | ~7m | ~15m | ~12m | ~10m |
| Design Debt | — | — | — | 10 items | **2 remaining** |
