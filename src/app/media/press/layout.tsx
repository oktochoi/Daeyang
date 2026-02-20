import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.mediaPress.title,
  description: PAGE_SEO.mediaPress.description,
  path: '/media/press',
})

export default function MediaPressLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
