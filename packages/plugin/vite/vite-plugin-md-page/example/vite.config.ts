// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
import VitePluginMdPage from '../dist/index.mjs'

// https://vitejs.dev/config/
export default defineConfig(() => {
  console.log('222222222222')
  return {
    plugins: [vue(), VitePluginMdPage()],
    server: {
      // 其他服务器配置...

      logger: {
        // 控制日志级别，可以是 "info"、"warn" 或 "error"
        level: 'info',

        // 是否在控制台显示 Vite 进程的输出，默认为 false
        output: true
      }
    }
  }
})
