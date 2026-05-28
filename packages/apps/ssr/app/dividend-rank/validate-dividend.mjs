/**
 * 校验 dividend-2025.json 与东方财富 2025 年报分红是否一致
 * 运行: node packages/apps/ssr/app/dividend-rank/validate-dividend.mjs
 */
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dir, 'dividend-2025.json')
const DC = 'https://datacenter-web.eastmoney.com/api/data/v1/get'

function curlGet(params) {
  const args = [
    '-sG',
    '--connect-timeout',
    '25',
    DC,
    '-H',
    'User-Agent: Mozilla/5.0',
    '-H',
    'Referer: https://data.eastmoney.com/yjfp/'
  ]
  for (const [k, v] of Object.entries(params)) {
    args.push('--data-urlencode', `${k}=${v}`)
  }
  return JSON.parse(execFileSync('curl', args, { encoding: 'utf8' }))
}

function parseDpsFromProfile(profile) {
  const m = String(profile || '').match(/10派([\d.]+)元/)
  if (!m) return null
  return Number(m[1]) / 10
}

const data = JSON.parse(readFileSync(jsonPath, 'utf8'))
const items = data.items
let ok = 0
let mismatch = 0
let noApi = 0
const samples = []

// 全量校验（3617 只约 8 页 API）
const pages = curlGet({
  reportName: 'RPT_SHAREBONUS_DET',
  columns: 'SECURITY_CODE,PRETAX_BONUS_RMB,IMPL_PLAN_PROFILE',
  filter: "(REPORT_DATE='2025-12-31')",
  pageSize: '500',
  pageNumber: '1',
  source: 'WEB',
  client: 'WEB'
}).result.pages

const apiMap = new Map()
for (let p = 1; p <= pages; p++) {
  const j = curlGet({
    reportName: 'RPT_SHAREBONUS_DET',
    columns: 'SECURITY_CODE,PRETAX_BONUS_RMB,IMPL_PLAN_PROFILE',
    filter: "(REPORT_DATE='2025-12-31')",
    pageSize: '500',
    pageNumber: String(p),
    source: 'WEB',
    client: 'WEB'
  })
  for (const r of j.result.data || []) {
    const pretax = Number(r.PRETAX_BONUS_RMB)
    if (!pretax || pretax <= 0) continue
    const dpsApi = pretax / 10
    const dpsProfile = parseDpsFromProfile(r.IMPL_PLAN_PROFILE)
    apiMap.set(r.SECURITY_CODE, {
      dpsApi,
      dpsProfile,
      profile: r.IMPL_PLAN_PROFILE
    })
  }
  process.stderr.write(`api page ${p}/${pages}\n`)
}

for (const [code, , dpsJson] of items) {
  const api = apiMap.get(code)
  if (!api) {
    noApi++
    continue
  }
  const expected = api.dpsApi
  const diff = Math.abs(dpsJson - expected)
  if (diff < 0.0001) {
    ok++
  } else {
    mismatch++
    if (samples.length < 15) {
      samples.push({
        code,
        json: dpsJson,
        api: expected,
        profile: api.profile
      })
    }
  }
}

console.log('\n=== dividend-2025.json 校验 ===')
console.log('JSON 条数:', items.length)
console.log('API 2025年报有分红:', apiMap.size)
console.log('一致:', ok)
console.log('不一致:', mismatch)
console.log('JSON有/API无:', noApi)
if (samples.length) {
  console.log('\n不一致样例:')
  console.table(samples)
}
