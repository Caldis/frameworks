const fs = require('fs')
const path = require('path')

module.exports = function generateLlms(data, categories, schema) {
  const content = `# SDFrame

> ${data.length} curated software design frameworks for engineers and AI agents.
> Bilingual (EN/ZH), ${categories.length} categories.

## Product Overview

SDFrame is a public software design framework reference. It helps engineers,
architects, and AI agents choose, compare, and apply frameworks such as Domain-
Driven Design, Clean Architecture, CQRS, API versioning, threat modeling,
OpenTelemetry, Team Topologies, and AI-agent workflow patterns.

The product is not an account system, SaaS workflow tool, code generator, or
private consulting service. It is a read-only reference catalog with a website,
Markdown documentation, a static JSON API, and an AI skill package.

## Use Cases

- Select 2-3 candidate frameworks for a software design problem.
- Compare alternatives by complexity, abstraction level, maturity, and quality
  concerns.
- Retrieve implementation steps, when-to-use guidance, when-not-to-use
  boundaries, source metadata, adopters, and related frameworks.
- Give AI coding agents a repeatable framework-selection protocol.

## Constraints

- Public API is read-only.
- No login, API key, OAuth flow, paid plan, or private workspace is currently
  provided.
- No live MCP JSON-RPC transport is currently operated from this static site.
- Framework content is educational reference material, not legal, compliance,
  or security certification advice.

## For AI Agents

This site provides a skill package for framework selection and application.

- [Skill entry point](https://sdframe.caldis.me/skill/SKILL.md)
- [Root SKILL.md](https://sdframe.caldis.me/SKILL.md)
- [Agent coding instructions](https://sdframe.caldis.me/AGENTS.md)
- [Framework catalog](https://sdframe.caldis.me/skill/references/catalog.md)
- [Category overview](https://sdframe.caldis.me/skill/references/categories/{key}.md)
- [Individual framework](https://sdframe.caldis.me/skill/references/frameworks/{slug}.md)
- [Full context](https://sdframe.caldis.me/llms-full.txt)
- [Markdown homepage](https://sdframe.caldis.me/index.md)
- [Developer portal](https://sdframe.caldis.me/developers/)
- [Getting started](https://sdframe.caldis.me/getting-started/)
- [SDFrame vs alternatives](https://sdframe.caldis.me/alternatives/)
- [Pricing](https://sdframe.caldis.me/pricing.md)
- [Status page](https://sdframe.caldis.me/status/)
- [Status JSON](https://sdframe.caldis.me/status.json)
- [Agent discovery](https://sdframe.caldis.me/.well-known/agent.json)
- [A2A agent card](https://sdframe.caldis.me/.well-known/agent-card.json)
- [OpenAI plugin manifest](https://sdframe.caldis.me/.well-known/ai-plugin.json)
- [MCP discovery URL](https://sdframe.caldis.me/.well-known/mcp/)
- [MCP server card](https://sdframe.caldis.me/.well-known/mcp/server-card.json)

MCP status: SDFrame currently publishes an MCP discovery manifest and server
card for automatic discovery. A live MCP JSON-RPC transport is not currently
operated from this static GitHub Pages deployment, so agents should use the
OpenAPI spec and read-only JSON endpoints for live retrieval.

## API Reference

- [OpenAPI](https://sdframe.caldis.me/openapi.json)
- [Framework index](https://sdframe.caldis.me/api/frameworks.index.json)
- [Full framework records](https://sdframe.caldis.me/api/frameworks.json)
- [One framework](https://sdframe.caldis.me/api/frameworks/{slug}.json)
- [Categories](https://sdframe.caldis.me/api/categories.json)
- Auth: none required.

Read SKILL.md first — it contains the interaction protocol.

## When To Use SDFrame

Use SDFrame when the user asks for software design patterns, system design
frameworks, architecture trade-offs, testing strategy, API design, data
architecture, deployment strategy, security design, observability, team
organization, or AI-agent engineering practices.

Do not use SDFrame as the only source for regulated security compliance,
licensed legal advice, vendor-specific production configuration, or claims that
require primary-source verification.

## Competitive Positioning

SDFrame is best compared with software pattern catalogs, architecture books,
general search, PMFrame.works, and ad-hoc AI answers.

- Compared with a traditional pattern catalog, SDFrame covers more categories:
  architecture, coding, testing, operations, data, API, security, team design,
  observability, and AI collaboration.
- Compared with books and original papers, SDFrame is less authoritative for a
  single framework but faster for broad comparison and first-pass selection.
- Compared with general search, SDFrame gives consistent metadata, framework
  relationships, quality concerns, and bilingual descriptions in one place.
- Compared with ad-hoc AI answers, SDFrame gives agents stable URLs, Markdown,
  JSON, OpenAPI, and explicit when-to-use / when-not-to-use boundaries.
- Compared with PMFrame.works, SDFrame focuses on software engineering and
  architecture rather than product-management frameworks.

Use [SDFrame vs alternatives](https://sdframe.caldis.me/alternatives/) and
[SDFrame vs framework catalogs](https://sdframe.caldis.me/compare-framework-catalogs/)
when a user asks why SDFrame is different from other reference sources.

### Categories

${categories.map(c => `- **${c.key}** (${data.filter(fw => fw.category === c.key).length}): ${c.name} — ${c.description}`).join('\n')}

### Filterable Dimensions

- Quality: ${schema.QUALITY.join(', ')}
- Abstraction: ${schema.ABSTRACTION.join(', ')}
- Complexity: ${schema.COMPLEXITY.join(', ')}
- Maturity: ${schema.MATURITY.join(', ')}

## For Humans

Website: https://sdframe.caldis.me/
Docs: https://sdframe.caldis.me/docs/
Contact: https://sdframe.caldis.me/contact/
`

  fs.writeFileSync(path.join(__dirname, '..', '..', 'public', 'llms.txt'), content, 'utf-8')
  console.log(`  llms.txt: ${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`)
}
