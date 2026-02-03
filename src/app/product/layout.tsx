import type { Metadata } from 'next'
import { SEO, canonical } from '../../lib/seo'

export const metadata: Metadata = {
  title: '제품·서비스',
  description:
    'Coal Green14001 제품 소개. 연소 효율 개선 원리, 적용 분야, 기술 사양. 연료비 절감·배출가스 저감 솔루션.',
  alternates: {
    canonical: canonical('/product'),
  },
  openGraph: {
    title: '제품·서비스 | 대양환경기술',
    description:
      'Coal Green14001 연소 효율·배출가스 저감 제품. 적용 분야, 기술 사양, 원리 소개.',
    url: canonical('/product'),
  },
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
