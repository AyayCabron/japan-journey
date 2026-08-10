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

  return (
    <>
      <Navbar />
      <Hero />

      <main>
        <TripsSection />
        <Overview />
        <ItinerarySection />
        <CitiesSection />
        <ExperiencesSection />
        <FinanceSection />
        <TravelersSection />
      </main>
    </>
  )
}

export default App
