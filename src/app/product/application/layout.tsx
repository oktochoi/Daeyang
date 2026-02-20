import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.productApplication.title,
  description: PAGE_SEO.productApplication.description,
  path: '/product/application',
})

export default function ProductApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
