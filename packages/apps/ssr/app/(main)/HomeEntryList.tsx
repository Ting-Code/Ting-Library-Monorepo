import { ChevronRight, LayoutGrid, Percent } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

const entries = [
  {
    href: '/heatmap',
    label: 'A 股市场热力图',
    description: '一眼看清行业涨跌与结构',
    icon: LayoutGrid,
    accent: 'from-primary/20 to-primary/5 text-primary'
  },
  {
    href: '/dividend-rank',
    label: '股息率排行',
    description: '筛选高股息 A 股，按收益率排序',
    icon: Percent,
    accent: 'from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400'
  }
] as const

export function HomeEntryList({ className }: { className?: string }) {
  return (
    <div className={cn('px-4 pb-6 pt-3', className)}>
      <ul className="flex flex-col gap-3">
        {entries.map(({ href, label, description, icon: Icon, accent }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                'group flex items-center gap-4 rounded-2xl border border-border/80 bg-card p-4',
                'shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.06)]',
                'transition-[transform,box-shadow,border-color] active:scale-[0.98]',
                'dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.35)]',
                'hover:border-primary/25'
              )}
            >
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br',
                  accent
                )}
              >
                <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-semibold tracking-tight text-foreground">
                  {label}
                </span>
                <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                  {description}
                </span>
              </span>
              <ChevronRight
                className="h-5 w-5 shrink-0 text-muted-foreground/60 transition-transform group-active:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
