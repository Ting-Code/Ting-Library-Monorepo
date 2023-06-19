import { isExternal, isString } from '@common/utils'
import {
  RequestEnum,
  ResultEnum,
  ContentTypeEnum,
  AxiosTransform,
  AxiosResponse,
  RequestOptions,
  Result,
  CreateAxiosOptions,
  VAxios,
  checkStatus,
  Recordable,
  formatRequestDate,
  joinTimestamp,
  axios
} from '@common/request'
import { useEnvSetting } from '@/hooks/useSetting'
import { deepMerge, setObjToUrlParams, storage } from '@common/utils'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStoreWidthOut } from '@/store/modules/user.js'
import router from '@/router'
import { PageEnum } from '@/router/type'
const globSetting = useEnvSetting()
const urlPrefix: string = globSetting.urlPrefix || ''

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse
    } = options

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    const { data } = res

    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错，请稍候重试')
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data
    // 请求成功
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS // 200
    // 是否显示提示信息
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        // 是否显示自定义信息提示
        ElMessage.success(successMessageText || message || '操作成功！')
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        // 是否显示自定义信息提示
        ElMessage.error(message || errorMessageText || '操作失败！')
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        ElMessageBox({
          title: '提示',
          message: message
        })
      }
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return result
    }
    // 接口请求错误，统一提示错误信息 这里逻辑可以根据项目进行修改
    let errorMsg = message
    switch (code) {
      // 请求失败
      case ResultEnum.ERROR:
        ElMessage.error(errorMsg)
        break
      // 登录超时
      case ResultEnum.TIMEOUT:
        if (router.currentRoute.value?.name === PageEnum.BASE_LOGIN_NAME) return
        // 到登录页
        errorMsg = '登录超时，请重新登录!'
        ElMessageBox.confirm('登录身份已失效，请重新登录!', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          storage.clear()
          window.location.href = PageEnum.BASE_LOGIN
        })
        break
    }
    throw new Error(errorMsg)
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

    const isUrlStr = isExternal(config.url as string)

    // 拼接URL前缀
    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    // 拼接请求域名端口
    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const userStore = useUserStoreWidthOut()
    const token = userStore.getToken
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      ;(config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    return config
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // @ts-ignore
    const { response, code, message } = error || {}
    // TODO 此处要根据后端接口返回格式修改
    const msg: string =
      response && response.data && response.data.message ? response.data.message : ''
    const err: string = error.toString()
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        ElMessage.error('接口请求超时,请刷新页面重试!')
        return Promise.reject(error)
      }
      if (err && err.includes('Network Error')) {
        ElMessage.error('请检查您的网络连接是否正常!')
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as string | undefined)
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error)
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg, ElMessage)
    } else {
      console.warn(error, '请求被取消！')
    }
    return Promise.reject(response?.data)
  }
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
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
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
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
