import type { Metadata } from 'next'
import { SEO, canonical } from '../../lib/seo'

export const metadata: Metadata = {
  title: '문의하기',
  description:
    '대양환경기술 문의하기. Coal Green14001, 연소 효율 개선, 배출가스 저감 사업 문의 및 제휴 요청을 받습니다.',
  alternates: {
    canonical: canonical('/contact'),
  },
  openGraph: {
    title: '문의하기 | 대양환경기술',
    description:
      'Coal Green14001, 연소 효율·배출가스 저감 문의. 대양환경기술 연락처 및 문의 폼.',
    url: canonical('/contact'),
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
