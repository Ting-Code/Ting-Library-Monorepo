import type { ConfigType } from 'dayjs'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash-es'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export const dateUtil = dayjs

export const formatDate = (
  date: ConfigType,
  format = DATE_TIME_FORMAT,
  repair: unknown = ''
): string | unknown => {
  if (isEmpty(date) || isNaN(dateUtil(date).toDate().getTime())) return repair
  return dateUtil(date).format(format)
}

export const formatSecond = (date: ConfigType): unknown => {
  return formatDate(date, DATE_FORMAT)
}

/**
 * @description
 * @param date
 */
export const formatDay = (date: ConfigType): unknown => {
  return formatDate(date, DATE_TIME_FORMAT)
}
