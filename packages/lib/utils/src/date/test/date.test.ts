import { expect, test, describe } from 'vitest'
import { formatDate } from '../index'

describe('测试 formatDate 相关函数', async () => {
  test('测试formatDate 非时间情况', () => {
    expect(formatDate(undefined)).toBe('')
    expect(formatDate('abc')).toBe('')
    expect(formatDate(null)).toBe('')
    expect(formatDate('2023')).toBe('2023-01-01 00:00:00')
  })
})
