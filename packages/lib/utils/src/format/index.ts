import { isString } from 'lodash-es'

export function stringToArray(val: unknown, repair: unknown = val) {
  if (isString(val)) {
    return val.split(',')
  }
  return repair
}
