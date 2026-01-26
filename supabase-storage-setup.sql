-- Supabase Storage 버킷 생성 및 정책 설정
-- Supabase 대시보드의 Storage 섹션에서 실행하거나 SQL Editor에서 실행하세요

-- 1. Storage 버킷 생성 (Storage UI에서 수동으로 생성)
-- Storage > Create bucket > 이름: images, Public: true

-- 2. Storage 정책 생성 (SQL Editor에서 실행)
-- 기존 정책이 있다면 먼저 제거
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;

-- 모든 사용자가 읽을 수 있도록
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'images');

-- 모든 사용자가 업로드할 수 있도록 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Public Upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'images');

-- 모든 사용자가 삭제할 수 있도록 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Public Delete" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'images');

