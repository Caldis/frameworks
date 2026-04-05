export type CategoryKey = 'thinking' | 'architecture' | 'coding' | 'quality' | 'deployment' | 'evolution' | 'ai'
export type VizType = 'matrix' | 'flow' | 'pyramid' | 'cycle' | 'venn' | 'radar' | 'tree' | 'timeline'

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
