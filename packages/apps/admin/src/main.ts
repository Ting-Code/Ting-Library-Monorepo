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
  setGlobalDataElement
} from '@tingcode/system'
import { useEnv } from '@/hooks/useEnv'
import { initRequest } from '@tingcode/system/api'
async function bootstrap() {
  initMicroApp()
  initNamespace('admin')
  setGlobalDataEnv(useEnv())
  setGlobalDataElement({ ElMessage, ElMessageBox })
  initRequest()
  const app = createApp(App)
  setupRouter(app)
  setupStore(app)
  setupGlobDirectives(app)
  setupI18n(app)
  app.mount('#app')
}

bootstrap()

export { EPIcon }
