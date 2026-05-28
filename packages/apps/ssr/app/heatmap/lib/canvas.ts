import type { HeatmapLayout, StockRect } from './treemap'

export type PriceColorMode = 'red-rise' | 'green-rise'

const colorLegendSteps = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const

export function getHeatColor(changePct: number, colorMode: PriceColorMode = 'red-rise') {
  const limit = 10
  const neutral = 'rgb(72, 79, 92)'
  const amplitude = Math.min(Math.max(Math.abs(changePct) / limit, 0), 1)

  if (Math.abs(changePct) < 0.1) {
    return neutral
  }

  const isRise = changePct > 0
  const shouldUseRed = colorMode === 'red-rise' ? isRise : !isRise

  if (shouldUseRed) {
    const red = Math.round(140 + amplitude * 115)
    const green = Math.round(72 - amplitude * 42)
    const blue = Math.round(76 - amplitude * 38)
    return `rgb(${red}, ${green}, ${blue})`
  }

  const red = Math.round(40 - amplitude * 14)
  const green = Math.round(126 + amplitude * 88)
  const blue = Math.round(76 - amplitude * 10)
  return `rgb(${red}, ${green}, ${blue})`
}

export function getLegendGradient(colorMode: PriceColorMode = 'red-rise') {
  return `linear-gradient(to right, ${colorLegendSteps
    .map((step, index) => {
      const position = (index / (colorLegendSteps.length - 1)) * 100
      return `${getHeatColor(step, colorMode)} ${position.toFixed(2)}%`
    })
    .join(', ')})`
}

function getBoardHeaderColor(changePct: number, colorMode: PriceColorMode) {
  const amplitude = Math.min(Math.max(Math.abs(changePct) / 10, 0), 1)

  if (Math.abs(changePct) < 0.1) {
    return 'rgb(51, 58, 70)'
  }

  const isRise = changePct > 0
  const shouldUseRed = colorMode === 'red-rise' ? isRise : !isRise

  if (shouldUseRed) {
    return `rgb(${Math.round(120 + amplitude * 60)}, ${Math.round(58 - amplitude * 12)}, ${Math.round(66 - amplitude * 10)})`
  }

  return `rgb(${Math.round(46 - amplitude * 10)}, ${Math.round(102 + amplitude * 36)}, ${Math.round(70 - amplitude * 6)})`
}

function formatChange(value: number) {
  if (value > 0) {
    return `+${value.toFixed(2)}%`
  }
  return `${value.toFixed(2)}%`
}

function shortenText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text
  }
  return `${text.slice(0, maxLength)}…`
}

function drawClippedText(
  context: CanvasRenderingContext2D,
  text: string,
  textX: number,
  textY: number,
  clipX: number,
  clipY: number,
  clipWidth: number,
  clipHeight: number
) {
  context.save()
  context.beginPath()
  context.rect(clipX, clipY, clipWidth, clipHeight)
  context.clip()
  context.fillText(text, textX, textY)
  context.restore()
}

function drawStockLabel(context: CanvasRenderingContext2D, stock: StockRect, zoomScale: number) {
  const displayWidth = stock.width * zoomScale
  const displayHeight = stock.height * zoomScale

  if (displayWidth < 20 || displayHeight < 10) {
    return
  }

  const fontSize = Math.min(
    12,
    Math.max(7, Math.floor(Math.min(displayWidth, displayHeight) * 0.22))
  )
  const clipPadding = 2
  const clipWidth = Math.max(0, stock.width - clipPadding * 2)
  const clipHeight = Math.max(0, stock.height - clipPadding * 2)

  context.save()
  context.fillStyle = 'rgba(247, 250, 252, 0.94)'
  context.textBaseline = 'middle'

  if (displayWidth >= 52 && displayHeight >= 28) {
    context.textAlign = 'left'
    context.font = `700 ${fontSize}px "PingFang SC", "Microsoft YaHei", sans-serif`
    drawClippedText(
      context,
      shortenText(stock.name, displayWidth > 80 ? 6 : 4),
      stock.x + 3,
      stock.y + fontSize * 0.9,
      stock.x + clipPadding,
      stock.y + clipPadding,
      clipWidth,
      clipHeight
    )
    context.font = `600 ${Math.max(7, fontSize - 1)}px sans-serif`
    drawClippedText(
      context,
      formatChange(stock.changePct),
      stock.x + 3,
      stock.y + stock.height - fontSize * 0.55,
      stock.x + clipPadding,
      stock.y + clipPadding,
      clipWidth,
      clipHeight
    )
  } else {
    context.textAlign = 'center'
    context.font = `600 ${fontSize}px sans-serif`
    drawClippedText(
      context,
      formatChange(stock.changePct),
      stock.x + stock.width / 2,
      stock.y + stock.height / 2,
      stock.x + clipPadding,
      stock.y + clipPadding,
      clipWidth,
      clipHeight
    )
  }

  context.restore()
}

export function renderHeatmapCanvas(
  canvas: HTMLCanvasElement,
  layout: HeatmapLayout,
  canvasSize: { width: number; height: number },
  options: {
    view: { scale: number; x: number; y: number }
    highlightedStock: StockRect | null
    activeBoardName: string | null
    activeSubBoardName: string | null
    colorMode?: PriceColorMode
  }
) {
  const context = canvas.getContext('2d')
  if (!context) {
    return
  }

  const { width, height } = canvasSize
  const pixelRatio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
  const colorMode = options.colorMode ?? 'red-rise'
  const { view, highlightedStock, activeBoardName, activeSubBoardName } = options

  canvas.width = Math.floor(width * pixelRatio)
  canvas.height = Math.floor(height * pixelRatio)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  const background = context.createLinearGradient(0, 0, canvas.width, canvas.height)
  background.addColorStop(0, '#171b22')
  background.addColorStop(1, '#10141b')

  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = background
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.save()
  context.scale(pixelRatio, pixelRatio)
  context.translate(view.x, view.y)
  context.scale(view.scale, view.scale)

  for (const board of layout.boardRects) {
    context.fillStyle = '#20252d'
    context.fillRect(board.x, board.y, board.width, board.height)
  }

  for (const subBoard of layout.subBoardRects) {
    context.fillStyle = 'rgba(18, 23, 31, 0.62)'
    context.fillRect(subBoard.x, subBoard.y, subBoard.width, subBoard.height)
  }

  for (const stock of layout.stockRects) {
    context.fillStyle = getHeatColor(stock.changePct, colorMode)
    context.fillRect(stock.x, stock.y, stock.width, stock.height)
    drawStockLabel(context, stock, view.scale)
  }

  for (const subBoard of layout.subBoardRects) {
    const isActive = activeSubBoardName === subBoard.name && activeBoardName === subBoard.boardName

    if (subBoard.titleHeight > 0) {
      context.fillStyle = getBoardHeaderColor(subBoard.changePct, colorMode)
      context.fillRect(subBoard.x, subBoard.y, subBoard.width, subBoard.titleHeight)
    }

    context.strokeStyle = isActive ? '#38bdf8' : 'rgba(148, 163, 184, 0.28)'
    context.lineWidth = isActive ? 1.6 : 0.8
    context.strokeRect(subBoard.x, subBoard.y, subBoard.width, subBoard.height)

    if (subBoard.width > 40 && subBoard.titleHeight > 6) {
      context.fillStyle = 'rgba(247, 250, 252, 0.9)'
      context.font = `700 ${Math.min(10, subBoard.titleHeight * 0.55)}px sans-serif`
      context.textAlign = 'left'
      context.textBaseline = 'middle'
      drawClippedText(
        context,
        shortenText(subBoard.name, 6),
        subBoard.x + 4,
        subBoard.y + subBoard.titleHeight / 2,
        subBoard.x,
        subBoard.y,
        subBoard.width,
        subBoard.titleHeight
      )
    }
  }

  for (const board of layout.boardRects) {
    const isActive = activeBoardName === board.name

    if (board.titleHeight > 0) {
      context.fillStyle = getBoardHeaderColor(board.changePct, colorMode)
      context.fillRect(board.x, board.y, board.width, board.titleHeight)
    }

    context.strokeStyle = isActive ? '#f6d36d' : 'rgba(148, 163, 184, 0.4)'
    context.lineWidth = isActive ? 1.4 : 0.9
    context.strokeRect(board.x, board.y, board.width, board.height)

    if (board.width > 48 && board.titleHeight > 8) {
      context.fillStyle = 'rgba(247, 250, 252, 0.95)'
      context.font = `700 ${Math.min(12, board.titleHeight * 0.5)}px sans-serif`
      context.textAlign = 'left'
      context.textBaseline = 'middle'
      drawClippedText(
        context,
        shortenText(board.name, 8),
        board.x + 6,
        board.y + board.titleHeight / 2,
        board.x,
        board.y,
        board.width,
        board.titleHeight
      )
    }
  }

  if (highlightedStock) {
    context.strokeStyle = '#f8fafc'
    context.lineWidth = 2
    context.strokeRect(
      highlightedStock.x + 0.5,
      highlightedStock.y + 0.5,
      Math.max(0, highlightedStock.width - 1),
      Math.max(0, highlightedStock.height - 1)
    )
  }

  context.restore()
}
