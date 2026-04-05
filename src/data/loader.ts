import type { Framework, CategoryKey } from '../types'
import thinkingData from '../../data/frameworks/thinking.json'
import architectureData from '../../data/frameworks/architecture.json'
import codingData from '../../data/frameworks/coding.json'
import qualityData from '../../data/frameworks/quality.json'
import deploymentData from '../../data/frameworks/deployment.json'
import evolutionData from '../../data/frameworks/evolution.json'
import aiData from '../../data/frameworks/ai.json'

const allFrameworks: Framework[] = [
  ...thinkingData, ...architectureData, ...codingData, ...qualityData,
  ...deploymentData, ...evolutionData, ...aiData,
] as Framework[]

export function getAllFrameworks() { return allFrameworks }
export function getFrameworkBySlug(slug: string) { return allFrameworks.find(f => f.slug === slug) }
export function getFrameworksByCategory(cat: CategoryKey) { return allFrameworks.filter(f => f.category === cat) }
export function getAIRelevantFrameworks() { return allFrameworks.filter(f => f.ai_relevant) }
export function getRelatedFrameworks(fw: Framework) { return fw.related.map(s => getFrameworkBySlug(s)).filter(Boolean) as Framework[] }
export function searchFrameworks(query: string) {
  const q = query.toLowerCase()
  return allFrameworks.filter(f => f.name.toLowerCase().includes(q) || f.name_zh.includes(q) || f.desc.toLowerCase().includes(q) || f.desc_zh.includes(q) || f.tags.some(t => t.toLowerCase().includes(q)))
}
