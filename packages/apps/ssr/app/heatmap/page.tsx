import { MobileShell } from '@/components/layout/MobileShell'

import { HeatmapApp } from './_components/HeatmapApp'

export default function HeatmapPage() {
  return (
    <MobileShell title="A 股市场热力图" hideTabBar showBack className="h-dvh overflow-hidden">
      <div
        className="flex min-h-0 flex-col overflow-hidden"
        style={{ height: 'calc(100dvh - 3rem - env(safe-area-inset-top, 0px))' }}
      >
        <HeatmapApp />
      </div>
    </MobileShell>
  )
}
