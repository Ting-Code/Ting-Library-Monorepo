import axios, { InternalAxiosRequestConfig, Canceler } from 'axios'
import qs from 'qs'

import { isFunction } from '@tingcli/utils'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: InternalAxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')

export class AxiosCanceler {
  /**
   * 添加请求
   * @param {Object} config
   */
  addPending(config: InternalAxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果 pending 中不存在当前请求，则添加进去
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * @description: 清空所有pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * 移除请求
   * @param {Object} config
   */
  removePending(config: InternalAxiosRequestConfig) {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * @description: 重置
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
