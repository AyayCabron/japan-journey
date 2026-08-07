import { TravelerCard } from './TravelerCard'
import { travelers } from './travelersData'

export function TravelersSection() {
  return (
    <section id="travelers" className="section">
      <div className="section-head">
        <p className="eyebrow">旅行者 — 05</p>
        <h2>Participantes</h2>

        <p className="section-desc">
          Acompanhamento individual de pagamentos, gastos e lugares de interesse.
        </p>
      </div>

      <div className="traveler-grid">
        {travelers.map((traveler) => (
          <TravelerCard key={traveler.id} traveler={traveler} />
        ))}
      </div>
    </section>
  )
}
