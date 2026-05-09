const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const BASE_URL = 'https://sdframe.caldis.me'
const GITHUB_URL = 'https://github.com/Caldis/frameworks'
const CONTACT_EMAIL = 'mail@caldis.me'

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeText(root, relativePath, content) {
  const out = path.join(root, relativePath)
  ensureDir(out)
  fs.writeFileSync(out, content, 'utf-8')
}

function writeJson(root, relativePath, value) {
  writeText(root, relativePath, `${JSON.stringify(value, null, 2)}\n`)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function frameworkSummary(fw) {
  return {
    id: fw.id,
    slug: fw.slug,
    name: fw.name,
    name_zh: fw.name_zh,
    url: `${BASE_URL}/frameworks/${fw.slug}`,
    api_url: `${BASE_URL}/api/frameworks/${fw.slug}.json`,
    category: fw.category,
    description: fw.desc,
    description_zh: fw.desc_zh,
    complexity: fw.complexity,
    abstraction_level: fw.abstraction_level,
    maturity_ring: fw.maturity_ring,
    quality_concerns: fw.quality_concerns || [],
    ai_relevant: Boolean(fw.ai_relevant),
    tags: fw.tags || [],
    origin_author: fw.origin_author,
    origin_year: fw.origin_year,
    primary_source: fw.primary_source || fw.origin_source || '',
  }
}

function makeJsonLd(type, name, description, url) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SDFrame',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Caldis',
      url: 'https://github.com/Caldis',
    },
    dateModified: new Date().toISOString().slice(0, 10),
  }
}

function pageHtml({ title, description, pathName, heading, sections, jsonLd }) {
  const canonical = `${BASE_URL}${pathName}`
  const body = sections.map(section => `
    <section>
      <h2>${escapeHtml(section.title)}</h2>
      ${section.body}
    </section>`).join('\n')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - SDFrame</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <style>
    :root { color-scheme: light dark; --fg: #1d1b18; --muted: #5f5a52; --line: #ddd6cb; --bg: #faf8f3; --panel: #fffdf8; --accent: #345c8c; }
    body { margin: 0; font: 16px/1.65 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--fg); }
    main { max-width: 900px; margin: 0 auto; padding: 40px 20px 72px; }
    nav { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 32px; font-size: 14px; }
    a { color: var(--accent); }
    h1 { font-size: clamp(2rem, 6vw, 4rem); line-height: 1.05; margin: 0 0 16px; }
    h2 { font-size: 1.35rem; margin: 32px 0 8px; }
    p { margin: 0 0 14px; color: var(--muted); }
    ul, ol { color: var(--muted); padding-left: 22px; }
    li { margin: 4px 0; }
    code, pre { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
    pre { overflow: auto; padding: 14px; background: var(--panel); border: 1px solid var(--line); border-radius: 6px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
    th, td { border: 1px solid var(--line); padding: 8px; text-align: left; vertical-align: top; }
    .lede { font-size: 1.15rem; max-width: 760px; }
  </style>
  <script type="application/ld+json">${JSON.stringify(jsonLd || makeJsonLd('WebPage', title, description, canonical))}</script>
</head>
<body>
  <main>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/docs/">Docs</a>
      <a href="/developers/">Developers</a>
      <a href="/api/">API</a>
      <a href="/pricing/">Pricing</a>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
      <a href="/privacy/">Privacy</a>
      <a href="/agent">Agent guide</a>
    </nav>
    <h1>${escapeHtml(heading)}</h1>
    <p class="lede">${escapeHtml(description)}</p>
${body}
  </main>
</body>
</html>
`
}

function markdownList(items) {
  return items.map(item => `- ${item}`).join('\n')
}

function generateOpenApi(data, categories, schema) {
  return {
    openapi: '3.1.0',
    info: {
      title: 'SDFrame Public Read API',
      version: '1.0.0',
      summary: 'Read-only static API for SDFrame software design frameworks.',
      description: 'SDFrame exposes framework and category data through static JSON endpoints. The API is public, read-only, and does not require authentication.',
      contact: { name: 'Caldis', email: CONTACT_EMAIL, url: GITHUB_URL },
      license: { name: 'MIT', url: `${GITHUB_URL}/blob/master/README.md` },
    },
    servers: [{ url: BASE_URL, description: 'Production static API' }],
    tags: [
      { name: 'Frameworks', description: 'Software design framework records and metadata.' },
      { name: 'Categories', description: 'Framework category metadata.' },
      { name: 'Operations', description: 'Operational status and metadata.' },
    ],
    paths: {
      '/api/frameworks.json': {
        get: {
          tags: ['Frameworks'],
          operationId: 'listFrameworks',
          summary: 'List all software design frameworks',
          description: 'Returns all SDFrame framework records with taxonomy fields, bilingual descriptions, quality concerns, source metadata, and relationships. Clients can filter locally by category, complexity, abstraction level, maturity, quality concern, or ai_relevant.',
          parameters: [
            { name: 'category', in: 'query', required: false, schema: { type: 'string', enum: schema.CATEGORIES }, description: 'Optional client-side filter hint. Static endpoint returns the complete list.' },
            { name: 'quality', in: 'query', required: false, schema: { type: 'string', enum: schema.QUALITY }, description: 'Optional client-side filter hint for quality concerns.' },
          ],
          responses: {
            '200': {
              description: 'Framework list.',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Framework' },
                  },
                },
              },
            },
          },
        },
      },
      '/api/frameworks.index.json': {
        get: {
          tags: ['Frameworks'],
          operationId: 'listFrameworkSummaries',
          summary: 'List compact framework summaries',
          description: 'Returns a compact framework index suitable for search, ranking, and quick agent retrieval.',
          responses: {
            '200': {
              description: 'Compact framework summaries.',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/FrameworkSummary' } },
                },
              },
            },
          },
        },
      },
      '/api/frameworks/{slug}.json': {
        get: {
          tags: ['Frameworks'],
          operationId: 'getFrameworkBySlug',
          summary: 'Get one framework by slug',
          description: 'Returns one framework record. Use slugs from /api/frameworks.index.json or /skill/references/catalog.md.',
          parameters: [
            { name: 'slug', in: 'path', required: true, schema: { type: 'string' }, description: 'Framework slug, for example domain-driven-design or clean-architecture.' },
          ],
          responses: {
            '200': {
              description: 'Framework record.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Framework' } } },
            },
            '404': {
              description: 'Framework not found on the static host.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },
      '/api/categories.json': {
        get: {
          tags: ['Categories'],
          operationId: 'listCategories',
          summary: 'List framework categories',
          description: 'Returns the 13 SDFrame category records with names, slugs, descriptions, and framework counts.',
          responses: {
            '200': {
              description: 'Category list.',
              content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } },
            },
          },
        },
      },
      '/status.json': {
        get: {
          tags: ['Operations'],
          operationId: 'getStatus',
          summary: 'Get public site status metadata',
          description: 'Returns static operational metadata for the public SDFrame site and read API.',
          responses: {
            '200': {
              description: 'Current static status.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Status' } } },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {},
      schemas: {
        FrameworkSummary: {
          type: 'object',
          required: ['slug', 'name', 'url', 'category', 'description'],
          properties: {
            slug: { type: 'string' },
            name: { type: 'string' },
            name_zh: { type: 'string' },
            url: { type: 'string', format: 'uri' },
            api_url: { type: 'string', format: 'uri' },
            category: { type: 'string', enum: schema.CATEGORIES },
            description: { type: 'string' },
            description_zh: { type: 'string' },
            complexity: { type: 'string', enum: schema.COMPLEXITY },
            abstraction_level: { type: 'string', enum: schema.ABSTRACTION },
            maturity_ring: { type: 'string', enum: schema.MATURITY },
            quality_concerns: { type: 'array', items: { type: 'string', enum: schema.QUALITY } },
            ai_relevant: { type: 'boolean' },
            tags: { type: 'array', items: { type: 'string' } },
            origin_author: { type: 'string' },
            origin_year: { type: ['integer', 'null'] },
            primary_source: { type: 'string' },
          },
        },
        Framework: {
          allOf: [
            { $ref: '#/components/schemas/FrameworkSummary' },
            {
              type: 'object',
              properties: {
                steps: { type: 'array', items: { type: 'string' } },
                steps_zh: { type: 'array', items: { type: 'string' } },
                when_to_use: { type: 'array', items: { type: 'string' } },
                when_not_to_use: { type: 'array', items: { type: 'string' } },
                dos: { type: 'array', items: { type: 'string' } },
                donts: { type: 'array', items: { type: 'string' } },
                related: { type: 'array', items: { type: 'string' } },
                typed_relations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      slug: { type: 'string' },
                      type: { type: 'string' },
                    },
                  },
                },
              },
            },
          ],
        },
        Category: {
          type: 'object',
          required: ['key', 'name', 'slug', 'description', 'framework_count'],
          properties: {
            key: { type: 'string', enum: schema.CATEGORIES },
            name: { type: 'string' },
            name_zh: { type: 'string' },
            slug: { type: 'string' },
            description: { type: 'string' },
            description_zh: { type: 'string' },
            framework_count: { type: 'integer' },
          },
        },
        Status: {
          type: 'object',
          required: ['status', 'service', 'generated_at', 'components'],
          properties: {
            status: { type: 'string', enum: ['operational'] },
            service: { type: 'string' },
            generated_at: { type: 'string', format: 'date-time' },
            components: { type: 'array', items: { type: 'object' } },
          },
        },
        Error: {
          type: 'object',
          required: ['status', 'code', 'message'],
          properties: {
            status: { type: 'integer' },
            code: { type: 'string' },
            message: { type: 'string' },
            documentation_url: { type: 'string', format: 'uri' },
          },
        },
      },
    },
  }
}

module.exports = function generateAgentAssets(data, categories, schema) {
  const publicDir = path.join(__dirname, '..', '..', 'public')
  const now = new Date().toISOString()
  const buildDate = now.slice(0, 10)
  const categoryCounts = Object.fromEntries(
    categories.map(category => [category.key, data.filter(fw => fw.category === category.key).length])
  )
  const categoryRecords = categories.map(category => ({
    ...category,
    url: `${BASE_URL}/category/${category.slug}`,
    api_url: `${BASE_URL}/api/categories.json#${category.key}`,
    framework_count: categoryCounts[category.key] || 0,
  }))
  const summaries = data.map(frameworkSummary)
  const aiRelevantCount = data.filter(fw => fw.ai_relevant).length
  const openapi = generateOpenApi(data, categories, schema)

  writeText(publicDir, '.nojekyll', '')
  writeJson(publicDir, 'openapi.json', openapi)
  writeJson(publicDir, 'api/openapi.json', openapi)
  writeJson(publicDir, 'api/frameworks.json', data)
  writeJson(publicDir, 'api/frameworks.index.json', summaries)
  writeJson(publicDir, 'api/categories.json', categoryRecords)

  for (const fw of data) {
    writeJson(publicDir, `api/frameworks/${fw.slug}.json`, {
      ...fw,
      url: `${BASE_URL}/frameworks/${fw.slug}`,
      markdown_url: `${BASE_URL}/skill/references/frameworks/${fw.slug}.md`,
    })
  }

  const status = {
    status: 'operational',
    service: 'SDFrame static site and read API',
    generated_at: now,
    components: [
      { name: 'Homepage', status: 'operational', url: BASE_URL },
      { name: 'Static JSON API', status: 'operational', url: `${BASE_URL}/api/frameworks.json` },
      { name: 'Skill package', status: 'operational', url: `${BASE_URL}/skill/SKILL.md` },
      { name: 'OpenAPI description', status: 'operational', url: `${BASE_URL}/openapi.json` },
    ],
    rate_limits: {
      policy: 'No API key is required. The API is static and CDN-backed; clients should cache responses and avoid repeated bulk fetches.',
      retry: 'For transient 404 or 5xx responses from the static host, retry with exponential backoff after 5 seconds, then 30 seconds, then 2 minutes.',
    },
  }
  writeJson(publicDir, 'status.json', status)

  const repoRoot = path.join(__dirname, '..', '..')
  for (const ruleFile of ['AGENTS.md', '.cursorrules', '.windsurfrules', '.github/copilot-instructions.md']) {
    const sourcePath = path.join(repoRoot, ruleFile)
    if (fs.existsSync(sourcePath)) {
      writeText(publicDir, ruleFile, fs.readFileSync(sourcePath, 'utf-8'))
    }
  }

  const indexMd = `# SDFrame

SDFrame is a curated software design framework reference for engineers, architects, and AI agents. It currently contains ${data.length} frameworks across ${categories.length} categories, including architecture decisions, coding practices, quality engineering, deployment, evolution, AI collaboration, data architecture, security, distributed systems, API design, team organization, and observability.

## What SDFrame is for

- Search and compare software design frameworks by category, quality concern, abstraction level, complexity, and maturity.
- Help AI coding agents recommend patterns such as DDD, clean architecture, CQRS, API versioning, threat modeling, OpenTelemetry, and agent workflow design.
- Provide bilingual English and Chinese summaries, implementation steps, when-to-use guidance, source metadata, adopters, and related-framework links.

## Important URLs

- Website: ${BASE_URL}/
- Developer portal: ${BASE_URL}/developers/
- Public API: ${BASE_URL}/api/frameworks.json
- OpenAPI spec: ${BASE_URL}/openapi.json
- AI skill entry point: ${BASE_URL}/skill/SKILL.md
- Full agent context: ${BASE_URL}/llms-full.txt
- Pricing: ${BASE_URL}/pricing.md
- Status: ${BASE_URL}/status.json

## Access

The public SDFrame API is read-only and does not require authentication. There are no paid tiers or private user accounts at this time.
`
  writeText(publicDir, 'index.md', indexMd)

  const pricingMd = `# SDFrame Pricing

SDFrame is currently free to use.

## Plans

| Plan | Price | Included |
| --- | ---: | --- |
| Public reference | USD 0 | Web browsing, framework search, comparison pages, static JSON API, OpenAPI spec, llms.txt, llms-full.txt, and the public AI skill package |

## Limits

- No account is required.
- No API key is required.
- The API is read-only and served as static files.
- Clients should cache responses and avoid repeated bulk downloads.
- There is no commercial SLA, uptime guarantee, or private support contract.

## Future commercial features

There are no paid SDFrame plans published today. If paid hosting, team collaboration, private collections, or managed API access are introduced later, this file should be updated before those features are announced elsewhere.
`
  writeText(publicDir, 'pricing.md', pricingMd)

  const llmsFullParts = [
    `# SDFrame Full Agent Context

Generated: ${buildDate}
Canonical site: ${BASE_URL}/

SDFrame is a curated bilingual reference for ${data.length} software design frameworks across ${categories.length} categories. It is designed for engineers, architects, and AI agents that need to choose, compare, and apply software design frameworks with concrete implementation guidance.

## Machine-readable entry points

${markdownList([
      `OpenAPI: ${BASE_URL}/openapi.json`,
      `Framework API: ${BASE_URL}/api/frameworks.json`,
      `Framework summary API: ${BASE_URL}/api/frameworks.index.json`,
      `Category API: ${BASE_URL}/api/categories.json`,
      `Agent skill: ${BASE_URL}/skill/SKILL.md`,
      `Agent discovery: ${BASE_URL}/.well-known/agent.json`,
      `A2A agent card: ${BASE_URL}/.well-known/agent-card.json`,
      `API catalog: ${BASE_URL}/.well-known/api-catalog`,
      `Pricing: ${BASE_URL}/pricing.md`,
      `Status: ${BASE_URL}/status.json`,
    ])}

## Categories

${categories.map(category => `### ${category.name} (${category.key})

${category.description}

Framework count: ${categoryCounts[category.key] || 0}
Category URL: ${BASE_URL}/category/${category.slug}
Category markdown: ${BASE_URL}/skill/references/categories/${category.key}.md`).join('\n\n')}
`,
  ]

  const skillPath = path.join(publicDir, 'skill', 'SKILL.md')
  const catalogPath = path.join(publicDir, 'skill', 'references', 'catalog.md')
  if (fs.existsSync(skillPath)) llmsFullParts.push(`\n## Skill Instructions\n\n${fs.readFileSync(skillPath, 'utf-8')}`)
  if (fs.existsSync(catalogPath)) llmsFullParts.push(`\n## Framework Catalog\n\n${fs.readFileSync(catalogPath, 'utf-8')}`)

  llmsFullParts.push(`\n## Framework Detail Index\n\n${summaries.map(fw => `### ${fw.name} (${fw.slug})

Category: ${fw.category}
Description: ${fw.description}
Chinese description: ${fw.description_zh}
Complexity: ${fw.complexity}
Abstraction level: ${fw.abstraction_level}
Maturity: ${fw.maturity_ring}
Quality concerns: ${fw.quality_concerns.join(', ')}
AI relevant: ${fw.ai_relevant ? 'yes' : 'no'}
Origin: ${fw.origin_author}
URL: ${fw.url}
Markdown: ${BASE_URL}/skill/references/frameworks/${fw.slug}.md
API: ${fw.api_url}`).join('\n\n')}`)
  writeText(publicDir, 'llms-full.txt', llmsFullParts.join('\n\n'))

  const agentJson = {
    schema_version: '1.0',
    name: 'SDFrame',
    canonical_url: BASE_URL,
    description: `Curated bilingual reference of ${data.length} software design frameworks for engineers, architects, and AI agents.`,
    use_cases: [
      'Select software architecture, coding, testing, deployment, security, API, data, team, and AI collaboration frameworks.',
      'Compare frameworks by complexity, abstraction level, maturity, and quality concerns.',
      'Retrieve framework implementation steps and when-to-use guidance for agent-assisted engineering work.',
    ],
    limitations: [
      'The public API is read-only.',
      'No private account, paid plan, OAuth login, write API, live MCP transport, or official SDK package is currently provided.',
      'Framework entries are educational references, not legal, security, or compliance advice.',
    ],
    auth: { type: 'none', required: false },
    pricing: { url: `${BASE_URL}/pricing.md`, summary: 'Free public reference. No paid plans are currently published.' },
    api: { openapi: `${BASE_URL}/openapi.json`, base_url: BASE_URL },
    docs: {
      developers: `${BASE_URL}/developers/`,
      markdown_home: `${BASE_URL}/index.md`,
      llms: `${BASE_URL}/llms.txt`,
      llms_full: `${BASE_URL}/llms-full.txt`,
      skill: `${BASE_URL}/skill/SKILL.md`,
    },
    contact: { email: CONTACT_EMAIL, github: GITHUB_URL },
  }
  writeJson(publicDir, '.well-known/agent.json', agentJson)

  const agentCard = {
    protocolVersion: '0.3.0',
    name: 'SDFrame',
    description: `Software design framework reference with ${data.length} curated frameworks and a read-only public API.`,
    url: BASE_URL,
    version: '1.0.0',
    provider: { organization: 'Caldis', url: GITHUB_URL },
    documentationUrl: `${BASE_URL}/developers/`,
    defaultInputModes: ['text/plain', 'application/json'],
    defaultOutputModes: ['text/markdown', 'application/json'],
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    skills: [
      {
        id: 'framework-selection',
        name: 'Framework selection',
        description: 'Recommend software design frameworks for a project context.',
        tags: ['software-design', 'architecture', 'patterns', 'ai-agents'],
        examples: ['Which frameworks should I use for a high-throughput API?', 'Compare DDD, clean architecture, and hexagonal architecture.'],
      },
      {
        id: 'framework-reference',
        name: 'Framework reference lookup',
        description: 'Return implementation steps, when-to-use guidance, and related frameworks by slug.',
        tags: ['reference', 'openapi', 'static-api'],
        examples: ['Get the clean-architecture reference.', 'List AI collaboration frameworks.'],
      },
    ],
  }
  writeJson(publicDir, '.well-known/agent-card.json', agentCard)

  const pluginManifest = {
    schema_version: 'v1',
    name_for_human: 'SDFrame',
    name_for_model: 'sdframe',
    description_for_human: `Search and compare ${data.length} curated software design frameworks.`,
    description_for_model: 'Use SDFrame to retrieve software design frameworks, compare alternatives, and recommend frameworks by project context. The API is public, read-only, and requires no authentication.',
    auth: { type: 'none' },
    api: { type: 'openapi', url: `${BASE_URL}/openapi.json`, is_user_authenticated: false },
    logo_url: `${BASE_URL}/icon.svg`,
    contact_email: CONTACT_EMAIL,
    legal_info_url: `${BASE_URL}/privacy/`,
  }
  writeJson(publicDir, '.well-known/ai-plugin.json', pluginManifest)

  const apiCatalog = {
    linkset: [
      {
        anchor: BASE_URL,
        item: [
          { href: `${BASE_URL}/openapi.json`, rel: 'service-desc', type: 'application/vnd.oai.openapi+json', title: 'SDFrame OpenAPI description' },
          { href: `${BASE_URL}/developers/`, rel: 'service-doc', type: 'text/html', title: 'SDFrame Developer Portal' },
          { href: `${BASE_URL}/index.md`, rel: 'alternate', type: 'text/markdown', title: 'SDFrame Markdown homepage' },
          { href: `${BASE_URL}/.well-known/agent.json`, rel: 'service-meta', type: 'application/json', title: 'SDFrame agent discovery' },
          { href: `${BASE_URL}/.well-known/agent-card.json`, rel: 'service-meta', type: 'application/json', title: 'SDFrame A2A agent card' },
        ],
        'service-desc': [
          { href: `${BASE_URL}/openapi.json`, type: 'application/vnd.oai.openapi+json', title: 'SDFrame OpenAPI description' },
        ],
        'service-doc': [
          { href: `${BASE_URL}/developers/`, type: 'text/html', title: 'SDFrame Developer Portal' },
          { href: `${BASE_URL}/index.md`, type: 'text/markdown', title: 'SDFrame Markdown homepage' },
        ],
        'service-meta': [
          { href: `${BASE_URL}/.well-known/agent.json`, type: 'application/json', title: 'SDFrame agent discovery' },
          { href: `${BASE_URL}/.well-known/agent-card.json`, type: 'application/json', title: 'SDFrame A2A agent card' },
        ],
      },
    ],
  }
  writeJson(publicDir, '.well-known/api-catalog', apiCatalog)
  writeJson(publicDir, '.well-known/api-catalog.json', apiCatalog)

  const skillContent = fs.existsSync(skillPath) ? fs.readFileSync(skillPath, 'utf-8') : ''
  if (skillContent) {
    writeText(publicDir, 'SKILL.md', skillContent)
    const skillDigest = crypto.createHash('sha256').update(Buffer.from(skillContent, 'utf-8')).digest('hex')
    writeJson(publicDir, '.well-known/agent-skills/index.json', {
      $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
      version: '0.2.0',
      name: 'SDFrame Agent Skills',
      description: 'Public SDFrame skill package for selecting and applying software design frameworks.',
      skills: [
        {
          id: 'sdframe',
          type: 'skill-md',
          name: 'SDFrame',
          url: `${BASE_URL}/SKILL.md`,
          digest: `sha256:${skillDigest}`,
          description: 'Framework selection and application protocol for AI coding agents.',
          when_to_use: [
            'Use when a user asks which software architecture, coding, testing, API, data, security, operations, team, observability, or AI-agent framework fits a project.',
            'Use when a user asks to compare frameworks such as DDD, Clean Architecture, Hexagonal Architecture, CQRS, API Gateway, OpenTelemetry, Team Topologies, or LLMOps.',
            'Use when a user has chosen one framework and needs implementation steps, do/dont guidance, related frameworks, and source context.',
          ],
          limitations: [
            'Educational reference only; verify primary sources for legal, compliance, or security certification decisions.',
            'Public read-only data; no write API, private account, OAuth flow, paid plan, or live MCP transport is currently provided.',
          ],
        },
      ],
      entries: [
        {
          id: 'sdframe',
          type: 'skill-md',
          name: 'SDFrame',
          url: `${BASE_URL}/SKILL.md`,
          digest: `sha256:${skillDigest}`,
          description: 'Framework selection and application protocol for AI coding agents.',
        },
      ],
    })
    writeText(publicDir, '.well-known/agent-skills/index.html', `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SDFrame Agent Skill</title>
  <meta name="description" content="When to use the SDFrame agent skill and where to fetch the machine-readable skill package.">
</head>
<body>
  <main>
    <h1>SDFrame Agent Skill</h1>
    <p>Use SDFrame when a user asks which software architecture, coding, testing, API, data, security, operations, team, observability, or AI-agent framework fits a project.</p>
    <h2>When to use</h2>
    <ul>
      <li>Use it to compare frameworks such as DDD, Clean Architecture, Hexagonal Architecture, CQRS, API Gateway, OpenTelemetry, Team Topologies, or LLMOps.</li>
      <li>Use it when a user has chosen one framework and needs implementation steps, do/dont guidance, related frameworks, and source context.</li>
      <li>Use it for public educational reference only; verify primary sources for legal, compliance, or security certification decisions.</li>
    </ul>
    <h2>Machine-readable files</h2>
    <ul>
      <li><a href="/.well-known/agent-skills/index.json">/.well-known/agent-skills/index.json</a></li>
      <li><a href="/SKILL.md">/SKILL.md</a></li>
      <li><a href="/AGENTS.md">/AGENTS.md</a></li>
      <li><a href="/openapi.json">/openapi.json</a></li>
    </ul>
  </main>
</body>
</html>
`)
  }

  writeJson(publicDir, '.well-known/oauth-protected-resource', {
    resource: BASE_URL,
    authorization_servers: [],
    scopes_supported: [],
    bearer_methods_supported: [],
    resource_documentation: `${BASE_URL}/developers/`,
    note: 'SDFrame public read API does not require OAuth or bearer tokens.',
  })

  const mcpServerCard = {
    name: 'sdframe-static-reference',
    description: 'SDFrame currently provides a static read API and AI skill package. A live MCP JSON-RPC transport is not operated from this GitHub Pages deployment.',
    version: '1.0.0',
    serverUrl: `${BASE_URL}/developers/#mcp`,
    transport: 'documentation-only',
    tools: [
      {
        name: 'list_frameworks',
        description: 'Use the static JSON API endpoint /api/frameworks.index.json to list framework summaries.',
        inputSchema: { type: 'object', properties: { category: { type: 'string' }, quality: { type: 'string' } } },
      },
      {
        name: 'get_framework',
        description: 'Use /api/frameworks/{slug}.json to retrieve one framework by slug.',
        inputSchema: { type: 'object', required: ['slug'], properties: { slug: { type: 'string' } } },
      },
    ],
    status: 'manifest-only',
    documentationUrl: `${BASE_URL}/developers/#mcp`,
  }
  writeJson(publicDir, '.well-known/mcp/server-card.json', mcpServerCard)
  writeJson(publicDir, '.well-known/mcp/index.html', {
    name: 'sdframe-static-reference',
    description: 'SDFrame exposes a static read API and AI skill package. This discovery document is JSON for well-known discovery; the server card documents that no live MCP JSON-RPC transport is currently operated.',
    version: '1.0.0',
    serverCardUrl: `${BASE_URL}/.well-known/mcp/server-card.json`,
    serverUrl: `${BASE_URL}/developers/#mcp`,
    transport: 'documentation-only',
    tools: mcpServerCard.tools,
    status: 'manifest-only',
  })

  const schemaMap = `<?xml version="1.0" encoding="UTF-8"?>
<schemamap xmlns="https://nlweb.ai/schemamap">
  <feed>
    <loc>${BASE_URL}/feeds/frameworks.jsonl</loc>
    <type>application/jsonl</type>
    <schema>SoftwareSourceCode</schema>
    <description>SDFrame framework records as JSON Lines.</description>
  </feed>
  <feed>
    <loc>${BASE_URL}/feeds/categories.jsonl</loc>
    <type>application/jsonl</type>
    <schema>DefinedTermSet</schema>
    <description>SDFrame category records as JSON Lines.</description>
  </feed>
</schemamap>
`
  writeText(publicDir, 'schemamap.xml', schemaMap)
  writeText(publicDir, 'feeds/frameworks.jsonl', summaries.map(item => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: item.name,
    alternateName: item.name_zh,
    termCode: item.slug,
    description: item.description,
    url: item.url,
    inDefinedTermSet: 'SDFrame Software Design Frameworks',
  })).join('\n') + '\n')
  writeText(publicDir, 'feeds/categories.jsonl', categoryRecords.map(item => JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: item.name,
    alternateName: item.name_zh,
    description: item.description,
    url: item.url,
    hasDefinedTermCount: item.framework_count,
  })).join('\n') + '\n')

  const docsSections = [
    { title: 'Overview', body: `<p>SDFrame organizes ${data.length} software design frameworks into ${categories.length} categories. Each framework record includes bilingual descriptions, implementation steps, source metadata, adopters, quality concerns, abstraction level, maturity, and related framework links.</p>` },
    { title: 'Core workflows', body: '<ol><li>Browse all frameworks and filter by category or dimension.</li><li>Use the selector to answer project-context questions and narrow the framework list.</li><li>Compare two or three frameworks side by side.</li><li>Open a framework detail page for steps, do/dont guidance, source links, and related frameworks.</li><li>Use the AI skill package when an agent needs a repeatable framework selection protocol.</li></ol>' },
    { title: 'Documentation files', body: `<ul><li><a href="/index.md">/index.md</a> is the Markdown homepage.</li><li><a href="/llms.txt">/llms.txt</a> is a compact AI entry point.</li><li><a href="/llms-full.txt">/llms-full.txt</a> is the full agent context.</li><li><a href="/skill/SKILL.md">/skill/SKILL.md</a> is the agent interaction protocol.</li></ul>` },
  ]
  writeText(publicDir, 'docs/index.html', pageHtml({
    title: 'Documentation',
    description: 'Documentation for using SDFrame as a human reference and as an AI-agent-readable software design framework catalog.',
    pathName: '/docs/',
    heading: 'SDFrame Documentation',
    sections: docsSections,
  }))
  writeText(publicDir, 'docs/llms.txt', `# SDFrame Docs

Use this scoped file for documentation discovery.

- Docs: ${BASE_URL}/docs/
- Markdown homepage: ${BASE_URL}/index.md
- Full context: ${BASE_URL}/llms-full.txt
- Skill: ${BASE_URL}/skill/SKILL.md
- Catalog: ${BASE_URL}/skill/references/catalog.md
`)

  writeText(publicDir, 'developers/index.html', pageHtml({
    title: 'Developer Portal',
    description: 'Developer portal for the SDFrame public read API, OpenAPI specification, AI skill package, authentication model, rate-limit guidance, and static integration points.',
    pathName: '/developers/',
    heading: 'SDFrame Developer Portal',
    sections: [
      { title: 'Quickstart', body: `<p>The SDFrame API is a public read-only API served as static JSON. Fetch the compact index first, then fetch an individual framework only when you need full detail.</p><pre><code>curl ${BASE_URL}/api/frameworks.index.json
curl ${BASE_URL}/api/frameworks/domain-driven-design.json</code></pre>` },
      { title: 'Authentication', body: '<p>No authentication is required. There are no API keys, OAuth clients, user accounts, or write endpoints. This is intentional: SDFrame is a public reference catalog, not a private data service.</p>' },
      { title: 'Endpoints', body: `<table><thead><tr><th>Endpoint</th><th>Purpose</th></tr></thead><tbody><tr><td><code>/openapi.json</code></td><td>OpenAPI 3.1 description.</td></tr><tr><td><code>/api/frameworks.index.json</code></td><td>Compact searchable framework summaries.</td></tr><tr><td><code>/api/frameworks.json</code></td><td>Complete framework records.</td></tr><tr><td><code>/api/frameworks/{slug}.json</code></td><td>One framework record.</td></tr><tr><td><code>/api/categories.json</code></td><td>Category metadata and counts.</td></tr><tr><td><code>/status.json</code></td><td>Operational metadata.</td></tr></tbody></table>` },
      { title: 'Error handling and retry', body: '<p>Known framework slugs return static JSON. Unknown slugs are handled by the static host and may return an HTML 404 page. Agents should validate slugs against <code>/api/frameworks.index.json</code> before requesting detail files. For transient host errors, retry after 5 seconds, 30 seconds, and 2 minutes. Cache successful responses.</p>' },
      { title: 'MCP', body: `<p id="mcp">A live MCP transport is not currently operated from this static deployment. The MCP server card at <a href="/.well-known/mcp/server-card.json">/.well-known/mcp/server-card.json</a> documents the current manifest-only status. Agents should use OpenAPI, the static JSON API, and SKILL.md for now.</p>` },
    ],
    jsonLd: makeJsonLd('TechArticle', 'SDFrame Developer Portal', 'Read-only SDFrame API and AI agent integration documentation.', `${BASE_URL}/developers/`),
  }))
  writeText(publicDir, 'developers/llms.txt', `# SDFrame Developer Context

## API

- OpenAPI: ${BASE_URL}/openapi.json
- Framework index: ${BASE_URL}/api/frameworks.index.json
- Full framework records: ${BASE_URL}/api/frameworks.json
- Categories: ${BASE_URL}/api/categories.json
- Status: ${BASE_URL}/status.json

## Auth

No authentication is required. SDFrame exposes read-only public static data.

## Error recovery

Validate framework slugs against /api/frameworks.index.json before fetching /api/frameworks/{slug}.json. Retry transient static-host failures with exponential backoff and cache successful responses.
`)

  writeText(publicDir, 'api/index.html', pageHtml({
    title: 'Public API',
    description: 'Public read-only API reference for SDFrame software design framework data.',
    pathName: '/api/',
    heading: 'SDFrame Public API',
    sections: [
      { title: 'OpenAPI', body: `<p>The API contract is published at <a href="/openapi.json">/openapi.json</a> and mirrored at <a href="/api/openapi.json">/api/openapi.json</a>.</p>` },
      { title: 'Data model', body: '<p>Frameworks include slug, names, bilingual descriptions, category, tags, quality concerns, complexity, abstraction level, maturity ring, origin metadata, steps, adopters, and related-framework links.</p>' },
      { title: 'Examples', body: `<pre><code>fetch('${BASE_URL}/api/frameworks.index.json')
fetch('${BASE_URL}/api/categories.json')</code></pre>` },
    ],
  }))
  writeText(publicDir, 'api/llms.txt', `# SDFrame API

- OpenAPI: ${BASE_URL}/openapi.json
- Base URL: ${BASE_URL}
- Auth: none
- Method: GET only
- Compact index: ${BASE_URL}/api/frameworks.index.json
- Full dataset: ${BASE_URL}/api/frameworks.json
- One framework: ${BASE_URL}/api/frameworks/{slug}.json
- Categories: ${BASE_URL}/api/categories.json
`)

  writeText(publicDir, 'getting-started/index.html', pageHtml({
    title: 'Getting Started',
    description: 'A practical guide for browsing SDFrame, finding software design frameworks, comparing alternatives, and using the AI skill package.',
    pathName: '/getting-started/',
    heading: 'Getting Started with SDFrame',
    sections: [
      { title: 'For engineers', body: '<ol><li>Start with a concrete design problem.</li><li>Use search or category filters to find candidate frameworks.</li><li>Check when-to-use and when-not-to-use guidance before choosing.</li><li>Compare close alternatives instead of picking from name recognition alone.</li><li>Use implementation steps as a starting checklist, then adapt them to your system.</li></ol>' },
      { title: 'For AI agents', body: `<p>Read <a href="/skill/SKILL.md">/skill/SKILL.md</a> first. It defines the selection and application protocol. Use <a href="/skill/references/catalog.md">catalog.md</a> to narrow candidates and framework Markdown files for detail.</p>` },
      { title: 'For API clients', body: `<p>Use the compact JSON index for retrieval, then request individual framework JSON files as needed. See the <a href="/developers/">developer portal</a> for endpoint and retry guidance.</p>` },
    ],
  }))

  writeText(publicDir, 'pricing/index.html', pageHtml({
    title: 'Pricing',
    description: 'SDFrame is currently a free public software design framework reference with no account, API key, paid tier, or commercial SLA.',
    pathName: '/pricing/',
    heading: 'SDFrame Pricing',
    sections: [
      { title: 'Current plan', body: '<p>The public SDFrame reference, web UI, static JSON API, OpenAPI description, Markdown docs, and AI skill package are free to use.</p>' },
      { title: 'Limits', body: '<ul><li>No account is required.</li><li>No API key is required.</li><li>The API is read-only.</li><li>Clients should cache responses.</li><li>No commercial SLA is currently offered.</li></ul>' },
      { title: 'Machine-readable pricing', body: '<p>Agents can read <a href="/pricing.md">/pricing.md</a> for the same information in plain Markdown.</p>' },
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'SDFrame Public Reference',
      description: 'Free public software design framework reference and static read API.',
      url: `${BASE_URL}/pricing/`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    },
  }))

  writeText(publicDir, 'about/index.html', pageHtml({
    title: 'About',
    description: 'About SDFrame, an independent open-source reference for software design frameworks maintained by Caldis.',
    pathName: '/about/',
    heading: 'About SDFrame',
    sections: [
      { title: 'What it is', body: `<p>SDFrame is an independent open-source reference site for software design frameworks. It collects ${data.length} frameworks across ${categories.length} categories and makes them usable through a web UI, Markdown files, a static JSON API, and an AI skill package.</p>` },
      { title: 'Maintainer', body: `<p>The project is maintained by Caldis. Source code and issue tracking are available at <a href="${GITHUB_URL}">${GITHUB_URL}</a>. The site is public, read-only, and deployed as a static website.</p>` },
      { title: 'Editorial stance', body: '<p>SDFrame is intended as an engineering reference. It favors concrete descriptions, source metadata, adoption examples, implementation steps, and explicit trade-offs over promotional claims. Framework entries should help users decide when a framework is useful and when it is not.</p>' },
    ],
  }))

  writeText(publicDir, 'contact/index.html', pageHtml({
    title: 'Contact',
    description: 'Contact information for SDFrame, including maintainer email and GitHub issue tracker.',
    pathName: '/contact/',
    heading: 'Contact SDFrame',
    sections: [
      { title: 'Maintainer contact', body: `<p>Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p><p>GitHub: <a href="${GITHUB_URL}">${GITHUB_URL}</a></p>` },
      { title: 'Issue reports', body: '<p>For incorrect framework data, broken links, API schema issues, or crawler discovery problems, open a GitHub issue with the affected URL and expected correction. For security or privacy concerns, use email instead of a public issue when disclosure should not be public.</p>' },
      { title: 'Scope', body: '<p>SDFrame does not provide paid consulting, account support, private data processing, or emergency operational support. It is a public reference project.</p>' },
    ],
  }))

  writeText(publicDir, 'privacy/index.html', pageHtml({
    title: 'Privacy',
    description: 'Privacy notes for SDFrame, a static public reference site with no accounts, no private workspace, and no write API.',
    pathName: '/privacy/',
    heading: 'Privacy',
    sections: [
      { title: 'Data collection', body: '<p>SDFrame does not provide user accounts, login, private workspaces, comments, payment forms, or write APIs. The public API returns static framework data. The website may use basic analytics and static-host logs to understand aggregate traffic and diagnose availability problems.</p>' },
      { title: 'Local browser data', body: '<p>The web app may store interface preferences such as theme, language, favorites, and progress locally in the browser. This local data is not an account and is not needed to use the public API.</p>' },
      { title: 'Third-party services', body: '<p>The site is hosted as a static site and may load fonts or analytics from third-party providers depending on the page. Users can still access the Markdown and JSON endpoints directly without creating an account.</p>' },
      { title: 'Contact', body: `<p>Questions can be sent to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>` },
    ],
  }))

  writeText(publicDir, 'alternatives/index.html', pageHtml({
    title: 'SDFrame vs Alternatives',
    description: 'SDFrame vs books, pattern catalogs, general search, PMFrame.works, and ad-hoc AI answers for software design framework selection.',
    pathName: '/alternatives/',
    heading: 'SDFrame vs Alternatives',
    sections: [
      { title: 'Why SDFrame', body: `<p>SDFrame is focused on software design framework selection. Its main differences are breadth (${data.length} curated entries), bilingual English and Chinese content, filterable engineering dimensions, typed framework relationships, source metadata, and AI-agent-readable Markdown/API entry points.</p>` },
      { title: 'Comparison', body: '<table><thead><tr><th>Option</th><th>Strength</th><th>Trade-off</th></tr></thead><tbody><tr><td>Books and original papers</td><td>Most authoritative source for many frameworks.</td><td>Slow to compare across categories and hard for agents to ingest in one pass.</td></tr><tr><td>Pattern catalogs</td><td>Deep coverage for a specific domain such as GoF patterns or enterprise integration.</td><td>Usually narrower than SDFrame and often not structured for AI retrieval.</td></tr><tr><td>General web search</td><td>Broad and current.</td><td>Requires repeated source checking, deduplication, and quality filtering.</td></tr><tr><td>Ad-hoc AI answers</td><td>Fast first draft.</td><td>May omit source context, alternatives, and when-not-to-use boundaries.</td></tr><tr><td>PMFrame.works</td><td>Strong inspiration for product-management frameworks.</td><td>Focused on product management, while SDFrame focuses on software engineering and architecture.</td></tr></tbody></table>' },
      { title: 'When not to use SDFrame', body: '<p>Use original standards, books, or vendor documentation when you need legally precise compliance guidance, security certification requirements, or implementation details for a specific proprietary platform.</p>' },
    ],
  }))

  writeText(publicDir, 'compare-framework-catalogs/index.html', pageHtml({
    title: 'SDFrame vs Framework Catalogs',
    description: 'A comparison of SDFrame versus traditional pattern catalogs, architecture books, generic search, and ad-hoc AI answers.',
    pathName: '/compare-framework-catalogs/',
    heading: 'SDFrame vs Framework Catalogs',
    sections: [
      { title: 'Best fit', body: '<p>Use SDFrame when you need a broad, filterable, AI-readable reference across software architecture, coding, testing, operations, data, API, security, team, and AI collaboration practices.</p>' },
      { title: 'Where traditional catalogs are better', body: '<p>Use a domain-specific catalog or original book when you need deep authority for one family of patterns, such as enterprise integration patterns, GoF object-oriented patterns, or a vendor-specific cloud architecture guide.</p>' },
      { title: 'Where SDFrame is different', body: `<ul><li>${data.length} curated framework records instead of one narrow pattern family.</li><li>English and Chinese descriptions for international teams.</li><li>Quality concern, maturity, complexity, and abstraction-level filters.</li><li>Markdown, OpenAPI, JSON, llms.txt, llms-full.txt, and skill-package entry points for agents.</li></ul>` },
    ],
  }))

  writeText(publicDir, 'status/index.html', pageHtml({
    title: 'Status',
    description: 'Operational status information for the SDFrame static website, public API, OpenAPI spec, and AI skill package.',
    pathName: '/status/',
    heading: 'SDFrame Status',
    sections: [
      { title: 'Current state', body: '<p>The generated status file reports the static site, public JSON API, OpenAPI description, and AI skill package as operational at build time.</p>' },
      { title: 'Machine-readable status', body: '<p>Fetch <a href="/status.json">/status.json</a> for JSON status metadata.</p>' },
      { title: 'Retry policy', body: '<p>For transient static-host errors, retry after 5 seconds, 30 seconds, and 2 minutes. Cache successful responses and validate framework slugs before requesting detail JSON.</p>' },
    ],
  }))

  writeText(publicDir, '_headers', `/*
  Link: </sitemap.xml>; rel="sitemap", </index.md>; rel="alternate"; type="text/markdown", </openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json", </.well-known/api-catalog>; rel="service-meta"; type="application/linkset+json"
  Vary: Accept
`)

  console.log(`  agent assets: OpenAPI, API JSON, markdown docs, discovery files, trust pages`)
}
