// vite.config.ts
import {
  defineConfig,
  loadEnv
} from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/vite@4.3.9_@types+node@20.3.3_sass@1.58.3/node_modules/vite/dist/node/index.js'
import vue from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/@vitejs+plugin-vue@4.2.3_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.1_vite@4.3.9_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import { resolve } from 'path'
import eslintPlugin from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.44.0_vite@4.3.9/node_modules/vite-plugin-eslint/dist/index.mjs'
import AutoImport from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/unplugin-auto-import@0.15.3_@vueuse+core@9.13.0_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js'
import Components from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs'
import { ElementPlusResolver } from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@2.79.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs'
import { viteMockServe } from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@4.3.9/node_modules/vite-plugin-mock/dist/index.js'
import viteCompression from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.3.9/node_modules/vite-plugin-compression/dist/index.mjs'
import { createSvgIconsPlugin } from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.3.9/node_modules/vite-plugin-svg-icons/dist/index.mjs'
import ViteImages from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/vite-plugin-vue-images@0.6.1/node_modules/vite-plugin-vue-images/dist/index.cjs'
import Markdown from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/node_modules/.pnpm/registry.npmjs.org+vite-plugin-md@0.21.5_@vitejs+plugin-vue@4.2.3_sass@1.58.3_vite@4.3.9/node_modules/vite-plugin-md/dist/index.js'
import ViteCode from 'file:///D:/GZWJ/project/Ting-Library-Monorepo/packages/plugin/vite/vite-plugin-code/dist/index.mjs'
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env, command)
  return {
    base: './src',
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
      ViteCode(),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHWldKXFxcXHByb2plY3RcXFxcVGluZy1MaWJyYXJ5LU1vbm9yZXBvXFxcXHBhY2thZ2VzXFxcXGFwcHNcXFxcZWxlbWVudC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR1pXSlxcXFxwcm9qZWN0XFxcXFRpbmctTGlicmFyeS1Nb25vcmVwb1xcXFxwYWNrYWdlc1xcXFxhcHBzXFxcXGVsZW1lbnQtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0daV0ovcHJvamVjdC9UaW5nLUxpYnJhcnktTW9ub3JlcG8vcGFja2FnZXMvYXBwcy9lbGVtZW50LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbi8vIFx1ODFFQVx1NTJBOEVTTGludFx1NjhDMFx1NkQ0Qlx1NzBFRFx1NjZGNFx1NjVCMFxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG4vLyBcdTYzMDlcdTk3MDBcdTVGMTVcdTUxNjUgZWxlbWVudC1wbHVzIHZ1ZVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xuLy8gbW9ja2pzXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbi8vIGd6aXBcdTUzOEJcdTdGMjlcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXG4vLyBzdmcgXHU1MkEwXHU4RjdEXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcbi8vIFx1NUJGQ1x1NTE2NVx1NTZGRVx1NzI0N1x1OERFRlx1NUY4NFxuaW1wb3J0IFZpdGVJbWFnZXMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWltYWdlcydcbmltcG9ydCBNYXJrZG93biBmcm9tICd2aXRlLXBsdWdpbi1tZCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBWaXRlQ29kZSBmcm9tICd2aXRlLXBsdWdpbi1jb2RlJ1xuLy8gXHU5MTREXHU3RjZFXHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XG5mdW5jdGlvbiBwYXRoUmVzb2x2ZShkaXI6IHN0cmluZykge1xuICByZXR1cm4gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLicsIGRpcilcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgLy8gXHU4M0I3XHU1M0Q2LmVudlx1NjU4N1x1NEVGNlx1OTFDQ1x1NUI5QVx1NEU0OVx1NzY4NFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXG4gIGNvbnNvbGUubG9nKGVudiwgY29tbWFuZClcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiAnLi9zcmMnLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSh7XG4gICAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsIC8vIFx1NUYwMFx1NTQyRnJlZlx1OEY2Q1x1NjM2MlxuICAgICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10gLy8gbWFya2Rvd24gXHU1MTdDXHU1QkI5XG4gICAgICB9KSxcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgdml0ZUNvbXByZXNzaW9uKCksIC8vZ3ppcFx1NTM4Qlx1N0YyOVxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogJ3Nhc3MnIH0pXSxcbiAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NXZ1ZVx1NTQ4Q3Z1ZS1yb3V0ZXJcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcbiAgICAgICAgLy8gZHRzOiAndHlwZXMvYXV0by1pbXBvcnQuZC50cycgLy8gXHU3NTFGXHU2MjEwIGBhdXRvLWltcG9ydC5kLnRzYCBcdTUxNjhcdTVDNDBcdTU4RjBcdTY2MEVcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogJ3Nhc3MnIH0pXVxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9zdmcnKV0sXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXG4gICAgICB9KSxcbiAgICAgIFZpdGVJbWFnZXMoe1xuICAgICAgICBkaXJzOiBbJ3NyYy9hc3NldHMvaW1nJ10sIC8vIFx1NjMwN1x1NjYwRVx1NTZGRVx1NzI0N1x1NUI1OFx1NjUzRVx1NzZFRVx1NUY1NVx1RkYwOFx1OUVEOFx1OEJBNFx1OEJFNVx1OERFRlx1NUY4NFx1RkYwOVxuICAgICAgICBleHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywgJ3BuZycsICdzdmcnLCAnd2VicCddXG4gICAgICB9KSxcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICBtb2NrUGF0aDogJ21vY2snLFxuICAgICAgICBsb2NhbEVuYWJsZWQ6IGNvbW1hbmQgPT09ICdzZXJ2ZScsIC8vIFx1N0VCRlx1NEUwQlx1NzUyOG1vY2tcbiAgICAgICAgcHJvZEVuYWJsZWQ6IGNvbW1hbmQgIT09ICdzZXJ2ZScsIC8vIFx1N0VCRlx1NEUwQVx1NzNBRlx1NTg4M1x1NzUyOG1vY2tcbiAgICAgICAgaW5qZWN0Q29kZTogYFxuICAgICAgICAgIGltcG9ydCB7IHNldHVwUHJvZE1vY2tTZXJ2ZXIgfSBmcm9tICcuLi9tb2NrL2luZGV4LnRzJztcbiAgICAgICAgICBzZXR1cFByb2RNb2NrU2VydmVyKCk7XG4gICAgICAgIGBcbiAgICAgIH0pLFxuICAgICAgZXNsaW50UGx1Z2luKHtcbiAgICAgICAgaW5jbHVkZTogWydzcmMvKiovKi52dWUnLCAnc3JjLyoqLyouanMnLCAnc3JjLyoqLyoudHMnLCAnc3JjLyoqLyoudHN4J10gLy8gXHU2OEMwXHU2N0U1XHU3Njg0XHU2NTg3XHU0RUY2XG4gICAgICB9KSxcbiAgICAgIFZpdGVDb2RlKCksXG4gICAgICBNYXJrZG93bigpXG4gICAgXSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIGNoYXJzZXQ6IGZhbHNlLFxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgXG4gICAgICAgICAgICBAdXNlIFwiQC9zdHlsZXMvZ2xvYmFsLnNjc3NcIiBhcyAqO1xuICAgICAgICAgICAgQHVzZSBcImVsZW1lbnQtcGx1cy90aGVtZS1jaGFsay9zcmMvbWl4aW5zL21peGluc1wiIGFzICo7XG4gICAgICAgICAgICBAdXNlIFwiZWxlbWVudC1wbHVzL3RoZW1lLWNoYWxrL3NyYy9taXhpbnMvZnVuY3Rpb25cIiBhcyAqO1xuICAgICAgICAgICAgYFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAvLyBcdTkxNERcdTdGNkVcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAvXFwvI1xcLy8sXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKCd0eXBlcycpICsgJy90eXBlcy8nXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGhSZXNvbHZlKCdzcmMnKSArICcvJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogJ0BzJyxcbiAgICAgICAgICByZXBsYWNlbWVudDogcGF0aFJlc29sdmUoJ3NyYycpICsgJy9zdHlsZXMvJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgLy8gbWluaWZ5OiAndGVyc2VyJywgLy8gXHU4OTgxXHU5MTREXHU3RjZFdGVyc2VyXHU1MzhCXHU3RjI5XHU2MjREXHU2NzA5XHU4RkQ5XHU0RTJBXHU1MjlGXHU4MEZEIFx1OUVEOFx1OEJBNGVzIGJ1aWxkbGRcbiAgICAgIC8vIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIC8vICAgY29tcHJlc3M6IHtcbiAgICAgIC8vICAgICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTc5RkJcdTk2NjRjb25zb2xlLmxvZ1xuICAgICAgLy8gICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgIC8vICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTkzOVx1RkYwOFx1OUVEOFx1OEJBNGRpc3RcdUZGMDkgZW52LlZJVEVfQlVJTERfUEFUSFxuICAgICAgb3V0RGlyOiBwYXRoUmVzb2x2ZSgnZGlzdCcpLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyAvLyBcdTUxNzZcdTRFRDZcdTY1ODdcdTRFRjZcdThGREJcdTUxNjVcdTU0MEVcdTdGMDBcdTRFM0FcdTc2RUVcdTVGNTVcdTU0MERcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVksU0FBUyxjQUFjLGVBQWU7QUFDemEsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGVBQWU7QUFHeEIsT0FBTyxrQkFBa0I7QUFFekIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFFcEMsU0FBUyxxQkFBcUI7QUFFOUIsT0FBTyxxQkFBcUI7QUFFNUIsU0FBUyw0QkFBNEI7QUFFckMsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxjQUFjO0FBRXJCLE9BQU8sY0FBYztBQUVyQixTQUFTLFlBQVksS0FBYTtBQUNoQyxTQUFPLFFBQVEsUUFBUSxJQUFJLEdBQUcsS0FBSyxHQUFHO0FBQ3hDO0FBQ0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFVBQVEsSUFBSSxLQUFLLE9BQU87QUFDeEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLFFBQ0YscUJBQXFCO0FBQUE7QUFBQSxRQUNyQixTQUFTLENBQUMsVUFBVSxPQUFPO0FBQUE7QUFBQSxNQUM3QixDQUFDO0FBQUEsTUFDRCxPQUFPO0FBQUEsTUFDUCxnQkFBZ0I7QUFBQTtBQUFBLE1BQ2hCLFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLE9BQU8sQ0FBQyxDQUFDO0FBQUEsUUFDeEQsU0FBUyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUE7QUFBQTtBQUFBLE1BRXhDLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxhQUFhLE9BQU8sQ0FBQyxDQUFDO0FBQUEsTUFDMUQsQ0FBQztBQUFBLE1BQ0QscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLFFBQVEsUUFBUSxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7QUFBQSxRQUNuRCxVQUFVO0FBQUEsTUFDWixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxNQUFNLENBQUMsZ0JBQWdCO0FBQUE7QUFBQSxRQUN2QixZQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sT0FBTyxNQUFNO0FBQUEsTUFDbEQsQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsY0FBYyxZQUFZO0FBQUE7QUFBQSxRQUMxQixhQUFhLFlBQVk7QUFBQTtBQUFBLFFBQ3pCLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlkLENBQUM7QUFBQSxNQUNELGFBQWE7QUFBQSxRQUNYLFNBQVMsQ0FBQyxnQkFBZ0IsZUFBZSxlQUFlLGNBQWM7QUFBQTtBQUFBLE1BQ3hFLENBQUM7QUFBQSxNQUNELFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixTQUFTO0FBQUEsVUFDVCxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQTtBQUFBLE1BRVAsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsWUFBWSxPQUFPLElBQUk7QUFBQSxRQUN0QztBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsWUFBWSxLQUFLLElBQUk7QUFBQSxRQUNwQztBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWEsWUFBWSxLQUFLLElBQUk7QUFBQSxRQUNwQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFVTCxRQUFRLFlBQVksTUFBTTtBQUFBLE1BQzFCLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
