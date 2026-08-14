import { useEffect, useState, type FormEvent } from 'react'
import type { Trip } from '@japan-journey/types'
import { tripClient } from '../../services/apiSdk'

interface TripsSectionProps {
  onSelectTrip: (trip: Trip) => void
}

interface TripFormState {
  name: string
  destinationCountry: string
  startDate: string
  endDate: string
}

const initialForm: TripFormState = {
  name: '',
  destinationCountry: 'Japan',
  startDate: '',
  endDate: '',
}

export function TripsSection({ onSelectTrip }: TripsSectionProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [form, setForm] = useState<TripFormState>(initialForm)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    tripClient
      .list()
      .then((result) => {
        setTrips(result)
      })
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Não foi possível carregar suas viagens.',
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsCreating(true)
    setError('')

    try {
      const trip = await tripClient.create({
        name: form.name,
        destinationCountry: form.destinationCountry,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
      })

      setTrips((current) => [trip, ...current])
      setForm(initialForm)
      setIsFormOpen(false)
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Não foi possível criar a viagem.',
      )
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <section className="section trips-section">
      <div className="section-head trips-section-head">
        <div>
          <p className="eyebrow">旅行 — VIAGENS</p>
          <h2>Minhas viagens</h2>

          <p className="section-desc">Crie e organize seus planejamentos de viagem.</p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsFormOpen((current) => !current)}
        >
          {isFormOpen ? 'Cancelar' : '+ Nova viagem'}
        </button>
      </div>

      {isFormOpen && (
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="trip-form-grid">
            <label>
              Nome da viagem
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                required
              />
            </label>

            <label>
              Destino
              <input
                value={form.destinationCountry}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    destinationCountry: event.target.value,
                  }))
                }
                required
              />
            </label>

            <label>
              Data inicial
              <input
                type="date"
                value={form.startDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    startDate: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Data final
              <input
                type="date"
                value={form.endDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    endDate: event.target.value,
                  }))
                }
              />
            </label>
          </div>

          <button type="submit" className="btn-primary" disabled={isCreating}>
            {isCreating ? 'Salvando...' : 'Criar viagem'}
          </button>
        </form>
      )}

      {error && <p className="trip-error">{error}</p>}

      {isLoading ? (
        <p className="trip-empty">Carregando viagens...</p>
      ) : trips.length === 0 ? (
        <div className="trip-empty">
          <strong>Nenhuma viagem criada ainda.</strong>
          <p>Crie sua primeira viagem para começar o planejamento.</p>
        </div>
      ) : (
        <div className="trip-grid">
          {trips.map((trip) => (
            <button
              key={trip.id}
              type="button"
              className="trip-card"
              onClick={() => onSelectTrip(trip)}
            >
              <span className="card-label">{trip.destinationCountry}</span>

              <h3>{trip.name}</h3>

              <div className="trip-card-dates">
                <span>{trip.startDate ?? 'Data não definida'}</span>

                <i>→</i>

                <span>{trip.endDate ?? 'Data não definida'}</span>
              </div>

              <span className="trip-card-open">Abrir viagem →</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
