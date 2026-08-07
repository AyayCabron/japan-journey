import { formatJpy } from '../../domain/places/placeUtils'
import { budgetCategories } from './financeData'
import { calculateCategoryPercentage } from './financeUtils'

export function BudgetBreakdown() {
  const total = budgetCategories.reduce((sum, category) => sum + category.plannedJpy, 0)

  return (
    <article className="budget-breakdown">
      <div className="budget-breakdown-head">
        <div>
          <span className="card-label">Planejamento</span>
          <h3>Orçamento por categoria</h3>
        </div>

        <strong>{formatJpy(total)}</strong>
      </div>

      <div className="budget-category-list">
        {budgetCategories.map((category) => {
          const percentage = calculateCategoryPercentage(category.plannedJpy, total)

          return (
            <div key={category.id} className="budget-category">
              <div className="budget-category-row">
                <div className="budget-category-name">
                  <span aria-hidden="true">{category.icon}</span>
                  <span>{category.label}</span>
                </div>

                <div className="budget-category-values">
                  <strong>{formatJpy(category.plannedJpy)}</strong>
                  <span>{percentage}%</span>
                </div>
              </div>

              <div className="budget-category-progress">
                <i style={{ width: `${percentage}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}
