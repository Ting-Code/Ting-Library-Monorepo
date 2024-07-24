// @ts-ignore
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    {
      input: './src/api/',
      outDir: './dist/api'
    }
  ],
  clean: true,
  outDir: 'dist',
  declaration: true
})
