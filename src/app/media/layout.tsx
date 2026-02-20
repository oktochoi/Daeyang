import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../lib/seo'
import { PAGE_SEO } from '../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.media.title,
  description: PAGE_SEO.media.description,
  path: '/media',
})

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
