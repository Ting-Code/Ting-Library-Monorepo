import path from 'node:path'
import type { NextConfig } from 'next'

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === 'production' ? '/micro/nexus' : '')

const nextConfig: NextConfig = {
  basePath,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../..'),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' http://localhost:8681 http://127.0.0.1:8681 http://159.75.104.173 http://159.75.104.173:8680"
          }
        ]
      }
    ]
  }
}

export default nextConfig
