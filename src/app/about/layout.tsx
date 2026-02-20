import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../lib/seo'
import { PAGE_SEO } from '../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
