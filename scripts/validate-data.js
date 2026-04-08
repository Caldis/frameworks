/**
 * Data validation gate — runs before all generators.
 * Fails the build on any data integrity errors.
 */
const { loadAllFrameworks } = require('./shared/data-loader')
const schema = require('./shared/schema')

const data = loadAllFrameworks()
const slugSet = new Set(data.map(fw => fw.slug))
let errors = 0

function error(msg) {
  console.error(`  ERROR: ${msg}`)
  errors++
}

console.log(`Validating ${data.length} frameworks...`)

// Check each framework
for (const fw of data) {
  const ctx = fw.slug || fw.name || 'unknown'

  // Required fields
  for (const field of schema.REQUIRED_FIELDS) {
    if (fw[field] === undefined || fw[field] === null) {
      error(`${ctx}: missing required field "${field}"`)
    }
  }

  // Enum validation
  if (fw.viz_type && !schema.VIZ_TYPES.includes(fw.viz_type))
    error(`${ctx}: invalid viz_type "${fw.viz_type}"`)
  if (fw.complexity && !schema.COMPLEXITY.includes(fw.complexity))
    error(`${ctx}: invalid complexity "${fw.complexity}"`)
  if (fw.abstraction_level && !schema.ABSTRACTION.includes(fw.abstraction_level))
    error(`${ctx}: invalid abstraction_level "${fw.abstraction_level}"`)
  if (fw.maturity_ring && !schema.MATURITY.includes(fw.maturity_ring))
    error(`${ctx}: invalid maturity_ring "${fw.maturity_ring}"`)
  if (fw.category && !schema.CATEGORIES.includes(fw.category))
    error(`${ctx}: invalid category "${fw.category}"`)

  // Quality concerns
  if (Array.isArray(fw.quality_concerns)) {
    for (const q of fw.quality_concerns) {
      if (!schema.QUALITY.includes(q))
        error(`${ctx}: invalid quality_concern "${q}"`)
    }
  }

  // Related slug validity
  if (Array.isArray(fw.related)) {
    for (const rel of fw.related) {
      if (!slugSet.has(rel))
        error(`${ctx}: broken related slug "${rel}"`)
    }
  }

  // Duplicate slug check
  const dupes = data.filter(f => f.slug === fw.slug)
  if (dupes.length > 1)
    error(`${ctx}: duplicate slug (found ${dupes.length} times)`)
}

if (errors > 0) {
  console.error(`\nValidation FAILED: ${errors} errors found`)
  process.exit(1)
} else {
  console.log(`✓ Validation passed: ${data.length} frameworks, 0 errors`)
}
