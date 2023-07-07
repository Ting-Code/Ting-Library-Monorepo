import type { PluginOption } from 'vite'
import { createFilter } from './createFilter'

const VitePluginMdPage = (): PluginOption => {
  /** filter out files which aren't  files */
  const filter = createFilter(/\.demo.vue$/)

  return {
    name: 'vite-plugin-md-page',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // Vite 读取并解析完用户自定义的配置文件（通常是 vite.config.js）后
    async configResolved() {
      // 传入参数并且
      console.log('--------------------- configResolved --------------------')
    },
    // 服务相关配置
    async configureServer() {
      console.log('--------------------- configureServer --------------------')
    },
    // 在构建前执行一些自定义操作
    async buildStart() {
      console.log('--------------------- buildStart --------------------')
    },
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    async transform(code, id) {
      if (!filter(id)) return
      console.log('--------------------- transform --------------------')
      return `
        export default function (Component) {
          Component.__sourceCode = ${JSON.stringify(code)}
        }
      `.trim()
    },
    async handleHotUpdate(ctx) {
      console.log('--------------------- handleHotUpdate --------------------')
      console.log(ctx)
      return
    }
  }
}
export default VitePluginMdPage
export { VitePluginMdPage }
