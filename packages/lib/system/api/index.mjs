import { isExternal, isString } from '@tingcode/utils'
import {
  RequestEnum,
  ResultEnum,
  ContentTypeEnum,
  VAxios,
  checkStatus,
  formatRequestDate,
  joinTimestamp,
  axios
} from '@tingcode/request'
import { deepMerge, setObjToUrlParams } from '@tingcode/utils'
import { getGlobalData, getGlobalDataEnv } from '../global-data'
import { getGlobalStorageToken } from '../global-data'
import { PageEnum } from '../router'
const transform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res, options) => {
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse
    } = options
    if (isReturnNativeResponse) {
      return res
    }
    if (!isTransformResponse) {
      return res.data
    }
    const { data } = res
    if (!data) {
      throw new Error('\u8BF7\u6C42\u51FA\u9519\uFF0C\u8BF7\u7A0D\u5019\u91CD\u8BD5')
    }
    const { code, result, message } = data
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
      }
    }
    if (code === ResultEnum.SUCCESS) {
      return result
    }
    let errorMsg = message
    switch (code) {
      case ResultEnum.ERROR:
        break
      case ResultEnum.TIMEOUT:
        if (window.location.pathname === PageEnum.BASE_LOGIN) return
        errorMsg = '\u767B\u5F55\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55!'
        break
    }
    throw new Error(errorMsg)
  },
  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options
    const isUrlStr = isExternal(config.url)
    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }
    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = void 0
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = void 0
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url, Object.assign({}, config.params, config.data))
        }
      } else {
        config.url = config.url + params
        config.params = void 0
      }
    }
    return config
  },
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    const token = getGlobalStorageToken()
    if (token && config?.requestOptions?.withToken !== false) {
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    return config
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error) => {
    const { response, code, message } = error || {}
    const msg = response && response.data && response.data.message ? response.data.message : ''
    const err = error.toString()
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        return Promise.reject(error)
      }
      if (err && err.includes('Network Error')) {
        return Promise.reject(error)
      }
    } catch (error2) {
      throw new Error(error2)
    }
    const isCancel = axios.isCancel(error)
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg, console)
    } else {
      console.warn(error, '\u8BF7\u6C42\u88AB\u53D6\u6D88\uFF01')
    }
    return Promise.reject(response?.data)
  }
}
function createAxios(opt) {
  const globEnv = getGlobalDataEnv()
  const urlPrefix = globEnv?.urlPrefix || ''
  const apiUrl = globEnv?.apiUrl || ''
  console.log(
    '======================================',
    globEnv,
    urlPrefix,
    apiUrl,
    getGlobalData(),
    window?.namespace
  )
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1e3,
        authenticationScheme: '',
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'none',
          // 接口地址
          apiUrl,
          // 接口拼接地址
          urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true
        },
        withCredentials: false
      },
      opt || {}
    )
  )
}
export const request = createAxios()
export * from './user.mjs'
