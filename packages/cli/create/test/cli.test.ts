import { expect, test } from 'vitest'
import { execa } from 'execa'

const bin = () => {
  return (...args: any) => execa('esno ./src/cli.ts', args)
}

test('vitest test', () => {
  expect(() => {
    throw new Error('vitest test')
  }).toThrow('vitest test')
})

test('run error command', async () => {
  const { stderr } = await bin()('iii')
  expect(stderr).toContain('未知的命令：iii')
})
