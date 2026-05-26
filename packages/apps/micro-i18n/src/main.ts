import '@s/index.scss'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import { setupRouter, unmountRouter } from '@/router'
import { setupStore } from '@/store'
import { initNamespace } from '@tingcode/system'
import { NAMESPACE } from '@/hooks/useSetting'
import { setupI18n } from '@/hooks/useI18n'

let app: VueApp<Element> | null = null

window.mount = async () => {
  initNamespace(NAMESPACE)
  app = createApp(App)
  setupStore(app)
  setupRouter(app)
  await setupI18n(app)
  app.mount('#i18n')
}

window.unmount = () => {
  app?.unmount()
  app = null
  unmountRouter()
}

if (!window.__MICRO_APP_ENVIRONMENT__) {
  void window.mount()
}
