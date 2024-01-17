import {
  isObject,
  isString,
  isArray,
  isNull,
  isFunction,
  isDate,
  isEmpty,
  isBoolean,
  isElement,
  isMap,
  isNumber,
  isRegExp,
  isError,
  isEqual
} from 'lodash-es'
import BigNumber from 'bignumber.js'

const toString = Object.prototype.toString
/**
 * @description: 判断值是否未某个类型
 */
export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}
/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}

type MaybePromise = { [K in keyof Promise<any>]: any }
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  const tempVal = val as MaybePromise
  return (
    is(val, 'Promise') && isObject(val) && isFunction(tempVal.then) && isFunction(tempVal.catch)
  )
}

/**
 * @description 判断是否是数字 或者 字符串数字
 */
export const isNumberString = (val: unknown): boolean => {
  const num = new BigNumber(val as number).toNumber()
  return typeof val === 'number'
    ? true
    : typeof val === 'string' && !isNaN(num) && isFinite(parseFloat(val))
}

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 判断是否为外部资源
 * @param {*} path
 */
export const isExternal = (path: string) => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export {
  isObject,
  isString,
  isArray,
  isNull,
  isFunction,
  isDate,
  isEmpty,
  isBoolean,
  isElement,
  isMap,
  isNumber,
  isRegExp,
  isError,
  isEqual
}
