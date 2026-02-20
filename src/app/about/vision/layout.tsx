import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.aboutVision.title,
  description: PAGE_SEO.aboutVision.description,
  path: '/about/vision',
})

export default function AboutVisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
