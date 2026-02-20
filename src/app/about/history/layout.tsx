import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.aboutHistory.title,
  description: PAGE_SEO.aboutHistory.description,
  path: '/about/history',
})

export default function AboutHistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
