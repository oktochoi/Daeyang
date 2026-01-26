# 대양환경기술 웹사이트

Next.js App Router 기반의 웹사이트입니다.

## 시작하기

### 패키지 설치

먼저 필요한 패키지를 설치합니다:

```bash
npm install
# 또는
npm install @supabase/ssr
```

### 환경 변수 설정

1. 프로젝트 루트에 `.env.local` 파일을 생성합니다 (`.gitignore`에 의해 무시되므로 안전합니다).
2. `env.example` 파일을 참고하여 다음 환경 변수를 추가합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_publishable_key
# 또는 기존 방식 (호환성)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**참고**: 
- Supabase 환경 변수가 설정되지 않으면 애플리케이션은 mocks 데이터를 사용합니다.
- Supabase를 사용하려면 반드시 환경 변수를 설정해야 합니다.
- Supabase 프로젝트의 API 설정에서 URL과 publishable key를 확인할 수 있습니다.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` 또는 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 중 하나를 사용하면 됩니다.

### Supabase 데이터베이스 설정

1. Supabase 프로젝트를 생성합니다.
2. Supabase 대시보드의 SQL Editor에서 다음 파일들을 순서대로 실행합니다:
   - `supabase-schema-v2.sql` - 적용실적 프로젝트 테이블 생성
   - `supabase-schema-media.sql` - 보도 자료, 인증 및 수상, 기술자료 테이블 생성
3. 이렇게 하면 다음 테이블들이 생성됩니다:
   - `performance_projects` - 적용실적 프로젝트
   - `performance_project_items` - 적용실적 프로젝트 항목
   - `press_releases` - 보도 자료 (대표 사진, 날짜, 제목, 설명, URL)
   - `awards_certifications` - 인증 및 수상
   - `technical_resources` - 기술자료

**기존 테이블이 있는 경우:**
- `supabase-schema-v2-migration.sql` 파일을 실행하여 `icon_color` 컬럼을 제거하세요.

### Supabase Storage 설정 (이미지 업로드용)

1. Supabase 대시보드의 **Storage** 섹션으로 이동합니다.
2. **Create bucket** 버튼을 클릭합니다.
3. 버킷 이름을 `images`로 설정하고 **Public bucket**을 활성화합니다.
4. Supabase 대시보드의 SQL Editor에서 `supabase-storage-setup.sql` 파일의 내용을 실행합니다.
5. 이렇게 하면 이미지 업로드 및 접근이 가능해집니다.

### Supabase SSR 설정

이 프로젝트는 Next.js App Router와 Supabase SSR을 사용합니다:
- `src/utils/supabase/client.ts` - 클라이언트 컴포넌트용
- `src/utils/supabase/server.ts` - 서버 컴포넌트용
- `src/utils/supabase/middleware.ts` - 미들웨어용 (선택사항)

현재는 클라이언트 컴포넌트에서만 사용하고 있으며, `src/lib/supabase.ts`에서 클라이언트를 생성합니다.

### 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 기술 스택

- **Next.js 15** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **i18next** - 다국어 지원
- **Firebase** - 백엔드 서비스
- **Supabase** - 데이터베이스

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지
├── components/       # 재사용 가능한 컴포넌트
├── hooks/           # 커스텀 훅
├── i18n/            # 다국어 설정
├── mocks/           # 목업 데이터
└── assets/          # 이미지 및 정적 파일
```

