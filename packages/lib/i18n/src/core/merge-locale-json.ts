import type { LoadMessagesFn, LocaleMessages, LocaleType } from '../types'

type JsonModule = { default: Record<string, unknown> }

function localePrefix(locale: string) {
  return `/locales/${locale}/`
}

function isLocalePath(path: string, locale: string) {
  return path.includes(localePrefix(locale))
}

function setNested(
  target: Record<string, unknown>,
  keys: string[],
  value: Record<string, unknown>
) {
  let node = target
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const child = node[key]
    if (!child || typeof child !== 'object' || Array.isArray(child)) {
      node[key] = {}
    }
    node = node[key] as Record<string, unknown>
  }
  const lastKey = keys[keys.length - 1]
  if (lastKey) {
    node[lastKey] = value
  }
}

/** locales/zh-CN/layout.json -> { layout: { ... } } */
export function mergeLocaleJson(
  modules: Record<string, JsonModule>,
  locale: string
): LocaleMessages {
  const result: LocaleMessages = {}
  const prefix = localePrefix(locale)

  for (const [path, { default: module }] of Object.entries(modules)) {
    if (!path.includes(prefix)) continue

    const filePath = path.slice(path.indexOf(prefix) + prefix.length).replace(/\.json$/, '')
    const [namespace, ...rest] = filePath.split('/')
    if (!namespace) continue

    if (rest.length === 0) {
      result[namespace] = module
    } else {
      setNested(result, [namespace, ...rest], module)
    }
  }

  return result
}

export function createLocaleLoader(
  modules: Record<string, () => Promise<JsonModule>>
): LoadMessagesFn {
  return async (locale: LocaleType) => {
    const loaded: Record<string, JsonModule> = {}
    await Promise.all(
      Object.entries(modules)
        .filter(([path]) => isLocalePath(path, locale))
        .map(async ([path, loader]) => {
          loaded[path] = await loader()
        })
    )
    return mergeLocaleJson(loaded, locale)
  }
}
