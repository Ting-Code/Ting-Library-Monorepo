import '@s/index.scss'
import { createApp } from 'vue'
import App from './App.vue'

import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'
import 'virtual:svg-icons-register'
async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  setupGlobDirectives(app)
  app.mount('#app')
}

bootstrap()
