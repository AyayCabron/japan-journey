import type { ItineraryDay } from '@japan-journey/types'
import { httpClient } from '../http/httpClient'

export const itineraryClient = {
  list(tripId: string): Promise<ItineraryDay[]> {
    return httpClient.get<ItineraryDay[]>(`/api/v1/trips/${tripId}/itinerary`)
  },
}
