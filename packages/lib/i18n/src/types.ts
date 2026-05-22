export type LocaleType = string

export type LocaleMessages = Record<string, unknown>

export type LoadMessagesFn = (locale: LocaleType) => Promise<LocaleMessages>

export type TranslateParams = Record<string, unknown>

export interface LocaleStorageState {
  showPicker: boolean
  locale: LocaleType
  fallback: LocaleType
  availableLocales: LocaleType[]
}

export interface StorageAdapter {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface CreateI18nOptions {
  loadMessages: LoadMessagesFn
  /** localStorage key, default `LOCALE` */
  storageKey?: string
  defaultLocale?: LocaleType
  fallbackLocale?: LocaleType
  availableLocales?: LocaleType[]
  showLocalePicker?: boolean
  /** Custom storage (tests / SSR). Defaults to `localStorage` in browser. */
  storage?: StorageAdapter
}

export interface I18nInstance {
  getLocale(): LocaleType
  getFallbackLocale(): LocaleType
  getAvailableLocales(): readonly LocaleType[]
  getShowLocalePicker(): boolean
  t(key: string, params?: TranslateParams): string
  init(): Promise<void>
  changeLocale(locale: LocaleType): Promise<LocaleType | undefined>
  setLocale(locale: LocaleType): void
  onLocaleChange(listener: (locale: LocaleType) => void): () => void
}
