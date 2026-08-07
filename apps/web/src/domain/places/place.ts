export type PlaceCategory =
  | 'anime'
  | 'technology'
  | 'shopping'
  | 'restaurant'
  | 'park'
  | 'culture'
  | 'accommodation'
  | 'transport'

export type PlacePriority = 'must' | 'high' | 'medium' | 'optional'

export interface PlaceExternalData {
  googlePlaceId?: string
  googleMapsUrl?: string
  websiteUrl?: string
  photoReferences?: string[]
}

export interface Place {
  id: string
  name: string
  searchQuery: string
  city: string
  district?: string
  category: PlaceCategory
  priority: PlacePriority
  estimatedBudgetJpy?: number
  estimatedDurationMinutes?: number
  tags: string[]
  external: PlaceExternalData
}
