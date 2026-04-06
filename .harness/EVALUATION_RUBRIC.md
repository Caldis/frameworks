# SDFrame — Evaluation Rubric

> **Every sprint** must pass this rubric BEFORE merge/push.
> The Evaluator is a separate role — never self-evaluate.
> Evaluator must interact with the running site, not just read code.

## Gate 1: Automated (must ALL pass, no exceptions)

```bash
# Run in sequence. Any failure = sprint blocked.
npm run build                  # Zero errors
npx tsc --noEmit               # Zero TS errors
npx playwright test            # All E2E tests pass
```

If the sprint added new UI features, add corresponding E2E tests BEFORE evaluation.

**New route rule**: If the sprint adds a new page/route, `e2e/visual-screenshot.spec.ts` MUST include a screenshot capture for it. This gap recurred 3 times (S09, S11, S12) before being caught.

## Gate 2: Visual & Accessibility (Evaluator inspects running site)

The Evaluator launches a browser (Playwright or manual) and checks:

### 2a. Visual Inspection Checklist
- [ ] **Typography hierarchy**: h1 > h2 > body > caption clearly distinguishable
- [ ] **Color contrast**: All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text)
- [ ] **Spacing consistency**: Sections have uniform vertical rhythm (48px between, 32px within)
- [ ] **Responsive**: Check at 1200px, 768px, 375px — no overflow, no overlap, no cut-off
- [ ] **Dark/light text on category pills**: All readable on their colored backgrounds
- [ ] **Hover/focus states**: Every interactive element has visible hover AND focus-visible
- [ ] **No orphaned UI**: No empty sections, placeholder text, or "undefined" showing
- [ ] **Chinese text fit**: ZH mode — no truncation, overflow, or layout breakage

### 2b. Interaction State Checklist
- [ ] **Single-select controls**: Components that should be single-select (category filter) show exactly ONE active item at a time. No ghost states, no stale highlights.
- [ ] **Multi-select controls**: Components that support multi-select (dimension filters) correctly toggle on/off and visually reflect all selected items.
- [ ] **State reset**: Clearing a filter, closing a modal, switching language — UI returns to a clean state with no residual styling.
- [ ] **Hover → click → hover-off**: After clicking an element, hovering away does not leave behind ghost styles (the inline-style-on-hover antipattern).
- [ ] **Modal lifecycle**: Open → content correct → navigate prev/next → close → re-open → still works.
- [ ] **Cross-filter interaction**: Category filter + dimension filter + search all compose correctly; changing one doesn't corrupt another's visual state.

### 2c. Accessibility Checklist
- [ ] **Keyboard navigation**: Tab through page — all interactive elements reachable
- [ ] **Focus ring visible**: Tab navigation shows clear focus indicator
- [ ] **Alt text / aria-labels**: SVG charts and icons have descriptive labels
- [ ] **Heading order**: No h3 before h2, no skipped levels
- [ ] **Screen reader flow**: Page makes sense read top-to-bottom

### Scoring
Score each criterion 1-5. Sprint passes if:
- Gate 1: ALL automated checks pass (binary)
- Gate 2a: All visual items checked, no critical issues (score ≥ 3)
- Gate 2b: All interaction states correct — no ghost states, no stale highlights (score ≥ 3)
- Gate 2c: No WCAG AA violations on changed pages (score ≥ 3)

## Gate 3: Content Quality (for sprints that add/modify content)

### 3a. Factual Accuracy
- [ ] Spot-check 3 random frameworks: verify origin_author and case_study_company are real
- [ ] All primary_source citations are real, verifiable publications
- [ ] Chinese translations are natural (not machine-translated sounding)

### 3b. Information Architecture
- [ ] Any framework reachable in ≤ 3 clicks from home
- [ ] Cross-references (related) point to existing frameworks
- [ ] Progressive disclosure builds understanding incrementally

## Gate 4: Design Language Compliance

The Minimal Scholar aesthetic must be maintained:
- [ ] **Fonts**: DM Serif Display for headings, DM Sans for body, JetBrains Mono for code/labels
- [ ] **Palette**: warm white (#faf9f6) bg, warm text (#1a1916), subtle borders (#e8e6e1)
- [ ] **Cards**: 1px border grid technique, hover → #f8f7f4 bg
- [ ] **Buttons/pills**: border-radius 20px, monospace labels, no heavy shadows
- [ ] **New components** match existing style — no Bootstrap/Material creep

## Evaluation Workflow

```
Sprint complete
    ↓
[Gate 1] Run automated checks
    ↓ (all pass)
[Gate 2] Evaluator opens site in browser
    → Navigate: Home → search → filter → card click → modal → detail → category → map
    → Switch to ZH, repeat key flows
    → Check responsive at 768px and 375px
    → Tab through interactive elements
    ↓
[Gate 3] Content spot-check (if applicable)
    ↓
[Gate 4] Design language scan
    ↓
Write evaluation to .harness/evaluations/YYYY-MM-DD-SXX-eval.md
    → PASS: commit + push
    → FAIL: specific bug list → Generator fixes → re-evaluate (max 3 rounds)
```

## Key Principle

> "Agents tend to confidently praise their own work — even when quality is obviously mediocre."
> — Anthropic, "Harness Design for Long-Running Applications"

The Evaluator must be **adversarial**, not collaborative. Look for problems, don't confirm success.
