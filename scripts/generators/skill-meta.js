const fs = require('fs')
const path = require('path')
const schema = require('../shared/schema')

module.exports = function generateSkillMeta(data, categories, _schema) {
  // Count frameworks per category
  const catCounts = {}
  for (const cat of schema.CATEGORIES) {
    catCounts[cat] = data.filter(fw => fw.category === cat).length
  }

  const catList = categories.map(c =>
    `${c.key} (${catCounts[c.key] || 0}) | ${c.name} | ${c.name_zh}\n    ${c.description}`
  ).join('\n  ')

  const content = `---
name: sdframe
description: >
  Software design framework knowledge base with ${data.length} curated frameworks
  across ${categories.length} categories. Use this skill when users need to: select
  frameworks for a project, compare architectural approaches, implement a specific
  design pattern, or find best practices for reliability, security, performance,
  maintainability, and other quality concerns. Trigger on: architecture decisions,
  design patterns, system design, best practices, framework selection,
  "how should I structure this", technical debt, refactoring strategies,
  "what pattern should I use", code organization, API design.
---

# SDFrame — Software Design Framework Skill

${data.length} curated frameworks for software engineers, architects, and AI agents.
Bilingual (EN/ZH), ${categories.length} categories. Source: https://sdframe.caldis.me/

## Two Modes of Operation

Determine which mode based on user intent:

### Mode A: Framework Selection

User is unsure what to use. They say things like "help me choose an architecture",
"what patterns should I use for X", "best practices for building Y".

**Phase 1 — Identify the decision.** What is the user actually deciding?

Common decision points (if the user's question maps to one, skip to Phase 2
with the alternatives pre-loaded):

| Decision | Alternatives (pick one) |
|----------|------------------------|
| UI architecture? | mvc, mvvm, mvp, flux-unidirectional |
| System layering? | clean-architecture, hexagonal-architecture, onion-architecture, n-tier-layered, ports-and-adapters |
| Data access? | active-record-pattern, repository-pattern, data-mapper-pattern |
| Data pipeline? | lambda-architecture, kappa-architecture |
| Testing approach? | tdd, bdd |
| Test shape? | test-pyramid, testing-trophy |
| Monitoring method? | four-golden-signals, red-method, use-method |
| Release strategy? | blue-green-deployment, canary-deployment |
| Team organization? | team-topologies, spotify-model, amazon-two-pizza-teams |

If the decision is clear, go directly to Phase 3 with the alternatives.

If the decision is NOT clear, clarify with these questions (one at a time):

1. Describe your system in 1-2 sentences. What does it do?
2. What quality attributes matter most?
   Options: ${schema.QUALITY.join(', ')}
3. What abstraction level are you working at?
   Options: ${schema.ABSTRACTION.join(', ')}
4. Team experience level? Options: ${schema.COMPLEXITY.join(', ')}
5. Project stage? Options: greenfield, evolving, legacy migration

**Phase 2 — Search.** Read \`references/catalog.md\` from this skill.
Filter candidates by the user's answers. Narrow to 5-8 matches.
If you need more context on a category, read \`references/categories/{key}.md\`.

**Phase 3 — Evaluate.** Read top 3 candidates from
\`references/frameworks/{slug}.md\`. Compare:
- "When to Use" vs user's described context
- "When NOT to Use" vs user's constraints
- Complexity vs team's experience level

**Phase 4 — Recommend.** Present 2-3 frameworks with:
- Why this framework fits the user's specific situation
- Implementation priority order if using multiple
- Key first step from the framework's Implementation Steps
- Link: https://sdframe.caldis.me/frameworks/{slug}

### Mode B: Framework Application

User has already decided. They say things like "teach me DDD",
"how do I implement CQRS in my project", "apply clean architecture here".

1. Identify the framework slug. Read \`references/frameworks/{slug}.md\`
2. Follow the "Before You Start" section — ask the user context questions
3. Walk through Implementation Steps one by one, adapting to the user's codebase
4. Reference Do's and Don'ts as guardrails throughout
5. When done, suggest Related Frameworks for complementary practices

## API and Agent Integration

Machine-readable entry points:

- OpenAPI: https://sdframe.caldis.me/openapi.json
- Compact framework index: https://sdframe.caldis.me/api/frameworks.index.json
- Full framework records: https://sdframe.caldis.me/api/frameworks.json
- One framework: https://sdframe.caldis.me/api/frameworks/{slug}.json
- Categories: https://sdframe.caldis.me/api/categories.json
- Full agent context: https://sdframe.caldis.me/llms-full.txt
- Developer portal: https://sdframe.caldis.me/developers/
- Status: https://sdframe.caldis.me/status.json

Authentication: none. The API is public and read-only.

Error handling:

- Validate slugs against \`api/frameworks.index.json\` before fetching a detail
  JSON file.
- If a static endpoint returns 404, do not retry the same unknown slug. Search
  the index and ask the user to clarify.
- For transient CDN or host errors, retry after 5 seconds, 30 seconds, and 2
  minutes, then report the failure with the URL.
- Cache successful responses during one task. Avoid repeatedly downloading the
  full dataset if the compact index is enough.

## Dimensions for Filtering

### Quality Concerns
${schema.QUALITY.join(', ')}

### Abstraction Levels
${schema.ABSTRACTION.map(a => `- **${a}**: ${
  a === 'code' ? 'single module or function level' :
  a === 'component' ? 'service or package boundary' :
  a === 'system' ? 'multi-service or full system' :
  'cross-team or organizational'
}`).join('\n')}

### Complexity
${schema.COMPLEXITY.map(c => `- **${c}**: ${
  c === 'beginner' ? 'straightforward to adopt, low learning curve' :
  c === 'intermediate' ? 'requires some experience, moderate learning curve' :
  'significant expertise needed, steep learning curve'
}`).join('\n')}

### Maturity
${schema.MATURITY.join(', ')}

### Categories
${catList}
`

  const outDir = path.join(__dirname, '..', '..', 'public', 'skill')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'SKILL.md'), content, 'utf-8')
  fs.writeFileSync(path.join(__dirname, '..', '..', 'SKILL.md'), content, 'utf-8')
  console.log(`  skill/SKILL.md: meta skill (${(Buffer.byteLength(content) / 1024).toFixed(1)} KB)`)
}
