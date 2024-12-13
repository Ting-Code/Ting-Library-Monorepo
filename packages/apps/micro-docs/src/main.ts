import '@s/index.scss'
import '@tingcode/lib-vue/dist/css/components/index.css'
import { createApp, App } from 'vue'
import AppVue from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupGlobDirectives } from '@/directives'
// import 'virtual:svg-icons-register'
import * as EPIcon from '@element-plus/icons-vue'
import { initDocsMicroApp, initNamespace } from '@tingcode/system'
import { NAMESPACE } from '@/hooks/useSetting'
initDocsMicroApp()
let app: App<Element>

window.mount = () => {
  initNamespace(NAMESPACE)
  app = createApp(AppVue)
  setupRouter(app)
  setupStore(app)
  setupGlobDirectives(app)
  app.mount('#docs')
}

window.unmount = () => {
  app.unmount()
}

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  window.mount()
}

export { EPIcon }
