/**
 * Server-side data fetching for SEO (generateMetadata, sitemap)
 * Uses Supabase server client with mock fallbacks
 */

import { createClient } from '@/utils/supabase/server'
import { mediaItems } from '@/mocks/media'
import { performanceProjects } from '@/mocks/performance'

export interface PressForMetadata {
  title: string
  titleEn?: string
  summary: string
  summaryEn?: string
  date?: string
  featured_image?: string
  published_date?: string
  updated_at?: string
}

export interface PerformanceForMetadata {
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  created_at?: string
}

export async function fetchPressForMetadata(id: number): Promise<PressForMetadata | null> {
  const supabase = await createClient()
  if (supabase) {
    try {
      const { data } = await supabase
        .from('press_releases')
        .select('title, title_en, description, description_en, featured_image, published_date, updated_at')
        .eq('id', id)
        .single()
      if (data) {
        return {
          title: data.title,
          titleEn: data.title_en,
          summary: (data.description || data.title || '').slice(0, 160),
          summaryEn: (data.description_en || data.title_en || '').slice(0, 160),
          date: data.published_date,
          featured_image: data.featured_image,
          published_date: data.published_date,
          updated_at: data.updated_at,
        }
      }
    } catch {
      /* fallback to mock */
    }
  }
  const item = mediaItems.press.find((p) => p.id === id)
  if (!item) return null
  return {
    title: item.title,
    titleEn: item.titleEn,
    summary: item.summary,
    summaryEn: item.summaryEn,
    date: item.date,
  }
}

export async function fetchPerformanceForMetadata(id: number): Promise<PerformanceForMetadata | null> {
  const supabase = await createClient()
  if (supabase) {
    try {
      const { data } = await supabase
        .from('performance_projects')
        .select('title, title_en, description, description_en, created_at')
        .eq('id', id)
        .single()
      if (data) {
        return {
          title: data.title,
          titleEn: data.title_en,
          description: data.description,
          descriptionEn: data.description_en,
          created_at: data.created_at,
        }
      }
    } catch {
      /* fallback to mock */
    }
  }
  const item = performanceProjects.find((p) => p.id === id)
  if (!item) return null
  return {
    title: item.title,
    titleEn: item.titleEn,
    description: item.description,
    descriptionEn: item.descriptionEn,
  }
}

export async function fetchAllPressIds(): Promise<number[]> {
  const supabase = await createClient()
  if (supabase) {
    try {
      const { data } = await supabase.from('press_releases').select('id')
      if (data?.length) return data.map((r) => r.id as number)
    } catch {
      /* fallback */
    }
  }
  return mediaItems.press.map((p) => p.id)
}

export async function fetchAllPerformanceIds(): Promise<number[]> {
  const supabase = await createClient()
  if (supabase) {
    try {
      const { data } = await supabase.from('performance_projects').select('id')
      if (data?.length) return data.map((r) => r.id as number)
    } catch {
      /* fallback */
    }
  }
  return performanceProjects.map((p) => p.id)
}
