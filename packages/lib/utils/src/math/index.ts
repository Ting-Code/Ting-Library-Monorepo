import BigNumber from 'bignumber.js'
import { isNumberString } from '../is'

interface Config {
  repair?: unknown
  error?: Function
  roundingMode?: BigNumber.RoundingMode
}

/**
 * @description  省略数字（默认四舍五入取整） 支持 number | string
 * @param val
 * @param decimalPlaces
 * @param config {
 *   error： 非数字情况下 执行
 *   repair： 非数字情况下 输出兜底替换数据
 *   roundingMode： 舍去方式
 * }
 */
export const round = (val: unknown, decimalPlaces: number = 0, config: Config = {}) => {
  const { repair = 0, error, roundingMode = BigNumber.ROUND_HALF_UP } = config
  if (!isNumberString(val)) return error ? error() : repair
  const math = new BigNumber(val as number)
  return math.dp(decimalPlaces, roundingMode).toNumber()
}

/**
 * @description  取整 向下取整 支持 number | string
 */
export const roundDown = (val: unknown, repair: unknown = 0) => {
  return round(val, 0, { repair, roundingMode: BigNumber.ROUND_DOWN })
}

/**
 * @description  保留两位小数四舍五入 支持 number | string
 */
export const round2D = (val: unknown, repair: unknown = 0) => {
  return round(val, 2, { repair })
}

/**
 * @description  保留两位小数 向下取整 支持 number | string
 */
export const roundDown2D = (val: unknown, repair: unknown = 0) => {
  return round(val, 2, { repair, roundingMode: BigNumber.ROUND_DOWN })
}

/**
 * @description 省略数字并 补全 0 （默认四舍五入取整） 支持 number | string
 * @return string 返回字符串 ！
 */
export const fixed = (val: unknown, decimalPlaces: number = 0, config: Config = {}) => {
  const { repair = '', error, roundingMode = BigNumber.ROUND_HALF_UP } = config
  if (!isNumberString(val)) return error ? error() : repair
  const math = new BigNumber(val as number)
  return math.toFixed(decimalPlaces, roundingMode)
}

/**
 * @description 保留两位小数 补全 0 四舍五入 支持 number | string
 * @return string 返回字符串 ！
 */
export const fixed2D = (val: unknown, repair: unknown = '') => {
  return fixed(val, 2, { repair })
}

/**
 * @description 取整 补全 0 向下取整 支持 number | string
 * @return string 返回字符串 ！
 */
export const fixedDown = (val: unknown, repair: unknown = '') => {
  return fixed(val, 0, { repair, roundingMode: BigNumber.ROUND_DOWN })
}

/**
 * @description 保留两位小数 补全 0 向下取整 支持 number | string
 * @return string 返回字符串 ！
 */
export const fixedDown2D = (val: unknown, repair: unknown = '') => {
  return fixed(val, 2, { repair, roundingMode: BigNumber.ROUND_DOWN })
}

interface ThousandsConfig extends BigNumber.Format {
  repair?: unknown
  error?: Function
  roundingMode?: BigNumber.RoundingMode
}

/**
 * @description 千分位格式化
 * @param val
 * @param decimalPlaces
 * @param config
 */
export const thousands = (
  val: unknown,
  decimalPlaces: number = 0,
  config: ThousandsConfig = {}
) => {
  const {
    repair = '',
    error,
    roundingMode = BigNumber.ROUND_DOWN,
    groupSize = 3,
    groupSeparator = ',',
    decimalSeparator = '.',
    ...formatParams
  } = config
  if (!isNumberString(val)) return error ? error() : repair
  const math = new BigNumber(val as number)
  return math.toFormat(decimalPlaces, roundingMode, {
    groupSize,
    groupSeparator,
    decimalSeparator,
    ...formatParams
  })
}

/**
 * @description 千分位格式化 保留两位小数 补全 0 四舍五入 支持 number | string
 * @return string 返回字符串 ！
 */
export const thousands2D = (val: unknown, repair: unknown = '') => {
  return thousands(val, 2, { repair })
}

/**
 * @description 去除补全的 .00
 * @param val
 */
export const roundZero = (val: string) => {
  return val.replace(/\.?0+$/, '')
}

/**
 * @description 千分位格式化 保留两位小数 补全 0 四舍五入 支持 number | string
 * @return string 返回字符串 ！
 */
export const thousandsRound2D = (val: unknown, repair: unknown = '') => {
  return roundZero(thousands(val, 2, { repair }))
}

type ComputationalMethod = 'plus' | 'minus' | 'times' | 'div'
/**
 * @description 加减乘除计算
 * @param arr
 * @param method
 * @param config
 */
export const computational = (arr: unknown[], method: ComputationalMethod, config: Config = {}) => {
  const { repair = 0, error } = config
  const computeArr = []
  // check 非数数据
  let hasErrorNum = false
  arr.forEach((num) => {
    const isNumberStringNum = isNumberString(num)
    !isNumberStringNum && (hasErrorNum = true)
    computeArr.push(isNumberStringNum ? num : repair)
  })
  if (hasErrorNum && error) return error(computeArr)
  const math = new BigNumber(computeArr[0])
  return computeArr
    .reduce((item, val, index) => {
      if (index === 0) return item
      return item[method](val)
    }, math)
    .toNumber()
}

export const plus = (arr: unknown[]) => {
  return computational(arr, 'plus', { repair: 0 })
}

export const minus = (arr: unknown[]) => {
  return computational(arr, 'minus', { repair: 0 })
}

export const times = (arr: unknown[]) => {
  return computational(arr, 'times', { repair: 1 })
}

export const div = (arr: unknown[]) => {
  return computational(arr, 'div', { repair: 1 })
}

/**
 * @description 比较大小
 * @param val1
 * @param val2
 * @return 1	val1>val2
 * @return -1	val1<val2
 * @return 0	val1==val2
 * @return null	操val1或者val2不是数字
 */
export const compared = (val1: BigNumber.Value, val2: BigNumber.Value) => {
  const meth = new BigNumber(val1)
  return meth.comparedTo(val2)
}
