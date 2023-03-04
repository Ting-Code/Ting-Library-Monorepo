import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'
import 'virtual:svg-icons-register'
import '@s/index.scss'
async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  setupGlobDirectives(app)
  app.mount('#app')
}

bootstrap()
