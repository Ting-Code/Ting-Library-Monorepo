declare global {
  interface Window {
    mount: () => void
    unmount: () => void
    namespace?: string
    __MICRO_APP_ENVIRONMENT__?: boolean
    __MICRO_APP_BASE_ROUTE__?: string
  }
}

export {}
