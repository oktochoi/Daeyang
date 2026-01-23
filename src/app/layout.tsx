import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../index.css'
import { I18nProvider } from './providers/I18nProvider'
import RemixIconLoader from '../components/base/RemixIconLoader'

export const metadata: Metadata = {
  title: '대양환경기술',
  description: '환경기술 기반의 솔루션 기업',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <RemixIconLoader />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}

