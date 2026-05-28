/** 东方财富 secid：沪 1.xxx，深/北 0.xxx */
export function toSecId(code: string): string {
  return `${code.startsWith('6') ? '1' : '0'}.${code}`
}

export function isAshareCode(code: string): boolean {
  return /^\d{6}$/.test(code)
}
