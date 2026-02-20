/**
 * Central SEO configuration - Technical SEO + On-Page SEO
 * Production-ready metadata generation for Next.js App Router
 *
 * Usage:
 *   import { generateMetadata, canonical, SEO } from '@/lib/seo'
 *   export const metadata = generateMetadata({ title: 'Page Title', path: '/page' })
 */

import type { Metadata } from 'next'

// ─── Site Config ─────────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://daiyangecotech.com'

export const SEO = {
  siteUrl: SITE_URL,
  defaultTitle: '대양환경기술 | 연소 효율·배출가스 저감 솔루션',
  defaultTitleEn: 'Daeyang Eco Technology | Combustion & Emission Solutions',
  defaultDescription:
    'Coal Green14001으로 연료비 절감과 배출가스 저감을 동시에. 연소 효율 개선, 대기오염 저감, 설비 변경 없이 적용 가능한 환경기술 솔루션.',
  defaultDescriptionEn:
    'Fuel cost reduction and emission reduction with Coal Green14001. Combustion efficiency improvement, air pollution reduction, environmental technology without equipment changes.',
  googleSiteVerification: 'Jcm1_pdZyCMeoNG1e3lch9Pwh844RPtpHvQJ3KwxRXE',
  locale: 'ko_KR',
  alternateLocale: 'en_US',
  twitterHandle: '@daeyang_eco',
  ogImagePath: '/og.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  organizationName: '대양환경기술',
  organizationNameEn: 'Daeyang Eco Technology',
} as const

// ─── Canonical URL ───────────────────────────────────────────────────────────
export function canonical(path: string): string {
  const base = SITE_URL.replace(/\/$/, '')
  const p = path.startsWith('/') ? path : `/${path}`
  return p === '/' ? base : `${base}${p}`
}

// ─── Absolute OG Image URL ───────────────────────────────────────────────────
export function ogImageUrl(path?: string): string {
  const base = SITE_URL.replace(/\/$/, '')
  const imgPath = path || SEO.ogImagePath
  return imgPath.startsWith('http') ? imgPath : `${base}${imgPath}`
}

// ─── Truncate for meta (title 50–60 chars, description 120–155 chars) ───────
function truncateTitle(s: string, max = 60): string {
  if (s.length <= max) return s
  return s.slice(0, max - 3) + '...'
}
function truncateDesc(s: string, max = 155): string {
  if (s.length <= max) return s
  return s.slice(0, max - 3) + '...'
}

// ─── Generate Metadata (Reusable) ────────────────────────────────────────────
export interface GenerateMetadataParams {
  /** Page title (50–60 chars recommended). Will be suffixed with " | 대양환경기술" */
  title: string
  /** Meta description (120–155 chars recommended) */
  description: string
  /** Canonical path e.g. "/product/overview" */
  path: string
  /** Optional: custom OG image path (default: /og.png) */
  image?: string
  /** Optional: noIndex (e.g. for duplicate/thank-you pages) */
  noIndex?: boolean
  /** Optional: article type for Open Graph */
  type?: 'website' | 'article'
  /** Optional: publishedTime for articles */
  publishedTime?: string
}

export function generateMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = 'website',
  publishedTime,
}: GenerateMetadataParams): Metadata {
  const fullTitle = truncateTitle(
    title.includes('대양환경기술') ? title : `${title} | 대양환경기술`
  )
  const desc = truncateDesc(description)
  const url = canonical(path)
  const imageUrl = ogImageUrl(image)

  const openGraph: Metadata['openGraph'] = {
    type,
    locale: SEO.locale,
    alternateLocale: SEO.alternateLocale,
    url,
    siteName: SEO.organizationName,
    title: fullTitle,
    description: desc,
    images: [
      {
        url: imageUrl,
        width: SEO.ogImageWidth,
        height: SEO.ogImageHeight,
        alt: `${title} - ${SEO.organizationName}`,
      },
    ],
    ...(type === 'article' && publishedTime && { publishedTime }),
  }

  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      creator: SEO.twitterHandle,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
