'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

export function ShellBackButton({
  fallbackHref = '/',
  className
}: {
  fallbackHref?: string
  className?: string
}) {
  const router = useRouter()

  return (
    <button
      type="button"
      aria-label="返回"
      onClick={() => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back()
          return
        }
        router.push(fallbackHref)
      }}
      className={cn(
        'inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full',
        'text-foreground transition-colors active:bg-muted',
        className
      )}
    >
      <ChevronLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
    </button>
  )
}
