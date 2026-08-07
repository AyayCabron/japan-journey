export function calculatePercentage(current: number, target: number): number {
  if (target <= 0) {
    return 0
  }

  return Math.min(Math.round((current / target) * 100), 100)
}

export function calculateRemaining(current: number, target: number): number {
  return Math.max(target - current, 0)
}

export function calculateCategoryPercentage(value: number, total: number): number {
  if (total <= 0) {
    return 0
  }

  return Math.round((value / total) * 100)
}
