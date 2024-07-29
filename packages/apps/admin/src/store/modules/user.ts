import { defineStore } from 'pinia'
import { createStorage } from '@tingcode/utils'
import { store } from '@/store'
import { apiGetUserInfo } from '@tingcode/system/apiSystem'

export const ACCESS_TOKEN = 'ACCESS-TOKEN' // 用户token
export const CURRENT_USER = 'CURRENT-USER' // 当前用户信息
export const IS_LOCKSCREEN = 'IS-LOCKSCREEN' // 是否锁屏
const Storage = createStorage({ storage: localStorage })
import { storage } from '@tingcode/utils'
export interface IUserState {
  token: string
}

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: any[]
  info: any
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: Storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: Storage.get(CURRENT_USER, {})
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getAvatar(): string {
      return this.avatar
    },
    getNickname(): string {
      return this.username
    },
    getPermissions(): [any][] {
      return this.permissions
    },
    getUserInfo(): object {
      return this.info
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setPermissions(permissions: any[]) {
      this.permissions = permissions
    },
    setUserInfo(info: any) {
      this.info = info
    },

    // 获取用户信息
    GetInfo() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this
      return new Promise((resolve, reject) => {
        apiGetUserInfo()
          .then((res) => {
            const result = res
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions
              that.setPermissions(permissionsList)
              that.setUserInfo(result)
            } else {
              reject(new Error('getInfo: permissionsList must be a non-null array !'))
            }
            that.setAvatar(result.avatar)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    async logout() {
      this.setPermissions([])
      this.setUserInfo('')
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
      return Promise.resolve('')
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}
