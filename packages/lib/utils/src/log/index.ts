type ColorPreset = 'info' | 'success' | 'warning' | 'error'
type ColorHex = `#${string}`
type Color = ColorPreset | ColorHex

interface TableOptions {
  headerBackground?: Color
  headerColor?: Color
  rowEvenBackground?: Color
  rowOddBackground?: Color
  textColor?: Color
}

interface PrettierLog {
  log: (title: string, content?: string, color?: Color) => void
  info: (textOrTitle: string, content?: string) => void
  success: (textOrTitle: string, content?: string) => void
  warning: (textOrTitle: string, content?: string) => void
  error: (textOrTitle: string, content?: string) => void
  table: <T extends Record<string, unknown>>(data: T[], options?: TableOptions) => void
  picture: (url: string, scale?: number) => Promise<void>
}

export const warn = (message: string) => {
  console.warn(`[admin warn]:${message}`)
}

export const error = (message: string): never => {
  throw new Error(`[admin error]:${message}`)
}

export const createPrettierLog = (): PrettierLog => {
  const colorMap: Record<ColorPreset, ColorHex> = {
    info: '#909399',
    success: '#67C23A',
    warning: '#E6A23C',
    error: '#F56C6C'
  }

  const isEmpty = (value: unknown): boolean => value === null || value === undefined || value === ''

  const prettyPrint = (title: string, content: string, color: Color) => {
    const hexColor = colorMap[color as ColorPreset] || color
    console.log(
      `%c ${title} %c ${content} %c`,
      `background:${hexColor};border:1px solid ${hexColor}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${hexColor}; padding: 1px; border-radius: 0 2px 2px 0; color: ${hexColor};`,
      'background:transparent'
    )
  }

  const createLogFunction =
    (defaultTitle: string, defaultColor: Color) =>
    (textOrTitle: string, content = '', color: Color = defaultColor) => {
      const title = isEmpty(content) ? defaultTitle : textOrTitle
      const text = isEmpty(content) ? textOrTitle : content
      prettyPrint(title, text, color)
    }

  const log = (title: string, content = '', color: Color = 'info') => {
    prettyPrint(title, content, color)
  }

  const info = createLogFunction('Info', 'info')

  const success = createLogFunction('Success', 'success')

  const warning = createLogFunction('Warning', 'warning')

  const error = createLogFunction('Error', 'error')

  const table = <T extends Record<string, unknown>>(
    data: T[],
    options: Partial<TableOptions> = {}
  ) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.log('No data available')
      return
    }

    const {
      headerBackground = '#555555',
      headerColor = '#ffffff',
      rowEvenBackground = '#f2f2f2',
      rowOddBackground = '#ffffff',
      textColor = '#000000'
    } = options

    const headers = Object.keys(data[0])
    const colWidths = headers.map((header) =>
      Math.max(header.length, ...data.map((row) => String(row[header]).length))
    )
    const headerStyle = `background: ${headerBackground}; color: ${headerColor}; font-weight: bold; padding: 5px;`
    const rowStyles = data.map(
      (_, index) =>
        `background: ${index % 2 === 0 ? rowEvenBackground : rowOddBackground}; color: ${textColor}; padding: 5px;`
    )

    const formatRow = (row: string[], style: string) =>
      console.log(
        row.map((cell, i) => `%c${cell.padEnd(colWidths[i])}`).join(' | '),
        ...row.map(() => style)
      )

    formatRow(headers, headerStyle)

    data.forEach((row, index) => {
      formatRow(
        headers.map((header) => String(row[header])),
        rowStyles[index]
      )
    })
  }

  const picture = (url: string, scale: number = 1): Promise<void> => {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = image.width
          canvas.height = image.height
          ctx.drawImage(image, 0, 0)
          const dataUri = canvas.toDataURL('image/png')

          console.log(
            '%c ',
            `
            font-size: 1px;
            padding: ${Math.floor((image.height * scale) / 2)}px ${Math.floor(
              (image.width * scale) / 2
            )}px;
            background-image: url(${dataUri});
            background-size: ${image.width * scale}px ${image.height * scale}px;
            background-repeat: no-repeat;
            color: transparent;
            `
          )
          resolve()
        } else {
          reject(new Error('Failed to get canvas context'))
        }
      }
      image.onerror = () => reject(new Error('Failed to load image'))
      image.src = url
    })
  }

  return {
    log,
    info,
    success,
    warning,
    error,
    table,
    picture
  }
}
