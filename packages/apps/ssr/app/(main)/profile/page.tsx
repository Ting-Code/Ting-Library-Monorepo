import { MobileShell } from '@/components/layout/MobileShell'

import { WatchlistSection } from './WatchlistSection'

export default function WatchlistPage() {
  return (
    <MobileShell title="自选" mainClassName="flex min-h-0 flex-1 flex-col">
      <WatchlistSection />
    </MobileShell>
  )
}
