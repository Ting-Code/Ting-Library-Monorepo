/**
 * @description: Development model
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 */

export function getEnv(): string {
  // @ts-ignore
  return process.env.NODE_ENV
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  // @ts-ignore
  return process.env.NODE_ENV === devMode
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  // @ts-ignore
  return process.env.NODE_ENV === prodMode
}
