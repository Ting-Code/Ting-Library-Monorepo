import { supportedLocales } from '@tingcode/i18n'

const localeModules = import.meta.glob('../../../../lib/i18n/locales/*/*.json', {
  eager: true,
  import: 'default'
}) as Record<string, Record<string, unknown>>

const DRAFT_STORAGE_KEY = 'i18n:draft-namespaces'
const LOCALE_OVERRIDE_KEY = 'i18n:locale-overrides'
const HIDDEN_STORAGE_KEY = 'i18n:hidden-namespaces'

type LocaleOverrides = Record<string, Record<string, Record<string, unknown>>>

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

function readHiddenNamespaces(): string[] {
  try {
    const raw = localStorage.getItem(HIDDEN_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : []
  } catch {
    return []
  }
}

function writeHiddenNamespaces(namespaces: string[]) {
  localStorage.setItem(HIDDEN_STORAGE_KEY, JSON.stringify(namespaces))
}

export function isBundledNamespace(namespace: string): boolean {
  return getModulePayload(namespace, 'zh-CN') !== null || getModulePayload(namespace, 'en') !== null
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
  const hidden = new Set(readHiddenNamespaces())
  const projects: I18nProjectRow[] = [...byNamespace.entries()]
    .filter(([namespace]) => !hidden.has(namespace))
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
    if (existing.has(namespace) || hidden.has(namespace)) continue
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

function cloneLocaleData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function readLocaleOverrides(): LocaleOverrides {
  try {
    const raw = localStorage.getItem(LOCALE_OVERRIDE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    return parsed && typeof parsed === 'object' ? (parsed as LocaleOverrides) : {}
  } catch {
    return {}
  }
}

function writeLocaleOverrides(overrides: LocaleOverrides) {
  localStorage.setItem(LOCALE_OVERRIDE_KEY, JSON.stringify(overrides))
}

function getModulePayload(namespace: string, locale: string): Record<string, unknown> | null {
  for (const [path, payload] of Object.entries(localeModules)) {
    const parsed = parseLocalePath(path)
    if (parsed?.namespace === namespace && parsed.locale === locale) {
      return payload as Record<string, unknown>
    }
  }
  return null
}

export function hasNamespace(namespace: string): boolean {
  return loadI18nProjects().some((p) => p.namespace === namespace)
}

/** 加载某项目各语言 JSON（模块 + localStorage 覆盖） */
export function loadNamespaceLocales(namespace: string): Record<string, Record<string, unknown>> {
  const locales = [...supportedLocales]
  const overrides = readLocaleOverrides()[namespace]
  const result: Record<string, Record<string, unknown>> = {}

  for (const locale of locales) {
    const base = getModulePayload(namespace, locale)
    const override = overrides?.[locale]
    if (override) {
      result[locale] = cloneLocaleData(override)
    } else if (base) {
      result[locale] = cloneLocaleData(base)
    } else {
      result[locale] = {}
    }
  }
  return result
}

export function saveNamespaceLocales(
  namespace: string,
  data: Record<string, Record<string, unknown>>
) {
  const all = readLocaleOverrides()
  const next: Record<string, Record<string, unknown>> = {}
  for (const [locale, payload] of Object.entries(data)) {
    next[locale] = cloneLocaleData(payload)
  }
  all[namespace] = next
  writeLocaleOverrides(all)
}

export function clearNamespaceLocalesOverride(namespace: string) {
  const all = readLocaleOverrides()
  delete all[namespace]
  writeLocaleOverrides(all)
}

/** 从列表移除项目：草稿直接删；已落盘项目加入隐藏列表并清本地覆盖 */
export function removeProject(namespace: string): { needManualFileDelete: boolean } {
  const name = namespace.trim()
  if (!name) return { needManualFileDelete: false }

  const drafts = readDraftNamespaces().filter((n) => n !== name)
  writeDraftNamespaces(drafts)
  clearNamespaceLocalesOverride(name)

  const bundled = isBundledNamespace(name)
  if (bundled) {
    const hidden = readHiddenNamespaces()
    if (!hidden.includes(name)) writeHiddenNamespaces([...hidden, name])
  }

  return { needManualFileDelete: bundled }
}
