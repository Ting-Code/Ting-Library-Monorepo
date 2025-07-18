import { defineConfig } from 'vite'

import glsl from 'vite-plugin-glsl'

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/micro/modeling/' : '/modeling/',
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    plugins: [glsl()]
  }
})
