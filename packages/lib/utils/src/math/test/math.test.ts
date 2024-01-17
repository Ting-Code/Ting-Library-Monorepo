import { expect, test, describe } from 'vitest'
import {
  computational,
  div,
  fixed,
  fixed2D,
  fixedDown,
  fixedDown2D,
  minus,
  plus,
  round,
  round2D,
  roundDown,
  roundDown2D,
  thousands,
  thousands2D,
  thousandsRound2D,
  times
} from '../index'
import { curryRight } from '../../util'

describe('测试 round 相关函数', async () => {
  test('测试 round 数字各种情况 四舍五入', () => {
    expect(round(123)).toBe(123)
    expect(round(123.2332)).toBe(123)
    expect(round(123.156, 1)).toBe(123.2)
    expect(round(123.122, 2)).toBe(123.12)
  })

  test('测试 round 字符串各种情况 四舍五入', () => {
    expect(round('123')).toBe(123)
    expect(round('0')).toBe(0)
    expect(round('123.2332')).toBe(123)
    expect(round('123.156', 1)).toBe(123.2)
    expect(round('123.122', 2)).toBe(123.12)
  })

  test('测试 round 非数字各种情况 四舍五入', () => {
    expect(round(undefined)).toBe(0)
    expect(round(null)).toBe(0)
    expect(
      round('123.1aa', 2, {
        error: () => 'error'
      })
    ).toBe('error')
    expect(round('非数字', 2, { repair: 1 })).toBe(1)
  })

  test('测试 roundDown  取整', () => {
    expect(roundDown(undefined, 6)).toBe(6)
    expect(roundDown('123.999')).toBe(123)
  })

  test('测试 round2D  四舍五入', () => {
    expect(round2D(undefined, 6)).toBe(6)
    expect(round2D(123.223)).toBe(123.22)
  })

  test('测试 roundDown2D  保留两位小数取整', () => {
    expect(roundDown2D(undefined, 6)).toBe(6)
    expect(roundDown2D(123.999)).toBe(123.99)
  })

  test('测试 round 函数柯里化 四舍五入', () => {
    const curryRound = curryRight(round, 3)
    const roundTow = curryRound({ repair: 6 })(2)
    expect(roundTow(undefined)).toBe(6)
    expect(roundTow(123.223)).toBe(123.22)
  })
})

describe('测试 fixed 相关函数', async () => {
  test('测试 fixed 数字各种情况 四舍五入', () => {
    expect(fixed(123)).toBe('123')
    expect(fixed(123.2332)).toBe('123')
    expect(fixed(123, 2)).toBe('123.00')
    expect(fixed(0, 2)).toBe('0.00')
    expect(fixed(123.156, 1)).toBe('123.2')
    expect(fixed(123.122, 2)).toBe('123.12')
  })

  test('测试 fixed 字符串各种情况 四舍五入', () => {
    expect(fixed('123')).toBe('123')
    expect(fixed('123.2332')).toBe('123')
    expect(fixed('123.156', 1)).toBe('123.2')
    expect(fixed('123.122', 2)).toBe('123.12')
    expect(fixed('0', 2)).toBe('0.00')
  })

  test('测试 fixed 非数字各种情况 四舍五入', () => {
    expect(fixed(undefined)).toBe('')
    expect(fixed(null)).toBe('')
    expect(
      fixed('123.1aa', 2, {
        error: () => 'error'
      })
    ).toBe('error')
    expect(fixed('非数字', 2, { repair: '-' })).toBe('-')
  })

  test('测试 fixed2D 字符串各种情况 四舍五入', () => {
    expect(fixed2D('123')).toBe('123.00')
    expect(fixed2D('123.1599')).toBe('123.16')
    expect(fixed2D('0')).toBe('0.00')
    expect(fixed2D(undefined, '0')).toBe('0')
  })

  test('测试 fixedDown 字符串各种情况 四舍五入', () => {
    expect(fixedDown('123.99')).toBe('123')
    expect(fixedDown(undefined, '0')).toBe('0')
  })

  test('测试 fixedDown2D 字符串各种情况 四舍五入', () => {
    expect(fixedDown2D('123.999')).toBe('123.99')
    expect(fixedDown2D(undefined, '0')).toBe('0')
  })
})

describe('测试 thousands 相关函数', async () => {
  test('测试 thousands 四舍五入 千分位', () => {
    expect(thousands(123456, 2)).toBe('123,456.00')
    expect(thousands2D(123456)).toBe('123,456.00')
    expect(thousandsRound2D('123456.20')).toBe('123,456.2')
  })
})

describe('测试 computational 加减乘除 相关函数', async () => {
  test('测试 computational 加减乘除', () => {
    expect(computational([1, 2, '3', false], 'plus')).toBe(6)
    expect(
      computational([1, 2, 3, undefined], 'plus', {
        error: () => 'error'
      })
    ).toBe('error')
  })
  expect(plus([1, 2, '3', undefined])).toBe(6)
  expect(minus(['10', '2', '3', undefined])).toBe(5)
  expect(times(['2', '2', '2', undefined])).toBe(8)
  expect(div(['36', '2', '3', undefined])).toBe(6)
})
