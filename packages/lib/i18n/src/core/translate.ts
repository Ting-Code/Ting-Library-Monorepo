import type { LocaleMessages, TranslateParams } from '../types'

export function getMessageByKey(messages: LocaleMessages, key: string): unknown {
  return key.split('.').reduce<unknown>((obj, segment) => {
    if (obj && typeof obj === 'object' && segment in (obj as Record<string, unknown>)) {
      return (obj as Record<string, unknown>)[segment]
    }
    return undefined
  }, messages)
}

export function interpolate(template: string, params?: TranslateParams): string {
  if (!params) {
    return template
  }
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = params[name]
    return value == null ? `{${name}}` : String(value)
  })
}

export function translate(
  messages: LocaleMessages,
  key: string,
  options?: {
    fallbackMessages?: LocaleMessages
    params?: TranslateParams
  }
): string {
  let value = getMessageByKey(messages, key)

  if (value == null && options?.fallbackMessages) {
    value = getMessageByKey(options.fallbackMessages, key)
  }

  if (value == null) {
    return key
  }

  if (typeof value === 'string') {
    return interpolate(value, options?.params)
  }

  return String(value)
}
