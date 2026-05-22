import type { App, InjectionKey } from 'vue'
import { computed, inject, ref } from 'vue'
import { emitLocale } from '@tingcode/system'
import {
  createI18n,
  createLocaleConfig,
  metaKey,
  resolveInitialLocale,
  resolveKey
} from '@tingcode/i18n'
import type { I18nInstance, InitI18nOptions, LocaleType, TranslateParams } from '@tingcode/i18n'

const I18N_KEY: InjectionKey<I18nInstance> = Symbol('@apps/admin/i18n')

let instance: I18nInstance | null = null
let unbindLocaleBroadcast: (() => void) | null = null

/** 语言变更时递增，供 t() 在模板中建立响应式依赖 */
const localeTick = ref(0)

function onLocaleUpdated(locale: LocaleType) {
  localeTick.value++
  emitLocale(locale)
}

function bindLocaleBroadcast(i18n: I18nInstance) {
  emitLocale(i18n.getLocale())
  return i18n.onLocaleChange(onLocaleUpdated)
}

/** 主应用初始化：持久化 → 浏览器语言 → 广播到子应用 */
export async function setupI18n(app: App, options?: InitI18nOptions) {
  unbindLocaleBroadcast?.()
  instance = createI18n(
    createLocaleConfig({
      ...options,
      locale: options?.locale ?? resolveInitialLocale()
    })
  )
  await instance.init()
  app.provide(I18N_KEY, instance)
  unbindLocaleBroadcast = bindLocaleBroadcast(instance)
  return instance
}

/** 切换语言（内核 persist + onLocaleChange 广播子应用） */
export async function changeLocale(locale: LocaleType): Promise<LocaleType | undefined> {
  if (!instance) return undefined
  return instance.changeLocale(locale)
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
  const { t } = useI18n()

  const locale = computed(() => {
    void localeTick.value
    return i18n?.getLocale() ?? ''
  })

  const localeLabel = (code: LocaleType) => {
    const key = `layout.locale.${code}`
    const label = t(key)
    return label === key ? code : label
  }

  return {
    locale,
    localeLabel,
    availableLocales: computed(() => i18n?.getAvailableLocales() ?? []),
    showLocalePicker: computed(() => i18n?.getShowLocalePicker() ?? false),
    changeLocale
  }
}

export const t = metaKey
