import type { LoadMessagesFn, LocaleMessages, LocaleType } from '../types'
import enLayout from '../../locales/en/layout.json'
import zhCNLayout from '../../locales/zh-CN/layout.json'

export const supportedLocales = ['zh-CN', 'en'] as const

const messagesByLocale: Record<string, LocaleMessages> = {
  en: { layout: enLayout },
  'zh-CN': { layout: zhCNLayout }
}

export const getMessages: LoadMessagesFn = async (locale) => messagesByLocale[locale] ?? {}

export function isSupportedMessageLocale(locale: LocaleType) {
  return locale in messagesByLocale
}
