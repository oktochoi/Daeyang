import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.productOverview.title,
  description: PAGE_SEO.productOverview.description,
  path: '/product/overview',
})

export default function ProductOverviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
