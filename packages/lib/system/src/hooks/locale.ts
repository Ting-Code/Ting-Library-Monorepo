import { emitMitt, onMitt } from '../global-data/mitt'

export function emitLocale(locale: string) {
  emitMitt('locale', locale)
}

export function onLocale(fn: (locale: string) => void) {
  onMitt('locale', fn)
}

/** 子应用监听主应用语言（与 onLocale 相同，语义更明确） */
export const listenLocale = onLocale
