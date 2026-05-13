import '@s/index.scss'
import '@tingcode/lib-vue/dist/css/components/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'
import 'virtual:svg-icons-register'
import { setupI18n } from '@/locale/setup-i18n'
import * as EPIcon from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  initMicroApp,
  initNamespace,
  setGlobalDataEnv,
  setGlobalDataElement,
  initRequest,
  initMitt
} from '@tingcode/system'
import { useEnv } from '@/hooks/useEnv'
import { NAMESPACE } from '@/hooks/useSetting'
async function bootstrap() {
  // vite-plugin-mock v3 起，生产环境的 mock 不再由插件自动注入，需要手动启用
  if (import.meta.env.PROD) {
    const { setupProdMockServer } = await import('../mock')
    await setupProdMockServer()
  }
  initMicroApp()
  initNamespace(NAMESPACE)
  setGlobalDataEnv(useEnv())
  setGlobalDataElement({ ElMessage, ElMessageBox })
  initRequest()
  initMitt()
  const app = createApp(App)
  setupRouter(app)
  setupStore(app)
  setupGlobDirectives(app)
  setupI18n(app)
  app.mount('#app')
}

bootstrap()

export { EPIcon }
