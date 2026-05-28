const CLIENT_RETRIES = 1
const CLIENT_RETRY_DELAY_MS = 800

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 浏览器请求 BFF：仅在网络错误或 502 时重试一次，避免打爆上游 */
export async function fetchKlineSnapshot(
  code: string,
  period: string,
  name?: string
): Promise<Response> {
  const params = new URLSearchParams({ code, period, limit: '120' })
  if (name?.trim()) params.set('name', name.trim())
  const url = `/kline/api/snapshot?${params}`

  let lastRes: Response | undefined
  for (let attempt = 0; attempt <= CLIENT_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { cache: 'no-store' })
      lastRes = res
      if (res.ok) return res
      if (res.status >= 500 && attempt < CLIENT_RETRIES) {
        await sleep(CLIENT_RETRY_DELAY_MS)
        continue
      }
      return res
    } catch {
      if (attempt < CLIENT_RETRIES) {
        await sleep(CLIENT_RETRY_DELAY_MS)
        continue
      }
      throw new Error('网络异常，请检查连接后重试')
    }
  }
  return lastRes!
}
