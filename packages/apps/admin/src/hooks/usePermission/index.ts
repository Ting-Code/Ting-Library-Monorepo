import { useUserStore } from '@/store/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { PageEnum } from '@/router/type'

export function usePermission() {
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME

  /**
   * 检查权限
   * @param accesses
   */
  function _somePermissions(accesses: string[]) {
    return userStore.getPermissions.some((item) => {
      const { value }: any = item
      return accesses.includes(value)
    })
  }

  /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true
    return _somePermissions(accesses)
  }

  /**
   * 是否包含指定的所有权限
   * @param accesses
   */
  function hasEveryPermission(accesses: string[]): boolean {
    const permissionsList = userStore.getPermissions
    if (Array.isArray(accesses)) {
      return permissionsList.every((access: any) => accesses.includes(access.value))
    }
    throw new Error(`[hasEveryPermission]: ${accesses} should be a array !`)
  }

  /**
   * 是否包含其中某个权限
   * @param accesses
   * @param accessMap
   */
  function hasSomePermission(accesses: string[]): boolean {
    const permissionsList = userStore.getPermissions
    if (Array.isArray(accesses)) {
      return permissionsList.some((access: any) => accesses.includes(access.value))
    }
    throw new Error(`[hasSomePermission]: ${accesses} should be a array !`)
  }

  const handleLogin = async () => {
    await userStore.login()
    const toPath = decodeURIComponent((route.query?.redirect as string) || '/')
    ElMessage.success('登录成功，即将进入系统')
    if (route.name === LOGIN_NAME) {
      await router.replace('/')
    } else await router.replace(toPath)
  }

  return { hasPermission, hasEveryPermission, hasSomePermission, handleLogin }
}
