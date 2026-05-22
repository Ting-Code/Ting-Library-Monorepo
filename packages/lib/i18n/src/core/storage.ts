import type { LocaleStorageState, LocaleType, StorageAdapter } from '../types'

export const LOCALE_KEY = 'LOCALE'

/** 库内兜底；实际语言由子项目 createI18nOptions 传入 */
const fallbackState: LocaleStorageState = {
  showPicker: true,
  locale: 'en',
  fallback: 'en',
  availableLocales: ['en']
}

export function getDefaultStorage(): StorageAdapter | null {
  return typeof localStorage === 'undefined' ? null : localStorage
}

export function readLocaleStorage(
  storageKey: string,
  storage: StorageAdapter | null
): LocaleStorageState | null {
  if (!storage) return null
  try {
    const raw = storage.getItem(storageKey)
    return raw ? (JSON.parse(raw) as LocaleStorageState) : null
  } catch {
    return null
  }
}

export function writeLocaleStorage(
  storageKey: string,
  storage: StorageAdapter | null,
  state: LocaleStorageState
): void {
  storage?.setItem(storageKey, JSON.stringify(state))
}

export interface CreateI18nStorageDefaults {
  defaultLocale?: LocaleType
  fallbackLocale?: LocaleType
  availableLocales?: LocaleType[]
  showLocalePicker?: boolean
}

export function mergeLocaleStorage(
  storageKey: string,
  storage: StorageAdapter | null,
  partial: Partial<CreateI18nStorageDefaults>
): LocaleStorageState {
  const persisted = readLocaleStorage(storageKey, storage)
  const state: LocaleStorageState = {
    showPicker: persisted?.showPicker ?? partial.showLocalePicker ?? fallbackState.showPicker,
    locale: persisted?.locale ?? partial.defaultLocale ?? fallbackState.locale,
    fallback:
      persisted?.fallback ??
      partial.fallbackLocale ??
      partial.defaultLocale ??
      fallbackState.fallback,
    availableLocales:
      partial.availableLocales ?? persisted?.availableLocales ?? fallbackState.availableLocales
  }
  writeLocaleStorage(storageKey, storage, state)
  return state
}
