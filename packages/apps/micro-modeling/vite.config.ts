import { defineConfig } from 'vite'

import glsl from 'vite-plugin-glsl'

export default defineConfig({
  base: '/micro/modeling/',
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [glsl()]
})
