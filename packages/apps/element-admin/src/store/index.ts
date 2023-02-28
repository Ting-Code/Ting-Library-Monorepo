import { createPinia } from 'pinia'
import { App } from 'vue'
import { useProjectSettingStoreWithOut } from './modules/projectSetting.js'

export { useProjectSettingStoreWithOut }

export const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}
