import { BudgetBreakdown } from './BudgetBreakdown'
import { FinanceSummary } from './FinanceSummary'
import { TravelerFinance } from './TravelerFinance'
import { tripFinance } from './financeData'
import { FinanceCharts } from './FinanceCharts'

export function FinanceSection() {
  return (
    <section id="budget" className="section alt">
      <div className="section-head">
        <p className="eyebrow">予算 — 06</p>
        <h2>Planejamento financeiro</h2>

        <p className="section-desc">
          Acompanhe a meta total, a divisão do orçamento e o progresso financeiro de cada
          participante.
        </p>
      </div>

      <FinanceSummary targetJpy={tripFinance.targetJpy} savedJpy={tripFinance.savedJpy} />

      <FinanceCharts />

      <div className="finance-details-grid">
        <BudgetBreakdown />
        <TravelerFinance />
      </div>
    </section>
  )
}
