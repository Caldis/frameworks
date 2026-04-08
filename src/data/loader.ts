import type { Framework, CategoryKey, TypedRelation, RelationType } from '../types'
import stubsData from './generated/stubs.json'

const allStubs: Framework[] = stubsData as Framework[]

// Category detail cache — populated on first access per category
const detailCache = new Map<CategoryKey, Framework[]>()

// --- Synchronous API (uses stubs — always available) ---

export function getAllFrameworks() { return allStubs }
export function getFrameworkBySlug(slug: string) { return allStubs.find(f => f.slug === slug) }
export function getFrameworksByCategory(cat: CategoryKey) { return allStubs.filter(f => f.category === cat) }
export function getAIRelevantFrameworks() { return allStubs.filter(f => f.ai_relevant) }
export function getRelatedFrameworks(fw: Framework) { return fw.related.map(s => getFrameworkBySlug(s)).filter(Boolean) as Framework[] }
export function getTypedRelations(fw: Framework): TypedRelation[] {
  if (fw.typed_relations?.length) return fw.typed_relations
  return fw.related.map(slug => ({ slug, type: 'related' as RelationType }))
}

// --- Async API (loads full category data on demand) ---

const categoryImports: Record<CategoryKey, () => Promise<{ default: Framework[] }>> = {
  thinking: () => import('../../data/frameworks/thinking.json'),
  architecture: () => import('../../data/frameworks/architecture.json'),
  coding: () => import('../../data/frameworks/coding.json'),
  quality: () => import('../../data/frameworks/quality.json'),
  deployment: () => import('../../data/frameworks/deployment.json'),
  evolution: () => import('../../data/frameworks/evolution.json'),
  ai: () => import('../../data/frameworks/ai.json'),
  data: () => import('../../data/frameworks/data.json'),
  security: () => import('../../data/frameworks/security.json'),
  distributed: () => import('../../data/frameworks/distributed.json'),
  api: () => import('../../data/frameworks/api.json'),
  team: () => import('../../data/frameworks/team.json'),
  observability: () => import('../../data/frameworks/observability.json'),
}

async function loadCategoryDetail(cat: CategoryKey): Promise<Framework[]> {
  if (detailCache.has(cat)) return detailCache.get(cat)!
  const mod = await categoryImports[cat]()
  const frameworks = mod.default as Framework[]
  detailCache.set(cat, frameworks)
  return frameworks
}

export async function getFrameworkFull(slug: string): Promise<Framework | undefined> {
  const stub = getFrameworkBySlug(slug)
  if (!stub) return undefined
  const categoryData = await loadCategoryDetail(stub.category)
  return categoryData.find(f => f.slug === slug)
}

export async function getFrameworksFullByCategory(cat: CategoryKey): Promise<Framework[]> {
  return loadCategoryDetail(cat)
}

/** Find frameworks similar to `fw` by shared dimensions, excluding explicit relations. */
export function getSimilarFrameworks(fw: Framework, limit = 5): Framework[] {
  const excluded = new Set([fw.slug, ...fw.related])
  const fwQuality = new Set(fw.quality_concerns ?? [])
  const fwTags = new Set(fw.tags ?? [])

  return allStubs
    .filter(f => !excluded.has(f.slug))
    .map(f => {
      let score = 0
      if (f.category === fw.category) score += 3
      if (f.abstraction_level === fw.abstraction_level) score += 2
      if (f.complexity === fw.complexity) score += 1
      if (f.maturity_ring === fw.maturity_ring) score += 1
      const sharedQuality = (f.quality_concerns ?? []).filter(q => fwQuality.has(q)).length
      score += sharedQuality * 1.5
      const sharedTags = (f.tags ?? []).filter(t => fwTags.has(t)).length
      score += sharedTags * 0.5
      return { fw: f, score }
    })
    .filter(x => x.score > 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.fw)
}
