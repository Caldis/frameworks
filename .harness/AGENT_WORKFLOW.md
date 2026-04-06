# SDFrame — Agent Workflow (Harness Design)

> Defines how AI agents collaborate on this project across sessions.
> Based on Anthropic's "Harness Design for Long-Running Applications" principles.

## Three-Role Architecture

```
┌─────────┐     sprint spec      ┌───────────┐     artifacts      ┌───────────┐
│ PLANNER │ ──────────────────► │ GENERATOR │ ─────────────────► │ EVALUATOR │
│         │                      │ (parallel) │                    │           │
│ Reads:  │                      │ Reads:     │                    │ Reads:    │
│ - STATE │  ◄── feedback ─────  │ - spec     │  ◄── bug list ──  │ - rubric  │
│ - BACKLOG│                     │ - STATE    │                    │ - site    │
└─────────┘                      └───────────┘                    └───────────┘
```

### Planner
- Reads PROJECT_STATE.md and SPRINT_BACKLOG.md
- Picks next READY sprint
- Writes a sprint spec with explicit "done" contract
- Decomposes into parallelizable tasks for Generator agents
- Does NOT generate code or content

### Generator (1-N parallel agents)
- Receives a specific task from the sprint spec
- Reads PROJECT_STATE.md for context (NOT full conversation history)
- Writes code/content to specific files
- Self-checks: build passes, JSON valid, no TS errors
- Does NOT evaluate overall quality or UX

### Evaluator
- Runs AFTER Generator completes all tasks
- Uses EVALUATION_RUBRIC.md to score the sprint
- Tests by navigating the actual site (Playwright or manual)
- Produces specific, actionable bug list if sprint fails
- Generator fixes bugs; Evaluator re-evaluates
- Maximum 3 evaluation rounds per sprint

## Session Handoff Protocol

When starting a new session on this project:

```
1. Read .harness/PROJECT_STATE.md          ← understand current state
2. Read .harness/SPRINT_BACKLOG.md         ← find next sprint
3. Read .harness/EVALUATION_RUBRIC.md      ← understand quality bar
4. Read last evaluation in .harness/evaluations/  ← any open bugs?
5. Announce: "Resuming SDFrame. Current state: X. Next sprint: Y."
6. Confirm with user before starting work
```

## Context Reset Rules

Following the Harness Design principle of context reset over compaction:

1. **Never rely on prior conversation memory** for technical details. Always re-read the actual files.
2. **Each sprint gets fresh agent contexts.** Don't carry generator context into evaluator.
3. **State lives in files, not in conversation.** Update PROJECT_STATE.md after each sprint.
4. **Sprint specs are self-contained.** A generator agent should be able to execute a sprint task with ONLY the sprint spec + PROJECT_STATE.md.

## Sprint Execution Flow

```
START
  │
  ├─ 1. PLAN
  │   ├─ Read STATE + BACKLOG + last evaluation
  │   ├─ Pick sprint, write sprint spec with "done" contract
  │   └─ User approves
  │
  ├─ 2. GENERATE
  │   ├─ Dispatch parallel agents (file-isolated)
  │   ├─ Each self-validates: build passes, JSON valid
  │   └─ If sprint adds UI: agent MUST add E2E test for the new feature
  │
  ├─ 3. EVALUATE (Gate 1: Automated)
  │   ├─ npm run build              → must pass
  │   ├─ npx tsc --noEmit           → must pass
  │   └─ npx playwright test        → all tests must pass
  │   [If any fail → Generator fixes → re-run Gate 1]
  │
  ├─ 4. EVALUATE (Gate 2: Screenshot-Based Design Critic)
  │   ├─ Run `npx playwright test e2e/visual-screenshot.spec.ts`
  │   │   → Captures 10 screenshots to test-results/screenshots/
  │   ├─ Dispatch 4 parallel Design Critic sub-agents, each reviewing screenshots:
  │   │   a) **Layout & Spacing Critic**: section gaps, alignment, visual rhythm
  │   │   b) **Typography & Contrast Critic**: font sizes, contrast ratios, hierarchy
  │   │   c) **Interaction State Critic**: hover/active/focus states, single/multi-select
  │   │   d) **Content Presentation Critic**: text truncation, chart labels, data display
  │   ├─ Merge 4 critic reports → prioritized bug list
  │   ├─ If Critical bugs → Generator fixes → re-screenshot → re-evaluate
  │   └─ Remaining issues → logged to next sprint backlog as "Design Debt"
  │
  ├─ 5. EVALUATE (Gate 3+4: Content + Design Language)
  │   ├─ Spot-check 3 random frameworks for factual accuracy
  │   ├─ Verify new components match Minimal Scholar style
  │   └─ Check cross-references resolve
  │
  ├─ 6. SHIP
  │   ├─ git commit + push
  │   ├─ Verify deployment succeeds
  │   ├─ Update PROJECT_STATE.md
  │   ├─ Write retrospective
  │   ├─ Push united-memory (every sprint, not just major milestones)
  │   └─ **Report to user**: current sprint deliverables + KP progress + next sprint plan
END

**Mandatory report format after every sprint:**
1. What was delivered (Main track + KP track)
2. KP-Map current status and remaining issues
3. Next sprint plan (Main + KP scope)
4. Any user feedback logged for future sprints
```

### Key Change from Earlier Workflow
Previously: Generate → commit → push → then maybe evaluate.
Now: Generate → evaluate BEFORE commit → fix → evaluate again → only then ship.

Visual quality and accessibility are NOT separate sprints. They are **gates that every sprint must pass**. The Evaluator is adversarial — its job is to find problems, not confirm success.

## Parallel Agent Dispatch Rules

1. **File isolation**: Each agent writes to non-overlapping files
2. **No shared state**: Agents don't communicate with each other, only through files
3. **Content agents by category**: One agent per data/frameworks/*.json file
4. **Frontend agents by component**: One agent per page/component being modified
5. **HARD LIMIT: Maximum 10 concurrent sub-agents** — exceeding this triggers API rate limiting. If need 12+ tasks, batch into 2 waves of ≤10.
6. **Content agent batch size: max 8 frameworks per sonnet agent** — 15 at once caused stuck agents (S21). Split into batches of ≤8.
7. **Progress feedback: at least every 10 minutes** — user expects regular updates during long operations. Don't go silent.

## Model Selection: When to Use Sonnet vs Opus

| Task Type | Model | Rationale |
|-----------|-------|-----------|
| JSON data tagging (add fields to existing entries) | **sonnet** | Mechanical, schema-following, no creativity needed |
| Content generation (EN steps, case studies) | **sonnet** | Sufficient quality for factual content |
| Content generation (ZH translations) | **sonnet** | Adequate for translation if given clear EN source |
| Design Critic screenshot review | **sonnet** | Good at visual analysis, cheaper for parallel critics |
| React component writing | **opus** | Needs type system understanding + context awareness |
| Complex CSS / interaction bug fixes | **opus** | Needs to reason about state + DOM + CSS interactions |
| E2E test writing | **opus** | Needs to understand component structure + selectors |
| Harness/workflow document updates | **main agent** | Needs cross-sprint context, keep inline |
| Data validation scripts | **main agent** | Fast inline python, no agent overhead |
| Batch CSS fixes (sed/replace) | **bash script** | Faster and more reliable than any agent |

**Default**: Use sonnet for all Generator agents unless the task requires architecture reasoning or complex TypeScript.

## Operational Patterns (Learned from S00-S07)

### Agent Reliability
- **10-minute rule**: If an agent's output file stays 0 bytes for 10+ minutes, it's stuck. Take over manually.
- **JSON validation gate**: Every content agent must validate JSON with python before reporting done. This eliminated corruption issues from S02 onward.
- **Architecture agent fragility**: The architecture.json category has stuck 3 times across sprints. Give this file's agents simpler, shorter prompts.

### Incremental Delivery
- **Don't wait for all agents**: Commit and push completed work while others are still running. User sees progress, no all-or-nothing risk.
- **Partial is fine**: 72/100 shipped, then 100/100. 188/194, then 194/194. Each push deploys.

### Pre-Sprint Hygiene
- **Audit data before generating**: Run broken-ref check, duplicate-slug check, field-completeness check, **enum field validation** (viz_type, abstraction_level, complexity, maturity_ring, quality_concerns) BEFORE dispatching generators. Cheaper to fix first.
- **Enum validation is critical**: Sonnet agents invented 10+ invalid viz_type values (flowchart, layered, pipeline, etc.) that silently rendered nothing. Always validate enum fields after content agents complete.
- **Quick-win-after-retro**: If retro finds a trivial fix (e.g., "100" hardcoded in title), do it immediately — don't queue a sprint for it.

### Gate 2 Screenshot Review
- **Main agent reads screenshots directly** — faster and more reliable than dispatching sonnet critic sub-agents (which can get stuck on image loading).
- **Sonnet critics as background async** — dispatch them but don't block ship. Review their findings post-ship and log as Design Debt.
- **Always re-screenshot after fixes** — stale screenshots lead to false evaluations.

### Sprint Boundary Discipline

User feedback during a sprint falls into two categories:

1. **Blocking bug** (crash, data loss, broken deploy) → fix immediately, inline
2. **Improvement/feature request** → log it, include in NEXT sprint's plan, summarize with current sprint's retro

**Never interrupt a sprint's flow for non-blocking improvements.** The improvement gets:
- Noted in the current sprint's retrospective ("user feedback received")
- Added to the next sprint's scope
- Properly planned, executed, and evaluated as part of the normal flow

This prevents: scope creep, half-finished features, untested changes, and skipped evaluations.

### Gate 2 Visual Review: MUST CHECK (not a rubber stamp)

Gate 2 is NOT "glance at screenshot and say OK." You MUST actively look for:
1. **Text truncation with "..."** — any visible ellipsis in charts, cards, labels = fail
2. **Duplicate text** — same text appearing twice in one element (e.g., title + subtitle both showing same name)
3. **Empty space** — large blank areas with no content
4. **Layout misalignment** — elements not aligned, inconsistent spacing
5. **Language mismatch** — EN text in ZH mode or vice versa
6. **Broken interactions** — hover states, click targets, scroll behavior

If you see ANY of these, stop and fix before committing. Don't log as "debt for next sprint."

### What NOT to Do
- **Don't use inline style for hover effects** — causes ghost state bugs. Use CSS :hover + custom properties.
- **Don't trust "build passes" as quality proxy** — the FrameworkPage was a `<div>` placeholder that built fine.
- **Don't hardcode counts or text** — "100" was wrong by S02. Use dynamic values or generic text.
- **Don't skip CJK font stacks** — System serif fallback looks broken. Always include Noto SC in font declarations.
- **Don't hardcode data lists** — Map hardcoded 7 categories; when S02 added 6 more, it silently broke. Always import from the single source of truth.
- **Don't add data without testing display** — When categories/frameworks are added, verify ALL consumer pages (home, map, compare, category) reflect the new data. "Build passes" ≠ "data is displayed." (Lesson: Map bug hid for 5 sprints because no test checked node count vs category count.)

## Assumptions to Re-Test

Per Harness Design: "Every component encodes an assumption about what the model can't do alone."

| Assumption | Why We Made It | Re-test When |
|------------|---------------|-------------|
| Parallel agents per category | One agent can't generate 100 frameworks in one shot | Models get larger context + better long-form |
| Separate evaluator role | Generators praise their own work | Models improve at self-critique |
| JSON validation step | Agents produce invalid JSON | JSON output reliability improves |
| Sonnet for data tagging | Cost optimization | Sonnet quality drops or opus gets cheaper |
| Main agent for Gate 2 screenshots | Sonnet agents stuck on image loading | Sonnet image reliability improves |
| extractKeyPhrase for chart labels | Full steps too long for SVG text | Recharts or layout engine handles wrapping |
