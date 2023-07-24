declare global {
  namespace NodeJS {
    declare interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      [key: string]: string | undefined
    }
  }
}

interface Window {
  unmount: () => void
  mount: () => void
}

interface Process {
  NODE_ENV: 'development' | 'production'
  [key: string]: string | undefined
}
