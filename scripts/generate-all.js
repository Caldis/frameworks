/**
 * Unified generator — loads data once, runs all generators.
 * Called by: npm run prebuild (after validate-data.js)
 */
const { loadAllFrameworks, loadCategories } = require('./shared/data-loader')
const schema = require('./shared/schema')

console.log('Loading data...')
const data = loadAllFrameworks()
const categories = loadCategories()
console.log(`Loaded ${data.length} frameworks, ${categories.length} categories\n`)

console.log('Generating outputs:')

// Human layer
require('./generators/stubs')(data)
require('./generators/sitemap')(data, categories)

// AI layer
require('./generators/skill-meta')(data, categories, schema)
require('./generators/skill-catalog')(data, categories)
require('./generators/skill-categories')(data, categories)
require('./generators/skill-frameworks')(data)
require('./generators/llms')(data, categories, schema)
require('./generators/agent-assets')(data, categories, schema)

console.log(`\n✓ All outputs generated from ${data.length} frameworks`)
