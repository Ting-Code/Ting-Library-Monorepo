import type { CreateI18nOptions, LocaleType } from '../types'
import { getMessages, supportedLocales } from './messages'

export interface InitI18nOptions {
  /** 初始语言，默认 supportedLocales[0] */
  locale?: LocaleType
  fallbackLocale?: LocaleType
  availableLocales?: LocaleType[]
  showLocalePicker?: boolean
}

/** 子应用初始化：统一文案 + 传入语言策略 */
export function createLocaleConfig(options: InitI18nOptions = {}): CreateI18nOptions {
  const locale = options.locale ?? supportedLocales[0]
  return {
    loadMessages: getMessages,
    defaultLocale: locale,
    fallbackLocale: options.fallbackLocale ?? locale,
    availableLocales: options.availableLocales ?? [...supportedLocales],
    showLocalePicker: options.showLocalePicker ?? true
  }
}
