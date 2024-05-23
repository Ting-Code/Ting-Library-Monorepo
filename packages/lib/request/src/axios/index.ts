// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
export { VAxios } from './Axios'
export type { CreateAxiosOptions, Recordable, RequestOptions, Result } from './types'
export { AxiosTransform } from './axiosTransform'
export type { AxiosResponse } from 'axios'
export { checkStatus } from './checkStatus'
export { joinTimestamp, formatRequestDate } from './helper'
export { RequestEnum, ResultEnum, ContentTypeEnum } from './enums'
import axios from 'axios'
export { axios }
