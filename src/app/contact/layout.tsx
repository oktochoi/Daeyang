import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../lib/seo'
import { PAGE_SEO } from '../../lib/seo-pages'

export const metadata: Metadata = genMeta({
  title: PAGE_SEO.contact.title,
  description: PAGE_SEO.contact.description,
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
