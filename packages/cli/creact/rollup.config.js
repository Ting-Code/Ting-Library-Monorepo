const json = require('@rollup/plugin-json')
const typescript = require('rollup-plugin-typescript2')
const { cleandir } = require('rollup-plugin-cleandir')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

const extensions = ['.js', '.ts']

module.exports = {
  input: ['index.ts'],
  output: {
    dir: './lib',
    format: 'cjs'
  },
  plugins: [
    cleandir('./lib'),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext'
        }
      }
    }),
    nodeResolve({
      extensions,
      modulesOnly: true,
      preferredBuiltins: false
    }),
    json()
  ]
}
