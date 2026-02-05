import type { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

/** GSC 인식용: sitemap.xml은 순수 XML만 출력. 스크립트/JSX 미포함. */
const BASE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://daeyang-alpha.vercel.app').replace(
    /\/$/,
    ''
  )

function url(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return p === '/' ? BASE_URL : `${BASE_URL}${p}`
}

export type SitemapEntry = MetadataRoute.Sitemap[number]

/** sitemap.xml 라우트에서 재사용 (순수 데이터만 반환) */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const now = new Date()

  const staticEntries: SitemapEntry[] = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/about/ceo'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/about/history'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/about/vision'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/product'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/product/overview'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/product/how-it-works'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/product/application'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/product/technical'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/product/industries'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/performance'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/media'), lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: url('/media/certification'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: url('/media/awards'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: url('/media/press'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ]

  const dynamicEntries: SitemapEntry[] = []

  try {
    const supabase = await createClient()
    if (supabase) {
      const [projects, releases] = await Promise.all([
        supabase.from('performance_projects').select('id, updated_at').order('id'),
        supabase.from('press_releases').select('id, updated_at').order('id'),
      ])

      if (projects.data?.length) {
        for (const row of projects.data) {
          dynamicEntries.push({
            url: url(`/performance/${row.id}`),
            lastModified: row.updated_at ? new Date(row.updated_at) : now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          })
        }
      }
      if (releases.data?.length) {
        for (const row of releases.data) {
          dynamicEntries.push({
            url: url(`/media/press/${row.id}`),
            lastModified: row.updated_at ? new Date(row.updated_at) : now,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          })
        }
      }
    }
  } catch {
    // Supabase 미설정 시 정적 페이지만 반환
  }

  return [...staticEntries, ...dynamicEntries]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return getSitemapEntries()
}
