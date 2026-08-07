import { useState } from 'react'
import { cities, type CityTheme } from './citiesData'

export function CitiesSection() {
  const [selectedCityId, setSelectedCityId] = useState<CityTheme>('tokyo')

  const selectedCity = cities.find((city) => city.id === selectedCityId) ?? cities[0]

  return (
    <section id="cities" className="section" data-theme={selectedCity.id}>
      <div className="section-head">
        <p className="eyebrow">都市 — 03</p>
        <h2>Cidades</h2>

        <p className="section-desc">
          Cada cidade tem sua própria atmosfera. Clique em um cartão para sentir a mudança.
        </p>
      </div>

      <div className="city-grid">
        {cities.map((city) => {
          const isActive = city.id === selectedCity.id

          return (
            <button
              key={city.id}
              type="button"
              className={`city-card${isActive ? ' active' : ''}`}
              data-theme={city.id}
              aria-pressed={isActive}
              onClick={() => setSelectedCityId(city.id)}
            >
              <span className="city-name">{city.name}</span>

              <span className="city-meta">
                <b>{city.days}</b> {city.dayLabel} · <b>{city.places}</b> lugares
              </span>

              <span className="city-budget">{city.budget}</span>
            </button>
          )
        })}
      </div>

      <div className="city-detail">
        <div className="city-detail-inner">
          <h3>{selectedCity.name}</h3>
          <p>{selectedCity.description}</p>

          <div className="city-detail-stats">
            <div>
              <strong>{selectedCity.days}</strong>
              <span>{selectedCity.dayLabel}</span>
            </div>

            <div>
              <strong>{selectedCity.places}</strong>
              <span>lugares</span>
            </div>

            <div>
              <strong>{selectedCity.budget}</strong>
              <span>orçamento</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
