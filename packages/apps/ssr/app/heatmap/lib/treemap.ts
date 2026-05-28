import type { HeatmapBoardNode, TreemapResponse } from './server/market-heatmap'

export type QuoteMap = Record<string, { price: number; changePct: number }>

export type StockRect = {
  code: string
  name: string
  boardName: string
  subBoardName: string
  value: number
  x: number
  y: number
  width: number
  height: number
  price: number
  changePct: number
}

export type BoardRect = {
  name: string
  x: number
  y: number
  width: number
  height: number
  stockCount: number
  titleHeight: number
  changePct: number
}

export type SubBoardRect = {
  name: string
  boardName: string
  x: number
  y: number
  width: number
  height: number
  stockCount: number
  titleHeight: number
  changePct: number
}

export type HeatmapLayout = {
  stockRects: StockRect[]
  boardRects: BoardRect[]
  subBoardRects: SubBoardRect[]
}

type TreemapInput<T> = { item: T; value: number }
type TreemapRect<T> = { item: T; x: number; y: number; width: number; height: number }
type Bounds = { x: number; y: number; width: number; height: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function weightedAverageChange(
  stocks: Array<{ code: string; value: number; changePct: number }>,
  quotes: QuoteMap
) {
  let weightedSum = 0
  let totalValue = 0

  for (const stock of stocks) {
    const changePct = quotes[stock.code]?.changePct ?? stock.changePct
    weightedSum += changePct * stock.value
    totalValue += stock.value
  }

  return totalValue > 0 ? weightedSum / totalValue : 0
}

function groupStocksBySubBoard<
  T extends {
    code: string
    boardName: string
    subBoardName: string
    value: number
    changePct: number
  }
>(stocks: T[], quotes: QuoteMap) {
  const subBoardMap = new Map<string, T[]>()

  for (const stock of stocks) {
    const key = stock.subBoardName || stock.boardName
    const current = subBoardMap.get(key) ?? []
    current.push(stock)
    subBoardMap.set(key, current)
  }

  return Array.from(subBoardMap.entries())
    .map(([name, children]) => ({
      name,
      boardName: children[0]?.boardName ?? '',
      stockCount: children.length,
      value: children.reduce((sum, child) => sum + child.value, 0),
      changePct: weightedAverageChange(children, quotes),
      children: [...children].sort((left, right) => right.value - left.value)
    }))
    .sort((left, right) => right.value - left.value)
}

function sortTreemapItems<T>(items: TreemapInput<T>[]) {
  return [...items]
    .filter((entry) => entry.value > 0)
    .sort((left, right) => right.value - left.value)
}

function totalTreemapValue<T>(items: TreemapInput<T>[]) {
  return items.reduce((sum, entry) => sum + entry.value, 0)
}

function findBalancedSplitIndex<T>(items: TreemapInput<T>[]) {
  if (items.length <= 1) {
    return items.length
  }

  const target = totalTreemapValue(items) / 2
  let cumulative = 0
  let bestIndex = 1
  let bestDiff = Number.POSITIVE_INFINITY

  for (let index = 1; index < items.length; index += 1) {
    cumulative += items[index - 1].value
    const diff = Math.abs(target - cumulative)
    if (diff < bestDiff) {
      bestDiff = diff
      bestIndex = index
    }
  }

  return bestIndex
}

function splitBounds(bounds: Bounds, ratio: number) {
  const splitVertically = bounds.width >= bounds.height

  if (splitVertically) {
    const leftWidth = bounds.width * ratio
    return {
      first: { x: bounds.x, y: bounds.y, width: leftWidth, height: bounds.height },
      second: {
        x: bounds.x + leftWidth,
        y: bounds.y,
        width: Math.max(0, bounds.width - leftWidth),
        height: bounds.height
      }
    }
  }

  const topHeight = bounds.height * ratio
  return {
    first: { x: bounds.x, y: bounds.y, width: bounds.width, height: topHeight },
    second: {
      x: bounds.x,
      y: bounds.y + topHeight,
      width: bounds.width,
      height: Math.max(0, bounds.height - topHeight)
    }
  }
}

function insetRect<T>(rect: TreemapRect<T>, gap: number) {
  const inset = gap / 2
  return {
    ...rect,
    x: rect.x + inset,
    y: rect.y + inset,
    width: Math.max(0, rect.width - gap),
    height: Math.max(0, rect.height - gap)
  }
}

function binaryTreemap<T>(
  items: TreemapInput<T>[],
  x: number,
  y: number,
  width: number,
  height: number,
  gap = 0
) {
  const sortedItems = sortTreemapItems(items)

  function layout(entries: TreemapInput<T>[], bounds: Bounds): TreemapRect<T>[] {
    if (entries.length === 0 || bounds.width <= 1 || bounds.height <= 1) {
      return []
    }

    if (entries.length === 1) {
      return [
        insetRect(
          {
            item: entries[0].item,
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height
          },
          gap
        )
      ]
    }

    const splitIndex = findBalancedSplitIndex(entries)
    const firstEntries = entries.slice(0, splitIndex)
    const secondEntries = entries.slice(splitIndex)

    if (firstEntries.length === 0 || secondEntries.length === 0) {
      return entries.map((entry, index) =>
        insetRect(
          {
            item: entry.item,
            x: bounds.x,
            y: bounds.y + (bounds.height / entries.length) * index,
            width: bounds.width,
            height: bounds.height / entries.length
          },
          gap
        )
      )
    }

    const total = totalTreemapValue(entries)
    const firstRatio = totalTreemapValue(firstEntries) / total
    const { first, second } = splitBounds(bounds, firstRatio)

    return [...layout(firstEntries, first), ...layout(secondEntries, second)]
  }

  return layout(sortedItems, { x, y, width, height }).filter(
    (rect) => rect.width > 1 && rect.height > 1
  )
}

export function quotesFromTreemap(data: TreemapResponse): QuoteMap {
  const quotes: QuoteMap = {}

  for (const board of data.nodes) {
    for (const stock of board.children) {
      quotes[stock.code] = { price: stock.price, changePct: stock.changePct }
    }
  }

  return quotes
}

export function mergeQuotes(current: QuoteMap, next: QuoteMap): QuoteMap {
  return { ...current, ...next }
}

export function buildHeatmapLayout(
  nodes: HeatmapBoardNode[],
  quotes: QuoteMap,
  canvasWidth: number,
  canvasHeight: number
): HeatmapLayout {
  const boardRects: BoardRect[] = []
  const subBoardRects: SubBoardRect[] = []
  const stockRects: StockRect[] = []

  const boardBoxes = binaryTreemap(
    nodes.map((board) => ({ item: board, value: board.value })),
    0,
    0,
    canvasWidth,
    canvasHeight,
    4
  )

  for (const boardBox of boardBoxes) {
    const boardChangePct = weightedAverageChange(boardBox.item.children, quotes)
    const titleHeight =
      boardBox.width < 72 || boardBox.height < 48
        ? 0
        : clamp(Math.round(Math.min(Math.max(boardBox.height * 0.09, 12), 20)), 10, 20)
    const contentPadding = boardBox.width > 96 && boardBox.height > 72 ? 2 : 1
    const contentX = boardBox.x + contentPadding
    const contentY = boardBox.y + titleHeight + contentPadding
    const contentWidth = Math.max(0, boardBox.width - contentPadding * 2)
    const contentHeight = Math.max(0, boardBox.height - titleHeight - contentPadding * 2)

    boardRects.push({
      name: boardBox.item.name,
      x: boardBox.x,
      y: boardBox.y,
      width: boardBox.width,
      height: boardBox.height,
      stockCount: boardBox.item.stockCount,
      titleHeight,
      changePct: boardChangePct
    })

    if (contentWidth <= 2 || contentHeight <= 2) {
      continue
    }

    const subBoards = groupStocksBySubBoard(boardBox.item.children, quotes)
    const shouldNestSubBoards = subBoards.length > 1

    if (!shouldNestSubBoards) {
      const stockBoxes = binaryTreemap(
        boardBox.item.children.map((stock) => ({ item: stock, value: stock.value })),
        contentX,
        contentY,
        contentWidth,
        contentHeight,
        1
      )

      for (const stockBox of stockBoxes) {
        const quote = quotes[stockBox.item.code]
        stockRects.push({
          code: stockBox.item.code,
          name: stockBox.item.name,
          boardName: boardBox.item.name,
          subBoardName: stockBox.item.subBoardName,
          value: stockBox.item.value,
          x: stockBox.x,
          y: stockBox.y,
          width: stockBox.width,
          height: stockBox.height,
          price: quote?.price ?? stockBox.item.price,
          changePct: quote?.changePct ?? stockBox.item.changePct
        })
      }
      continue
    }

    const subBoardBoxes = binaryTreemap(
      subBoards.map((subBoard) => ({ item: subBoard, value: subBoard.value })),
      contentX,
      contentY,
      contentWidth,
      contentHeight,
      1.5
    )

    for (const subBoardBox of subBoardBoxes) {
      const subTitleHeight =
        subBoardBox.width < 44 || subBoardBox.height < 28
          ? 0
          : clamp(Math.round(Math.min(Math.max(subBoardBox.height * 0.1, 8), 14)), 8, 14)
      const subPadding = 1
      const subContentX = subBoardBox.x + subPadding
      const subContentY = subBoardBox.y + subTitleHeight + subPadding
      const subContentWidth = Math.max(0, subBoardBox.width - subPadding * 2)
      const subContentHeight = Math.max(0, subBoardBox.height - subTitleHeight - subPadding * 2)

      subBoardRects.push({
        name: subBoardBox.item.name,
        boardName: boardBox.item.name,
        x: subBoardBox.x,
        y: subBoardBox.y,
        width: subBoardBox.width,
        height: subBoardBox.height,
        stockCount: subBoardBox.item.stockCount,
        titleHeight: subTitleHeight,
        changePct: subBoardBox.item.changePct
      })

      if (subContentWidth <= 2 || subContentHeight <= 2) {
        continue
      }

      const stockBoxes = binaryTreemap(
        subBoardBox.item.children.map((stock) => ({ item: stock, value: stock.value })),
        subContentX,
        subContentY,
        subContentWidth,
        subContentHeight,
        0.75
      )

      for (const stockBox of stockBoxes) {
        const quote = quotes[stockBox.item.code]
        stockRects.push({
          code: stockBox.item.code,
          name: stockBox.item.name,
          boardName: boardBox.item.name,
          subBoardName: stockBox.item.subBoardName,
          value: stockBox.item.value,
          x: stockBox.x,
          y: stockBox.y,
          width: stockBox.width,
          height: stockBox.height,
          price: quote?.price ?? stockBox.item.price,
          changePct: quote?.changePct ?? stockBox.item.changePct
        })
      }
    }
  }

  return { stockRects, boardRects, subBoardRects }
}

export function clampOffset(width: number, height: number, scale: number, x: number, y: number) {
  if (scale <= 1) {
    return { x: 0, y: 0 }
  }

  const minX = width - width * scale
  const minY = height - height * scale

  return {
    x: clamp(x, minX, 0),
    y: clamp(y, minY, 0)
  }
}

export { clamp }
