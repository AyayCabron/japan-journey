import { useEffect, useState } from 'react'
import type { ItineraryDay, Trip } from '@japan-journey/types'

import { itineraryClient } from '../../services/apiSdk'

interface ItinerarySectionProps {
  trip: Trip
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date(`${date}T00:00:00`))
}

export function ItinerarySection({ trip }: ItinerarySectionProps) {
  const [days, setDays] = useState<ItineraryDay[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    itineraryClient
      .list(trip.id)
      .then((result) => {
        if (!isActive) {
          return
        }

        setDays(result)
        setError('')
      })
      .catch((requestError: unknown) => {
        if (!isActive) {
          return
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Não foi possível carregar o roteiro.',
        )
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [trip.id])

  return (
    <section id="itinerary" className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow">旅程 — 02</p>
          <h2>Roteiro</h2>

          <p className="section-desc">Planejamento diário de {trip.name}.</p>
        </div>
      </div>

      {error && <p className="trip-error">{error}</p>}

      {isLoading ? (
        <p className="trip-empty">Carregando roteiro...</p>
      ) : days.length === 0 ? (
        <div className="trip-empty">
          <strong>Roteiro ainda vazio.</strong>

          <p>Nenhum dia foi adicionado a esta viagem.</p>
        </div>
      ) : (
        <div className="itinerary-days">
          {days.map((day) => (
            <article key={day.id} className="itinerary-day">
              <div className="itinerary-day-header">
                <div>
                  <span className="card-label">{formatDate(day.date)}</span>

                  <h3>{day.title ?? 'Dia de viagem'}</h3>
                </div>
              </div>

              {day.notes && <p>{day.notes}</p>}

              {day.items.length === 0 ? (
                <p className="trip-empty">Nenhuma atividade neste dia.</p>
              ) : (
                <div className="itinerary-items">
                  {day.items.map((item) => (
                    <div key={item.id} className="itinerary-item">
                      <div>
                        <span className="card-label">
                          {item.startTime ? item.startTime.slice(0, 5) : 'Sem horário'}
                        </span>

                        <strong>{item.title}</strong>

                        {item.locationName && <p>{item.locationName}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
