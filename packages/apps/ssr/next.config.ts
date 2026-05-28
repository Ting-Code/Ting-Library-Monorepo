import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../..'),
  turbopack: {
    root: __dirname
  }
}

export default nextConfig
