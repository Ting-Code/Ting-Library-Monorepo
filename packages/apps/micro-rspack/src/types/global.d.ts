declare global {
  namespace NodeJS {
    declare interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      [key: string]: string | undefined
    }
  }
}

interface Window {
  unmount: () => void
  mount: () => void
  __MICRO_APP_ENVIRONMENT__: boolean
}

interface Process {
  NODE_ENV: 'development' | 'production' | 'test'
  [key: string]: string | undefined
}
