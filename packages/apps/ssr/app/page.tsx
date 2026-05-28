import { HomeEntryList } from '@/components/home/HomeEntryList'
import { MobileShell } from '@/components/layout/MobileShell'

export default function HomePage() {
  return (
    <MobileShell title="首页">
      <HomeEntryList />
    </MobileShell>
  )
}
