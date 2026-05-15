import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/micro/nexus/' : '/nexus/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,
    port: 8686,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  preview: {
    host: true,
    port: 8686,
    strictPort: true
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
}))
