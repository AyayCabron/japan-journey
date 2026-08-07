import { useMemo, useState } from 'react'
import type { Place } from '../../domain/places/place'
import { experienceTabs, getPlacesByCategory, type ExperienceCategory } from './experiencesData'
import { PlaceCard } from './PlaceCard'

export function ExperiencesSection() {
  const [activeTab, setActiveTab] = useState<ExperienceCategory>('anime')

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  const filteredPlaces = useMemo(() => getPlacesByCategory(activeTab), [activeTab])

  function handleTabChange(category: ExperienceCategory) {
    setActiveTab(category)
    setSelectedPlace(null)
  }

  return (
    <section id="experiences" className="section alt">
      <div className="section-head">
        <p className="eyebrow">体験 — 04</p>
        <h2>Experiências</h2>

        <p className="section-desc">
          Selecione um lugar para visualizar os detalhes e preparar sua localização no mapa.
        </p>
      </div>

      <div className="tabs" role="tablist" aria-label="Categorias de experiências">
        {experienceTabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn${isActive ? ' active' : ''}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="places-layout">
        <div className="places-grid">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isSelected={selectedPlace?.id === place.id}
              onSelect={setSelectedPlace}
            />
          ))}
        </div>

        <aside className="place-preview">
          {selectedPlace ? (
            <>
              <span className="card-label">Lugar selecionado</span>

              <div className="place-preview-image">
                <span>Fotos serão carregadas pela integração</span>
              </div>

              <h3>{selectedPlace.name}</h3>

              <p>
                {selectedPlace.district
                  ? `${selectedPlace.district}, ${selectedPlace.city}`
                  : selectedPlace.city}
              </p>

              <div className="place-preview-tags">
                {selectedPlace.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </>
          ) : (
            <div className="place-preview-empty">
              <span>Selecione um lugar</span>
              <p>O mapa, as fotos e os detalhes aparecerão neste painel.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
