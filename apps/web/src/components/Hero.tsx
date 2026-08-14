import type { Trip } from '@japan-journey/types'

interface HeroProps {
  trip: Trip
}

export function Hero({ trip }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">日本旅行</p>

        <h1>{trip.name}</h1>

        <p className="hero-copy">{trip.destinationCountry}</p>

        <div className="hero-meta">
          <span>{trip.startDate ?? 'Data inicial não definida'}</span>

          <i>→</i>

          <span>{trip.endDate ?? 'Data final não definida'}</span>
        </div>
      </div>
    </section>
  )
}
