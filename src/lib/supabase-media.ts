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

// 인증 및 수상 가져오기
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

// 인증 및 수상 추가
export async function createAwardCertification(award: Omit<AwardCertification, 'id' | 'created_at' | 'updated_at'>): Promise<AwardCertification | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot create award certification.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('awards_certifications')
      .insert([award])
      .select()
      .single();

    if (error) {
      console.error('Error creating award certification:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error creating award certification:', error);
    return null;
  }
}

// 인증 및 수상 업데이트
export async function updateAwardCertification(id: number, award: Partial<AwardCertification>): Promise<AwardCertification | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is not initialized. Cannot update award certification.');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('awards_certifications')
      .update(award)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating award certification:', error);
      return null;
    }

    return data;
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

