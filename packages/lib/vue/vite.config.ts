import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  build: {
    sourcemap: true,
    //打包文件目录
    outDir: 'es',
    //压缩
    // minify: false,
    //css分离
    cssCodeSplit: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'element-plus', '@element-plus/icons-vue', 'dayjs'],
      input: ['src/index.ts'],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          chunkFileNames: '[name].js',
          entryFileNames: '[name].js',
          assetFileNames: '[ext]/[name].[ext]',
          //让打包目录和我们目录对应
          // preserveModules: true,
          // exports: 'named',
          //配置打包根目录
          dir: 'dist',
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
            dayjs: 'dayjs',
            'element-plus': 'ElementPlus'
          },
          manualChunks: (id) => {
            // if (id.includes('node_modules')) {
            //   return 'vendor'
            // }
            if (id.includes('src/components')) {
              return 'components/index'
            }
            if (id.includes('src/element-plus')) {
              return 'element-plus/index'
            }
            if (id.includes('src/hooks')) {
              return 'hooks/index'
            }
          }
        }
      ]
    },
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      formats: ['es', 'umd'],
      name: '@tingcode/lib-vue',
      fileName: (format) => `${format}.js`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/index.scss";`
      }
    }
  },
  resolve: {
    // 配置路径别名
    alias: [
      {
        find: '@',
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: './src',
      outDir: ['dist'],
      tsconfigPath: './tsconfig.json'
    })
  ]
})
