// vite.config.ts
import {
  defineConfig,
  loadEnv
} from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite@4.3.9_@types+node@20.3.3_sass@1.58.3/node_modules/vite/dist/node/index.js'
import vue from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import { resolve } from 'path'
import eslintPlugin from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.44.0_vite@4.3.9/node_modules/vite-plugin-eslint/dist/index.mjs'
import AutoImport from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/unplugin-auto-import@0.15.3_@vueuse+core@9.13.0_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js'
import Components from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs'
import { ElementPlusResolver } from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs'
import { viteMockServe } from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@4.3.9/node_modules/vite-plugin-mock/dist/index.js'
import viteCompression from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.3.9/node_modules/vite-plugin-compression/dist/index.mjs'
import { createSvgIconsPlugin } from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.3.9/node_modules/vite-plugin-svg-icons/dist/index.mjs'
import ViteImages from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite-plugin-vue-images@0.6.1/node_modules/vite-plugin-vue-images/dist/index.cjs'
import Markdown from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/registry.npmjs.org+vite-plugin-md@0.21.5_@vitejs+plugin-vue@4.2.3_sass@1.58.3_vite@4.3.9/node_modules/vite-plugin-md/dist/index.js'
import VueCode from 'file:///D:/GZWJ/project/ting-library-monorepo/packages/plugin/vite/vite-plugin-vue-code/dist/index.mjs'
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env, command)
  return {
    base: './',
    plugins: [
      vue({
        reactivityTransform: true,
        // 开启ref转换
        include: [/\.vue$/, /\.md$/]
        // markdown 兼容
      }),
      vueJsx(),
      viteCompression(),
      //gzip压缩
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
        imports: ['vue', 'vue-router', 'pinia']
        // 自动导入vue和vue-router相关函数
        // dts: 'types/auto-import.d.ts' // 生成 `auto-import.d.ts` 全局声明
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'sass' })]
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      ViteImages({
        dirs: ['src/assets/img'],
        // 指明图片存放目录（默认该路径）
        extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp']
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        // 线下用mock
        prodEnabled: command !== 'serve',
        // 线上环境用mock
        injectCode: `
          import { setupProdMockServer } from '../mock/index.ts';
          setupProdMockServer();
        `
      }),
      eslintPlugin({
        include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx']
        // 检查的文件
      }),
      VueCode(),
      Markdown()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: `
            @use "@/styles/global.scss" as *;
            @use "element-plus/theme-chalk/src/mixins/mixins" as *;
            @use "element-plus/theme-chalk/src/mixins/function" as *;
            `
        }
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
      // 配置输出文件夹（默认dist） env.VITE_BUILD_PATH
      outDir: pathResolve('dist'),
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
          // 其他文件进入后缀为目录名
        }
      }
    }
  }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHWldKXFxcXHByb2plY3RcXFxcdGluZy1saWJyYXJ5LW1vbm9yZXBvXFxcXHBhY2thZ2VzXFxcXGFwcHNcXFxcZWxlbWVudC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR1pXSlxcXFxwcm9qZWN0XFxcXHRpbmctbGlicmFyeS1tb25vcmVwb1xcXFxwYWNrYWdlc1xcXFxhcHBzXFxcXGVsZW1lbnQtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0daV0ovcHJvamVjdC90aW5nLWxpYnJhcnktbW9ub3JlcG8vcGFja2FnZXMvYXBwcy9lbGVtZW50LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbi8vIFx1ODFFQVx1NTJBOEVTTGludFx1NjhDMFx1NkQ0Qlx1NzBFRFx1NjZGNFx1NjVCMFxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG4vLyBcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjUgZWxlbWVudC1wbHVzIHZ1ZVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuLy8gbW9ja2pzXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbi8vIGd6aXBcdTUzOEJcdTdGMjlcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXG4vLyBzdmcgXHU1MkEwXHU4RjdEXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbi8vIFx1NUJGQ1x1NTE2NVx1NTZGRVx1NzI0N1x1OERFRlx1NUY4NFxuaW1wb3J0IFZpdGVJbWFnZXMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWltYWdlcydcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi1tZCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBWdWVDb2RlIGZyb20gJ3ZpdGUtcGx1Z2luLWNvZGUnXG4vLyBcdTkxNERcdTdGNkVcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbmZ1bmN0aW9uIHBhdGhSZXNvbHZlKGRpcjogc3RyaW5nKSB7XG4gIHJldHVybiByZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuJywgZGlyKVxufVxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xuICAvLyBcdTgzQjdcdTUzRDYuZW52XHU2NTg3XHU0RUY2XHU5MUNDXHU1QjlBXHU0RTQ5XHU3Njg0XHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcbiAgY29uc29sZS5sb2coZW52LCBjb21tYW5kKVxuICByZXR1cm4ge1xuICAgIGJhc2U6ICcuLycsXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKHtcbiAgICAgICAgcmVhY3Rpdml0eVRyYW5zZm9ybTogdHJ1ZSwgLy8gXHU1RjAwXHU1NDJGcmVmXHU4RjZDXHU2MzYyXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC5tZCQvXSAvLyBtYXJrZG93biBcdTUxN0NcdTVCQjlcbiAgICAgIH0pLFxuICAgICAgdnVlSnN4KCksXG4gICAgICB2aXRlQ29tcHJlc3Npb24oKSwgLy9nemlwXHU1MzhCXHU3RjI5XG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnc2FzcycgfSldLFxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJ10gLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1dnVlXHU1NDhDdnVlLXJvdXRlclx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFxuICAgICAgICAvLyBkdHM6ICd0eXBlcy9hdXRvLWltcG9ydC5kLnRzJyAvLyBcdTc1MUZcdTYyMTAgYGF1dG8taW1wb3J0LmQudHNgIFx1NTE2OFx1NUM0MFx1NThGMFx1NjYwRVxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnc2FzcycgfSldXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgaWNvbkRpcnM6IFtyZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2ZycpXSxcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXSdcbiAgICAgIH0pLFxuICAgICAgVml0ZUltYWdlcyh7XG4gICAgICAgIGRpcnM6IFsnc3JjL2Fzc2V0cy9pbWcnXSwgLy8gXHU2MzA3XHU2NjBFXHU1NkZFXHU3MjQ3XHU1QjU4XHU2NTNFXHU3NkVFXHU1RjU1XHVGRjA4XHU5RUQ4XHU4QkE0XHU4QkU1XHU4REVGXHU1Rjg0XHVGRjA5XG4gICAgICAgIGV4dGVuc2lvbnM6IFsnanBnJywgJ2pwZWcnLCAncG5nJywgJ3N2ZycsICd3ZWJwJ11cbiAgICAgIH0pLFxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXG4gICAgICAgIGxvY2FsRW5hYmxlZDogY29tbWFuZCA9PT0gJ3NlcnZlJywgLy8gXHU3RUJGXHU0RTBCXHU3NTI4bW9ja1xuICAgICAgICBwcm9kRW5hYmxlZDogY29tbWFuZCAhPT0gJ3NlcnZlJywgLy8gXHU3RUJGXHU0RTBBXHU3M0FGXHU1ODgzXHU3NTI4bW9ja1xuICAgICAgICBpbmplY3RDb2RlOiBgXG4gICAgICAgICAgaW1wb3J0IHsgc2V0dXBQcm9kTW9ja1NlcnZlciB9IGZyb20gJy4uL21vY2svaW5kZXgudHMnO1xuICAgICAgICAgIHNldHVwUHJvZE1vY2tTZXJ2ZXIoKTtcbiAgICAgICAgYFxuICAgICAgfSksXG4gICAgICBlc2xpbnRQbHVnaW4oe1xuICAgICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLnZ1ZScsICdzcmMvKiovKi5qcycsICdzcmMvKiovKi50cycsICdzcmMvKiovKi50c3gnXSAvLyBcdTY4QzBcdTY3RTVcdTc2ODRcdTY1ODdcdTRFRjZcbiAgICAgIH0pLFxuICAgICAgVnVlQ29kZSgpLFxuICAgICAgTWFya2Rvd24oKVxuICAgIF0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBjaGFyc2V0OiBmYWxzZSxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxuICAgICAgICAgICAgQHVzZSBcIkAvc3R5bGVzL2dsb2JhbC5zY3NzXCIgYXMgKjtcbiAgICAgICAgICAgIEB1c2UgXCJlbGVtZW50LXBsdXMvdGhlbWUtY2hhbGsvc3JjL21peGlucy9taXhpbnNcIiBhcyAqO1xuICAgICAgICAgICAgQHVzZSBcImVsZW1lbnQtcGx1cy90aGVtZS1jaGFsay9zcmMvbWl4aW5zL2Z1bmN0aW9uXCIgYXMgKjtcbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgLy8gXHU5MTREXHU3RjZFXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXG4gICAgICBhbGlhczogW1xuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL1xcLyNcXC8vLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgndHlwZXMnKSArICcvdHlwZXMvJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0AnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgnc3JjJykgKyAnLydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAcycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKCdzcmMnKSArICcvc3R5bGVzLydcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIC8vIG1pbmlmeTogJ3RlcnNlcicsIC8vIFx1ODk4MVx1OTE0RFx1N0Y2RXRlcnNlclx1NTM4Qlx1N0YyOVx1NjI0RFx1NjcwOVx1OEZEOVx1NEUyQVx1NTI5Rlx1ODBGRCBcdTlFRDhcdThCQTRlcyBidWlsZGxkXG4gICAgICAvLyB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAvLyAgIGNvbXByZXNzOiB7XG4gICAgICAvLyAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU3OUZCXHU5NjY0Y29uc29sZS5sb2dcbiAgICAgIC8vICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAvLyAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vIH0sXG4gICAgICAvLyBcdTkxNERcdTdGNkVcdThGOTNcdTUxRkFcdTY1ODdcdTRFRjZcdTU5MzlcdUZGMDhcdTlFRDhcdThCQTRkaXN0XHVGRjA5IGVudi5WSVRFX0JVSUxEX1BBVEhcbiAgICAgIG91dERpcjogcGF0aFJlc29sdmUoJ2Rpc3QnKSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScgLy8gXHU1MTc2XHU0RUQ2XHU2NTg3XHU0RUY2XHU4RkRCXHU1MTY1XHU1NDBFXHU3RjAwXHU0RTNBXHU3NkVFXHU1RjU1XHU1NDBEXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ZLFNBQVMsY0FBYyxlQUFlO0FBQ3phLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsU0FBUyxlQUFlO0FBR3hCLE9BQU8sa0JBQWtCO0FBRXpCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBRXBDLFNBQVMscUJBQXFCO0FBRTlCLE9BQU8scUJBQXFCO0FBRTVCLFNBQVMsNEJBQTRCO0FBRXJDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sY0FBYztBQUVyQixPQUFPLGFBQWE7QUFFcEIsU0FBUyxZQUFZLEtBQWE7QUFDaEMsU0FBTyxRQUFRLFFBQVEsSUFBSSxHQUFHLEtBQUssR0FBRztBQUN4QztBQUNBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU07QUFFakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxVQUFRLElBQUksS0FBSyxPQUFPO0FBQ3hCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxRQUNGLHFCQUFxQjtBQUFBO0FBQUEsUUFDckIsU0FBUyxDQUFDLFVBQVUsT0FBTztBQUFBO0FBQUEsTUFDN0IsQ0FBQztBQUFBLE1BQ0QsT0FBTztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUE7QUFBQSxNQUNoQixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxPQUFPLENBQUMsQ0FBQztBQUFBLFFBQ3hELFNBQVMsQ0FBQyxPQUFPLGNBQWMsT0FBTztBQUFBO0FBQUE7QUFBQSxNQUV4QyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxPQUFPLENBQUMsQ0FBQztBQUFBLE1BQzFELENBQUM7QUFBQSxNQUNELHFCQUFxQjtBQUFBLFFBQ25CLFVBQVUsQ0FBQyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsUUFDbkQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsTUFBTSxDQUFDLGdCQUFnQjtBQUFBO0FBQUEsUUFDdkIsWUFBWSxDQUFDLE9BQU8sUUFBUSxPQUFPLE9BQU8sTUFBTTtBQUFBLE1BQ2xELENBQUM7QUFBQSxNQUNELGNBQWM7QUFBQSxRQUNaLFVBQVU7QUFBQSxRQUNWLGNBQWMsWUFBWTtBQUFBO0FBQUEsUUFDMUIsYUFBYSxZQUFZO0FBQUE7QUFBQSxRQUN6QixZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJZCxDQUFDO0FBQUEsTUFDRCxhQUFhO0FBQUEsUUFDWCxTQUFTLENBQUMsZ0JBQWdCLGVBQWUsZUFBZSxjQUFjO0FBQUE7QUFBQSxNQUN4RSxDQUFDO0FBQUEsTUFDRCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osU0FBUztBQUFBLFVBQ1QsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUE7QUFBQSxNQUVQLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLFlBQVksT0FBTyxJQUFJO0FBQUEsUUFDdEM7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLFlBQVksS0FBSyxJQUFJO0FBQUEsUUFDcEM7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixhQUFhLFlBQVksS0FBSyxJQUFJO0FBQUEsUUFDcEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BVUwsUUFBUSxZQUFZLE1BQU07QUFBQSxNQUMxQixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
