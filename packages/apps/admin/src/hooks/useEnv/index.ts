import { IENV } from '@tingcode/system/src'

export const useEnv = (): Readonly<IENV> => {
  const { VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX } = getAppEnvConfig()

  const globEnv: Readonly<IENV> = {
    env: getEnv(),
    apiUrl: VITE_GLOB_API_URL,
    urlPrefix: VITE_GLOB_API_URL_PREFIX
  }
  return globEnv as Readonly<IENV>
}

export interface GlobEnvConfig {
  ENV: string
  // 接口地址
  VITE_GLOB_API_URL: string
  // 接口前缀
  VITE_GLOB_API_URL_PREFIX?: string
}

/**
 * Get the configuration file variable name
 * 获取配置文件变量名称
 * @param env
 */

export function getAppEnvConfig() {
  const ENV = import.meta.env

  const { VITE_GLOB_API_URL, VITE_GLOB_API_URL_PREFIX } = ENV

  return {
    ENV,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX
  }
}
/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv() {
  return import.meta.env.MODE as 'production' | 'development' | 'test'
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD
}
