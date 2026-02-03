import type { MetadataRoute } from 'next'
import { SEO, canonical } from '../lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.siteUrl

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: canonical('/about'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: canonical('/contact'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/product'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: canonical('/product/overview'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/product/how-it-works'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/product/application'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/product/technical'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/product/industries'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/performance'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: canonical('/media'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: canonical('/media/certification'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]

  return staticRoutes
}
