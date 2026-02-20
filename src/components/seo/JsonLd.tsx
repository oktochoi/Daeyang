/**
 * JSON-LD Structured Data for SEO
 * Injects schema.org markup for rich snippets in Google Search
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { SEO, canonical } from '@/lib/seo'

// ─── WebSite Schema (site-wide) ───────────────────────────────────────────────
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO.organizationName,
    alternateName: SEO.organizationNameEn,
    url: canonical('/'),
    description: SEO.defaultDescription,
    inLanguage: ['ko-KR', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO.siteUrl}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Organization Schema ──────────────────────────────────────────────────────
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO.organizationName,
    alternateName: SEO.organizationNameEn,
    url: SEO.siteUrl,
    logo: `${SEO.siteUrl}/logo.png`,
    description: SEO.defaultDescription,
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string
  path: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Article Schema (for content pages) ───────────────────────────────────────
export interface ArticleJsonLdProps {
  title: string
  description: string
  path: string
  publishedTime?: string
  modifiedTime?: string
  image?: string
}

export function ArticleJsonLd({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  image,
}: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: canonical(path),
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${SEO.siteUrl}${image}`,
        width: SEO.ogImageWidth,
        height: SEO.ogImageHeight,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: SEO.organizationName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO.siteUrl}/logo.png`,
      },
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
