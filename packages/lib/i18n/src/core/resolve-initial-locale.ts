import type { LocaleType, StorageAdapter } from '../types'
import { isSupportedMessageLocale, supportedLocales } from '../locales/messages'
import { getDefaultStorage, LOCALE_KEY, readLocaleStorage } from './storage'

export interface ResolveInitialLocaleOptions {
  storageKey?: string
  storage?: StorageAdapter | null
  /** 无持久化且无法识别浏览器语言时的兜底 */
  fallbackLocale?: LocaleType
}

/** 根据 navigator.language 推断语言 */
export function resolveBrowserLocale(): LocaleType {
  if (typeof navigator === 'undefined') {
    return supportedLocales[0]
  }
  const language = navigator.language.toLowerCase()
  const exactMatched = supportedLocales.find((locale) => locale.toLowerCase() === language)
  if (exactMatched) return exactMatched
  if (language.startsWith('zh')) return 'zh-CN'
  return 'en'
}

/** 持久化优先，否则浏览器语言，最后 fallback */
export function resolveInitialLocale(options: ResolveInitialLocaleOptions = {}): LocaleType {
  const storageKey = options.storageKey ?? LOCALE_KEY
  const storage = options.storage ?? getDefaultStorage()
  const persisted = readLocaleStorage(storageKey, storage)?.locale
  if (persisted && isSupportedMessageLocale(persisted)) {
    return persisted
  }
  return options.fallbackLocale ?? resolveBrowserLocale()
}
