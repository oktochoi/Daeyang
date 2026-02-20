import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.mediaAwards.title,
  description: PAGE_SEO.mediaAwards.description,
  path: '/media/awards',
})

export default function MediaAwardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
