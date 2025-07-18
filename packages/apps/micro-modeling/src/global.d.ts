declare module '*.glsl' {
  const value: string
  export default value
}
declare interface Window {
  // Global vue app instance
  __isOneRouter__: boolean
  unmount: () => void
  mount: () => void
  __MICRO_APP_ENVIRONMENT__: boolean
  __MICRO_APP_BASE_ROUTE__: string | undefined
}
