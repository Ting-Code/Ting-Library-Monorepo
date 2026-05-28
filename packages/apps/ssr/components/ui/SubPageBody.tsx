import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function SubPageBody({
  icon: Icon,
  title,
  description,
  primaryAction,
  className
}: {
  icon: LucideIcon
  title: string
  description: string
  primaryAction?: { href: string; label: string; external?: boolean }
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col items-center justify-center px-6 py-10 text-center',
        className
      )}
    >
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent text-primary">
        <Icon className="h-8 w-8" strokeWidth={1.75} aria-hidden />
      </span>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-8 flex w-full max-w-[280px] flex-col gap-3">
        {primaryAction ? (
          primaryAction.external ? (
            <a
              href={primaryAction.href}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm active:scale-[0.98]"
            >
              {primaryAction.label}
            </a>
          ) : (
            <Link
              href={primaryAction.href}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm active:scale-[0.98]"
            >
              {primaryAction.label}
            </Link>
          )
        ) : null}
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground active:scale-[0.98]"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
