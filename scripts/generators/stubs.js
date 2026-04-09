const fs = require('fs')
const path = require('path')

const STUB_FIELDS = [
  'id', 'name', 'name_zh', 'slug', 'category', 'desc', 'desc_zh', 'ai_relevant', 'tags',
  'complexity', 'abstraction_level', 'maturity_ring', 'quality_concerns', 'related',
  'typed_relations', 'origin_author', 'viz_type', 'viz_labels', 'viz_labels_zh', 'steps', 'steps_zh', 'adopters'
]

const DETAIL_DEFAULTS = {
  origin_source: '', origin_source_zh: '',
  when_to_use: [], when_to_use_zh: [],
  core_concepts: [], core_concepts_zh: [],
  timeline: [], timeline_zh: [],
  dos: [], dos_zh: [],
  donts: [], donts_zh: [],
  case_study_company: '', case_study: '', case_study_zh: '',
  when_not_to_use: [], when_not_to_use_zh: [],
  primary_source: '', secondary_sources: []
}

module.exports = function generateStubs(data) {
  const allStubs = []

  for (const fw of data) {
    const stub = {}
    for (const field of STUB_FIELDS) {
      stub[field] = fw[field] ?? (Array.isArray(DETAIL_DEFAULTS[field]) ? [] : '')
    }
    const tl = fw.timeline || []
    const rawYear = tl.length > 0 ? String(tl[0][0]) : ''
    const parsed = parseInt(rawYear.replace(/[^0-9-]/g, ''), 10)
    stub.origin_year = !isNaN(parsed) ? (rawYear.toLowerCase().includes('bc') ? -parsed : parsed) : 0
    Object.assign(stub, DETAIL_DEFAULTS)
    allStubs.push(stub)
  }

  const outDir = path.join(__dirname, '..', '..', 'src', 'data', 'generated')
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'stubs.json'), JSON.stringify(allStubs), 'utf-8')

  console.log(`  stubs: ${allStubs.length} entries (${(Buffer.byteLength(JSON.stringify(allStubs)) / 1024).toFixed(0)} KB)`)
}
