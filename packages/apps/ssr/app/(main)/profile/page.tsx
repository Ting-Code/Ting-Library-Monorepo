import { User } from 'lucide-react'

import { MobileShell } from '@/components/layout/MobileShell'

export default function ProfilePage() {
  return (
    <MobileShell title="我的">
      <div className="flex flex-col items-center px-6 pt-10">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-accent ring-4 ring-card">
          <User className="h-10 w-10 text-primary" strokeWidth={1.75} aria-hidden />
        </span>
        <p className="mt-4 text-lg font-semibold text-foreground">访客</p>
        <p className="mt-1 text-sm text-muted-foreground">登录与设置即将开放</p>
      </div>
    </MobileShell>
  )
}
