import type { PluginOption } from 'vite'
import { normalizePath } from 'vite'
// import { Parser } from './Parser'
export interface IOptions {
  aliasName: string
  base: string
}
const VitePluginMdPage = (_option?: IOptions): PluginOption => {
  console.log('--------------------- VitePluginMdPage --------------------')

  // let config: ResolvedConfig
  // let parser: Parser
  const options: IOptions = Object.assign({}, _option)
  const aliasName = options.aliasName ?? '/@/MD_PAGE'
  return {
    name: 'vite-plugin-md-page',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    config(config) {
      const path = normalizePath(options.base || config.root || process.cwd())
      console.log('normalizePath', normalizePath)
      return {
        resolve: {
          alias: {
            [aliasName]: path
          }
        }
      }
    },
    // 在构建前执行一些自定义操作
    async buildStart() {
      console.log('--------------------- buildStart --------------------')
      // parser.cacheStore.clear()
      // await parser.buildCache()
    },
    async configResolved(_config) {
      // md = await createMarkdownRenderer(
      //   config.root,
      //   options?.markdown ?? {},
      //   config.base ?? '/'
      // )
      // parser = new Parser(options, config, md)
      console.log('--------------------- configResolved --------------------')
      console.log(_config)
    },
    async configureServer(server) {
      console.log('--------------------- configureServer --------------------')
      console.log(server)
      // await parser.setupServer(server)
    },
    resolveId(id) {
      // if (id === virtualModule) return virtualModuleId
      console.log('--------------------- resolveId --------------------')
      console.log(id)
      return id
    },
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    async transform(code, id) {
      // if (id.endsWith(`lang.${parser.blockName}`)) return 'export default {}'
      //
      // return await parser.transform(code, id)
      console.log('--------------------- transform --------------------')
      console.log(code, id)
      return
    },
    load(id) {
      // if (id === virtualModuleId) return parser.load()
      console.log('--------------------- load --------------------')
      console.log(id)
      return id
    }
  }
}
export default VitePluginMdPage
export { VitePluginMdPage }
