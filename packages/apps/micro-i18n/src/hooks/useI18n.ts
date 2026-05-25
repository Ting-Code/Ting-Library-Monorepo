import type { App, InjectionKey } from 'vue'
import { computed, inject, ref } from 'vue'
import { listenLocale } from '@tingcode/system'
import {
  createI18n,
  createLocaleConfig,
  metaKey,
  resolveInitialLocale,
  resolveKey
} from '@tingcode/i18n'
import type { I18nInstance, LocaleType, TranslateParams } from '@tingcode/i18n'

const I18N_KEY: InjectionKey<I18nInstance> = Symbol('@apps/micro-i18n/i18n')

let instance: I18nInstance | null = null
const localeTick = ref(0)

/** 子应用：跟随主应用语言广播 */
export async function setupI18n(app: App) {
  instance = createI18n(
    createLocaleConfig({
      locale: resolveInitialLocale()
    })
  )
  await instance.init()
  app.provide(I18N_KEY, instance)

  listenLocale(async (locale) => {
    const next = await instance?.changeLocale(locale as LocaleType)
    if (next) localeTick.value++
  })
}

export function useI18n(namespace?: string) {
  const i18n = inject(I18N_KEY, instance)

  const t = (key: string, params?: TranslateParams): string => {
    void localeTick.value
    if (!key || (!key.includes('.') && !namespace)) return key
    const fullKey = resolveKey(namespace, key)
    return i18n?.t(fullKey, params) ?? fullKey
  }

  return { t }
}

export function useLocale() {
  const i18n = inject(I18N_KEY, instance)

  return {
    locale: computed(() => {
      void localeTick.value
      return i18n?.getLocale() ?? ''
    }),
    changeLocale: (locale: LocaleType) => instance?.changeLocale(locale)
  }
}

export const t = metaKey
