export type {
  LocaleType,
  LocaleMessages,
  LoadMessagesFn,
  TranslateParams,
  LocaleStorageState,
  StorageAdapter,
  CreateI18nOptions,
  I18nInstance
} from './types'

export { createI18n } from './core/create-i18n'
export { translate, getMessageByKey, interpolate } from './core/translate'
export { resolveKey, metaKey } from './core/resolve-key'
export { setHtmlPageLang } from './core/html-lang'
export { mergeLocaleJson, createLocaleLoader } from './core/merge-locale-json'
export { resolveBrowserLocale, resolveInitialLocale } from './core/resolve-initial-locale'
export type { ResolveInitialLocaleOptions } from './core/resolve-initial-locale'
export {
  getMessages,
  createLocaleConfig,
  isSupportedMessageLocale,
  supportedLocales
} from './locales'
export type { InitI18nOptions } from './locales'
export {
  LOCALE_KEY,
  getDefaultStorage,
  readLocaleStorage,
  writeLocaleStorage,
  mergeLocaleStorage
} from './core/storage'
