const fs = require('fs')
const path = require('path')

module.exports = function generateLlms(data, categories, schema) {
  const content = `# SDFrame

> ${data.length} curated software design frameworks for engineers and AI agents.
> Bilingual (EN/ZH), ${categories.length} categories.

## For AI Agents

This site provides a skill package for framework selection and application.

- Skill entry point: https://sdframe.caldis.me/skill/SKILL.md
- Framework catalog: https://sdframe.caldis.me/skill/references/catalog.md
- Category overview: https://sdframe.caldis.me/skill/references/categories/{key}.md
- Individual framework: https://sdframe.caldis.me/skill/references/frameworks/{slug}.md

Read SKILL.md first — it contains the interaction protocol.

### Categories

${categories.map(c => `- **${c.key}** (${data.filter(fw => fw.category === c.key).length}): ${c.name} — ${c.description}`).join('\n')}

### Filterable Dimensions

- Quality: ${schema.QUALITY.join(', ')}
- Abstraction: ${schema.ABSTRACTION.join(', ')}
- Complexity: ${schema.COMPLEXITY.join(', ')}
- Maturity: ${schema.MATURITY.join(', ')}

## For Humans

Website: https://sdframe.caldis.me/
`

  fs.writeFileSync(path.join(__dirname, '..', '..', 'public', 'llms.txt'), content, 'utf-8')
  console.log(`  llms.txt: ${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`)
}
