import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { DeferredWidgets } from '@/components/ui/DeferredWidgets'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <DeferredWidgets />
    </>
  )
}
