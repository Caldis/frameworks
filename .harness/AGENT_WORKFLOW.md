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
  ├─ Planner reads STATE + BACKLOG
  ├─ Planner picks sprint, writes sprint spec
  ├─ User approves sprint spec
  │
  ├─ Generator agents dispatched (parallel where possible)
  │   ├─ Each reads: sprint spec + STATE
  │   ├─ Each writes: specific files only
  │   └─ Each validates: build passes
  │
  ├─ All generators complete
  ├─ git commit + push
  │
  ├─ Evaluator scores against rubric
  │   ├─ PASS (all ≥ 3, avg ≥ 3.5) → update STATE, mark sprint DONE
  │   └─ FAIL → bug list → Generator fixes → re-evaluate (max 3 rounds)
  │
  ├─ Update PROJECT_STATE.md
  ├─ Update SPRINT_BACKLOG.md
  └─ Report to user
END
```

## Parallel Agent Dispatch Rules

1. **File isolation**: Each agent writes to non-overlapping files
2. **No shared state**: Agents don't communicate with each other, only through files
3. **Content agents by category**: One agent per data/frameworks/*.json file
4. **Frontend agents by component**: One agent per page/component being modified
5. **Maximum practical parallelism**: 7-9 agents (content) + 1-2 (frontend) = 8-11 total

## Assumptions to Re-Test

Per Harness Design: "Every component encodes an assumption about what the model can't do alone."

| Assumption | Why We Made It | Re-test When |
|------------|---------------|-------------|
| Parallel agents per category | One agent can't generate 100 frameworks in one shot | Models get larger context + better long-form |
| Separate evaluator role | Generators praise their own work | Models improve at self-critique |
| JSON validation step | Agents produce invalid JSON | JSON output reliability improves |
| Label truncation (8 chars zh) | SVGs overflow with long text | Layout engines improve |
| Manual Recharts over hand-coded SVG | Hand SVG can't handle text layout | SVG text handling improves |
