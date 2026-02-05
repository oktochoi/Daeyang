/**
 * 중앙 SEO 설정 (캐노니컬, 사이트 검증, 기본 메타)
 * 프로덕션 배포 시 NEXT_PUBLIC_SITE_URL을 실제 도메인으로 설정하세요.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://daeyang-alpha.vercel.app'

export const SEO = {
  siteUrl: SITE_URL,
  defaultTitle: '대양환경기술 | 연소 효율·배출가스 저감 솔루션',
  defaultTitleEn: 'Daeyang Eco Technology | Combustion & Emission Solutions',
  defaultDescription:
    'Coal Green14001으로 연료비 절감과 배출가스 저감을 동시에. 연소 효율 개선, 대기오염 저감, 설비 변경 없이 적용 가능한 환경기술 솔루션.',
  defaultDescriptionEn:
    'Fuel cost reduction and emission reduction with Coal Green14001. Combustion efficiency improvement, air pollution reduction, environmental technology without equipment changes.',
  googleSiteVerification: '4j3cTkVACL2lF9s0CFfg6x9kHsVdndQdbKI5atxdBGQ',
  locale: 'ko_KR',
  alternateLocale: 'en_US',
  twitterHandle: '@daeyang_eco',
  ogImagePath: '/og-image.jpg',
} as const

export function canonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return p === '/' ? base : `${base}${p}`
}
