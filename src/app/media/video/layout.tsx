import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../../lib/seo'
import { PAGE_SEO } from '../../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.mediaVideo.title,
  description: PAGE_SEO.mediaVideo.description,
  path: '/media/video',
})

export default function MediaVideoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
