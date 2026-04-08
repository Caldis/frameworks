const fs = require('fs')
const path = require('path')

module.exports = function generateSkillCatalog(data, categories) {
  const lines = [`# SDFrame Framework Catalog`, '']
  lines.push(`> ${data.length} frameworks across ${categories.length} categories.`)
  lines.push(`> Use this to search and filter. Each row: slug | name | category | quality concerns | description.`)
  lines.push('')

  // Group by category
  for (const cat of categories) {
    const catFws = data.filter(fw => fw.category === cat.key)
    if (catFws.length === 0) continue

    lines.push(`## ${cat.name} / ${cat.name_zh} (${catFws.length})`)
    lines.push('')
    lines.push('| slug | name | complexity | quality | description |')
    lines.push('|------|------|-----------|---------|-------------|')

    for (const fw of catFws) {
      const quals = (fw.quality_concerns || []).join(', ')
      const desc = (fw.desc || '').replace(/\|/g, '/')
      lines.push(`| ${fw.slug} | ${fw.name} | ${fw.complexity} | ${quals} | ${desc} |`)
    }
    lines.push('')
  }

  const content = lines.join('\n')
  const outDir = path.join(__dirname, '..', '..', 'public', 'skill', 'references')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'catalog.md'), content, 'utf-8')
  console.log(`  skill/references/catalog.md: ${data.length} entries (${(Buffer.byteLength(content) / 1024).toFixed(1)} KB)`)
}
