export enum PageEnum {
  // 登录
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',
  //重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  // 首页
  BASE_HOME = '/system/home',
  BASE_HOME_NAME = 'system_home',
  //首页跳转默认路由
  BASE_HOME_REDIRECT = '/dashboard/console',
  // 错误
  ERROR_PAGE_NAME = 'ErrorPage'
}
export interface IQuery {
  [x: string]: any
}

export function getURL(url = window.location.href) {
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

type IState = 'replaceState' | 'pushState'

export function setUrl({ query = {}, path }, state: IState = 'replaceState') {
  const urlObj = path ? new URL(path, window.location.origin) : new URL(window.location.href)
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      urlObj.searchParams.set(key, query[key])
    }
  }
  // 使用 history.replaceState 更新浏览器的 URL 而不刷新页面
  window.history[state]({}, '', urlObj.toString())
  // 手动触发 popstate 事件
  const popStateEvent = new PopStateEvent('popstate', { state: { path: urlObj.pathname } })
  window.dispatchEvent(popStateEvent)
}
