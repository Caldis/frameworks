/**
 * Unified data loading — all generators share this.
 * Reads data once, provides consistent access.
 */
const fs = require('fs')
const path = require('path')
const schema = require('./schema')

const DATA_DIR = path.join(__dirname, '..', '..', 'data', 'frameworks')

function loadAllFrameworks() {
  const all = []
  for (const cat of schema.CATEGORIES) {
    const filePath = path.join(DATA_DIR, `${cat}.json`)
    if (!fs.existsSync(filePath)) {
      console.warn(`Warning: ${cat}.json not found`)
      continue
    }
    const frameworks = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    all.push(...frameworks)
  }
  return all
}

function loadFrameworksByCategory() {
  const byCategory = {}
  for (const cat of schema.CATEGORIES) {
    const filePath = path.join(DATA_DIR, `${cat}.json`)
    if (!fs.existsSync(filePath)) continue
    byCategory[cat] = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }
  return byCategory
}

function loadCategories() {
  // Read category definitions from the TS source
  const catPath = path.join(__dirname, '..', '..', 'src', 'data', 'categories.ts')
  const catSource = fs.readFileSync(catPath, 'utf-8')

  // Extract category objects — each is on a single line
  const categories = []
  const lineRegex = /\{\s*key:\s*'(\w+)',\s*name:\s*'([^']+)',\s*name_zh:\s*'([^']+)',\s*slug:\s*'([^']+)',.*?description:\s*'([^']*)',\s*description_zh:\s*'([^']*)'/g
  let match
  while ((match = lineRegex.exec(catSource)) !== null) {
    categories.push({
      key: match[1],
      name: match[2],
      name_zh: match[3],
      slug: match[4],
      description: match[5],
      description_zh: match[6],
    })
  }
  return categories
}

module.exports = { loadAllFrameworks, loadFrameworksByCategory, loadCategories }
