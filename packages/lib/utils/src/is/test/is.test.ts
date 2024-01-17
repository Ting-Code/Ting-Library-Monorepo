import { expect, test, describe } from 'vitest'
import { isDef, isPromise, isNumberString } from '../index'

describe('测试 Def 相关函数', async () => {
  test('测试未定义的值', () => {
    // 测试未定义的值
    let value
    expect(isDef(value)).toBe(false)
  })

  test('测试定义了的值', () => {
    const value = 'Hello, World!'
    expect(isDef(value)).toBe(true)
  })
})

describe('测试 isPromise 相关函数', async () => {
  test('测试非Promise值', () => {
    // 测试未定义的值
    const value = {}
    expect(isPromise(value)).toBe(false)
  })

  test('测试非Promise值', () => {
    const value = new Promise((resolve) => {
      resolve('test')
    })
    expect(isPromise(value)).toBe(true)
  })
})

describe('测试 isNumberString 相关函数', async () => {
  test('isNumberString 判断字符串数字', () => {
    // 测试未定义的值
    expect(isNumberString('666.222')).toBe(true)
    expect(isNumberString('0')).toBe(true)
    expect(isNumberString('666.')).toBe(true)
    expect(isNumberString('.222')).toBe(true)
    expect(isNumberString('')).toBe(false)
    expect(isNumberString('非数字字符串')).toBe(false)
    expect(isNumberString('23.000aaaa')).toBe(false)
  })

  test('测试值isConvertNumber 数字', () => {
    expect(isNumberString(0)).toBe(true)
    expect(isNumberString(66.22)).toBe(true)
    expect(isNumberString(-66.22)).toBe(true)
  })

  test('测试值isConvertNumber 特殊值', () => {
    expect(isNumberString(undefined)).toBe(false)
    expect(isNumberString(null)).toBe(false)
    expect(isNumberString(Symbol())).toBe(false)
  })
})
