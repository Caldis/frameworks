export type CategoryKey = 'thinking' | 'architecture' | 'coding' | 'quality' | 'deployment' | 'evolution' | 'ai' | 'data' | 'security' | 'distributed' | 'api' | 'team' | 'observability'
export type VizType = 'matrix' | 'flow' | 'pyramid' | 'cycle' | 'venn' | 'radar' | 'tree' | 'timeline' | 'concentric' | 'quadrant' | 'sankey' | 'hexgrid'

export type RelationType = 'related' | 'alternative' | 'complement' | 'extends' | 'prerequisite'

export interface TypedRelation {
  slug: string
  type: RelationType
}

export type Complexity = 'beginner' | 'intermediate' | 'advanced'
export type AbstractionLevel = 'code' | 'component' | 'system' | 'organization'
export type MaturityRing = 'foundational' | 'established' | 'emerging' | 'experimental'
export type QualityConcern = 'reliability' | 'security' | 'performance' | 'maintainability' | 'scalability' | 'usability' | 'testability' | 'observability' | 'portability'

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
  // Existing (keep for backward compat)
  related: string[]
  // New typed relations (optional, populated incrementally)
  typed_relations?: TypedRelation[]
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
  // Structured case study (optional, backward-compatible)
  case_study_challenge?: string
  case_study_challenge_zh?: string
  case_study_approach?: string
  case_study_approach_zh?: string
  case_study_result?: string
  case_study_result_zh?: string
  case_study_quote?: string
  case_study_quote_zh?: string
  when_not_to_use: string[]
  when_not_to_use_zh: string[]
  adopters: string[]

  // Provenance (S05)
  primary_source?: string
  secondary_sources?: string[]

  // Multi-dimensional taxonomy (S04)
  abstraction_level: AbstractionLevel
  quality_concerns: QualityConcern[]
  maturity_ring: MaturityRing
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

export interface LearningPath {
  id: string
  name: string
  name_zh: string
  desc: string
  desc_zh: string
  icon: string
  frameworks: string[]  // slugs in order
}
