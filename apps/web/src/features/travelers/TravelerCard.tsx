import { formatJpy } from '../../domain/places/placeUtils'
import type { Traveler } from './travelersData'

interface TravelerCardProps {
  traveler: Traveler
}

export function TravelerCard({ traveler }: TravelerCardProps) {
  const paymentStatus = traveler.paymentProgress >= 100 ? 'Pago' : 'Em andamento'

  return (
    <article className="traveler-card">
      <div className="traveler-top">
        <div className="traveler-avatar" aria-hidden="true">
          {traveler.emoji}
        </div>

        <div>
          <h3 className="traveler-name">{traveler.name}</h3>
          <span className="traveler-status">{paymentStatus}</span>
        </div>
      </div>

      <div
        className="traveler-progress"
        role="progressbar"
        aria-label={`Progresso de pagamento de ${traveler.name}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={traveler.paymentProgress}
      >
        <i style={{ width: `${traveler.paymentProgress}%` }} />
      </div>

      <div className="traveler-figures">
        <span>{traveler.paymentProgress}% pago</span>
        <span>{formatJpy(traveler.spentJpy)}</span>
      </div>

      <div className="traveler-wishlist">
        {traveler.wishlist.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  )
}
