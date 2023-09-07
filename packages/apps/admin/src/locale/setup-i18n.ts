import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs'
import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export type LocaleType = 'zh-CN' | 'en'
export const LOCALE_KEY = 'LOCALE'
const store = useLocalStorage(LOCALE_KEY, {
  showPicker: true,
  locale: 'zh-CN' as LocaleType,
  fallback: 'zh-CN',
  availableLocales: ['zh-CN', 'en']
})

export const getLocale = computed(() => store.value.locale)
export const showLocalePicker = computed(() => store.value.showPicker)
export const setLocale = (locale: LocaleType) => {
  store.value.locale = locale
}

export let i18n: ReturnType<typeof createI18n>
const createI18nOptions = async (): Promise<I18nOptions> => {
  const locale = getLocale.value
  const defaultLocal = await import(`./lang/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)

  setLoadLocalePool((loadLocalePool) => loadLocalePool.push(locale))

  return {
    legacy: false,
    locale,
    fallbackLocale: store.value.fallback,
    messages: {
      [locale]: message
    },
    availableLocales: store.value.availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

// setup i18n instance with glob
export const setupI18n = async (app: App) => {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}
