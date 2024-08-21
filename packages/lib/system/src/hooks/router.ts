import { getMainWindow } from '../global-data'
import { error } from '@tingcode/utils'
import microApp from '@micro-zoe/micro-app'

export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',
  //重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  // 首页
  BASE_HOME = '/docs/system/home',
  BASE_HOME_NAME = 'system_home',
  // 错误
  ERROR_PAGE_NAME = 'ErrorPage'
}
export interface IQuery {
  [x: string]: any
}

export interface IRouterInfo {
  query?: object
  pathname?: string
}

/**
 * @description 解析当前浏览器URL
 * @param href
 */
export function getUrl(href?: string) {
  const mainWindow = getMainWindow()
  const url = href ? href : mainWindow?.location?.href
  if (!url) return
  const currentURL = new URL(url)
  const paramsOrigin = new URLSearchParams(currentURL.search)
  const query: IQuery = {}
  for (const [key, value] of paramsOrigin.entries()) {
    query[key] = value
  }
  return {
    query,
    paramsOrigin,
    hash: currentURL.hash,
    host: currentURL.host,
    hostname: currentURL.hostname,
    href: currentURL.href,
    origin: currentURL.origin,
    password: currentURL.password,
    pathname: currentURL.pathname,
    port: currentURL.port,
    protocol: currentURL.protocol,
    search: currentURL.search
  }
}

interface RouterTarget {
  name?: string
  path?: string
  query?: object
  replace?: boolean
}

export async function setUrl(to: RouterTarget) {
  const { path, replace, name, query } = to
  const mainWindow = getMainWindow()
  if (!mainWindow) return
  const urlObj = path
    ? new URL(path, mainWindow.location.origin)
    : new URL(mainWindow.location.href)
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      urlObj.searchParams.set(key, query[key])
    }
  }
  try {
    if (!name) {
      return error('no app name')
    }
    return await microApp.router.push({ name, path: urlObj.toString(), replace: !!replace })
  } catch (e) {
    // 使用 history.replaceState 更新浏览器的 URL 而不刷新页面
    mainWindow.history[replace ? 'replaceState' : 'pushState']({}, '', urlObj.toString())
    // 手动触发 popstate 事件
    const popStateEvent = new PopStateEvent('popstate', { state: { path: urlObj.pathname } })
    mainWindow.dispatchEvent(popStateEvent)
  }
}

export function queryStringify(query: unknown): string {
  // 如果查询对象为空或者是空对象，直接返回空字符串
  if (!query || Object.keys(query).length === 0) {
    return ''
  }
  const queryString = Object.keys(query)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&')
  return `?${queryString}`
}
