# KeyProject: Map Interaction Overhaul (KP-Map)

> 关系图交互体验专项改进。每轮 sprint 并行推进，直到用户满意。
> 状态：**ACTIVE**

## Current Problems (to be validated each sprint)

### Interaction Issues
- [ ] Dense node clustering — hard to identify individual frameworks
- [ ] Labels only appear at zoom > 1.2 — default view is just colored dots
- [ ] No node detail panel — clicking navigates away from the map entirely
- [ ] Filter pills are 13 items crammed in one row
- [ ] No way to explore a framework's connections without leaving the map
- [ ] Touch experience is basic — tap shows tooltip but no further interaction
- [ ] Drag feels unresponsive — no visual feedback during drag

### Visual Issues
- [ ] 13 category columns with axis labels may be too crowded
- [ ] Edges are thin gray lines — hard to see connection patterns
- [ ] No visual clustering or grouping — just a scatter of dots
- [ ] Zoom controls are small and easy to miss

### Feature Gaps
- [ ] No "focus mode" — click a node to see its connections highlighted with a side panel
- [ ] No way to filter by connection count (show only well-connected frameworks)
- [ ] No minimap for orientation when zoomed in
- [ ] No way to share a specific map view (URL state)

## KP Sprint Log

| Sprint | KP Scope | Result | Remaining |
|--------|---------|--------|-----------|
| S16 | Default labels, side panel, light pills, hint card | ✅ Labels visible, panel works, pills lighter | Edges still hard to see, no minimap, no connection filter, category columns unclear |
| S17 | Edge warm color + thicker, charge -180, collision 22, column bg tint | ✅ Edges visible, nodes more spread, columns discernible | Nodes still dense in some areas, no minimap, no connection-count filter, side panel UX untested on mobile |

## Done Criteria
User explicitly says they're satisfied with the map interaction.
