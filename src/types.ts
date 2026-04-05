export type CategoryKey = 'thinking' | 'architecture' | 'coding' | 'quality' | 'deployment' | 'evolution' | 'ai'
export type VizType = 'matrix' | 'flow' | 'pyramid' | 'cycle' | 'venn' | 'radar' | 'tree' | 'timeline'

export type Complexity = 'beginner' | 'intermediate' | 'advanced'

export interface Framework {
  id: number
  name: string
  name_zh: string
  slug: string
  category: CategoryKey
  desc: string
  desc_zh: string
  steps: string[]
  steps_zh: string[]
  ai_relevant: boolean
  viz_type: VizType
  related: string[]
  tags: string[]

  // Extended detail fields
  origin_author: string
  origin_source: string
  origin_source_zh: string
  complexity: Complexity
  when_to_use: string[]
  when_to_use_zh: string[]
  core_concepts: string[]
  core_concepts_zh: string[]
  timeline: [string, string][]
  timeline_zh: [string, string][]
  dos: string[]
  dos_zh: string[]
  donts: string[]
  donts_zh: string[]
  case_study_company: string
  case_study: string
  case_study_zh: string
  when_not_to_use: string[]
  when_not_to_use_zh: string[]
  adopters: string[]
}

export interface Category {
  key: CategoryKey
  name: string
  name_zh: string
  slug: string
  colorBg: string
  colorText: string
  description: string
  description_zh: string
}
