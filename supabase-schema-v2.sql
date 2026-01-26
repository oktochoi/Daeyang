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

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- updated_at 트리거 생성
CREATE TRIGGER update_performance_projects_updated_at
  BEFORE UPDATE ON performance_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_performance_project_items_updated_at
  BEFORE UPDATE ON performance_project_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_performance_projects_created_at ON performance_projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_performance_project_items_project_id ON performance_project_items(project_id);
CREATE INDEX IF NOT EXISTS idx_performance_project_items_display_order ON performance_project_items(project_id, display_order);

-- RLS (Row Level Security) 활성화
ALTER TABLE performance_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_project_items ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽을 수 있도록 정책 생성
CREATE POLICY "Allow public read access projects" ON performance_projects
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access items" ON performance_project_items
  FOR SELECT
  USING (true);

-- 모든 사용자가 삽입할 수 있도록 정책 생성 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Allow public insert access projects" ON performance_projects
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public insert access items" ON performance_project_items
  FOR INSERT
  WITH CHECK (true);

-- 모든 사용자가 업데이트할 수 있도록 정책 생성 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Allow public update access projects" ON performance_projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public update access items" ON performance_project_items
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- 모든 사용자가 삭제할 수 있도록 정책 생성 (개발용 - 프로덕션에서는 인증 필요)
CREATE POLICY "Allow public delete access projects" ON performance_projects
  FOR DELETE
  USING (true);

CREATE POLICY "Allow public delete access items" ON performance_project_items
  FOR DELETE
  USING (true);

