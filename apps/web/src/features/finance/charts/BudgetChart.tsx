import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatJpy } from '../../../domain/places/placeUtils'
import { budgetCategories } from '../financeData'

const chartColors = ['#e53935', '#ff6b6b', '#ff8a65', '#ffb74d', '#ffd54f', '#80cbc4', '#7986cb']

export function BudgetChart() {
  return (
    <article className="finance-chart-card">
      <div className="finance-chart-head">
        <div>
          <span className="card-label">Distribuição</span>
          <h3>Orçamento planejado</h3>
        </div>
      </div>

      <div className="finance-chart-container finance-pie-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={budgetCategories}
              dataKey="plannedJpy"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={2}
            >
              {budgetCategories.map((category, index) => (
                <Cell key={category.id} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => formatJpy(Number(value))}
              contentStyle={{
                background: '#151515',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="finance-chart-legend">
        {budgetCategories.map((category, index) => (
          <div key={category.id}>
            <i
              style={{
                background: chartColors[index % chartColors.length],
              }}
            />

            <span>{category.label}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
