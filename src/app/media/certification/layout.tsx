import type { Metadata } from 'next'
import { canonical } from '../../../lib/seo'

export const metadata: Metadata = {
  title: '인증',
  description: '대양환경기술 인증 내역. 인증서 및 인증 정보를 확인하세요.',
  alternates: {
    canonical: canonical('/media/certification'),
  },
}

export default function CertificationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
