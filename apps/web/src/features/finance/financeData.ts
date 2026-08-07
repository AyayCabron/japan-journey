export interface BudgetCategory {
  id: string
  label: string
  plannedJpy: number
  icon: string
}

export const tripFinance = {
  targetJpy: 3_600_000,
  savedJpy: 2_484_000,
}

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'flights',
    label: 'Passagens',
    plannedJpy: 900000,
    icon: '✈️',
  },
  {
    id: 'accommodation',
    label: 'Hospedagem',
    plannedJpy: 780000,
    icon: '🏨',
  },
  {
    id: 'food',
    label: 'Alimentação',
    plannedJpy: 450000,
    icon: '🍜',
  },
  {
    id: 'transport',
    label: 'Transporte',
    plannedJpy: 320000,
    icon: '🚄',
  },
  {
    id: 'experiences',
    label: 'Experiências',
    plannedJpy: 420000,
    icon: '🎟️',
  },
  {
    id: 'shopping',
    label: 'Compras',
    plannedJpy: 550000,
    icon: '🛍️',
  },
  {
    id: 'emergency',
    label: 'Reserva',
    plannedJpy: 180000,
    icon: '🛡️',
  },
]

export interface SavingsHistoryItem {
  month: string
  savedJpy: number
  targetJpy: number
}

export const savingsHistory: SavingsHistoryItem[] = [
  {
    month: 'Jan',
    savedJpy: 650000,
    targetJpy: 3600000,
  },
  {
    month: 'Fev',
    savedJpy: 920000,
    targetJpy: 3600000,
  },
  {
    month: 'Mar',
    savedJpy: 1240000,
    targetJpy: 3600000,
  },
  {
    month: 'Abr',
    savedJpy: 1510000,
    targetJpy: 3600000,
  },
  {
    month: 'Mai',
    savedJpy: 1840000,
    targetJpy: 3600000,
  },
  {
    month: 'Jun',
    savedJpy: 2110000,
    targetJpy: 3600000,
  },
  {
    month: 'Jul',
    savedJpy: 2320000,
    targetJpy: 3600000,
  },
  {
    month: 'Ago',
    savedJpy: 2484000,
    targetJpy: 3600000,
  },
]
