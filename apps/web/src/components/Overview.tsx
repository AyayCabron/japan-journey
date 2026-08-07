import { useCountdown } from '../hooks/useCountdown'

const routeCities = ['Tokyo', 'Hakone', 'Kyoto', 'Nara', 'Osaka', 'Nagoya']

export function Overview() {
  const countdown = useCountdown('2028-04-01T00:00:00')

  return (
    <section id="overview" className="section">
      <div className="section-head">
        <p className="eyebrow">概要 — 01</p>
        <h2>Resumo da viagem</h2>
      </div>

      <div className="overview-grid">
        <article className="glass-card countdown-card">
          <span className="card-label">Contador regressivo</span>

          <div className="countdown">
            <div>
              <strong>{countdown.days}</strong>
              <span>dias</span>
            </div>

            <div>
              <strong>{countdown.hours}</strong>
              <span>horas</span>
            </div>

            <div>
              <strong>{countdown.minutes}</strong>
              <span>min</span>
            </div>

            <div>
              <strong>{countdown.seconds}</strong>
              <span>seg</span>
            </div>
          </div>
        </article>

        <article className="glass-card weather-card">
          <span className="card-label">Clima em Tokyo agora</span>

          <div className="weather-display">
            <span className="weather-icon">🌙</span>
            <strong>18°C</strong>
            <span className="weather-desc">Céu limpo, brisa leve</span>
          </div>
        </article>

        <article className="glass-card rate-card">
          <span className="card-label">Cotação</span>

          <div className="rate-rows">
            <div className="rate-row">
              <span>¥100 JPY</span>
              <strong>R$ 3,42</strong>
            </div>

            <div className="rate-row">
              <span>US$ 1</span>
              <strong>R$ 5,58</strong>
            </div>
          </div>

          <span className="rate-note">Valores de referência</span>
        </article>

        <article className="glass-card route-card">
          <span className="card-label">Rota da viagem</span>

          <div className="route-chain">
            {routeCities.flatMap((city, index) => {
              const elements = [<span key={city}>{city}</span>]

              if (index < routeCities.length - 1) {
                elements.push(<i key={`${city}-arrow`}>→</i>)
              }

              return elements
            })}
          </div>
        </article>
      </div>
    </section>
  )
}
