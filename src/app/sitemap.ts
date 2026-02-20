/**
 * Dynamic sitemap.xml for SEO
 * Next.js serves at /sitemap.xml
 */

import type { MetadataRoute } from 'next'
import { SEO, canonical } from '@/lib/seo'
import { fetchAllPressIds, fetchAllPerformanceIds } from '@/lib/seo-data'

const STATIC_ROUTES: Array<{
  path: string
  priority: number
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}> = [
  { path: '/', priority: 1, changefreq: 'weekly' },
  { path: '/about', priority: 0.9, changefreq: 'monthly' },
  { path: '/about/ceo', priority: 0.8, changefreq: 'monthly' },
  { path: '/about/history', priority: 0.8, changefreq: 'monthly' },
  { path: '/about/vision', priority: 0.8, changefreq: 'monthly' },
  { path: '/product', priority: 0.9, changefreq: 'weekly' },
  { path: '/product/overview', priority: 0.9, changefreq: 'monthly' },
  { path: '/product/application', priority: 0.8, changefreq: 'monthly' },
  { path: '/product/technical', priority: 0.8, changefreq: 'weekly' },
  { path: '/performance', priority: 0.9, changefreq: 'weekly' },
  { path: '/media', priority: 0.7, changefreq: 'weekly' },
  { path: '/media/press', priority: 0.6, changefreq: 'weekly' },
  { path: '/media/certification', priority: 0.6, changefreq: 'weekly' },
  { path: '/media/awards', priority: 0.6, changefreq: 'weekly' },
  { path: '/media/video', priority: 0.6, changefreq: 'weekly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO.siteUrl.replace(/\/$/, '')
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changefreq,
    priority: r.priority,
  }))

  const pressIds = await fetchAllPressIds()
  const pressEntries: MetadataRoute.Sitemap = pressIds.map((id) => ({
    url: `${baseUrl}/media/press/${id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const performanceIds = await fetchAllPerformanceIds()
  const performanceEntries: MetadataRoute.Sitemap = performanceIds.map((id) => ({
    url: `${baseUrl}/performance/${id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...pressEntries, ...performanceEntries]
}
