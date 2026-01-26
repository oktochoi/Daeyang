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

-- updated_at 자동 업데이트 트리거 함수 (이미 있다면 생략)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_press_releases_updated_at
  BEFORE UPDATE ON press_releases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_awards_certifications_updated_at
  BEFORE UPDATE ON awards_certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_technical_resources_updated_at
  BEFORE UPDATE ON technical_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_press_releases_published_date ON press_releases(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_press_releases_created_at ON press_releases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_awards_certifications_award_date ON awards_certifications(award_date DESC);
CREATE INDEX IF NOT EXISTS idx_awards_certifications_created_at ON awards_certifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_technical_resources_created_at ON technical_resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_technical_resources_document_type ON technical_resources(document_type);

-- RLS (Row Level Security) 활성화
ALTER TABLE press_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE technical_resources ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 정책 생성
CREATE POLICY "Allow public read access press_releases" ON press_releases
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access awards_certifications" ON awards_certifications
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access technical_resources" ON technical_resources
  FOR SELECT
  USING (true);

-- 모든 사용자가 삽입할 수 있도록 정책 생성 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Allow public insert access press_releases" ON press_releases
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert access awards_certifications" ON awards_certifications
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert access technical_resources" ON technical_resources
  FOR INSERT
  WITH CHECK (true);

-- 모든 사용자가 업데이트할 수 있도록 정책 생성 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Allow public update access press_releases" ON press_releases
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update access awards_certifications" ON awards_certifications
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update access technical_resources" ON technical_resources
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 모든 사용자가 삭제할 수 있도록 정책 생성 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Allow public delete access press_releases" ON press_releases
  FOR DELETE
  USING (true);

CREATE POLICY "Allow public delete access awards_certifications" ON awards_certifications
  FOR DELETE
  USING (true);

CREATE POLICY "Allow public delete access technical_resources" ON technical_resources
  FOR DELETE
  USING (true);

