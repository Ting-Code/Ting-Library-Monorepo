// vite.config.ts
import {
  defineConfig,
  loadEnv
} from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite@4.1.4/node_modules/vite/dist/node/index.js'
import vue from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.0_vite@4.1.4+vue@3.2.47/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import eslintPlugin from 'file:///D:/GZWJ/project/ting-library-monorepo/node_modules/.pnpm/vite-plugin-eslint@1.8.1_vite@4.1.4/node_modules/vite-plugin-eslint/dist/index.mjs'
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env, command)
  return {
    base: './',
    plugins: [
      vue({
        reactivityTransform: true
        // 开启ref转换
      }),
      vueJsx(),
      eslintPlugin({
        include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts', 'src/**/*.tsx']
        // 检查的文件
      })
    ]
  }
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxHWldKXFxcXHByb2plY3RcXFxcdGluZy1saWJyYXJ5LW1vbm9yZXBvXFxcXHBhY2thZ2VzXFxcXGFwcHNcXFxcZWxlbWVudC1hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcR1pXSlxcXFxwcm9qZWN0XFxcXHRpbmctbGlicmFyeS1tb25vcmVwb1xcXFxwYWNrYWdlc1xcXFxhcHBzXFxcXGVsZW1lbnQtYWRtaW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0daV0ovcHJvamVjdC90aW5nLWxpYnJhcnktbW9ub3JlcG8vcGFja2FnZXMvYXBwcy9lbGVtZW50LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG5cbi8vIFx1ODFFQVx1NTJBOEVTTGludFx1NjhDMFx1NkQ0Qlx1NzBFRFx1NjZGNFx1NjVCMFxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5cbi8vIFx1OTE0RFx1N0Y2RVx1N0VERFx1NUJGOVx1OERFRlx1NUY4NFxuZnVuY3Rpb24gcGF0aFJlc29sdmUoZGlyOiBzdHJpbmcpIHtcbiAgcmV0dXJuIHJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJy4nLCBkaXIpXG59XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XG4gIC8vIFx1ODNCN1x1NTNENi5lbnZcdTY1ODdcdTRFRjZcdTkxQ0NcdTVCOUFcdTRFNDlcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxuICBjb25zb2xlLmxvZyhlbnYsIGNvbW1hbmQpXG4gIHJldHVybiB7XG4gICAgYmFzZTogJy4vJyxcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoe1xuICAgICAgICByZWFjdGl2aXR5VHJhbnNmb3JtOiB0cnVlIC8vIFx1NUYwMFx1NTQyRnJlZlx1OEY2Q1x1NjM2MlxuICAgICAgfSksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIGVzbGludFBsdWdpbih7XG4gICAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudnVlJywgJ3NyYy8qKi8qLmpzJywgJ3NyYy8qKi8qLnRzJywgJ3NyYy8qKi8qLnRzeCddIC8vIFx1NjhDMFx1NjdFNVx1NzY4NFx1NjU4N1x1NEVGNlxuICAgICAgfSlcbiAgICBdXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1ZLFNBQVMsY0FBYyxlQUFlO0FBQ3phLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFJbkIsT0FBTyxrQkFBa0I7QUFNekIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFVBQVEsSUFBSSxLQUFLLE9BQU87QUFDeEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLFFBQ0YscUJBQXFCO0FBQUE7QUFBQSxNQUN2QixDQUFDO0FBQUEsTUFDRCxPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsUUFDWCxTQUFTLENBQUMsZ0JBQWdCLGVBQWUsZUFBZSxjQUFjO0FBQUE7QUFBQSxNQUN4RSxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
