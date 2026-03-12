import { BottomNav } from '@/components/service/tablet/bottom-nav'

export default function TabletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto">
        {children}
      </div>
      <BottomNav />
    </div>
  )
}
