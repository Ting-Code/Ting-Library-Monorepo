import { apiGetUserInfo, IMenu } from '../api/apiSystem'
import { setGlobalDataAuth, setGlobalDataMenu } from '../global-data'

/**
 * @description 获取用户信息（菜单和权限）
 */
export async function getUserInfo() {
  try {
    const res = await apiGetUserInfo()
    setGlobalDataMenu(res.menu)
    const auth = transAuth(res.menu)
    setGlobalDataAuth(auth)
    return { menu: res.menu, auth }
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * 将页面权限拍平
 * @param menu
 */
function transAuth(menu: IMenu[]) {
  let auth: Omit<IMenu, 'children'>[] = []
  menu.forEach((menuItem) => {
    if (menuItem?.path && !menuItem?.children) {
      auth.push(menuItem)
    }
    if (menuItem?.children) {
      auth = [...auth, ...transAuth(menuItem.children)]
    }
  })
  return auth
}
