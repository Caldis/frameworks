# S07 Design Critic Findings (4 parallel critics)

## Merged Priority List

### Already Fixed in S07
- ✅ Homepage undifferentiated grid → category grouping
- ✅ Map unlabeled nodes → persistent labels
- ✅ Mobile star invisible → always visible
- ✅ Close button touch target → 44px

### Remaining Design Debt (for future sprints)

**Critical:**
1. Map node labels overlap in dense center cluster — need collision avoidance or zoom-dependent visibility
2. Chinese body text thin fallback weight — Noto fonts added to CSS but may not load correctly, verify

**Minor (prioritized):**
3. Card tag pills on category page are redundant (showing "Architecture" on every card when already on Architecture page)
4. Filter active/inactive state distinction too subtle — needs bolder active treatment
5. H2 section headers weight similar to bold body text — hierarchy unclear
6. No sticky nav or progress indicator on long detail pages
7. Modal backdrop too light — insufficient depth separation
8. No focus-visible indicators on interactive elements
9. Category card descriptions still truncated with "..."
10. Legend on map needs more padding from edge

## Process Note
Sonnet critics initially stuck (0 bytes for 5+ min) but eventually completed.
Main agent did visual review from screenshots directly — faster and more reliable.
Future: use sonnet critics as async background check, don't block ship on them.
