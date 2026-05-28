export function marketTag(code: string): string {
  if (code.startsWith('6')) return '沪'
  if (code.startsWith('8') || code.startsWith('4')) return '北'
  return '深'
}
