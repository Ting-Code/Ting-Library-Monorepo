import { extname } from 'path'
import chokidar from 'chokidar'
import fsExtra from 'fs-extra'
import { renderCode } from './render-code'
import { parserCache } from './parser-cache'
import { parserSingleFile } from './glob-files'
import type { Parser } from './index'
export const watcherServer = (parser: Parser) => {
  // 监视指定glob文件或目录的变化 basePath 是基准路径，glob 相对于该路径的位置。
  parser.watcher = chokidar.watch(parser.glob, {
    cwd: parser.basePath
  })

  parser.watcher?.on('add', async (path) => {
    const relativePath = parser.getBaseDemoPath(path)
    if (parser.cacheStore.has(relativePath)) return

    const fullPath = parser.getFullPath(path, true)
    const storeItem = await parserSingleFile(parser, fullPath, path, relativePath)
    if (storeItem) {
      const modules = parser.server?.moduleGraph?.getModulesByFile(parser.moduleId)
      parser.cacheStore.set(relativePath, storeItem)
      modules?.forEach((module) => {
        parser.server?.moduleGraph.invalidateModule(module)
      })
      parser.server?.ws?.send({
        type: 'full-reload'
      })
    }
  })

  parser.watcher?.on('change', async (path) => {
    const relativePath = parser.getBaseDemoPath(path)
    const fullPath = parser.getFullPath(path, true)
    let code = await fsExtra.readFile(fullPath, 'utf-8')
    let title
    let desc
    let docs: any[] = []
    const ext = extname(path)
    let storeItem = parser.cacheStore.get(relativePath)
    if (ext.endsWith('vue')) {
      const renderCodeData = await renderCode(code, parser)
      code = renderCodeData.code as string
      title = renderCodeData.docs?.[0]?.title
      desc = renderCodeData.docs?.[0]?.desc
      docs = renderCodeData.docs
      if (storeItem) {
        storeItem.title = title
        storeItem.desc = desc
        storeItem.code = code
        storeItem.docs = renderCodeData.docs
        storeItem.highlight = parser.renderCode(code as string, ext.slice(1))
        storeItem = parserCache(storeItem)
      } else {
        storeItem = parserCache({
          relativePath,
          code,
          title,
          docs,
          desc,
          highlight: parser.renderCode(code as string, ext.slice(1))
        })
      }
    }
    if (!storeItem) {
      storeItem = parserCache({
        relativePath,
        code,
        highlight: parser.renderCode(code as string, ext.slice(1))
      })
    }
    parser.cacheStore.set(relativePath, storeItem!)
  })

  parser.watcher?.on('unlink', async (path) => {
    const relativePath = parser.getBaseDemoPath(path)
    parser.cacheStore.delete(relativePath)
    const modules = parser.server?.moduleGraph?.getModulesByFile(parser.moduleId)
    modules?.forEach((module) => {
      parser.server?.moduleGraph.invalidateModule(module)
    })
    parser.server?.ws?.send({
      type: 'full-reload'
    })
  })
}
