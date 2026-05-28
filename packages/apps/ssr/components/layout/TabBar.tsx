'use client'

import { Home, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: '首页', icon: Home },
  { href: '/profile', label: '自选', icon: Star }
] as const

export function TabBar() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        'relative z-20 shrink-0 px-4 pt-2',
        'pb-[max(0.5rem,env(safe-area-inset-bottom))]'
      )}
      aria-label="主导航"
    >
      <div
        className={cn(
          'flex h-[52px] items-stretch rounded-2xl border border-border/60 bg-card/90 p-1',
          'shadow-[0_-4px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl',
          'dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]'
        )}
      >
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors',
                active
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground active:bg-muted'
              )}
            >
              <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.25 : 2} aria-hidden />
              <span className="text-[11px] font-medium leading-none">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
