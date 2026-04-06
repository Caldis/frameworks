# Sprint S18 Retrospective

## Delivery

### Main: Relation Type Labels
- TypedRelation type: alternative/complement/extends/prerequisite
- 20 frameworks annotated with typed_relations
- Type badges on detail page RelatedFrameworks section
- i18n for 5 relation types

### KP-Map R3: Bounds + Zoom
- Zoom: 0.3-4x → 0.5-3x
- Node boundary clamping (no overflow)
- Fit-to-view on load
- Reset View button
- Pan limits (can't lose the graph)

## KP-Map R1→R3 Trajectory

| Issue | R1 | R2 | R3 |
|-------|-----|-----|-----|
| Labels | ✅ Added | ✅ | ✅ |
| Side panel | ✅ Added | ✅ | ✅ |
| Edge visibility | ❌ | ✅ Fixed | ✅ |
| Node spacing | ❌ | ✅ Improved | ✅ Better |
| Node overflow | ❌ | ❌ | ✅ Fixed |
| Zoom limits | ❌ | ❌ | ✅ Fixed |
| Fit-to-view | ❌ | ❌ | ✅ Added |
| Reset button | ❌ | ❌ | ✅ Added |
| Minimap | ❌ | ❌ | ❌ |
| Mobile panel | ❌ | ❌ untested | ❌ untested |

## What Went Well
1. **User's specific feedback addressed directly.** "没有限制缩放比例, 有节点超出画面外" → fixed both.
2. **2 agents, both sonnet, both clean.** Continues the pattern.
3. **Sprint Boundary Discipline applied.** User feedback at end of S17 → handled in S18.

## What Went Wrong
1. Nothing critical.

## Metrics
| Metric | S16 | S17 | S18 |
|--------|-----|-----|-----|
| Agents | 2 | 2 | 2 |
| Time | ~12m | ~8m | ~10m |
| E2E | 48 | 48 | 48 |
| KP-Map | R1 | R2 | R3 |
