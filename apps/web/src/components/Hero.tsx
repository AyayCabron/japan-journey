export function Hero() {
  return (
    <header id="hero">
      <div className="hero-bg">
        <div className="hero-glow g1" />
        <div className="hero-glow g2" />
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">六人 · 二十日 · 一つの旅</p>

        <h1 className="hero-title">
          JAPAN <span>2028</span>
        </h1>

        <p className="hero-sub">The Journey Begins</p>

        <div className="hero-stats">
          <div>
            <strong>6</strong>
            <span>Travelers</span>
          </div>

          <div className="dot" />

          <div>
            <strong>20</strong>
            <span>Days</span>
          </div>

          <div className="dot" />

          <div>
            <strong>∞</strong>
            <span>Memories</span>
          </div>
        </div>

        <a href="#overview" className="btn-primary">
          Begin the Adventure →
        </a>
      </div>

      <div className="scroll-hint">scroll</div>
    </header>
  )
}
