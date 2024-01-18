import BigNumber from 'bignumber.js'
import { isNumberString } from '../is'
import Nzh from 'nzh'
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
  const computeArr: BigNumber.Value[] = []
  // check 非数数据
  let hasErrorNum = false
  arr.forEach((num) => {
    const isNumberStringNum = isNumberString(num)
    !isNumberStringNum && (hasErrorNum = true)
    computeArr.push((isNumberStringNum ? num : repair) as BigNumber.Value)
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

export interface ToCnConfig {
  ch: string
  ch_u: string
  ch_f: string
  ch_d: string
  m_t: string
  m_z: string
  m_u: string
}

/**
 * 创建自定义数字转文字函数
 * @param toCnConfig
 */
export const createNzh = (toCnConfig: Partial<ToCnConfig> = {}) => {
  const {
    ch = '〇壹贰叁肆伍陆柒捌玖',
    ch_u = '个十百千万亿兆京',
    ch_f = '负',
    ch_d = '点',
    m_t = '元角分厘',
    m_z = '￥',
    m_u = '正'
  } = toCnConfig
  return new Nzh({ ch, ch_u, ch_f, ch_d, m_t, m_z, m_u })
}

interface NumberToConfig {
  /*
   *  十的口语化开关, 默认值为 false
   *  注: Nzh.cn和Nzh.hk中的encodeS方法默认 true
   * */
  tenMin?: boolean
  /**
   * "万万"化开关, 默认值为 true
   * */
  ww?: boolean
  repair?: unknown
  error?: Function
}

/**
 * @description 数字转简体中文
 * @param val
 * @param config
 */
export const numberToSimplified = (val: unknown, config: NumberToConfig = {}) => {
  const { repair = '', error, ...option } = config
  if (!isNumberString(val)) return error ? error() : repair
  return Nzh.cn.encodeS(val as string | number, option)
}
/**
 * @description 数字转繁体中文
 * @param val
 * @param config
 */
export const numberToTraditional = (val: unknown, config: NumberToConfig = {}) => {
  const { repair = '', error, ...option } = config
  if (!isNumberString(val)) return error ? error() : repair
  return Nzh.cn.encodeB(val as string | number, option)
}

interface ToMoneyConfig extends NumberToConfig {
  // 输出完整金额开关, toMoney 函数专用配置, 默认 false
  complete?: boolean
  // 输出金额前缀字符, toMoney 函数专用配置, 默认 true
  outSymbol?: boolean
  // 个位为0时不省略元，toMoney 函数专用配置, 默认 false
  unOmitYuan?: boolean
  // 不以源数据加整，以输出结果加“整”（只要输出的结果没有到分位就加“整”）
  forceZheng?: boolean
}

/**
 * @description 数字转银行书写金额
 * @param val
 * @param config
 */
export const numberToMoney = (val: unknown, config: ToMoneyConfig = {}) => {
  const { repair = '', error, outSymbol = false, ...option } = config
  if (!isNumberString(val)) return error ? error() : repair
  return Nzh.cn.toMoney(val as string | number, { outSymbol, ...option })
}
/**
 * @description 获取数字单位
 * @param val
 * @param config
 */
export const numberToUnit = (val: unknown, config: Config = {}) => {
  const { repair = '', error } = config
  if (!isNumberString(val)) return error ? error() : repair
  const unitArr = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿']
  const unitArr2 = ['十亿', '百亿', '千亿', '万亿', '十万亿', '百万亿', '千万亿', '兆']
  return [...unitArr, ...unitArr2][Number(val).toFixed(0).length - 1]
}
