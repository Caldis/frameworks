import type { Framework, CategoryKey } from '../types'
import thinkingData from '../../data/frameworks/thinking.json'
import architectureData from '../../data/frameworks/architecture.json'
import codingData from '../../data/frameworks/coding.json'
import qualityData from '../../data/frameworks/quality.json'
import deploymentData from '../../data/frameworks/deployment.json'
import evolutionData from '../../data/frameworks/evolution.json'
import aiData from '../../data/frameworks/ai.json'
import dataArchData from '../../data/frameworks/data.json'
import securityData from '../../data/frameworks/security.json'
import distributedData from '../../data/frameworks/distributed.json'
import apiData from '../../data/frameworks/api.json'
import teamData from '../../data/frameworks/team.json'
import observabilityData from '../../data/frameworks/observability.json'

const allFrameworks: Framework[] = [
  ...thinkingData, ...architectureData, ...codingData, ...qualityData,
  ...deploymentData, ...evolutionData, ...aiData,
  ...dataArchData, ...securityData, ...distributedData,
  ...apiData, ...teamData, ...observabilityData,
] as Framework[]

export function getAllFrameworks() { return allFrameworks }
export function getFrameworkBySlug(slug: string) { return allFrameworks.find(f => f.slug === slug) }
export function getFrameworksByCategory(cat: CategoryKey) { return allFrameworks.filter(f => f.category === cat) }
export function getAIRelevantFrameworks() { return allFrameworks.filter(f => f.ai_relevant) }
export function getRelatedFrameworks(fw: Framework) { return fw.related.map(s => getFrameworkBySlug(s)).filter(Boolean) as Framework[] }
export function searchFrameworks(query: string) {
  const q = query.toLowerCase()
  return allFrameworks.filter(f => {
    // Basic fields
    if (f.name.toLowerCase().includes(q)) return true
    if (f.name_zh.includes(q)) return true
    if (f.desc.toLowerCase().includes(q)) return true
    if (f.desc_zh.includes(q)) return true
    if (f.tags.some(t => t.toLowerCase().includes(q))) return true
    // Extended fields
    if (f.origin_author?.toLowerCase().includes(q)) return true
    if (f.case_study_company?.toLowerCase().includes(q)) return true
    if (f.case_study?.toLowerCase().includes(q)) return true
    if (f.case_study_zh?.includes(q)) return true
    if (f.adopters?.some(a => a.toLowerCase().includes(q))) return true
    if (f.when_to_use?.some(w => w.toLowerCase().includes(q))) return true
    if (f.when_to_use_zh?.some(w => w.includes(q))) return true
    if (f.core_concepts?.some(c => c.toLowerCase().includes(q))) return true
    if (f.core_concepts_zh?.some(c => c.includes(q))) return true
    return false
  })
}
