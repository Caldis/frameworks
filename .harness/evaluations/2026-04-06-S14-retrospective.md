# Sprint S14 Retrospective

## Delivery
- OG social card image (SVG with branding + category dots)
- Sitemap automation (prebuild + CI — never stale)
- Hero visual polish (stats line, decorative circles, badge animation)
- 47/47 E2E tests passing

## What Went Well
1. **S13 retro items fully resolved.** og:image added, sitemap automated. Clean debt payoff.
2. **Both sonnet agents succeeded.** Hero polish + OG/CI — both CSS/HTML/config work, perfect for sonnet.
3. **Sitemap triple-safety.** prebuild script + npm script + CI step. Impossible to deploy stale sitemap.
4. **No new routes = no screenshot gap.** Rule not triggered, pattern dormant.

## What Went Wrong
1. **OG image is SVG.** Some social platforms (Facebook, LinkedIn) don't render SVG og:images well. PNG would be more compatible. Low priority but worth noting.

## Observations
- Project is reaching maturity. S14 was polish + automation, not new features.
- The harness workflow is running smoothly — pre-sprint audit, dispatch, gate 1, gate 2, commit, retro.
- Each sprint takes ~8-10 minutes consistently. Overhead is minimal.

## Metrics
| Metric | S12 | S13 | S14 |
|--------|-----|-----|-----|
| Model | opus | sonnet | sonnet |
| Agents | 1 | 2 | 2 |
| Time | ~10m | ~8m | ~8m |
| E2E tests | 46 | 47 | 47 |
| Sprint type | Feature | Infrastructure | Polish |
