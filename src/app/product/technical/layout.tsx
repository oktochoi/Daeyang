import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.productTechnical.title,
  description: PAGE_SEO.productTechnical.description,
  path: '/product/technical',
})

export default function ProductTechnicalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
