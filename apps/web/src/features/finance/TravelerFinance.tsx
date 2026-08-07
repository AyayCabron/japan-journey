import { formatJpy } from '../../domain/places/placeUtils'
import { travelers } from '../travelers/travelersData'
import { tripFinance } from './financeData'

export function TravelerFinance() {
  const individualTarget = Math.round(tripFinance.targetJpy / travelers.length)

  return (
    <article className="traveler-finance">
      <div className="traveler-finance-head">
        <div>
          <span className="card-label">Participantes</span>
          <h3>Meta individual</h3>
        </div>

        <strong>{formatJpy(individualTarget)}</strong>
      </div>

      <div className="traveler-finance-list">
        {travelers.map((traveler) => {
          const saved = Math.round(individualTarget * (traveler.paymentProgress / 100))

          const remaining = Math.max(individualTarget - saved, 0)

          return (
            <div key={traveler.id} className="traveler-finance-row">
              <div className="traveler-finance-person">
                <span>{traveler.emoji}</span>

                <div>
                  <strong>{traveler.name}</strong>
                  <small>Falta {formatJpy(remaining)}</small>
                </div>
              </div>

              <div className="traveler-finance-result">
                <strong>{traveler.paymentProgress}%</strong>
                <span>{formatJpy(saved)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}
