/** KLineChart 样式，读取 CSS 变量以适配深浅色 */
export function getKlineChartStyles() {
  if (typeof window === 'undefined') {
    return buildStyles('#e84855', '#2faf7a', '#94a3b8', '#e2e8f0', '#ffffff')
  }

  const root = getComputedStyle(document.documentElement)
  const up = root.getPropertyValue('--stock-up').trim() || '#e84855'
  const down = root.getPropertyValue('--stock-down').trim() || '#2faf7a'
  const muted = root.getPropertyValue('--muted-foreground').trim() || '#94a3b8'
  const border = root.getPropertyValue('--border').trim() || '#e2e8f0'
  const bg = root.getPropertyValue('--background').trim() || '#ffffff'

  return buildStyles(up, down, muted, border, bg)
}

/** 收紧左右留白，K 线区域尽量铺满 */
export function applyChartLayout(chart: {
  setOffsetRightDistance: (distance: number) => void
  setMaxOffsetRightDistance: (distance: number) => void
  resize: () => void
}) {
  chart.setOffsetRightDistance(2)
  chart.setMaxOffsetRightDistance(16)
  chart.resize()
}

function buildStyles(up: string, down: string, neutral: string, grid: string, background: string) {
  const gridColor = grid.includes('rgb') ? grid : hexToRgba(grid, 0.35)

  return {
    grid: {
      horizontal: { color: gridColor },
      vertical: { show: false }
    },
    candle: {
      bar: {
        upColor: up,
        downColor: down,
        noChangeColor: neutral,
        upBorderColor: up,
        downBorderColor: down,
        noChangeBorderColor: neutral,
        upWickColor: up,
        downWickColor: down,
        noChangeWickColor: neutral
      },
      priceMark: {
        show: true,
        high: { show: false },
        low: { show: false },
        last: {
          show: true,
          line: { show: true },
          text: { show: true }
        }
      },
      tooltip: { showRule: 'none' }
    },
    xAxis: {
      size: 20,
      axisLine: { show: false },
      tickLine: { show: false },
      tickText: { show: true, color: neutral, size: 10, marginStart: 2, marginEnd: 2 }
    },
    yAxis: {
      show: true,
      position: 'left',
      inside: true,
      size: 0,
      axisLine: { show: false },
      tickLine: { show: false },
      tickText: { show: true, color: neutral, size: 10, marginStart: 2, marginEnd: 2 }
    },
    crosshair: {
      horizontal: {
        text: { show: true }
      },
      vertical: {
        text: { show: true }
      }
    },
    indicator: {
      lastValueMark: { show: false },
      tooltip: { showRule: 'none' }
    },
    separator: { color: hexToRgba(grid, 0.35) },
    background: { color: background }
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  if (h.length !== 6) return `rgba(148, 163, 184, ${alpha})`
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
