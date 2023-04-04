import { expect, test } from 'vitest'

test('wrong agent', () => {
  expect(() => {
    throw new Error('vitest test')
  }).toThrow('vitest test')
})
