import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import '../index.css'
import { I18nProvider } from './providers/I18nProvider'
import RemixIconLoader from '../components/base/RemixIconLoader'
import { WebSiteJsonLd, OrganizationJsonLd } from '../components/seo/JsonLd'
import { LocalBusinessJsonLd } from '../components/seo/LocalBusinessJsonLd'
import { SEO, canonical, ogImageUrl } from '../lib/seo'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d9488',
}

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  title: {
    default: SEO.defaultTitle,
    template: '%s | 대양환경기술',
  },
  description: SEO.defaultDescription,
  keywords: [
    '대양환경기술',
    '연소 효율',
    '배출가스 저감',
    'Coal Green14001',
    '연료비 절감',
    '환경기술',
    '석탄 연소',
    '대기오염 저감',
  ],
  authors: [{ name: '대양환경기술', url: SEO.siteUrl }],
  creator: '대양환경기술',
  publisher: '대양환경기술',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  verification: {
    google: SEO.googleSiteVerification,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: canonical('/'),
    languages: {
      'ko-KR': canonical('/'),
      'en-US': canonical('/'),
    },
  },
  openGraph: {
    type: 'website',
    locale: SEO.locale,
    alternateLocale: SEO.alternateLocale,
    url: canonical('/'),
    siteName: '대양환경기술',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [
      {
        url: ogImageUrl(),
        width: SEO.ogImageWidth,
        height: SEO.ogImageHeight,
        alt: '대양환경기술 - 연소 효율·배출가스 저감 솔루션',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    creator: SEO.twitterHandle,
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className="min-w-0 overflow-x-hidden antialiased">
        <WebSiteJsonLd />
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <RemixIconLoader />
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
