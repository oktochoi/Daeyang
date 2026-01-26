-- icon_color 컬럼 제거 마이그레이션
-- 기존 테이블이 있다면 이 SQL을 실행하여 icon_color 컬럼을 제거하세요

ALTER TABLE performance_projects DROP COLUMN IF EXISTS icon_color;

