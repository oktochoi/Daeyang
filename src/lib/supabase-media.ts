'use client'

import { getSupabaseClient } from './supabase';

// Press Release 타입
export interface PressRelease {
  id: number;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  featured_image?: string;
  url: string;
  published_date?: string;
  created_at?: string;
  updated_at?: string;
}

// 인증(certification) | 수상(award) 구분. (컬럼명은 category 사용 — type은 PostgreSQL 예약어)
// Supabase: awards_certifications 테이블에 category 컬럼 추가 필요.
// SQL: ALTER TABLE awards_certifications ADD COLUMN IF NOT EXISTS category text CHECK (category IN ('certification', 'award')) DEFAULT 'award';
export type AwardCertificationType = 'certification' | 'award';

// Award & Certification 타입
export interface AwardCertification {
  id: number;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  featured_image?: string;
  url?: string;
  award_date?: string;
  /** 'certification' = 인증, 'award' = 수상. DB 컬럼명: category */
  type?: AwardCertificationType;
  category?: AwardCertificationType;
  created_at?: string;
  updated_at?: string;
}

// Technical Resource 타입
export interface TechnicalResource {
  id: number;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  featured_image?: string;
  url?: string;
  document_type?: string;
  created_at?: string;
  updated_at?: string;
}

// 영상(Video) 타입
export interface MediaVideo {
  id: number;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  url: string;
  featured_image?: string;
  published_date?: string;
  created_at?: string;
  updated_at?: string;
}

// ========== Press Releases ==========

// 보도 자료 가져오기
export async function getPressReleases(): Promise<PressRelease[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning empty array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('press_releases')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching press releases:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching press releases:', error);
    return [];
  }
}

// 보도 자료 ID로 가져오기
export async function getPressReleaseById(id: number): Promise<PressRelease | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning null.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('press_releases')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching press release:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching press release:', error);
    return null;
  }
}

// 보도 자료 추가
export async function createPressRelease(release: Omit<PressRelease, 'id' | 'created_at' | 'updated_at'>): Promise<PressRelease | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot create press release.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('press_releases')
      .insert([release])
      .select()
      .single();

    if (error) {
      console.error('Error creating press release:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating press release:', error);
    return null;
  }
}

// 보도 자료 업데이트
export async function updatePressRelease(id: number, release: Partial<PressRelease>): Promise<PressRelease | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot update press release.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('press_releases')
      .update(release)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating press release:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating press release:', error);
    return null;
  }
}

// 보도 자료 삭제
export async function deletePressRelease(id: number): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot delete press release.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('press_releases')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting press release:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting press release:', error);
    return false;
  }
}

// ========== Awards & Certifications ==========

// 인증 및 수상 전체 가져오기 (type 필터 없음)
export async function getAwardsCertifications(): Promise<AwardCertification[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning empty array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('awards_certifications')
      .select('*')
      .order('award_date', { ascending: false });

    if (error) {
      console.error('Error fetching awards certifications:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching awards certifications:', error);
    return [];
  }
}

// 인증만 가져오기 (DB 컬럼: category = 'certification'). category 컬럼이 없으면 전체 조회 후 메모리에서 필터.
export async function getCertifications(): Promise<AwardCertification[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('awards_certifications')
      .select('*')
      .eq('category', 'certification')
      .order('award_date', { ascending: false });

    if (!error) return data || [];

    // 400 등: category 컬럼 없음 또는 예약어 충돌 → 전체 조회 후 필터
    const all = await getAwardsCertifications();
    return (all || []).filter((row) => (row.category ?? row.type) === 'certification');
  } catch {
    const all = await getAwardsCertifications();
    return (all || []).filter((row) => (row.category ?? row.type) === 'certification');
  }
}

// 수상만 가져오기 (DB 컬럼: category = 'award'). category 컬럼이 없으면 전체 조회 후 메모리에서 필터.
export async function getAwards(): Promise<AwardCertification[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('awards_certifications')
      .select('*')
      .eq('category', 'award')
      .order('award_date', { ascending: false });

    if (!error) return data || [];

    const all = await getAwardsCertifications();
    return (all || []).filter((row) => (row.category ?? row.type ?? 'award') === 'award');
  } catch {
    const all = await getAwardsCertifications();
    return (all || []).filter((row) => (row.category ?? row.type ?? 'award') === 'award');
  }
}

// 인증 및 수상 ID로 가져오기
export async function getAwardCertificationById(id: number): Promise<AwardCertification | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning null.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('awards_certifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching award certification:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching award certification:', error);
    return null;
  }
}

// 인증 및 수상 추가 (type: 'certification' | 'award' 지정)
export async function createAwardCertification(award: Omit<AwardCertification, 'id' | 'created_at' | 'updated_at'>): Promise<AwardCertification | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot create award certification.');
    return null;
  }

  try {
    const kind = award.type ?? award.category ?? 'award';
    const row: Record<string, unknown> = {
      title: award.title,
      title_en: award.title_en,
      description: award.description,
      description_en: award.description_en,
      featured_image: award.featured_image,
      url: award.url,
      award_date: award.award_date,
      category: kind,
    };
    const { data, error } = await supabase
      .from('awards_certifications')
      .insert([row])
      .select()
      .single();

    if (error) {
      console.error('Error creating award certification:', error);
      if (error.code === '42703' || error.message?.includes('category')) {
        console.error(
          'awards_certifications 테이블에 category 컬럼이 없습니다. Supabase SQL Editor에서 실행: ALTER TABLE awards_certifications ADD COLUMN IF NOT EXISTS category text CHECK (category IN (\'certification\', \'award\')) DEFAULT \'award\';'
        );
      }
      return null;
    }
    return data as AwardCertification;
  } catch (error) {
    console.error('Error creating award certification:', error);
    return null;
  }
}

// 인증 및 수상 업데이트 (DB에 없는 컬럼 전송 시 400 방지: 기본 컬럼만 사용, category는 선택)
export async function updateAwardCertification(id: number, award: Partial<AwardCertification>): Promise<AwardCertification | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot update award certification.');
    return null;
  }

  const baseKeys = [
    'title', 'title_en', 'description', 'description_en',
    'featured_image', 'url', 'award_date',
  ] as const;
  const row: Record<string, unknown> = {};
  for (const key of baseKeys) {
    const value = award[key];
    if (value !== undefined && value !== null) {
      row[key] = value;
    }
  }
  const categoryValue = award.category ?? award.type;
  if (categoryValue !== undefined && categoryValue !== null) {
    row['category'] = categoryValue;
  }

  try {
    let result = await supabase
      .from('awards_certifications')
      .update(row)
      .eq('id', id)
      .select()
      .single();

    const isBadRequestOrUnknownCol = result.error && ('400' === result.error.code || '42703' === result.error.code);
    if (isBadRequestOrUnknownCol && 'category' in row) {
      delete row['category'];
      result = await supabase
        .from('awards_certifications')
        .update(row)
        .eq('id', id)
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error updating award certification:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error updating award certification:', error);
    return null;
  }
}

// 인증 및 수상 삭제
export async function deleteAwardCertification(id: number): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot delete award certification.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('awards_certifications')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting award certification:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting award certification:', error);
    return false;
  }
}

// ========== Technical Resources ==========

// 기술자료 가져오기
export async function getTechnicalResources(): Promise<TechnicalResource[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning empty array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('technical_resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching technical resources:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching technical resources:', error);
    return [];
  }
}

// 기술자료 ID로 가져오기
export async function getTechnicalResourceById(id: number): Promise<TechnicalResource | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning null.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('technical_resources')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching technical resource:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching technical resource:', error);
    return null;
  }
}

// 기술자료 추가
export async function createTechnicalResource(resource: Omit<TechnicalResource, 'id' | 'created_at' | 'updated_at'>): Promise<TechnicalResource | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot create technical resource.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('technical_resources')
      .insert([resource])
      .select()
      .single();

    if (error) {
      console.error('Error creating technical resource:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating technical resource:', error);
    return null;
  }
}

// 기술자료 업데이트
export async function updateTechnicalResource(id: number, resource: Partial<TechnicalResource>): Promise<TechnicalResource | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot update technical resource.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('technical_resources')
      .update(resource)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating technical resource:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating technical resource:', error);
    return null;
  }
}

// 기술자료 삭제
export async function deleteTechnicalResource(id: number): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot delete technical resource.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('technical_resources')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting technical resource:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting technical resource:', error);
    return false;
  }
}

// ========== Media Videos (영상) ==========

export async function getMediaVideos(): Promise<MediaVideo[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning empty array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('media_videos')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) {
      console.error('Error fetching media videos:', error.message || error.code || error);
      return [];
    }

    return data || [];
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error('Error fetching media videos:', err?.message ?? err);
    return [];
  }
}

export async function createMediaVideo(video: Omit<MediaVideo, 'id' | 'created_at' | 'updated_at'>): Promise<MediaVideo | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot create media video.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('media_videos')
      .insert([video])
      .select()
      .single();

    if (error) {
      console.error('Error creating media video:', (error as { message?: string; code?: string }).message ?? (error as { message?: string; code?: string }).code ?? error);
      return null;
    }

    return data;
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error('Error creating media video:', err?.message ?? err);
    return null;
  }
}

export async function updateMediaVideo(id: number, video: Partial<MediaVideo>): Promise<MediaVideo | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot update media video.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('media_videos')
      .update(video)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating media video:', (error as { message?: string; code?: string }).message ?? (error as { message?: string; code?: string }).code ?? error);
      return null;
    }

    return data;
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error('Error updating media video:', err?.message ?? err);
    return null;
  }
}

export async function deleteMediaVideo(id: number): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot delete media video.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('media_videos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting media video:', (error as { message?: string; code?: string }).message ?? (error as { message?: string; code?: string }).code ?? error);
      return false;
    }

    return true;
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error('Error deleting media video:', err?.message ?? err);
    return false;
  }
}

