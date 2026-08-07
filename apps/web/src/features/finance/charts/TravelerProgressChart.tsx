import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { travelers } from '../../travelers/travelersData'

const data = travelers.map((traveler) => ({
  name: traveler.name,
  progress: traveler.paymentProgress,
}))

export function TravelerProgressChart() {
  return (
    <article className="finance-chart-card">
      <div className="finance-chart-head">
        <div>
          <span className="card-label">Participantes</span>
          <h3>Progresso individual</h3>
        </div>
      </div>

      <div className="finance-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 15,
              bottom: 0,
              left: 10,
            }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />

            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}%`}
              stroke="rgba(255,255,255,0.4)"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={115}
              stroke="rgba(255,255,255,0.55)"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => `${Number(value)}%`}
              contentStyle={{
                background: '#151515',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
              }}
            />

            <Bar dataKey="progress" name="Progresso" fill="#e53935" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
