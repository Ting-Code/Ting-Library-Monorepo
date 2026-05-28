import { MobileShell } from '@/components/layout/MobileShell'

import { DividendRankView } from './components/DividendRankView'
import dividendData from './data/dividend-2025.json'
import type { Dividend2025Data } from './lib/types'

const dividend = dividendData as Dividend2025Data

/** 与 heatmap 一致：壳层 h-dvh，内容区扣除顶栏与安全区 */
const CONTENT_HEIGHT = 'calc(100dvh - 3rem - env(safe-area-inset-top, 0px))'

export default function DividendRankPage() {
  return (
    <MobileShell
      title="股息率排行"
      hideTabBar
      showBack
      className="h-dvh overflow-hidden"
      mainClassName="min-h-0 flex-1 overflow-hidden"
    >
      <div className="flex min-h-0 flex-col overflow-hidden" style={{ height: CONTENT_HEIGHT }}>
        <DividendRankView dividend={dividend} />
      </div>
    </MobileShell>
  )
}
