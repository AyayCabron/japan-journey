import { formatJpy } from '../../domain/places/placeUtils'
import { calculatePercentage, calculateRemaining } from './financeUtils'

interface FinanceSummaryProps {
  targetJpy: number
  savedJpy: number
}

export function FinanceSummary({ targetJpy, savedJpy }: FinanceSummaryProps) {
  const progress = calculatePercentage(savedJpy, targetJpy)
  const remaining = calculateRemaining(savedJpy, targetJpy)

  return (
    <div className="finance-summary">
      <article className="finance-main-card">
        <span className="card-label">Meta da viagem</span>

        <strong className="finance-main-value">{formatJpy(targetJpy)}</strong>

        <div
          className="finance-progress"
          role="progressbar"
          aria-label="Progresso financeiro geral"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <i style={{ width: `${progress}%` }} />
        </div>

        <div className="finance-progress-meta">
          <span>{progress}% concluído</span>
          <span>{formatJpy(savedJpy)} economizados</span>
        </div>
      </article>

      <article className="finance-stat-card">
        <span className="card-label">Economizado</span>
        <strong>{formatJpy(savedJpy)}</strong>
      </article>

      <article className="finance-stat-card">
        <span className="card-label">Restante</span>
        <strong>{formatJpy(remaining)}</strong>
      </article>

      <article className="finance-stat-card">
        <span className="card-label">Meta por viajante</span>
        <strong>{formatJpy(Math.round(targetJpy / 6))}</strong>
      </article>
    </div>
  )
}
