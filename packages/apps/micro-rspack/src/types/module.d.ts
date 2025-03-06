declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare interface ProcessEnv {
  NODE_ENV: 'development' | 'production' | 'test'
  [key: string]: string | undefined
}
