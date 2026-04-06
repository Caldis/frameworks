# Sprint S16 Retrospective

## Delivery

### Main Track: Full-Text Search
- Search expanded from 5 fields to 14 fields (adds when_to_use, core_concepts, case_study, adopters, origin_author)
- New E2E test for deep search
- 48/48 tests passing

### KP-Map Round 1: Interaction Overhaul
- Default labels on nodes with related >= 3 (~50+ visible at default zoom)
- Click → side detail panel (name, desc, connections, "View Full Details" link)
- Lighter outline-style filter pills (was heavy dark fill)
- First-visit hint card
- Mobile: side panel becomes bottom sheet

## KP-Map Assessment

| Fixed | Still Broken |
|-------|-------------|
| ✅ Default labels visible | ❌ Connection lines still hard to see |
| ✅ Side panel replaces navigate-away | ❌ 13 category columns not visually distinct |
| ✅ Filter pills lighter | ❌ No connection count filter |
| ✅ Hint card for first visit | ❌ No minimap for orientation |
| | ❌ Node clustering still dense in center |

**KP-Map is improved but NOT done.** R2 should focus on: edge visibility, visual clustering, and node spacing.

## User Feedback Logged for S17
- Category pages not reachable from homepage (need direct links)
- Full route audit needed for path accessibility

## Metrics
| Metric | S14 | S15 | S16 |
|--------|-----|-----|-----|
| Model | sonnet | sonnet | sonnet+opus |
| Agents | 2 | 2 | 2 (parallel tracks) |
| Time | ~8m | ~20m | ~12m |
| E2E tests | 47 | 47 | 48 |
| Frameworks | 194 | 224 | 224 |
| KP-Map round | — | — | R1 |
