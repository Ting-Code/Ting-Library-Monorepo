import { supportedLocales } from '@tingcode/i18n'

const localeModules = import.meta.glob('../../../../lib/i18n/locales/*/*.json', {
  eager: true,
  import: 'default'
}) as Record<string, Record<string, unknown>>

const DRAFT_STORAGE_KEY = 'i18n:draft-namespaces'

export type I18nProjectRow = {
  namespace: string
  files: string[]
  entryCount: number
  draft?: boolean
}

export function countLeafKeys(value: unknown): number {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return value === undefined ? 0 : 1
  }
  let count = 0
  for (const child of Object.values(value as Record<string, unknown>)) {
    count += countLeafKeys(child)
  }
  return count
}

function parseLocalePath(path: string): { locale: string; namespace: string } | null {
  const match = path.match(/locales\/([^/]+)\/([^/]+)\.json$/)
  if (!match) return null
  return { locale: match[1], namespace: match[2] }
}

function readDraftNamespaces(): string[] {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : []
  } catch {
    return []
  }
}

function writeDraftNamespaces(namespaces: string[]) {
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(namespaces))
}

export function loadI18nProjects(): I18nProjectRow[] {
  const byNamespace = new Map<string, { files: string[]; payloads: Record<string, unknown> }>()

  for (const [path, payload] of Object.entries(localeModules)) {
    const parsed = parseLocalePath(path)
    if (!parsed) continue
    const { locale, namespace } = parsed
    const row = byNamespace.get(namespace) ?? { files: [], payloads: {} }
    row.files.push(`${locale}/${namespace}.json`)
    row.payloads[locale] = payload
    byNamespace.set(namespace, row)
  }

  const locales = [...supportedLocales]
  const projects: I18nProjectRow[] = [...byNamespace.entries()]
    .map(([namespace, { files, payloads }]) => {
      const primary = payloads['zh-CN'] ?? payloads[locales[0]] ?? Object.values(payloads)[0] ?? {}
      return {
        namespace,
        files: files.sort(),
        entryCount: countLeafKeys(primary)
      }
    })
    .sort((a, b) => a.namespace.localeCompare(b.namespace))

  const existing = new Set(projects.map((p) => p.namespace))
  for (const namespace of readDraftNamespaces()) {
    if (existing.has(namespace)) continue
    projects.push({
      namespace,
      files: locales.map((locale) => `${locale}/${namespace}.json`),
      entryCount: 0,
      draft: true
    })
  }

  return projects
}

export function addDraftProject(namespace: string): boolean {
  const name = namespace.trim()
  if (!name || !/^[a-z][a-z0-9_-]*$/i.test(name)) return false
  const drafts = readDraftNamespaces()
  if (drafts.includes(name)) return false
  writeDraftNamespaces([...drafts, name])
  return true
}
