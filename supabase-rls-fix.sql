-- 전체 데이터베이스 스키마 및 RLS 정책 설정
-- 이 파일은 테이블이 없으면 생성하고, 있으면 정책만 재생성합니다.

-- ========== 1. 테이블 생성 ==========

-- 적용실적 프로젝트 테이블 (기본 정보)
CREATE TABLE IF NOT EXISTS performance_projects (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  icon TEXT NOT NULL,
  description TEXT,
  description_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 적용실적 프로젝트 항목 테이블 (각 프로젝트에 속한 제목과 사진들)
CREATE TABLE IF NOT EXISTS performance_project_items (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT NOT NULL REFERENCES performance_projects(id) ON DELETE CASCADE,
  item_title TEXT NOT NULL,
  item_title_en TEXT,
  photos TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 보도 자료 (Press Releases) 테이블
CREATE TABLE IF NOT EXISTS press_releases (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  featured_image TEXT,
  url TEXT NOT NULL,
  published_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인증 및 수상 (Awards & Certifications) 테이블
CREATE TABLE IF NOT EXISTS awards_certifications (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  featured_image TEXT,
  url TEXT,
  award_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기술자료 (Technical Resources) 테이블
CREATE TABLE IF NOT EXISTS technical_resources (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  featured_image TEXT,
  url TEXT,
  document_type TEXT, -- 'patent', 'certification', 'technical_doc' 등
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========== 2. 트리거 함수 생성 ==========

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- ========== 3. 트리거 생성 ==========

DROP TRIGGER IF EXISTS update_performance_projects_updated_at ON performance_projects;
CREATE TRIGGER update_performance_projects_updated_at
  BEFORE UPDATE ON performance_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_performance_project_items_updated_at ON performance_project_items;
CREATE TRIGGER update_performance_project_items_updated_at
  BEFORE UPDATE ON performance_project_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_press_releases_updated_at ON press_releases;
CREATE TRIGGER update_press_releases_updated_at
  BEFORE UPDATE ON press_releases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_awards_certifications_updated_at ON awards_certifications;
CREATE TRIGGER update_awards_certifications_updated_at
  BEFORE UPDATE ON awards_certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_technical_resources_updated_at ON technical_resources;
CREATE TRIGGER update_technical_resources_updated_at
  BEFORE UPDATE ON technical_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========== 4. 인덱스 생성 ==========

CREATE INDEX IF NOT EXISTS idx_performance_projects_created_at ON performance_projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_performance_project_items_project_id ON performance_project_items(project_id);
CREATE INDEX IF NOT EXISTS idx_performance_project_items_display_order ON performance_project_items(project_id, display_order);
CREATE INDEX IF NOT EXISTS idx_press_releases_published_date ON press_releases(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_press_releases_created_at ON press_releases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_awards_certifications_award_date ON awards_certifications(award_date DESC);
CREATE INDEX IF NOT EXISTS idx_awards_certifications_created_at ON awards_certifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_technical_resources_created_at ON technical_resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_technical_resources_document_type ON technical_resources(document_type);

-- ========== 5. RLS 활성화 ==========

ALTER TABLE performance_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_project_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE press_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_resources ENABLE ROW LEVEL SECURITY;

-- ========== 6. RLS 정책 재생성 (기존 정책 삭제 후 재생성) ==========

-- performance_projects 정책 재생성
DROP POLICY IF EXISTS "Allow public read access projects" ON performance_projects;
DROP POLICY IF EXISTS "Allow public insert access projects" ON performance_projects;
DROP POLICY IF EXISTS "Allow public update access projects" ON performance_projects;
DROP POLICY IF EXISTS "Allow public delete access projects" ON performance_projects;

CREATE POLICY "Allow public read access projects" ON performance_projects
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access projects" ON performance_projects
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access projects" ON performance_projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access projects" ON performance_projects
  FOR DELETE
  USING (true);

-- performance_project_items 정책 재생성
DROP POLICY IF EXISTS "Allow public read access items" ON performance_project_items;
DROP POLICY IF EXISTS "Allow public insert access items" ON performance_project_items;
DROP POLICY IF EXISTS "Allow public update access items" ON performance_project_items;
DROP POLICY IF EXISTS "Allow public delete access items" ON performance_project_items;

CREATE POLICY "Allow public read access items" ON performance_project_items
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access items" ON performance_project_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access items" ON performance_project_items
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access items" ON performance_project_items
  FOR DELETE
  USING (true);

-- press_releases 정책 재생성
DROP POLICY IF EXISTS "Allow public read access press_releases" ON press_releases;
DROP POLICY IF EXISTS "Allow public insert access press_releases" ON press_releases;
DROP POLICY IF EXISTS "Allow public update access press_releases" ON press_releases;
DROP POLICY IF EXISTS "Allow public delete access press_releases" ON press_releases;

CREATE POLICY "Allow public read access press_releases" ON press_releases
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access press_releases" ON press_releases
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access press_releases" ON press_releases
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access press_releases" ON press_releases
  FOR DELETE
  USING (true);

-- awards_certifications 정책 재생성
DROP POLICY IF EXISTS "Allow public read access awards_certifications" ON awards_certifications;
DROP POLICY IF EXISTS "Allow public insert access awards_certifications" ON awards_certifications;
DROP POLICY IF EXISTS "Allow public update access awards_certifications" ON awards_certifications;
DROP POLICY IF EXISTS "Allow public delete access awards_certifications" ON awards_certifications;

CREATE POLICY "Allow public read access awards_certifications" ON awards_certifications
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access awards_certifications" ON awards_certifications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access awards_certifications" ON awards_certifications
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access awards_certifications" ON awards_certifications
  FOR DELETE
  USING (true);

-- technical_resources 정책 재생성
DROP POLICY IF EXISTS "Allow public read access technical_resources" ON technical_resources;
DROP POLICY IF EXISTS "Allow public insert access technical_resources" ON technical_resources;
DROP POLICY IF EXISTS "Allow public update access technical_resources" ON technical_resources;
DROP POLICY IF EXISTS "Allow public delete access technical_resources" ON technical_resources;

CREATE POLICY "Allow public read access technical_resources" ON technical_resources
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access technical_resources" ON technical_resources
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access technical_resources" ON technical_resources
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access technical_resources" ON technical_resources
  FOR DELETE
  USING (true);

-- ========== 7. Storage 버킷 및 정책 설정 ==========

-- 참고: Storage 버킷은 Supabase 대시보드의 Storage 섹션에서 수동으로 생성해야 합니다.
-- Storage > Create bucket > 이름: images, Public: true
-- 버킷을 생성한 후 아래 SQL을 실행하세요.

-- Storage 정책 생성 (기존 정책이 있다면 먼저 제거)
-- 주의: 정책 이름이 이미 존재할 수 있으므로, Supabase 대시보드에서 기존 정책을 확인하세요.
DROP POLICY IF EXISTS "Public Access Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Images" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Upload" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
DROP POLICY IF EXISTS "Public Update" ON storage.objects;

-- 모든 사용자가 읽을 수 있도록
CREATE POLICY "Public Access Images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'images');

-- 모든 사용자가 업로드할 수 있도록 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Public Upload Images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'images');

-- 모든 사용자가 업데이트할 수 있도록 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Public Update Images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'images')
  WITH CHECK (bucket_id = 'images');

-- 모든 사용자가 삭제할 수 있도록 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Public Delete Images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'images');

