import { isString, isArray } from 'lodash-es'
import { keepNumbers } from '../math'

export interface SplitConfig {
  repair?: unknown
  error?: Function
  separator?: string
}

/**
 * @description
 * @param val
 * @param config
 */
export function stringSplitArray(val: unknown, config: SplitConfig = {}) {
  const { repair = val, separator = ',', error } = config
  if (!isString(val)) return error ? error(val) : repair
  return val ? val.split(separator) : []
}

export function stringSplitNumberArray(val: unknown, config: SplitConfig = {}) {
  const { repair = val, separator = ',', error } = config
  if (!isString(val)) return error ? error(val) : repair
  return (val ? val.split(separator) : []).map((item) => {
    return keepNumbers(item)
  })
}

export function arrayJoinString(val: unknown, config: SplitConfig = {}) {
  const { repair = val, separator = ',', error } = config
  if (!isArray(val)) return error ? error(val) : repair
  return val.join(separator)
}
