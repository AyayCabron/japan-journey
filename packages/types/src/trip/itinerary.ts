export interface ItineraryItem {
  id: string
  itineraryDayId: string
  title: string
  itemType: string
  startTime: string | null
  endTime: string | null
  locationName: string | null
  notes: string | null
  position: number
  createdAt: string
  updatedAt: string
}

export interface ItineraryDay {
  id: string
  tripId: string
  date: string
  title: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  items: ItineraryItem[]
}
