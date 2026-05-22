import type { LocaleType } from '../types'

export function setHtmlPageLang(locale: LocaleType) {
  if (typeof document === 'undefined') {
    return
  }
  document.documentElement.setAttribute('lang', locale)
}
