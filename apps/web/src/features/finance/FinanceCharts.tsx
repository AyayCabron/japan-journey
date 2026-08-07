import { BudgetChart } from './charts/BudgetChart'
import { SavingsChart } from './charts/SavingsChart'
import { TravelerProgressChart } from './charts/TravelerProgressChart'

export function FinanceCharts() {
  return (
    <div className="finance-charts">
      <div className="finance-charts-top">
        <SavingsChart />
        <BudgetChart />
      </div>

      <TravelerProgressChart />
    </div>
  )
}
