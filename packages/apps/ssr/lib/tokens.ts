/** Layout and theme color tokens — keep in sync with app/globals.css */
export const layout = {
  canvasWidth: 375,
  canvasHeight: 812,
  contentMax: 430,
  padX: 16,
  gapSection: 24,
  gapItem: 12,
  headerH: 44,
  tabbarH: 50,
  safeTop: 47,
  safeBottom: 34,
  touchMin: 44
} as const

export const lightTheme = {
  background: '#F7F8FA',
  foreground: '#1A1A1A',
  card: '#FFFFFF',
  primary: '#1677FF',
  border: '#E8E8E8',
  mutedForeground: '#666666',
  warning: '#FA8C16',
  warningBg: '#FFF7E6'
} as const

export const darkTheme = {
  background: '#141414',
  foreground: '#E8E8E8',
  card: '#1F1F1F',
  primary: '#4096FF',
  border: '#303030',
  mutedForeground: '#A3A3A3',
  warning: '#D48806',
  warningBg: '#2B2111'
} as const
