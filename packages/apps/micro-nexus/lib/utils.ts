import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function withBasePath(path: string) {
  if (!path.startsWith('/')) {
    return path
  }

  return `${basePath}${path}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
