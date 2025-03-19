import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// 自动ESLint检测热更新
import eslintPlugin from 'vite-plugin-eslint'
// 按需引入 element-plus vue自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
// gzip压缩
import viteCompression from 'vite-plugin-compression'
// svg 加载
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Markdown from 'vite-plugin-md'
import ViteCode from 'vite-plugin-code'
// 配置绝对路径
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
export default defineConfig(({ command, mode }) => {
  // 获取.env文件里定义的环境变量
  const env = loadEnv(mode, process.cwd())
  console.log(env, command)
  return {
    base: command === 'build' ? '/micro/docs/' : '/docs/',
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/] // markdown 兼容
      }),
      vueJsx(),
      viteCompression(), //gzip压缩
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        imports: ['vue', 'vue-router', 'pinia'], // 自动导入vue和vue-router相关函数
        dts: 'src/auto-imports.d.ts' // 生成 `auto-imports.d.ts` 全局声明
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        // exclude: [/once\.vue$/, /once\.vue\?vue/],
        dts: 'src/components.d.ts'
      }),
      eslintPlugin({
        include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      ViteCode(),
      Markdown()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          silenceDeprecations: ['legacy-js-api'],
          api: 'modern-compiler', // 或 'modern'
          additionalData: `
            @use "@/styles/global.scss" as *;
            @use "element-plus/theme-chalk/src/mixins/mixins" as *;
            @use "element-plus/theme-chalk/src/mixins/function" as *;
            `
        }
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    resolve: {
      // 配置路径别名
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/types/'
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/'
        },
        {
          find: '@s',
          replacement: pathResolve('src') + '/styles/'
        }
      ]
    },
    build: {
      // minify: 'terser', // 要配置terser压缩才有这个功能 默认es buildld
      // terserOptions: {
      //   compress: {
      //     // 生产环境移除console.log
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // },
      // 配置输出文件夹（默认dist）
      outDir: pathResolve('dist'),
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]' // 其他文件进入后缀为目录名
        }
      }
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
})
