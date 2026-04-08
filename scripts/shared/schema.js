/**
 * Single source of truth for all enum values and validation rules.
 * Used by: validate-data.js, generators (skill-meta, llms), categories.ts
 */
module.exports = {
  CATEGORIES: [
    'thinking', 'architecture', 'coding', 'quality', 'deployment',
    'evolution', 'ai', 'data', 'security', 'distributed', 'api',
    'team', 'observability'
  ],

  VIZ_TYPES: ['flow', 'cycle', 'pyramid', 'matrix', 'venn', 'radar', 'tree', 'timeline'],

  COMPLEXITY: ['beginner', 'intermediate', 'advanced'],

  ABSTRACTION: ['code', 'component', 'system', 'organization'],

  MATURITY: ['foundational', 'established', 'emerging', 'experimental'],

  QUALITY: [
    'reliability', 'security', 'performance', 'maintainability',
    'scalability', 'usability', 'testability', 'observability', 'portability'
  ],

  REQUIRED_FIELDS: [
    'id', 'name', 'name_zh', 'slug', 'category', 'desc', 'desc_zh',
    'steps', 'steps_zh', 'viz_type', 'complexity', 'origin_author',
    'adopters', 'related', 'tags', 'ai_relevant',
    'abstraction_level', 'quality_concerns', 'maturity_ring'
  ],

  DETAIL_FIELDS: [
    'when_to_use', 'when_to_use_zh', 'core_concepts', 'core_concepts_zh',
    'timeline', 'timeline_zh', 'dos', 'dos_zh', 'donts', 'donts_zh',
    'case_study', 'case_study_zh', 'case_study_company',
    'when_not_to_use', 'when_not_to_use_zh',
    'primary_source', 'secondary_sources',
    'origin_source', 'origin_source_zh'
  ],
}
