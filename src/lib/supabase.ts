'use client'

import { createClient as createBrowserClient } from '@/utils/supabase/client';

// 클라이언트 컴포넌트에서 사용할 Supabase 클라이언트
export function getSupabaseClient() {
  return createBrowserClient();
}

// 파일 업로드 함수
export async function uploadImage(file: File, folder: string = 'performance'): Promise<string | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot upload image.');
    return null;
  }

  try {
    // 파일명 생성 (타임스탬프 + 원본 파일명)
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // 파일 업로드
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // 공개 URL 가져오기
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Exception uploading image:', error);
    return null;
  }
}

// Performance Projects 타입 (프로젝트 기본 정보)
export interface PerformanceProject {
  id: number;
  title: string;
  title_en?: string;
  icon: string;
  description?: string;
  description_en?: string;
  created_at?: string;
  updated_at?: string;
  items?: PerformanceProjectItem[]; // 항목들 (join으로 가져올 때)
}

// Performance Project Items 타입 (각 프로젝트에 속한 항목)
export interface PerformanceProjectItem {
  id: number;
  project_id: number;
  item_title: string;
  item_title_en?: string;
  photos: string[];
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

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

// 적용실적 가져오기 (항목 포함)
export async function getPerformanceProjects(): Promise<PerformanceProject[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning empty array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('performance_projects')
      .select(`
        *,
        items:performance_project_items(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching performance projects:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching performance projects:', error);
    return [];
  }
}

// 적용실적 ID로 가져오기 (항목 포함)
export async function getPerformanceProjectById(id: number): Promise<PerformanceProject | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning null.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('performance_projects')
      .select(`
        *,
        items:performance_project_items(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching performance project:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching performance project:', error);
    return null;
  }
}

// 적용실적 프로젝트 추가 (기본 정보만)
export async function createPerformanceProject(project: Omit<PerformanceProject, 'id' | 'created_at' | 'updated_at' | 'items'>): Promise<PerformanceProject | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot create performance project.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('performance_projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error creating performance project:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        fullError: error
      });
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception creating performance project:', error);
    return null;
  }
}

// 프로젝트 항목 추가
export async function createPerformanceProjectItem(item: Omit<PerformanceProjectItem, 'id' | 'created_at' | 'updated_at'>): Promise<PerformanceProjectItem | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot create project item.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('performance_project_items')
      .insert([item])
      .select()
      .single();

    if (error) {
      console.error('Error creating project item:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating project item:', error);
    return null;
  }
}

// 프로젝트 항목 가져오기
export async function getPerformanceProjectItems(projectId: number): Promise<PerformanceProjectItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.warn('Supabase client is not initialized. Returning empty array.');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('performance_project_items')
      .select('*')
      .eq('project_id', projectId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching project items:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching project items:', error);
    return [];
  }
}

// 프로젝트 항목 삭제
export async function deletePerformanceProjectItem(itemId: number): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot delete project item.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('performance_project_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error deleting project item:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting project item:', error);
    return false;
  }
}

// 적용실적 업데이트
export async function updatePerformanceProject(id: number, project: Partial<PerformanceProject>): Promise<PerformanceProject | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot update performance project.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('performance_projects')
      .update(project)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating performance project:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating performance project:', error);
    return null;
  }
}

// 적용실적 삭제
export async function deletePerformanceProject(id: number): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot delete performance project.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('performance_projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting performance project:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting performance project:', error);
    return false;
  }
}

// Media 관련 타입과 함수는 src/lib/supabase-media.ts에서 import하여 사용하세요
// 보도 자료, 인증 및 수상, 기술자료 관련 함수들은 별도 파일에 있습니다.

