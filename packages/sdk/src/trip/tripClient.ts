import { ROUTES } from '@japan-journey/config'
import type { CreateTripRequest, Trip, UpdateTripRequest } from '@japan-journey/types'
import { createHttpClient, type HttpClientOptions } from '../http/httpClient'

interface TripResponse {
  data: Trip
}

interface TripListResponse {
  data: Trip[]
}

export function createTripClient(options: HttpClientOptions) {
  const http = createHttpClient(options)

  return {
    async list(): Promise<Trip[]> {
      const response = await http.get<TripListResponse>(ROUTES.trips)

      return response.data
    },

    async get(id: string): Promise<Trip> {
      const response = await http.get<TripResponse>(`${ROUTES.trips}/${id}`)

      return response.data
    },

    async create(request: CreateTripRequest): Promise<Trip> {
      const response = await http.post<TripResponse>(ROUTES.trips, request)

      return response.data
    },

    async update(id: string, request: UpdateTripRequest): Promise<Trip> {
      const response = await http.patch<TripResponse>(`${ROUTES.trips}/${id}`, request)

      return response.data
    },

    async delete(id: string): Promise<void> {
      await http.delete(`${ROUTES.trips}/${id}`)
    },
  }
}
