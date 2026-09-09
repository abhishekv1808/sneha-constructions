import type { ReactNode } from 'react'

import { Footer, Header, MobileActionBar } from '@/components/layout'
import { QuoteModalProvider } from '@/components/providers/QuoteModalProvider'
import { QuickQuoteModal } from '@/components/modals/QuickQuoteModal'
import { FloatingActionWidget } from '@/components/ui/FloatingActionWidget'

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <QuoteModalProvider>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileActionBar />
      <FloatingActionWidget />
      <QuickQuoteModal />
    </QuoteModalProvider>
  )
}
