import type { Metadata } from 'next'
import { SEO, canonical } from '../../lib/seo'

export const metadata: Metadata = {
  title: '회사소개',
  description:
    '대양환경기술 회사소개. 연혁, 비전, CEO 인사말. 환경기술 기반 연소 효율·배출가스 저감 솔루션을 제공합니다.',
  alternates: {
    canonical: canonical('/about'),
  },
  openGraph: {
    title: '회사소개 | 대양환경기술',
    description:
      '대양환경기술 회사소개. 연혁, 비전, CEO 인사말. 환경기술 기반 연소 효율·배출가스 저감 솔루션.',
    url: canonical('/about'),
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
