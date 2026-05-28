import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

import { TabBar } from '@/components/layout/TabBar'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { cn } from '@/lib/utils'

export function MobileShell({
  title,
  children,
  hideTabBar = false,
  showBack = false,
  backHref = '/',
  className,
  mainClassName
}: {
  title: string
  children?: React.ReactNode
  hideTabBar?: boolean
  /** 二级页左上角返回 */
  showBack?: boolean
  backHref?: string
  className?: string
  /** 默认整页滚动；传 min-h-0 overflow-hidden 供子级中间区域滚动 */
  mainClassName?: string
}) {
  return (
    <div
      className={cn(
        'relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col',
        'bg-gradient-to-b from-muted via-background to-background text-foreground',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_70%)] opacity-80"
        aria-hidden
      />
      <div className="relative h-[env(safe-area-inset-top,0px)] shrink-0" />
      <header
        className={cn(
          'relative z-10 flex h-12 shrink-0 items-center gap-2 border-b border-border/50 bg-card/75 px-2 backdrop-blur-xl',
          showBack ? 'pl-1 pr-3' : 'px-4'
        )}
      >
        {showBack ? (
          <Link
            href={backHref}
            aria-label="返回"
            className={cn(
              'inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full',
              'text-foreground transition-colors active:bg-muted'
            )}
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
          </Link>
        ) : null}
        <h1
          className={cn(
            'min-w-0 flex-1 truncate text-[17px] font-semibold tracking-tight text-foreground',
            !showBack && 'pr-0'
          )}
        >
          {title}
        </h1>
        <ThemeToggle className="shrink-0" />
      </header>
      {children ? (
        <main
          className={cn(
            'relative z-10 flex min-h-0 flex-1 flex-col',
            mainClassName ?? 'overflow-y-auto'
          )}
        >
          {children}
        </main>
      ) : (
        <main className="relative z-10 flex-1" />
      )}
      {!hideTabBar ? <TabBar /> : null}
    </div>
  )
}
