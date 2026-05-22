import type {
  CreateI18nOptions,
  I18nInstance,
  LocaleMessages,
  LocaleType,
  TranslateParams
} from '../types'
import { setHtmlPageLang } from './html-lang'
import { getDefaultStorage, LOCALE_KEY, mergeLocaleStorage, writeLocaleStorage } from './storage'
import { translate } from './translate'

export function createI18n(options: CreateI18nOptions): I18nInstance {
  const storageKey = options.storageKey ?? LOCALE_KEY
  const storage = options.storage ?? getDefaultStorage()
  const { loadMessages } = options

  let state = mergeLocaleStorage(storageKey, storage, {
    defaultLocale: options.defaultLocale,
    fallbackLocale: options.fallbackLocale,
    availableLocales: options.availableLocales,
    showLocalePicker: options.showLocalePicker
  })

  const messagesCache = new Map<LocaleType, LocaleMessages>()
  const listeners = new Set<(locale: LocaleType) => void>()

  const persist = () => writeLocaleStorage(storageKey, storage, state)
  const notify = (locale: LocaleType) => listeners.forEach((fn) => fn(locale))

  async function ensureMessages(locale: LocaleType) {
    const cached = messagesCache.get(locale)
    if (cached) return cached
    const messages = await loadMessages(locale)
    messagesCache.set(locale, messages)
    return messages
  }

  function applyLocale(locale: LocaleType) {
    state = { ...state, locale }
    persist()
    setHtmlPageLang(locale)
    notify(locale)
  }

  const instance: I18nInstance = {
    getLocale: () => state.locale,
    getFallbackLocale: () => state.fallback,
    getAvailableLocales: () => state.availableLocales,
    getShowLocalePicker: () => state.showPicker,

    t(key: string, params?: TranslateParams) {
      if (!key) return ''
      const messages = messagesCache.get(state.locale)
      if (!messages) return key
      return translate(messages, key, {
        fallbackMessages: messagesCache.get(state.fallback),
        params
      })
    },

    async init() {
      await ensureMessages(state.locale)
      if (state.fallback !== state.locale && !messagesCache.has(state.fallback)) {
        await ensureMessages(state.fallback)
      }
      setHtmlPageLang(state.locale)
    },

    setLocale(locale: LocaleType) {
      if (state.locale !== locale) applyLocale(locale)
    },

    async changeLocale(locale: LocaleType) {
      if (!state.availableLocales.includes(locale) || state.locale === locale) {
        return state.locale === locale ? locale : undefined
      }
      await ensureMessages(locale)
      applyLocale(locale)
      return locale
    },

    onLocaleChange(listener: (locale: LocaleType) => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }

  return instance
}
