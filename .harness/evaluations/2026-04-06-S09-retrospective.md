# Sprint S09 Retrospective

## Delivery
- Framework Comparison page `/compare` (2-3 框架并排对比)
- Map 13 分类支持修复 (was hardcoded to 7)
- Map legend merged into filter pills
- Sticky nav dots replaced with back-link (quick-win)

## Critical Post-Mortem: Why Was the Map Bug Undetected for 5 Sprints?

### The Bug
`MapPage.tsx` line 124 hardcoded `categoryOrder` to only 7 original categories. When S02 added 6 new categories (60 frameworks), these nodes had no X-axis target position in the force simulation. They likely clustered randomly or piled on the edges. This was a **data-display correctness bug** — the map was silently wrong for 30% of the data.

### Timeline of Missed Opportunities
| Sprint | What Happened | Why It Wasn't Caught |
|--------|--------------|---------------------|
| S02 | Added 6 new categories | No one opened /map to verify |
| S03 | Deepened to 194 frameworks | Same — content sprint, no map check |
| S04 | Added taxonomy dimensions | Map not in scope, not checked |
| S05 | Added provenance | Content only |
| S06 | Added E2E tests | Map test only checks "SVG exists" — not data correctness |
| S07 | Map labels added | Labels were added for ALL nodes, masking the position bug |
| S08 | Design Debt cleanup | Map pill style was checked, but not node positions |

### Root Causes (5 Whys)

**1. No E2E test for map data correctness.**
The map smoke test (`map page loads`) only checks `await expect(page.locator('svg').first()).toBeVisible()`. It doesn't verify that nodes exist for all categories, or that node positions span the full X-axis.

**2. "Build passes" fallacy persisted for the map.**
Every sprint ran `npm run build` + `npx playwright test`, both passed. But neither tests MAP CONTENT. The map could show 7 categories or 13 — both would pass.

**3. No consumer-side regression test when data changes.**
When S02 added new categories to `categories.ts`, there was no check for "what other files reference categoryOrder/categoryKey?" The MapPage hardcoded its own list instead of importing from the single source of truth.

**4. Screenshots didn't catch it because the map looks "fine" at a glance.**
A force graph with colored dots looks plausible even when 30% of nodes are mispositioned. It takes domain knowledge to notice "why are Data Architecture nodes clustered with Design Thinking?"

**5. No data-to-display verification test.**
We test "do cards render?" but not "does the map contain nodes for all 13 categories?" This is a class of bugs that visual/functional E2E tests don't cover — it's a **data integrity × display correctness** gap.

### Systemic Fix Needed

Add a new test class to the E2E suite: **Data Display Correctness Tests**

```typescript
test('map displays all 13 categories', async ({ page }) => {
  await page.goto('/map')
  // Count unique category colors in SVG circles
  // OR: check that filter buttons match categories.length
})

test('homepage shows all categories in grouped view', async ({ page }) => {
  await page.goto('/')
  // Check that section headers exist for all 13 categories
})

test('compare page dropdown has all frameworks', async ({ page }) => {
  await page.goto('/compare')
  // Check option count matches framework count
})
```

This test class should be added WHENEVER we expand data (new categories, new frameworks). It verifies that the UI correctly reflects the full dataset.

### Pattern to Sediment

> **When you add data, test the display.**
> Adding new categories/frameworks is not complete until you verify every page that consumes that data still works correctly. "Build passes" means the code compiles — not that the data is displayed.

This should be added to AGENT_WORKFLOW.md under "What NOT to Do":
- **Don't add data without testing display**: When categories or frameworks are added, verify ALL consumer pages (home, map, compare, category) reflect the new data.

## Metrics
| Metric | S07 | S08 | S09 |
|--------|-----|-----|-----|
| Model | opus | sonnet | opus+manual |
| Agents | 3 | 3 | 1+manual |
| Time | ~12m | ~10m | ~15m |
| Bugs found by user | 0 | 0 | 1 (map categories) |
| Bugs found by E2E | 0 | 0 | 0 (gap!) |
| Design Debt | 10→3 | 3→0 | 0+map logged |
