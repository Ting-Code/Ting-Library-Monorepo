import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'micro-nexus',
  description: 'Minimal Next.js app in the Ting Library monorepo.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
