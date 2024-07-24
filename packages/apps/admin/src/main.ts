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
import { initMicroApp, initNamespace, setGlobalDataEnv } from '@tingcode/system'
import { useEnv } from '@/hooks/useEnv'
async function bootstrap() {
  initMicroApp()
  initNamespace('admin')
  setGlobalDataEnv(useEnv())
  const app = createApp(App)
  setupRouter(app)
  setupStore(app)
  setupGlobDirectives(app)
  setupI18n(app)
  console.log('======================222222222222222')
  app.mount('#app')
}

bootstrap()

export { EPIcon }
