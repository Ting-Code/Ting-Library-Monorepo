import { emitMitt, getGlobalDataMenu, getMainWindow, onMitt } from '../global-data'
import { error } from '@tingcode/utils'
import microApp from '@micro-zoe/micro-app'
import { IMenu, IMeta } from '../api/apiSystem'

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
  name: string
  matched: IMenu[]
  meta: IMeta
  query?: object
  fullPath?: string
  path?: string
  hash?: string
  host?: string
  hostname?: string
  href?: string
  origin?: string
  password?: string
  pathname?: string
  port?: string
  protocol?: string
  search?: string
  params?: object
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
  emitMittRouter(urlObj.toString()) // 触发更新路由
  try {
    if (!name) {
      return error('no app name')
    }
    return await microApp.router.push({ name, path: urlObj.toString(), replace: !!replace })
  } catch (e) {
    console.log('==========urlObj.toString()========', urlObj.toString(), urlObj.pathname, urlObj)
    mainWindow.history[replace ? 'replaceState' : 'pushState']({}, '', urlObj.toString())
    const popStateEvent = new PopStateEvent('popstate', { state: { path: urlObj.pathname } })
    mainWindow.dispatchEvent(popStateEvent)
  }
}

export function onMittRouter(fn: (route: IRouterInfo) => void) {
  onMitt('router', fn)
}

export function emitMittRouter(href: string) {
  const urlObj = getUrl(href)
  const menu = getGlobalDataMenu()
  if (!urlObj?.pathname || !menu) return
  const matched = findRouteMatched(urlObj?.pathname, menu)
  emitMitt('router', {
    matched,
    meta: matched?.[matched.length - 1]?.meta,
    name: matched?.[matched.length - 1]?.name,
    query: urlObj.query,
    fullPath: urlObj.pathname + urlObj.search,
    path: urlObj.pathname,
    hash: urlObj.hash,
    host: urlObj.host,
    hostname: urlObj.hostname,
    href: urlObj.href,
    origin: urlObj.origin,
    password: urlObj.password,
    pathname: urlObj.pathname,
    port: urlObj.port,
    protocol: urlObj.protocol,
    search: urlObj.search
  })
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

export function findRouteMatched(path: string, menu: IMenu[]) {
  let matched: any = []
  menu.forEach((menuItem) => {
    if (menuItem.children && menuItem.children.length > 0) {
      const matchedItem = findRouteMatched(path, menuItem.children)
      if (matchedItem && matchedItem.length > 0) {
        matched = [menuItem, ...matchedItem]
      }
    } else if (menuItem.path === path) {
      matched.push(menuItem)
    }
  })
  return matched
}
