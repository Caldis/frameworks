# Sprint S13 Retrospective

## Delivery
- SEO meta tags (OG, Twitter Card, canonical, dynamic page titles)
- sitemap.xml (212 URLs)
- robots.txt
- SVG favicon
- Font preload
- 47/47 E2E tests passing

## What Went Well
1. **Both sonnet agents clean first try.** SEO is a perfect sonnet task — HTML/meta content, no complex logic.
2. **usePageMeta hook is reusable.** Each page just calls `usePageMeta(title, desc)` — clean pattern.
3. **Sitemap generator script.** `node scripts/generate-sitemap.js` reads all JSON data and produces 212 URLs. Can be re-run when frameworks are added.
4. **New route rule not triggered.** No new routes this sprint, so the screenshot gap pattern didn't apply.

## What Went Wrong
1. **Sitemap is static.** Generated once, not regenerated on build. If frameworks are added, sitemap goes stale unless someone remembers to run the script. Should add to `prebuild` or CI.
2. **No OG image.** Open Graph tags have no `og:image` — social sharing cards will be text-only. A generated OG image would be a nice future addition.

## Process Observation
S13 was the first sprint focused on **infrastructure/SEO** rather than features or content. It was the smallest scope sprint (no new pages, no new data) but arguably high impact for discoverability. Good discipline not to bundle extra features.

## Metrics
| Metric | S11 | S12 | S13 |
|--------|-----|-----|-----|
| Model | opus | opus | sonnet |
| Agents | 1 | 1 | 2 |
| Time | ~10m | ~10m | ~8m |
| E2E tests | 42 | 46 | 47 |
| New pages | Selector | Paths | 0 |
| New files | 3 | 6 | 5 |
