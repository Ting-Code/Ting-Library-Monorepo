import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    {
      builder: 'rollup',
      input: './src/api/apiSystem',
      outDir: './dist'
    }
  ],
  clean: true,
  outDir: 'dist',
  declaration: true
})
