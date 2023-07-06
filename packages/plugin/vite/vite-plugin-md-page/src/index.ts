import type { PluginOption, ResolvedConfig } from 'vite'
import { normalizePath } from 'vite'
import { Parser } from './Parser'

export interface CodeOptions {
  url: string
}
export interface IOptions {
  base?: string
  wrapper?: string
  glob?: string | string[]
  exclude?: string | string[]
  /**
   * support transform code to vue component extra
   * @default ['.vue', '.tsx', '.jsx']
   */
  includeExt?: string[]
  aliasName?: string
  codeSandBox?: CodeOptions // https://codesandbox.io/s/vue-shape-8ciig?file=/src/App.vue
  stackblitz?: CodeOptions // https://stackblitz.com/edit/vitejs-vite-lsj1ne?file=src/Demo1.vue
  /**
   * @description 自定义vue模块名
   * @default docs
   */
  blockName?: string
}
const VitePluginMdPage = (_option?: IOptions): PluginOption => {
  let config: ResolvedConfig
  let parser: Parser
  const options: IOptions = Object.assign({}, _option)
  const aliasName = options.aliasName ?? '/@/MD_PAGE'
  const virtualModule = 'virtual:vitepress-demo'
  const virtualModuleId = `\0${virtualModule}`
  return {
    name: 'vite-plugin-md-page',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    config(config) {
      // 获取项目绝对路径
      const path = normalizePath(options.base || config.root || process.cwd())
      return {
        resolve: {
          alias: {
            [aliasName]: path
          }
        }
      }
    },
    // Vite 读取并解析完用户自定义的配置文件（通常是 vite.config.js）后
    async configResolved() {
      // 传入参数并且
      parser = new Parser(options, config)
    },
    // 服务相关配置
    async configureServer(server) {
      console.log('--------------------- configureServer --------------------')
      await parser.setupServer(server)
    },
    // 在构建前执行一些自定义操作
    async buildStart() {
      console.log('--------------------- buildStart --------------------')
      parser.cacheStore.clear()
      await parser.buildCache()
    },
    /**
     *
     * @description 导入时，会调用 resolveId 函数来确定被导入模块的真实路径。
     * @param id：要解析的导入路径字符串。
     * @param importer：导入该模块的文件的路径。如果不是通过导入语句触发调用，importer 参数将为 undefined。
     */
    resolveId(id) {
      console.log('--------------------- resolveId --------------------')
      console.log(id)
      if (id === virtualModule) return virtualModuleId
      return id
    },
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    async transform(code, id) {
      if (id.endsWith(`lang.${parser.blockName}`)) return 'export default {}'
      console.log(parser.blockName, code, id)
      return await parser.transform(code, id)
    },
    load(id) {
      if (id === virtualModuleId) return parser.load()
      console.log('--------------------- load --------------------')
      console.log(id)
      return id
    }
  }
}
export default VitePluginMdPage
export { VitePluginMdPage }
