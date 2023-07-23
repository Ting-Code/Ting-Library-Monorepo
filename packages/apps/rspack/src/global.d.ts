declare global {
  namespace NodeJS {
    declare interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      [key: string]: string | undefined
    }
  }
}
