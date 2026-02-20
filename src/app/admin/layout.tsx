import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '../../lib/seo'

/** Admin pages: noindex to prevent search engine indexing */
export const metadata: Metadata = genMeta({
  title: '관리자',
  description: '대양환경기술 관리자',
  path: '/admin',
  noIndex: true,
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
