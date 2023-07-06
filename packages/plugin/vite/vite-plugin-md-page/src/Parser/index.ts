import { dirname, resolve } from 'path'
import type { ResolvedConfig, TransformResult, ViteDevServer } from 'vite'
import { normalizePath } from 'vite'
import MagicString from 'magic-string'
import type { FSWatcher } from 'chokidar'
import { loadCache } from './load-cache'
import { globFiles } from './glob-files'
import { watcherServer } from './watcher-server'
import { IOptions } from '../index'

export interface DemoAttr {
  title?: string
  desc?: string
  src?: string
  raw?: boolean
  link?: string
  ext?: string
  code?: string
  highlight?: string
  comp?: any
}

export interface CacheStore {
  relativePath: string
  code: string
  highlight?: string
  title?: string
  desc?: string
  docs?: any[]
  comp?: any
}

export class Parser {
  public wrapper = 'demo'

  public cache = new Map<string, DemoAttr>()

  public cacheSrcCode = new Map<string, string>()

  public cacheStore = new Map<string, CacheStore>()

  public server: ViteDevServer | undefined

  private _filePath: string | undefined

  private _currentCode: MagicString | undefined

  public watcher: FSWatcher | undefined

  get excludeFiles() {
    return this.options.exclude ?? []
  }

  get basePath(): string {
    return normalizePath((this.options.base ?? this.config.root) || process.cwd())
  }

  get filePath(): string | undefined {
    return dirname(this._filePath ?? this.basePath)
  }

  get glob() {
    const glob = this.options.glob
    if (glob) return glob

    return './**/demos/*.{vue,tsx,jsx}'
  }

  get blockName(): string {
    if (this.options?.blockName) {
      const name = this.options?.blockName
      // 判断是否为文字或者-
      if (name.match(/^[a-zA-Z][a-zA-Z-]+$/)) return name
      else console.warn(`[vite-plugin-vue-demos] ${name} is not valid, please use a-zA-Z  or -`)
    }
    return 'docs'
  }

  get moduleId(): string {
    return '\0virtual:vitepress-demo'
  }

  public getDemoPath(src?: string): string {
    const path = normalizePath(resolve(this.filePath ?? this.basePath, src ?? ''))
    const base = this.basePath
    return path.replace(base, '')
  }

  public getBaseDemoPath(path: string): string {
    if (path.startsWith('/')) path = path.slice(1)
    const full = normalizePath(resolve(this.basePath, path))
    const base = full.replace(this.basePath, '')
    if (base.startsWith('/')) return base
    return `/${base}`
  }

  public checkIsInRoot(path: string): boolean {
    const root = normalizePath(this.config.root || process.cwd())
    path = normalizePath(path)
    return path.startsWith(root)
  }

  public getImportSrc(src: string): string {
    const path = this.options?.aliasName ?? '/@/VITEPRESS_DEMO'
    return path + normalizePath(`/${src}`)
  }

  public getFullPath(src: string, useBase = false): string {
    return normalizePath(resolve(useBase ? this.basePath : this.filePath ?? this.basePath, src))
  }

  public hasCache(src: string): boolean {
    return this.cache.has(src)
  }

  public getCache() {
    const obj: Record<string, DemoAttr> = {}
    for (const [key, value] of Array.from(this.cache.entries())) obj[key] = value
    return obj
  }

  public setCache(src: string, attr: DemoAttr): void {
    this.cache.set(src, attr)
  }

  constructor(public options: IOptions, public config: ResolvedConfig) {
    if (options.wrapper) this.wrapper = options.wrapper
    options.includeExt = options.includeExt ?? ['.vue', '.tsx', '.jsx']
  }

  public async setupServer(_server: ViteDevServer) {
    this.server = _server
    await globFiles(this)
    watcherServer(this)
  }

  public async buildCache() {
    await globFiles(this)
  }

  public checkSupportExt(ext?: string): boolean {
    if (!ext) return false

    return this.options.includeExt?.includes(ext) ?? false
  }

  public checkWrapper(token: string): boolean {
    const REGEX_DEMO = new RegExp(`<${this.wrapper}.*?>(.*?)</${this.wrapper}>`, 'gis')
    const REGEX_DEMO1 = new RegExp(`<${this.wrapper}.*?/>`, 'gis')
    return REGEX_DEMO.test(token) || REGEX_DEMO1.test(token)
  }

  private checkFile(id: string): boolean {
    return id.endsWith('.md')
  }

  public async transform(code: string, id: string): Promise<TransformResult | undefined> {
    // 鉴别md 文件
    if (!this.checkFile(id)) return undefined
    this._filePath = id
    this._currentCode = new MagicString(code)
    // 拿到demos
    return {
      code: this._currentCode.toString(),
      map: this._currentCode.generateMap({ hires: true })
    }
  }

  public renderCode(code: string, lang: string, render = true): string {
    const source = `\n\`\`\`${lang}\n${code}\n\`\`\`\n`
    if (!render) return source
    // return this.md.render(source, env)
    return code
  }

  public renderMd(code: string): { html: string; env: any } {
    const env = {}
    const html = code
    // const html = this.md.render(code, env)
    return { html, env }
  }

  public replaceCode(target: string, code: string) {
    this._currentCode?.replaceAll(target, code)
  }

  public load(): string {
    return loadCache(this)
  }
}
