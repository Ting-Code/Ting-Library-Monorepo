import { MobileShell } from '@/components/layout/MobileShell'

import { KlineApp } from '../_components/KlineApp'
import { isAshareCode } from '../lib/secid'

const CONTENT_HEIGHT = 'calc(100dvh - 3rem - env(safe-area-inset-top, 0px))'

type PageProps = {
  params: Promise<{ code: string }>
  searchParams: Promise<{ name?: string }>
}

export default async function KlinePage({ params, searchParams }: PageProps) {
  const { code } = await params
  const { name } = await searchParams
  const symbol = code.trim()
  const title = name?.trim() ? `${name.trim()} ${symbol}` : symbol

  if (!isAshareCode(symbol)) {
    return (
      <MobileShell
        title="K 线"
        hideTabBar
        showBack
        backMode="history"
        className="h-dvh overflow-hidden"
      >
        <p className="p-4 text-sm text-warning">无效股票代码</p>
      </MobileShell>
    )
  }

  return (
    <MobileShell
      title={title}
      hideTabBar
      showBack
      backMode="history"
      className="h-dvh overflow-hidden"
      mainClassName="min-h-0 flex-1 overflow-hidden"
    >
      <div
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
        style={{ height: CONTENT_HEIGHT, maxHeight: CONTENT_HEIGHT }}
      >
        <KlineApp code={symbol} name={name} />
      </div>
    </MobileShell>
  )
}
