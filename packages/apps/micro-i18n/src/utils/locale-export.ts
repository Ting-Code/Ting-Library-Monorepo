/** 导出各语言 JSON，手动放入 packages/lib/i18n/locales/{locale}/{namespace}.json */
export function downloadNamespaceLocales(
  namespace: string,
  data: Record<string, Record<string, unknown>>
) {
  for (const [locale, payload] of Object.entries(data)) {
    const content = `${JSON.stringify(payload, null, 2)}\n`
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${locale}-${namespace}.json`
    link.click()
    URL.revokeObjectURL(url)
  }
}
