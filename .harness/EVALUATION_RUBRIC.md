# SDFrame — Evaluation Rubric

> Used by the Evaluator role after each sprint to assess quality.
> Score each criterion 1-5. Sprint passes if all ≥ 3 and average ≥ 3.5.

## Criteria

### 1. Content Accuracy (weight: 2x)
- Are framework authors, dates, and sources factually correct?
- Are case studies based on real companies and real events?
- Are Chinese translations natural, not machine-translated?
- Score 1: Multiple factual errors | 5: All verifiable, zero errors

### 2. Design Quality
- Does the page match the Minimal Scholar aesthetic (serif headers, warm palette, clean spacing)?
- Is typography hierarchy clear (h1 > h2 > body > caption)?
- Do interactive elements have proper hover/focus states?
- Score 1: Visually broken | 5: Publication-quality

### 3. Information Architecture
- Can a user find any framework within 3 clicks from home?
- Are cross-references (related frameworks) bidirectional and useful?
- Does the progressive disclosure (When to Use → Core Concepts → History → Steps → Case Study) build understanding incrementally?
- Score 1: Confusing navigation | 5: Intuitive knowledge journey

### 4. Technical Craft
- Does `npm run build` pass with no errors?
- Are there TypeScript errors (`npx tsc --noEmit`)?
- Is the bundle size reasonable (< 500KB per chunk)?
- Are all components properly typed (no `any`)?
- Score 1: Build fails | 5: Zero warnings, clean types

### 5. Bilingual Completeness
- Does switching EN↔ZH produce a fully translated experience?
- Are there any untranslated strings visible?
- Do Chinese labels fit in their containers without overflow?
- Score 1: Half-translated | 5: Seamless bilingual experience

### 6. Originality & Value
- Does this add something pmframe.works doesn't have (AI category, relationship map, multi-dimensional taxonomy)?
- Would a senior engineer bookmark this as a reference?
- Score 1: Generic clone | 5: Unique, indispensable resource

## Evaluation Process

1. Evaluator agent runs `npm run build` — must pass
2. Evaluator opens the site in a browser (or uses Playwright)
3. Navigates: Home → pick a framework → detail page → related → back → category → map
4. Switches language to ZH, repeats key navigation
5. Scores each criterion, writes findings to `.harness/evaluations/YYYY-MM-DD-SXX.md`
6. If any criterion < 3: sprint FAILS, generator gets specific bug list
