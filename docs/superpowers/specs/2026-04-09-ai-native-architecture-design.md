# SDFrame AI-Native Architecture — Design Spec

> Single source of truth build pipeline + AI skill package for 300 frameworks

**Goal:** Transform SDFrame from a human-only SPA into a dual-audience platform — humans get the React UI, AI agents get a structured skill package with interactive selection and application guidance. All outputs auto-generated from the same data source; nothing hand-maintained.

**Architecture:** Template-driven build pipeline generates human layer (SPA), AI layer (skill package + llms.txt), and SEO layer (sitemap) from `data/frameworks/*.json` + `src/data/categories.ts` + `scripts/shared/schema.js`.

**Tech Stack:** Node.js build scripts, Markdown templates, existing Vite + React SPA.

---

## 1. Single Source of Truth

All content originates from these files only:

| File | Role |
|------|------|
| `data/frameworks/*.json` | 300 frameworks, 39 fields each |
| `src/data/categories.ts` | 13 category definitions |
| `scripts/shared/schema.js` | Enum values, validation rules |
| `scripts/templates/*.tpl` | Output format templates |

**Rule:** Everything else is a derived artifact. No hand-editing of outputs.

## 2. Build Pipeline

```
scripts/
  shared/
    data-loader.js          ← Unified data loading (all generators share)
    schema.js               ← Enum definitions + validation rules (single definition)
  generators/
    stubs.js                ← Refactored from generate-stubs.js
    sitemap.js              ← Refactored from generate-sitemap.js
    skill-meta.js           ← NEW: generates SKILL.md from template + schema
    skill-catalog.js        ← NEW: generates references/catalog.md
    skill-categories.js     ← NEW: generates references/categories/*.md
    skill-frameworks.js     ← NEW: generates references/frameworks/*.md (300 files)
    llms.js                 ← NEW: generates llms.txt
  templates/
    meta-skill.md.tpl       ← SKILL.md template (uses schema dimensions)
    framework-ref.md.tpl    ← Per-framework reference template
    catalog.md.tpl          ← Catalog index template
    category.md.tpl         ← Per-category overview template
    llms.txt.tpl            ← llms.txt template
  validate-data.js          ← Data validation gate (fails build on errors)
  generate-all.js           ← Unified entry point, loads data once
```

### package.json scripts

```json
{
  "prebuild": "node scripts/validate-data.js && node scripts/generate-all.js",
  "build": "vite build",
  "postbuild": "echo 'All outputs in dist/'"
}
```

### generate-all.js

Loads data once, passes to all generators:

```js
const { loadAllFrameworks, loadCategories } = require('./shared/data-loader')
const schema = require('./shared/schema')

const data = loadAllFrameworks()
const categories = loadCategories()

require('./generators/stubs')(data)
require('./generators/sitemap')(data, categories)
require('./generators/skill-meta')(data, categories, schema)
require('./generators/skill-catalog')(data, categories)
require('./generators/skill-categories')(data, categories)
require('./generators/skill-frameworks')(data)
require('./generators/llms')(data, categories, schema)

console.log(`Generated all outputs from ${data.length} frameworks`)
```

## 3. Schema Definition

`scripts/shared/schema.js` — single point of truth for all enums:

```js
module.exports = {
  CATEGORIES: ['thinking','architecture','coding','quality','deployment',
               'evolution','ai','data','security','distributed','api','team',
               'observability'],
  VIZ_TYPES: ['flow','cycle','pyramid','matrix','venn','radar','tree','timeline'],
  COMPLEXITY: ['beginner','intermediate','advanced'],
  ABSTRACTION: ['code','component','system','organization'],
  MATURITY: ['foundational','established','emerging','experimental'],
  QUALITY: ['reliability','security','performance','maintainability',
            'scalability','usability','testability','observability','portability'],
}
```

Used by: validate-data.js (checking), generate-skill-meta (SKILL.md dimensions section), generate-llms (llms.txt dimensions).

## 4. Skill Package Structure

Output directory: `dist/skill/` (deployed to `sdframe.caldis.me/skill/`)

```
dist/skill/
├── SKILL.md                              (~400 lines, <8KB)
│   Meta-skill: two-mode interaction protocol
│   Mode A: Framework Selection (clarify → search → evaluate → recommend)
│   Mode B: Framework Application (read reference → follow steps → adapt)
│
└── references/
    ├── catalog.md                        (~15KB)
    │   300 entries: slug | name | name_zh | category | quality_concerns | desc
    │   Sortable/filterable by AI
    │
    ├── categories/
    │   ├── thinking.md                   (~2KB each)
    │   ├── architecture.md
    │   └── ...13 files
    │   Each: category description, when to explore, framework list with one-line desc
    │
    └── frameworks/
        ├── domain-driven-design.md       (~3KB each)
        ├── clean-architecture.md
        └── ...300 files
        Each: metadata header + interactive instructions + steps + do/don't + case study
```

## 5. SKILL.md — Meta Skill Design

Two modes based on user intent:

### Mode A: Framework Selection

AI follows this flow:
1. **Clarify** — Ask user about system type, quality priorities, abstraction level, team experience, project stage (one question at a time)
2. **Search** — Read `references/catalog.md`, filter by user's answers
3. **Evaluate** — Read top 3 from `references/frameworks/{slug}.md`, compare when_to_use vs user context
4. **Recommend** — Present 2-3 frameworks with rationale and implementation order

### Mode B: Framework Application

AI follows this flow:
1. Read `references/frameworks/{slug}.md`
2. Follow "Before You Start" — ask user context questions specific to this framework
3. Walk through Implementation Steps, adapting to user's codebase
4. Reference Do's and Don'ts throughout

### Dimensions Section

Auto-generated from `schema.js`. Lists all valid filter values with counts. Always in sync.

## 6. Per-Framework Reference Format

Mixed format: structured metadata header + imperative instruction body.

Template: `scripts/templates/framework-ref.md.tpl`

```markdown
# {name} / {name_zh}

- **Category**: {category}
- **Complexity**: {complexity}
- **Quality**: {quality_concerns joined}
- **Abstraction**: {abstraction_level}
- **Maturity**: {maturity_ring}
- **Author**: {origin_author}, {origin_year from timeline}
- **Adopters**: {adopters joined}

## When to Use

Apply this framework when:
{for each when_to_use}
- {item}
{end}

## When NOT to Use

Stop and reconsider if:
{for each when_not_to_use}
- {item}
{end}

## Before You Start

Ask the user:
- [generated contextual questions based on framework type]

## Implementation Steps

{for each step, i}
{i}. **{step before colon}**: {step after colon}
{end}

## Do

{for each dos}
- {item}
{end}

## Don't

{for each donts}
- {item}
{end}

## Case Study

**{case_study_company}**: {case_study}

## Related Frameworks

{for each related with typed_relations}
- {slug} ({relation_type})
{end}

## Source

https://sdframe.caldis.me/frameworks/{slug}
```

Content language: follows the framework's locale fields. ZH fields used for Chinese content, EN for English. Both included where appropriate for bilingual reference.

## 7. llms.txt

Points to the skill package. Minimal — just discovery + routing:

```markdown
# SDFrame

> 300 curated software design frameworks for engineers and AI agents.

## For AI Agents

Skill entry point: https://sdframe.caldis.me/skill/SKILL.md
Framework catalog: https://sdframe.caldis.me/skill/references/catalog.md
Individual framework: https://sdframe.caldis.me/skill/references/frameworks/{slug}.md

Read SKILL.md first — it contains the interaction protocol.

## For Humans

Website: https://sdframe.caldis.me/
```

## 8. Sync Guarantees

| Change | Auto-propagates to |
|--------|-------------------|
| Add framework to JSON | stubs, sitemap, catalog.md, category/*.md, frameworks/*.md, SKILL.md category counts |
| Add category to categories.ts + schema.js | categories/*.md, SKILL.md dimensions, catalog.md, llms.txt |
| Add quality dimension to schema.js | SKILL.md dimensions list, validate-data rules |
| Edit template | All 300+ generated files re-rendered |
| Invalid data | validate-data blocks build — broken data never deploys |

**Zero manual sync. Data changes → prebuild regenerates everything → deploy.**

## 9. Distribution

### Install (persistent)
Users clone/download `dist/skill/` directory into their Claude Code skills folder. SKILL.md stays in context, references loaded on demand.

### Fetch (temporary)
AI agents fetch `llms.txt` → discover skill → fetch `SKILL.md` → follow protocol → fetch references as needed. No installation required.

### Static hosting
All files are static. GitHub Pages serves them. No server, no API, no auth.
