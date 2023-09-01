import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// 按需引入 element-plus vue自动导入
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// svg 加载
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export default defineConfig({
  build: {
    //打包文件目录
    outDir: 'es',
    //压缩
    // minify: false,
    //css分离
    //cssCodeSplit: true,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      input: ['src/index.ts'],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: 'dist'
        }
        // {
        //   //打包格式
        //   format: 'cjs',
        //   //打包后文件名
        //   entryFileNames: '[name].js',
        //   //让打包目录和我们目录对应
        //   preserveModules: true,
        //   exports: 'named',
        //   //配置打包根目录
        //   dir: './easyest/lib'
        // }
      ]
    },
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs']
    }
  },
  plugins: [
    vue(),
    dts({
      entryRoot: './src',
      outDir: ['dist'],
      tsconfigPath: './tsconfig.json'
    }),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      imports: ['vue'] // 自动导入vue相关函数
      // dts: 'types/auto-import.d.ts' // 默认生成 `auto-import.d.ts` 全局声明
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
})
