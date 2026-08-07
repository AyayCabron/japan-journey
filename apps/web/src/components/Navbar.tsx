import { useEffect, useState } from 'react'

const navigationItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Itinerary', href: '#itinerary' },
  { label: 'Cities', href: '#cities' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Budget', href: '#budget' },
  { label: 'Travelers', href: '#travelers' },
  { label: 'Passport', href: '#passport' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <nav id="navbar" className={isScrolled ? 'scrolled' : undefined}>
      <div className="nav-inner">
        <a href="#hero" className="nav-brand" onClick={closeMenu}>
          <svg className="torii-logo" viewBox="0 0 48 40" width="26" height="22" aria-hidden="true">
            <rect x="4" y="8" width="40" height="4" rx="1" />
            <rect x="0" y="16" width="48" height="3" rx="1" />
            <rect x="9" y="19" width="4" height="19" />
            <rect x="35" y="19" width="4" height="19" />
          </svg>

          <span>JAPAN 2028</span>
        </a>

        <div className={`nav-links${isMenuOpen ? ' open' : ''}`}>
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}
