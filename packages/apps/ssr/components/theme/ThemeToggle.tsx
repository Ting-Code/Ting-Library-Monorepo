'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
        'border border-border/60 bg-muted/80 text-foreground',
        'transition-colors active:scale-95 hover:bg-accent',
        className
      )}
      aria-label="切换主题"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-[18px] w-[18px] dark:hidden" aria-hidden />
      <Moon className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
    </button>
  )
}
