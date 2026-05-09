import { defineConfig } from 'vite'

import glsl from 'vite-plugin-glsl'

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/micro/modeling/' : '/modeling/',
    server: {
      host: true,
      port: 8683,
      strictPort: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    plugins: [glsl()]
  }
})
