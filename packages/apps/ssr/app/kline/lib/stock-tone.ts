export function stockTextClass(change: number) {
  if (change > 0.001) return 'text-stock-up'
  if (change < -0.001) return 'text-stock-down'
  return 'text-foreground'
}

export function stockBadgeClass(change: number) {
  if (change > 0.001) return 'bg-stock-up/10 text-stock-up'
  if (change < -0.001) return 'bg-stock-down/10 text-stock-down'
  return 'bg-muted text-muted-foreground'
}
