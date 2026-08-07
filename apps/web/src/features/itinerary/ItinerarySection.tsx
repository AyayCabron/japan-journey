import { itineraryItems, type ItineraryCategory } from './itineraryData'

const categoryLabels: Record<ItineraryCategory, string> = {
  travel: 'Deslocamento',
  culture: 'Cultura',
  tech: 'Tecnologia',
  food: 'Alimentação',
  shop: 'Compras / bugigangas',
  park: 'Parques',
}

const categories = Object.entries(categoryLabels) as [ItineraryCategory, string][]

export function ItinerarySection() {
  return (
    <section id="itinerary" className="section alt">
      <div className="section-head">
        <p className="eyebrow">行程 — 02</p>
        <h2>Linha do tempo</h2>
      </div>

      <div className="tl-legend">
        {categories.map(([category, label]) => (
          <span key={category} className={`tl-tag tag-${category}`}>
            {label}
          </span>
        ))}
      </div>

      <div className="timeline">
        {itineraryItems.map((item, index) => (
          <article key={`${item.title}-${index}`} className="tl-item">
            <span className="tl-dot" />

            <div>
              <span className={`tl-tag tag-${item.category}`}>{item.categoryLabel}</span>

              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
