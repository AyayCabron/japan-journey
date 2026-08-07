export type TripRole = 'owner' | 'editor' | 'viewer'

export interface Trip {
  id: string

  name: string

  slug: string

  destinationCountry: string

  startDate: string | null

  endDate: string | null

  createdAt: string

  updatedAt: string
}

export interface TripMember {
  tripId: string

  userId: string

  role: TripRole
}

export interface CreateTripRequest {
  name: string

  slug: string

  startDate?: string

  endDate?: string
}

export interface UpdateTripRequest {
  name?: string

  startDate?: string

  endDate?: string
}
