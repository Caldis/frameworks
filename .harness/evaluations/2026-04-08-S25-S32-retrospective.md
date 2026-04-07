# Sprint S25-S32 Retrospective (2026-04-07 ~ 2026-04-08)

## Delivery Summary (10 sprints in 1 session)

| Sprint | Deliverable | Key Metric |
|--------|-------------|------------|
| S23 | Compare radar chart + suggestions | +2 tests |
| S24 | Data performance + card metadata | 2276→664 KB (76%) |
| S25 | Horizontal scroll cards + lerp + FLIP | Homepage height -75% |
| S26 | Map label collision detection | 60 overlapping→30 clean |
| S27 | Dark mode (warm palette) | 71 colors→CSS vars |
| S28 | Insights editorial data page | 8 viz sections, 0 deps |
| S29 | Search autocomplete | keyboard nav + quick-jump |
| S30 | Timeline page | frameworks by decade |
| S31 | Keyboard shortcuts help | ? toggle panel |
| S32 | PWA offline | service worker + manifest |

**Current totals:** 239 frameworks, 11 pages, 54 E2E tests, dark mode, PWA

## What Went Well

1. **Subagent-driven development scaled well.** S24 used 5 sequential subagents with proper review. S30-S32 ran 3 subagents in parallel (zero file overlap). Both patterns worked.
2. **Two-tier data loading architecture was sound.** The stubs + lazy detail split proved clean — 4 pages adapted to async loading without type changes (empty defaults trick).
3. **Pure CSS visualizations (S28 Insights)** avoided Recharts dependency on the page, giving full dark mode control and better design coherence.
4. **S25 horizontal scroll** was the most impactful UX change — transformed the homepage from a wall of 239 cards to compact browsable rows.
5. **Dark mode via CSS variables** was architecturally clean because category colors were centralized. The `catColorVar()` helper made the migration mechanical.

## What Went Wrong

1. **Harness docs fell behind after S24.** Got into a flow state and stopped updating PROJECT_STATE.md and SPRINT_BACKLOG.md. The user correctly flagged this as a process violation. **Root cause:** no checkpoint discipline when sprints are rapid-fire.
2. **Scrollbar CSS didn't work initially.** Used both `scrollbar-width` (standard) and `::-webkit-scrollbar` (legacy) simultaneously — they conflict in Chrome 121+. Had to fix twice.
3. **S25 wheel event didn't block page scroll.** Used React's passive `onWheel` handler which ignores `preventDefault()`. Fixed with native `addEventListener({ passive: false })`. **Lesson:** scroll interception in React always needs native listeners.
4. **S30-S32 parallel subagents committed independently** but I didn't realize this, tried to commit their changes again (empty commit). Minor confusion, no data loss.

## Process Improvements to Sediment

1. **Harness checkpoint: update docs every 3 sprints max.** Even in rapid-fire mode, update PROJECT_STATE + SPRINT_BACKLOG after at most 3 sprints. Add to the sprint completion checklist.
2. **Scrollbar rule: always use standard `scrollbar-width` property alone.** Never combine with `::-webkit-scrollbar`. Chrome 121+ standard property takes precedence.
3. **React scroll interception rule: always use native `addEventListener` with `{ passive: false }`** for any component that needs to `preventDefault()` on wheel/touch events.
4. **Parallel subagent awareness: check `git log` before committing** to see if subagents already committed.

## Metrics

| Metric | Start of session (S22) | End of session (S32) |
|--------|----------------------|---------------------|
| Pages | 8 | 11 |
| E2E tests | 49 | 54 |
| Initial load (gzip) | 848 KB | 210 KB |
| CSS variables | ~20 | ~55 |
| Dark mode | No | Yes |
| PWA | No | Yes |
| Search autocomplete | No | Yes |
| Horizontal scroll | No | Yes |
| Label collision | No | Yes |
