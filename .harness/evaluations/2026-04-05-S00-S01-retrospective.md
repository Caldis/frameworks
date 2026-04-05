# Sprint S00 + S01 Retrospective

## What Went Well (Strengths to Reinforce)
1. **Parallel agent dispatch** — 7-9 agents running simultaneously significantly accelerated content generation. The file-isolation strategy (one agent per JSON file) prevented conflicts.
2. **Incremental delivery** — Committed and pushed partial results (72/100) while waiting for remaining agents, so user could see progress early.
3. **Harness workflow** — PROJECT_STATE, SPRINT_BACKLOG, EVALUATION_RUBRIC establish a reusable cross-session foundation.

## What Went Wrong (Weaknesses to Fix)
1. **Agent reliability** — Deployment and AI content agents got stuck twice. Root cause: large JSON write operations corrupted files (invalid control characters). **Fix for S02: require agents to validate JSON after writing.**
2. **Route wiring bug** — FrameworkPage was created by one agent but never wired in App.tsx by another. The agents worked in isolation and nobody checked the integration. **Fix: add a post-sprint integration check — verify all routes render, not just that build passes.**
3. **Bilingual approach wrong first time** — Built hover-toggle bilingual, user correctly pointed out it should be full language switching. Wasted a round. **Fix: ask clarifying questions upfront for UX-critical decisions instead of assuming.**
4. **No self-testing** — Build passes ≠ working product. The FrameworkPage route was a `<div>` placeholder that built fine but was useless. **Fix for S02: after agents complete, open the site and verify key user flows before committing.**
5. **Brand inconsistency** — SDFrame vs sdframe vs SDFrame.works went through 3 iterations. **Fix: confirm naming with user once and document in PROJECT_STATE.**

## Process Improvements for S02
- [ ] **JSON validation gate**: Every content agent must run `python -c "import json; json.load(...)` before reporting done
- [ ] **Integration smoke test**: After all agents complete, verify these flows before commit:
  - Home → card click → modal opens
  - Home → card click → View Details → FrameworkPage renders with content
  - Home → category filter → CategoryPage renders
  - /map loads with graph
  - Language switch works on all pages
- [ ] **3-minute progress monitoring**: Check file sizes at intervals, restart stuck agents promptly (worked well in S01, keep doing it)
- [ ] **Commit incrementally**: Don't wait for all agents — commit completed work and push, let remaining agents catch up

## Metrics
| Metric | S00 | S01 |
|--------|-----|-----|
| Agents dispatched | ~20 | 2 (direct edit) |
| Agent failures/retries | 4 (deployment, AI stuck twice) | 0 |
| User correction rounds | 3 (bilingual, brand, route) | 0 |
| Build warnings at commit | 1 (chunk size) | 0 |
| Time to complete | ~3 hours | ~5 minutes |
