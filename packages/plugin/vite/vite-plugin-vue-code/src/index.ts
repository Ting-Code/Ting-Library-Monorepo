import type { PluginOption } from 'vite'
import { createFilter } from './createFilter'
import { transformDemo, transformFile } from './transform'

const VitePluginVueCode = (): PluginOption => {
  /** filter out files which aren't  files */
  const filterDemo = createFilter(/\.demo.vue$/)
  const filterVue = createFilter(/\.vue$/)
  return {
    name: 'vite-plugin-code',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // Vite 读取并解析完用户自定义的配置文件（通常是 vite.config.js）后
    async configResolved() {
      // 传入参数并且
    },
    // 服务相关配置
    async configureServer() {},
    // 在构建前执行一些自定义操作
    async buildStart() {},
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    async transform(code, id) {
      if (filterDemo(id)) {
        return transformDemo(code)
      }

      if (filterVue(id)) {
        return transformFile(code, id)
      }

      return
    },
    // 热更新时触发
    async handleHotUpdate(ctx) {
      if (filterDemo(ctx.file)) {
        const defaultRead = ctx.read
        ctx.read = async function () {
          return await transformDemo(await defaultRead())
        }
      }

      return
    }
  }
}
export default VitePluginVueCode
export { VitePluginVueCode }
