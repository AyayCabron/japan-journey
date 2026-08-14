import type { Trip } from '@japan-journey/types'

interface OverviewProps {
  trip: Trip
}

function calculateTripDays(startDate: string | null, endDate: string | null): number | null {
  if (!startDate || !endDate) {
    return null
  }

  const start = new Date(`${startDate}T00:00:00`)
  const end = new Date(`${endDate}T00:00:00`)

  const difference = end.getTime() - start.getTime()

  if (difference < 0) {
    return null
  }

  return Math.floor(difference / 86_400_000) + 1
}

function formatDate(date: string | null): string {
  if (!date) {
    return 'Não definida'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

export function Overview({ trip }: OverviewProps) {
  const tripDays = calculateTripDays(trip.startDate, trip.endDate)

  return (
    <section id="overview" className="section">
      <div className="section-head">
        <p className="eyebrow">概要 — 01</p>

        <h2>Visão geral</h2>

        <p className="section-desc">Informações principais da viagem selecionada.</p>
      </div>

      <div className="overview-grid">
        <article className="overview-card">
          <span className="card-label">Viagem</span>
          <strong>{trip.name}</strong>
          <p>Planejamento atual</p>
        </article>

        <article className="overview-card">
          <span className="card-label">Destino</span>
          <strong>{trip.destinationCountry}</strong>
          <p>Destino principal</p>
        </article>

        <article className="overview-card">
          <span className="card-label">Duração</span>
          <strong>{tripDays !== null ? `${tripDays} dias` : 'Não definida'}</strong>
          <p>Período total da viagem</p>
        </article>

        <article className="overview-card">
          <span className="card-label">Período</span>

          <strong>{formatDate(trip.startDate)}</strong>

          <p>até {formatDate(trip.endDate)}</p>
        </article>
      </div>
    </section>
  )
}
