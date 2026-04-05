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

  // Footer
  footerTitle: string
  builtBy: string
  source: string

  // Misc
  noResults: string  // uses {query} placeholder
  ai: string
}
