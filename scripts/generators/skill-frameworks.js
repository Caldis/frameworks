const fs = require('fs')
const path = require('path')

function formatList(items, prefix = '-') {
  if (!items || !Array.isArray(items) || items.length === 0) return '_No data available._\n'
  return items.map(item => `${prefix} ${item}`).join('\n') + '\n'
}

function extractOriginYear(fw) {
  const tl = fw.timeline || []
  if (tl.length === 0) return ''
  return String(tl[0][0])
}

function generateFrameworkRef(fw) {
  const year = extractOriginYear(fw)
  const adopters = (fw.adopters || []).join(', ') || 'N/A'
  const quals = (fw.quality_concerns || []).join(', ')

  const lines = []

  // Header with metadata
  lines.push(`# ${fw.name} / ${fw.name_zh}`)
  lines.push('')
  lines.push(`- **Category**: ${fw.category}`)
  lines.push(`- **Complexity**: ${fw.complexity}`)
  lines.push(`- **Quality**: ${quals}`)
  lines.push(`- **Abstraction**: ${fw.abstraction_level}`)
  lines.push(`- **Maturity**: ${fw.maturity_ring}`)
  if (fw.origin_author) {
    const authorHasYear = year && fw.origin_author.includes(year)
    lines.push(`- **Author**: ${fw.origin_author}${year && !authorHasYear ? `, ${year}` : ''}`)
  }
  lines.push(`- **Adopters**: ${adopters}`)
  lines.push('')

  // Description
  lines.push(fw.desc)
  lines.push('')
  lines.push(`_${fw.desc_zh}_`)
  lines.push('')

  // When to Use
  if (fw.when_to_use && fw.when_to_use.length > 0) {
    lines.push('## When to Use')
    lines.push('')
    lines.push('Apply this framework when:')
    lines.push(formatList(fw.when_to_use))
  }

  // When NOT to Use
  if (fw.when_not_to_use && fw.when_not_to_use.length > 0) {
    lines.push('## When NOT to Use')
    lines.push('')
    lines.push('Stop and reconsider if:')
    lines.push(formatList(fw.when_not_to_use))
  }

  // Core Concepts
  if (fw.core_concepts && fw.core_concepts.length > 0) {
    lines.push('## Core Concepts')
    lines.push('')
    lines.push(formatList(fw.core_concepts))
  }

  // Before You Start (contextual questions derived from the framework)
  lines.push('## Before You Start')
  lines.push('')
  lines.push('Ask the user about their specific context:')
  lines.push(`- What is the scope of the system you are applying ${fw.name} to?`)
  lines.push(`- What constraints or existing architecture do you need to work within?`)
  if (fw.complexity === 'advanced') {
    lines.push(`- Has your team used ${fw.name} before? (This is an advanced framework)`)
  }
  lines.push('')

  // Implementation Steps
  if (fw.steps && fw.steps.length > 0) {
    lines.push('## Implementation Steps')
    lines.push('')
    fw.steps.forEach((step, i) => {
      const colonIdx = step.indexOf(':')
      if (colonIdx > 0 && colonIdx < 40) {
        const title = step.slice(0, colonIdx).trim()
        const body = step.slice(colonIdx + 1).trim()
        lines.push(`${i + 1}. **${title}**: ${body}`)
      } else {
        lines.push(`${i + 1}. ${step}`)
      }
    })
    lines.push('')

    // Chinese steps as reference
    if (fw.steps_zh && fw.steps_zh.length > 0) {
      lines.push('<details><summary>中文步骤</summary>')
      lines.push('')
      fw.steps_zh.forEach((step, i) => {
        lines.push(`${i + 1}. ${step}`)
      })
      lines.push('')
      lines.push('</details>')
      lines.push('')
    }
  }

  // Do's
  if (fw.dos && fw.dos.length > 0) {
    lines.push('## Do')
    lines.push('')
    lines.push(formatList(fw.dos))
  }

  // Don'ts
  if (fw.donts && fw.donts.length > 0) {
    lines.push("## Don't")
    lines.push('')
    lines.push(formatList(fw.donts))
  }

  // Case Study
  if (fw.case_study) {
    lines.push('## Case Study')
    lines.push('')
    if (fw.case_study_company) {
      lines.push(`**${fw.case_study_company}**: ${fw.case_study}`)
    } else {
      lines.push(fw.case_study)
    }
    lines.push('')
  }

  // Related
  if (fw.related && fw.related.length > 0) {
    const typeMap = {}
    if (fw.typed_relations) {
      fw.typed_relations.forEach(r => { typeMap[r.slug] = r.type })
    }
    lines.push('## Related Frameworks')
    lines.push('')
    fw.related.forEach(slug => {
      const type = typeMap[slug] || 'related'
      lines.push(`- ${slug} (${type})`)
    })
    lines.push('')
  }

  // Source
  lines.push('## Source')
  lines.push('')
  lines.push(`https://sdframe.caldis.me/frameworks/${fw.slug}`)
  lines.push('')

  return lines.join('\n')
}

module.exports = function generateSkillFrameworks(data) {
  const outDir = path.join(__dirname, '..', '..', 'public', 'skill', 'references', 'frameworks')
  fs.mkdirSync(outDir, { recursive: true })

  let totalSize = 0
  for (const fw of data) {
    const content = generateFrameworkRef(fw)
    fs.writeFileSync(path.join(outDir, `${fw.slug}.md`), content, 'utf-8')
    totalSize += Buffer.byteLength(content)
  }

  console.log(`  skill/references/frameworks/: ${data.length} files (${(totalSize / 1024).toFixed(0)} KB total)`)
}
