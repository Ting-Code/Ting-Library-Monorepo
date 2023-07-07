// @ts-ignore
import { defineConfig } from 'vite'
// @ts-ignore
import vue from '@vitejs/plugin-vue'
import VitePluginMdPage from '../dist/index.mjs'
import Markdown from 'vite-plugin-md'
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), VitePluginMdPage(), Markdown()]
  }
})
