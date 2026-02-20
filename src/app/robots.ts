/**
 * robots.txt for search engine crawlers
 * - Allow: public pages
 * - Disallow: admin, API, private routes
 */
import type { MetadataRoute } from 'next'
import { SEO } from '../lib/seo'

export default function robots(): MetadataRoute.Robots {
  const base = SEO.siteUrl.replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
