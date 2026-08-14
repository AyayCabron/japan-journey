import { useState } from 'react'
import type { Trip } from '@japan-journey/types'

import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Overview } from './components/Overview'
import { AuthPanel } from './features/auth/AuthPanel'
import { useAuth } from './features/auth/useAuth'
import { CitiesSection } from './features/cities/CitiesSection'
import { ExperiencesSection } from './features/experiences/ExperiencesSection'
import { FinanceSection } from './features/finance/FinanceSection'
import { ItinerarySection } from './features/itinerary/ItinerarySection'
import { TravelersSection } from './features/travelers/TravelersSection'
import { TripsSection } from './features/trips/TripsSection'

function App() {
  const { user, isLoading } = useAuth()
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)

  if (isLoading) {
    return (
      <main className="auth-page">
        <p>Carregando...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="auth-page">
        <AuthPanel />
      </main>
    )
  }

  if (!selectedTrip) {
    return (
      <>
        <Navbar />

        <main>
          <TripsSection onSelectTrip={setSelectedTrip} />
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <Hero trip={selectedTrip} />

      <main>
        <section className="trip-context-bar">
          <button type="button" className="trip-back-button" onClick={() => setSelectedTrip(null)}>
            ← Minhas viagens
          </button>

          <div>
            <span>VIAGEM ATUAL</span>
            <strong>{selectedTrip.name}</strong>
          </div>
        </section>

        <Overview trip={selectedTrip} />
        <ItinerarySection trip={selectedTrip} />
        <CitiesSection />
        <ExperiencesSection />
        <FinanceSection />
        <TravelersSection />
      </main>
    </>
  )
}

export default App
