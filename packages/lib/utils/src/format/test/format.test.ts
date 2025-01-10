import { expect, test, describe } from 'vitest'
import { stringToArray } from '../index'

describe('测试 Def 相关函数', async () => {
  test('测试未定义的值', () => {
    expect((stringToArray('1,2,3') as Array<string>).join(',')).toBe('1,2,3')
  })
})
