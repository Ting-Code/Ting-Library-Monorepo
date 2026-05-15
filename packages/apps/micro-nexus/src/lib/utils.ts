import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')

export function withBasePath(path: string) {
  if (!path.startsWith('/')) {
    return `${basePath}/${path}`.replace(/\/{2,}/g, '/')
  }

  return `${basePath}${path}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
