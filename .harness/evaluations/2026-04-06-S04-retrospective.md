# Sprint S04 Retrospective

## Delivery
- 194 frameworks tagged with 3 new dimensions (abstraction_level, quality_concerns, maturity_ring)
- DimensionFilter component + collapsible advanced filter panel on HomePage
- 34 broken related references fixed (pre-S04 cleanup)
- 0 agent failures, all 3 agents completed first attempt

## What Went Well
1. **Pre-sprint cleanup** — Fixed 34 broken `related` refs before starting S04. This is a new practice: audit data integrity BEFORE the sprint, not after.
2. **Parallel data + UI** — Taggers and UI builder worked simultaneously with optional chaining for graceful degradation. No integration issues.
3. **Taxonomy distribution looks healthy** — code(31) / component(48) / system(75) / organization(40) is a reasonable spread, not clustering.
4. **Zero retries** — All 3 agents completed on first attempt. The shorter, more specific prompts (vs S03's architecture agent) seem to help.

## What Went Wrong
1. **Still no browser E2E** — Validated data and build but didn't actually open the site to test the new filter UI. Need to add Playwright.
2. **Title still says "100"** — The site title (siteTitle, siteTitleLine1) still says "100 Software Design Frameworks" but we now have 194.
3. **Map page untested with 13 categories** — Known issue from S02, still not verified.

## Process Improvements for S05
- [ ] **Fix "100" → actual count** — Update siteTitle dynamically or to "Software Design Frameworks"
- [ ] **Test map with 13 categories** — Actually navigate to /map and verify
- [ ] **Consider Playwright for E2E** — Manual verification doesn't scale

## Metrics
| Metric | S00 | S01 | S02 | S03 | S04 |
|--------|-----|-----|-----|-----|-----|
| Agents dispatched | ~20 | 2 | 6 | 5+1 retry | 3 |
| Agent failures | 4 | 0 | 0 | 1 | 0 |
| User corrections | 3 | 0 | 0 | 0 | 0 |
| Pre-sprint cleanup | — | — | — | — | 34 broken refs fixed |
| Frameworks | 100 | 100 | 160 | 194 | 194 (tagged) |
