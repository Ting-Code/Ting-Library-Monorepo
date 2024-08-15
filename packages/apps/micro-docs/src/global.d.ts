declare interface Window {
  unmount: () => void
  mount: () => void
  __MICRO_APP_ENVIRONMENT__: boolean
}
