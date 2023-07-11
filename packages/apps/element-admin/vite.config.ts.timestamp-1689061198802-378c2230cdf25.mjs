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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHWldKXFxcXHByb2plY3RcXFxcdGluZy1saWJyYXJ5LW1vbm9yZXBvXFxcXHBhY2thZ2VzXFxcXGFwcHNcXFxcZWxlbWVudC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR1pXSlxcXFxwcm9qZWN0XFxcXHRpbmctbGlicmFyeS1tb25vcmVwb1xcXFxwYWNrYWdlc1xcXFxhcHBzXFxcXGVsZW1lbnQtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0daV0ovcHJvamVjdC90aW5nLWxpYnJhcnktbW9ub3JlcG8vcGFja2FnZXMvYXBwcy9lbGVtZW50LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbi8vIFx1ODFFQVx1NTJBOEVTTGludFx1NjhDMFx1NkQ0Qlx1NzBFRFx1NjZGNFx1NjVCMFxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG4vLyBcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjUgZWxlbWVudC1wbHVzIHZ1ZVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuLy8gbW9ja2pzXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbi8vIGd6aXBcdTUzOEJcdTdGMjlcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXG4vLyBzdmcgXHU1MkEwXHU4RjdEXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbi8vIFx1NUJGQ1x1NTE2NVx1NTZGRVx1NzI0N1x1OERFRlx1NUY4NFxuaW1wb3J0IFZpdGVJbWFnZXMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWltYWdlcydcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi1tZCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBWdWVDb2RlIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1jb2RlJ1xuLy8gXHU5MTREXHU3RjZFXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XG5mdW5jdGlvbiBwYXRoUmVzb2x2ZShkaXI6IHN0cmluZykge1xuICByZXR1cm4gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLicsIGRpcilcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgLy8gXHU4M0I3XHU1M0Q2LmVudlx1NjU4N1x1NEVGNlx1OTFDQ1x1NUI5QVx1NEU0OVx1NzY4NFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXG4gIGNvbnNvbGUubG9nKGVudiwgY29tbWFuZClcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiAnLi8nLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSh7XG4gICAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsIC8vIFx1NUYwMFx1NTQyRnJlZlx1OEY2Q1x1NjM2MlxuICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10gLy8gbWFya2Rvd24gXHU1MTdDXHU1QkI5XG4gICAgICB9KSxcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgdml0ZUNvbXByZXNzaW9uKCksIC8vZ3ppcFx1NTM4Qlx1N0YyOVxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogJ3Nhc3MnIH0pXSxcbiAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXZ1ZVx1NTQ4Q3Z1ZS1yb3V0ZXJcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcbiAgICAgICAgLy8gZHRzOiAndHlwZXMvYXV0by1pbXBvcnQuZC50cycgLy8gXHU3NTFGXHU2MjEwIGBhdXRvLWltcG9ydC5kLnRzYCBcdTUxNjhcdTVDNDBcdTU4RjBcdTY2MEVcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogJ3Nhc3MnIH0pXVxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmcnKV0sXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXG4gICAgICB9KSxcbiAgICAgIFZpdGVJbWFnZXMoe1xuICAgICAgICBkaXJzOiBbJ3NyYy9hc3NldHMvaW1nJ10sIC8vIFx1NjMwN1x1NjYwRVx1NTZGRVx1NzI0N1x1NUI1OFx1NjUzRVx1NzZFRVx1NUY1NVx1RkYwOFx1OUVEOFx1OEJBNFx1OEJFNVx1OERFRlx1NUY4NFx1RkYwOVxuICAgICAgICBleHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywgJ3BuZycsICdzdmcnLCAnd2VicCddXG4gICAgICB9KSxcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICBtb2NrUGF0aDogJ21vY2snLFxuICAgICAgICBsb2NhbEVuYWJsZWQ6IGNvbW1hbmQgPT09ICdzZXJ2ZScsIC8vIFx1N0VCRlx1NEUwQlx1NzUyOG1vY2tcbiAgICAgICAgcHJvZEVuYWJsZWQ6IGNvbW1hbmQgIT09ICdzZXJ2ZScsIC8vIFx1N0VCRlx1NEUwQVx1NzNBRlx1NTg4M1x1NzUyOG1vY2tcbiAgICAgICAgaW5qZWN0Q29kZTogYFxuICAgICAgICAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuLi9tb2NrL2luZGV4LnRzJztcbiAgICAgICAgICBzZXR1cFByb2RNb2NrU2VydmVyKCk7XG4gICAgICAgIGBcbiAgICAgIH0pLFxuICAgICAgZXNsaW50UGx1Z2luKHtcbiAgICAgICAgaW5jbHVkZTogWydzcmMvKiovKi52dWUnLCAnc3JjLyoqLyouanMnLCAnc3JjLyoqLyoudHMnLCAnc3JjLyoqLyoudHN4J10gLy8gXHU2OEMwXHU2N0U1XHU3Njg0XHU2NTg3XHU0RUY2XG4gICAgICB9KSxcbiAgICAgIFZ1ZUNvZGUoKSxcbiAgICAgIE1hcmtkb3duKClcbiAgICBdLFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgY2hhcnNldDogZmFsc2UsXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBcbiAgICAgICAgICAgIEB1c2UgXCJAL3N0eWxlcy9nbG9iYWwuc2Nzc1wiIGFzICo7XG4gICAgICAgICAgICBAdXNlIFwiZWxlbWVudC1wbHVzL3RoZW1lLWNoYWxrL3NyYy9taXhpbnMvbWl4aW5zXCIgYXMgKjtcbiAgICAgICAgICAgIEB1c2UgXCJlbGVtZW50LXBsdXMvdGhlbWUtY2hhbGsvc3JjL21peGlucy9mdW5jdGlvblwiIGFzICo7XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFxuICAgICAgYWxpYXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6IC9cXC8jXFwvLyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aFJlc29sdmUoJ3R5cGVzJykgKyAnL3R5cGVzLydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aFJlc29sdmUoJ3NyYycpICsgJy8nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQHMnLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgnc3JjJykgKyAnL3N0eWxlcy8nXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAvLyBtaW5pZnk6ICd0ZXJzZXInLCAvLyBcdTg5ODFcdTkxNERcdTdGNkV0ZXJzZXJcdTUzOEJcdTdGMjlcdTYyNERcdTY3MDlcdThGRDlcdTRFMkFcdTUyOUZcdTgwRkQgXHU5RUQ4XHU4QkE0ZXMgYnVpbGRsZFxuICAgICAgLy8gdGVyc2VyT3B0aW9uczoge1xuICAgICAgLy8gICBjb21wcmVzczoge1xuICAgICAgLy8gICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NzlGQlx1OTY2NGNvbnNvbGUubG9nXG4gICAgICAvLyAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgLy8gICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAvLyAgIH0sXG4gICAgICAvLyB9LFxuICAgICAgLy8gXHU5MTREXHU3RjZFXHU4RjkzXHU1MUZBXHU2NTg3XHU0RUY2XHU1OTM5XHVGRjA4XHU5RUQ4XHU4QkE0ZGlzdFx1RkYwOSBlbnYuVklURV9CVUlMRF9QQVRIXG4gICAgICBvdXREaXI6IHBhdGhSZXNvbHZlKCdkaXN0JyksXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogJ1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nIC8vIFx1NTE3Nlx1NEVENlx1NjU4N1x1NEVGNlx1OEZEQlx1NTE2NVx1NTQwRVx1N0YwMFx1NEUzQVx1NzZFRVx1NUY1NVx1NTQwRFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtWSxTQUFTLGNBQWMsZUFBZTtBQUN6YSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZTtBQUd4QixPQUFPLGtCQUFrQjtBQUV6QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUVwQyxTQUFTLHFCQUFxQjtBQUU5QixPQUFPLHFCQUFxQjtBQUU1QixTQUFTLDRCQUE0QjtBQUVyQyxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGNBQWM7QUFFckIsT0FBTyxhQUFhO0FBRXBCLFNBQVMsWUFBWSxLQUFhO0FBQ2hDLFNBQU8sUUFBUSxRQUFRLElBQUksR0FBRyxLQUFLLEdBQUc7QUFDeEM7QUFDQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBRWpELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsVUFBUSxJQUFJLEtBQUssT0FBTztBQUN4QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsUUFDRixxQkFBcUI7QUFBQTtBQUFBLFFBQ3JCLFNBQVMsQ0FBQyxVQUFVLE9BQU87QUFBQTtBQUFBLE1BQzdCLENBQUM7QUFBQSxNQUNELE9BQU87QUFBQSxNQUNQLGdCQUFnQjtBQUFBO0FBQUEsTUFDaEIsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixFQUFFLGFBQWEsT0FBTyxDQUFDLENBQUM7QUFBQSxRQUN4RCxTQUFTLENBQUMsT0FBTyxjQUFjLE9BQU87QUFBQTtBQUFBO0FBQUEsTUFFeEMsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixFQUFFLGFBQWEsT0FBTyxDQUFDLENBQUM7QUFBQSxNQUMxRCxDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsUUFBUSxRQUFRLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztBQUFBLFFBQ25ELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULE1BQU0sQ0FBQyxnQkFBZ0I7QUFBQTtBQUFBLFFBQ3ZCLFlBQVksQ0FBQyxPQUFPLFFBQVEsT0FBTyxPQUFPLE1BQU07QUFBQSxNQUNsRCxDQUFDO0FBQUEsTUFDRCxjQUFjO0FBQUEsUUFDWixVQUFVO0FBQUEsUUFDVixjQUFjLFlBQVk7QUFBQTtBQUFBLFFBQzFCLGFBQWEsWUFBWTtBQUFBO0FBQUEsUUFDekIsWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSWQsQ0FBQztBQUFBLE1BQ0QsYUFBYTtBQUFBLFFBQ1gsU0FBUyxDQUFDLGdCQUFnQixlQUFlLGVBQWUsY0FBYztBQUFBO0FBQUEsTUFDeEUsQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLFNBQVM7QUFBQSxVQUNULGdCQUFnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBO0FBQUEsTUFFUCxPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLE9BQU8sSUFBSTtBQUFBLFFBQ3RDO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLEtBQUssSUFBSTtBQUFBLFFBQ3BDO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLEtBQUssSUFBSTtBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVVMLFFBQVEsWUFBWSxNQUFNO0FBQUEsTUFDMUIsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUE7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
