import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.aboutCeo.title,
  description: PAGE_SEO.aboutCeo.description,
  path: '/about/ceo',
})

export default function AboutCeoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
