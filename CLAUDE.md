# SDFrame — Agent Instructions

## Project
SDFrame is a bilingual (EN/ZH) knowledge base of software design frameworks at sdframe.caldis.me.

## Before Starting Work
1. Read `.harness/PROJECT_STATE.md` for current state
2. Read `.harness/SPRINT_BACKLOG.md` for next sprint
3. Read `.harness/AGENT_WORKFLOW.md` for the three-role workflow
4. Do NOT rely on conversation memory for technical details — read actual files

## Key Conventions
- Default branch: `master`
- i18n: `useI18n()` hook, `localized(obj, 'field')` for data, `t.xxx` for UI strings
- Bilingual data: `_zh` suffix fields (name_zh, desc_zh, steps_zh, etc.)
- Styling: CSS Modules, no Tailwind. Minimal Scholar aesthetic (serif headers, warm palette)
- Charts: Recharts for data viz, D3 only for force graph
- Data: JSON files in `data/frameworks/`, one per category
- Chinese quotes: use `「」` in JSON strings, never unescaped `"`

## Quality Bar
- `npm run build` must pass with no errors
- All JSON must be valid (validate with python after writing)
- Chinese translations must be natural, not machine-translated
- Every framework needs verifiable real authors, dates, companies

## Commit Style
```
feat: description
fix: description
ci: description
docs: description
```
Always include `Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>`
