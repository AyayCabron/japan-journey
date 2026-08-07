import {
  buildGoogleMapsSearchUrl,
  formatBudgetJpy,
  formatDuration,
} from '../../domain/places/placeUtils'
import type { Place } from '../../domain/places/place'

interface PlaceCardProps {
  place: Place
  isSelected: boolean
  onSelect: (place: Place) => void
}

export function PlaceCard({ place, isSelected, onSelect }: PlaceCardProps) {
  return (
    <article className={`place-card${isSelected ? ' active' : ''}`}>
      <button
        type="button"
        className="place-card-main"
        aria-pressed={isSelected}
        onClick={() => onSelect(place)}
      >
        <strong>{place.name}</strong>

        <span>{place.district ? `${place.district}, ${place.city}` : place.city}</span>

        <div className="place-card-meta">
          <span>{formatDuration(place.estimatedDurationMinutes)}</span>
          <span>{formatBudgetJpy(place.estimatedBudgetJpy)}</span>
        </div>
      </button>

      <a
        className="place-card-maps"
        href={buildGoogleMapsSearchUrl(place)}
        target="_blank"
        rel="noreferrer"
      >
        Abrir no Google Maps
      </a>
    </article>
  )
}
