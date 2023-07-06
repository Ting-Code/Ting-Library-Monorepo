import type { CacheStore } from './index'
import type { Parser } from './index'

export const loadCache = (md: Parser) => {
  const obj: Record<string, CacheStore> = {}
  for (const [key, value] of Array.from(md.cacheStore.entries())) {
    obj[key] = {
      ...value,
      comp: `() => import('${md.getImportSrc(key)}')`
    }
  }
  // 判断当前是不是开发环境
  return `const demoData = ${obj};\n export default demoData;`
}
