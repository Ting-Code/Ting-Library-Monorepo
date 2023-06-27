import '@s/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'
import 'virtual:svg-icons-register'
import { setupI18n } from '@/locale/setup-i18n'
import * as EPIcon from '@element-plus/icons-vue'
async function bootstrap() {
  const app = createApp(App)
  setupRouter(app)
  setupStore(app)
  setupGlobDirectives(app)
  setupI18n(app)
  app.mount('#app')
}

bootstrap()

export { EPIcon }
