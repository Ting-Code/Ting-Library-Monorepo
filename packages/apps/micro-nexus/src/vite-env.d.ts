/// <reference types="vite/client" />

export {}

declare global {
  /** @micro-zoe/micro-app iframe / 嵌入时可选注入 */
  interface Window {
    __MICRO_APP_BASE_ROUTE__?: string
    __MICRO_APP_ENVIRONMENT__?: boolean
  }
}
