/**
 * Configure and register global directives
 * 统一注册vue自定义指令
 */
import type { App } from 'vue'
import { setupAuthDirective } from './auth'

export function setupGlobDirectives(app: App) {
  setupAuthDirective(app)
}
