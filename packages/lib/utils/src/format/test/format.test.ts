import { expect, test, describe } from 'vitest'
import { stringSplitArray, arrayJoinString, stringSplitNumberArray } from '../index'

describe('测试format对应函数', async () => {
  test('测试stringToArray函数', () => {
    expect((stringSplitArray('1,2,3') as Array<string>).join(',')).toBe('1,2,3')
    expect(stringSplitArray(undefined)).toBe(undefined)
    expect(stringSplitArray(123, { repair: '' })).toBe('')
  })

  test('测试stringSplitNumberArray函数', () => {
    expect((stringSplitNumberArray('1,2,3') as Array<string>)[0]).toBe(1)
    expect(stringSplitNumberArray(undefined)).toBe(undefined)
    expect(stringSplitNumberArray(123, { repair: '' })).toBe('')
  })

  test('测试arrayToString函数', () => {
    expect(arrayJoinString([1, 2, 3])).toBe('1,2,3')
    expect(arrayJoinString(undefined)).toBe(undefined)
    expect(arrayJoinString([], { repair: '' })).toBe('')
  })
})
