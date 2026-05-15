import { MarketHeatmap } from '@/components/MarketHeatmap'

export function HeatmapPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <h1 className="sr-only">A 股市场热力图</h1>
      <p className="sr-only">
        A
        股热力图按行业与市值权重展示沪深两市个股，用颜色呈现涨跌幅，支持缩放、拖拽、全屏与截图分享。
      </p>
      <MarketHeatmap />
    </main>
  )
}
