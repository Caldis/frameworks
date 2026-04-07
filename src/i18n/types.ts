export type Locale = 'en' | 'zh'

export interface LocaleStrings {
  // Site
  siteTitle: string
  siteTitleLine1: string
  siteTitleLine2: string
  siteSubtitle: string

  // Navigation
  allFrameworks: string
  backToHome: string
  backToCategory: string
  viewDetails: string
  previous: string
  next: string
  map: string

  // Search & Filter
  searchPlaceholder: string
  showingXofY: string  // uses {shown} and {total} placeholders
  all: string

  // Favorites
  favorites: string

  // Framework detail
  implementationSteps: string
  relatedFrameworks: string
  frameworkNotFound: string
  categoryNotFound: string

  // Category page
  frameworksCount: string  // uses {count} placeholder
  aiRelevantCount: string  // uses {count} placeholder
  aiAcrossCategories: string

  // Map
  mapTitle: string
  mapAxisFundamental: string
  mapAxisAdvanced: string
  mapSearch: string
  mapHint: string
  mapViewDetails: string
  mapConnections: string

  // Footer
  footerTitle: string
  builtBy: string
  source: string
  inspiredBy: string

  // Detail page sections
  whenToUse: string
  coreConceptsTitle: string
  originAndEvolution: string
  howItWorks: string
  dosTitle: string
  dontsTitle: string
  caseStudy: string
  whenNotToUse: string
  notableAdopters: string
  complexity: string
  complexityBeginner: string
  complexityIntermediate: string
  complexityAdvanced: string
  originBy: string

  // Multi-dimensional filters
  filterAbstraction: string
  filterQuality: string
  filterMaturity: string
  abstractionCode: string
  abstractionComponent: string
  abstractionSystem: string
  abstractionOrganization: string
  maturityFoundational: string
  maturityEstablished: string
  maturityEmerging: string
  maturityExperimental: string
  qualityReliability: string
  qualitySecurity: string
  qualityPerformance: string
  qualityMaintainability: string
  qualityScalability: string
  qualityUsability: string
  qualityTestability: string
  qualityObservability: string
  qualityPortability: string

  // Provenance
  primarySource: string
  secondarySourcesTitle: string
  readingList: string
  recommendedReading: string

  // Compare
  compare: string
  compareTitle: string
  compareSubtitle: string
  compareSelect: string
  compareEmpty: string
  compareClear: string
  compareSuggestions: string
  compareSuggestionsHint: string
  compareRadarTitle: string
  compareDimComplexity: string
  compareDimAbstraction: string
  compareDimMaturity: string
  compareDimQuality: string
  compareDimAdoption: string

  // Selector
  selector: string
  selectorTitle: string
  selectorSubtitle: string
  selectorStep: string
  selectorResults: string
  selectorNoResults: string
  selectorReset: string
  selectorQ1: string
  selectorQ2: string
  selectorQ3: string
  selectorQ4: string

  // Learning Paths
  learningPaths: string
  learningPathsTitle: string
  learningPathsSubtitle: string
  pathProgress: string
  pathStep: string
  startPath: string
  continuePath: string

  // Relation types
  relTypeRelated: string
  relTypeAlternative: string
  relTypeComplement: string
  relTypeExtends: string
  relTypePrerequisite: string

  // Stats
  insights: string
  timeline: string

  // Misc
  noResults: string  // uses {query} placeholder
  ai: string
}
