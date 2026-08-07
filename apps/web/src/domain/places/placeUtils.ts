import type { Place } from './place'

export function formatJpy(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatBudgetJpy(value?: number): string {
  if (value === undefined) {
    return 'Não definido'
  }

  return formatJpy(value)
}

export function formatDuration(minutes?: number): string {
  if (minutes === undefined) {
    return 'Não definido'
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes} min`
  }

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}min`
}

export function buildGoogleMapsSearchUrl(place: Place): string {
  const query = encodeURIComponent(place.searchQuery)

  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
