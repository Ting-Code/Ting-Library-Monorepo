import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { withBasePath } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = {
  title: 'A 股市场热力图',
  description: '按行业与流通市值权重展示 A 股市场涨跌结构，支持缩放、拖拽、全屏与截图分享。',
  icons: {
    icon: withBasePath('/icon.svg'),
    shortcut: withBasePath('/icon.svg')
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="min-h-dvh antialiased dark">
      <body className="flex min-h-dvh flex-col">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
