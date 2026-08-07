import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Overview } from './components/Overview'
import { CitiesSection } from './features/cities/CitiesSection'
import { ItinerarySection } from './features/itinerary/ItinerarySection'
import { ExperiencesSection } from './features/experiences/ExperiencesSection'
import { TravelersSection } from './features/travelers/TravelersSection'
import { FinanceSection } from './features/finance/FinanceSection'

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <main>
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
