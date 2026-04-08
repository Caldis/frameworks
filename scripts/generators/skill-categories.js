const fs = require('fs')
const path = require('path')

module.exports = function generateSkillCategories(data, categories) {
  const outDir = path.join(__dirname, '..', '..', 'public', 'skill', 'references', 'categories')
  fs.mkdirSync(outDir, { recursive: true })

  for (const cat of categories) {
    const catFws = data.filter(fw => fw.category === cat.key)
    if (catFws.length === 0) continue

    const lines = [
      `# ${cat.name} / ${cat.name_zh}`,
      '',
      cat.description,
      '',
      `${cat.description_zh}`,
      '',
      `**${catFws.length} frameworks** in this category.`,
      '',
      '## Frameworks',
      '',
    ]

    for (const fw of catFws) {
      const quals = (fw.quality_concerns || []).slice(0, 3).join(', ')
      lines.push(`### ${fw.name} / ${fw.name_zh}`)
      lines.push(`- **Slug**: ${fw.slug}`)
      lines.push(`- **Complexity**: ${fw.complexity}`)
      lines.push(`- **Quality**: ${quals}`)
      lines.push(`- **Author**: ${fw.origin_author || 'N/A'}`)
      lines.push(`- ${fw.desc}`)
      lines.push('')
    }

    const content = lines.join('\n')
    fs.writeFileSync(path.join(outDir, `${cat.key}.md`), content, 'utf-8')
  }

  console.log(`  skill/references/categories/: ${categories.length} files`)
}
