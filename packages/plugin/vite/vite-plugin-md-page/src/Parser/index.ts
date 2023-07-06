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
  public cacheStore = new Map<string, CacheStore>()
}
