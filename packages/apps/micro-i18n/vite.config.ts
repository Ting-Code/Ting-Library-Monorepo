import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const elementPlusResolver = ElementPlusResolver({ importStyle: 'sass' })

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/micro/i18n/' : '/i18n/',
  plugins: [
    vue(),
    viteCompression(),
    AutoImport({
      resolvers: [elementPlusResolver],
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [elementPlusResolver],
      dts: 'src/components.d.ts'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        silenceDeprecations: ['legacy-js-api'],
        api: 'modern-compiler',
        additionalData: `
          @use "@/styles/global.scss" as *;
        `
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: pathResolve('src') + '/' },
      { find: '@s', replacement: pathResolve('src/styles') + '/' }
    ]
  },
  build: {
    outDir: pathResolve('dist'),
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    host: true,
    port: 8685,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}))
