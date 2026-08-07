import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatJpy } from '../../../domain/places/placeUtils'
import { savingsHistory } from '../financeData'

export function SavingsChart() {
  return (
    <article className="finance-chart-card">
      <div className="finance-chart-head">
        <div>
          <span className="card-label">Evolução</span>
          <h3>Meta financeira</h3>
        </div>
      </div>

      <div className="finance-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={savingsHistory}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

            <XAxis
              dataKey="month"
              stroke="rgba(255,255,255,0.4)"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="rgba(255,255,255,0.4)"
              tickLine={false}
              axisLine={false}
              width={70}
              tickFormatter={(value: number) => `${Math.round(value / 1000000)}M`}
            />

            <Tooltip
              formatter={(value) => formatJpy(Number(value))}
              contentStyle={{
                background: '#151515',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
              }}
            />

            <Line
              type="monotone"
              dataKey="targetJpy"
              name="Meta"
              stroke="rgba(255,255,255,0.25)"
              strokeDasharray="6 6"
              dot={false}
              strokeWidth={2}
            />

            <Line
              type="monotone"
              dataKey="savedJpy"
              name="Economizado"
              stroke="#e53935"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: '#e53935',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
