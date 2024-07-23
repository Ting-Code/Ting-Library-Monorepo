// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import ViteCode from 'vite-plugin-code'
// @ts-ignore
import Markdown from 'vite-plugin-md'
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      ViteCode(),
      Markdown()
    ]
  }
})
