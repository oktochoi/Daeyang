# 대양환경기술 SEO 전략 및 크롤링 가이드

## 1. 적용된 SEO 최적화 요약

- **Google 사이트 소유 확인**: `metadata.verification.google`로 메타 태그 자동 출력
- **글로벌 메타**: 제목 템플릿, 기본 설명, 키워드, 작성자, robots, Open Graph, Twitter Card
- **캐노니컬**: `NEXT_PUBLIC_SITE_URL` 기반 절대 URL (환경변수 설정 권장)
- **언어**: `html lang="ko"`, `openGraph.locale` / `alternateLocale` (ko_KR, en_US)
- **페이지별 메타**: Home(루트 기본값), About, Contact, Product 레이아웃에서 title/description/canonical/OG
- **사이트맵**: `src/app/sitemap.ts` → `/sitemap.xml`
- **robots.txt**: `src/app/robots.ts` → `/robots.txt` (admin, api 차단, sitemap 링크)

---

## 2. 키워드 전략 (기업 홍보·B2B 환경기술)

### 2.1 브랜드·핵심 키워드

- **브랜드**: 대양환경기술, Daiyang Eco Technology
- **제품**: Coal Green14001
- **역할**: 연소 효율 개선, 배출가스 저감, 연료비 절감, 대기오염 저감

### 2.2 검색 의도별 키워드

| 의도 | 한국어 예시 | 영어 예시 |
|------|-------------|-----------|
| 제품/솔루션 | 연소 효율 솔루션, 배출가스 저감 기술, 석탄 연소 개선 | combustion efficiency solution, emission reduction |
| 문제 해결 | 연료비 절감, 미연소 저감, NOx SOx 저감 | fuel cost reduction, NOx SOx reduction |
| 산업/적용 | 화력발전, 보일러 연소, 산업용 연소 | coal fired plant, boiler combustion |
| 기업 정보 | 환경기술 기업, 연소 기술 회사 | environmental technology company |

### 2.3 페이지별 키워드 배치

- **홈**: 대양환경기술, 연소 효율, 배출가스 저감, Coal Green14001, 연료비 절감
- **회사소개**: 회사소개, 연혁, 비전, CEO, 환경기술 기업
- **제품·서비스**: Coal Green14001, 제품 소개, 적용 분야, 기술 사양, 연소 효율
- **문의**: 문의하기, 제휴, 견적, 연락처

### 2.4 권장 사항

- 제목/설명에 핵심 키워드 1~2개 포함, 과도한 반복 지양
- 본문(H1, H2, 단락)에 롱테일 키워드 자연스럽게 사용
- 블로그/뉴스에 "연소 효율", "배출가스 저감" 등 콘텐츠 추가 시 키워드 활용

---

## 3. Googlebot 크롤링 (JSON/다국어 렌더링)

### 3.1 현재 구조

- Next.js 15 App Router, **서버 사이드에서 HTML 출력**
- 메타데이터(title, description, canonical, OG 등)는 **서버에서 주입**되므로 Googlebot이 JS 없이도 수집 가능
- 다국어는 **클라이언트 i18n**(react-i18next)으로 전환 → 첫 응답은 기본 언어(한국어)

### 3.2 크롤링 가능성

- **메타/구조**: 모든 SEO 메타는 서버 렌더링된 HTML에 포함 → **완전 크롤링 가능**
- **본문**: 첫 로드 시 한국어 HTML이 전송됨 → Googlebot은 한국어 버전을 인덱싱
- **영어 버전**: URL이 동일하므로 검색엔진은 기본적으로 한국어 페이지로 인덱싱. 영어 검색 대비를 위해 추후 **URL 기반 다국어**(예: `/en/about`) 도입 시 `hreflang` 적용 권장

### 3.3 JSON 기반 렌더링 시 유의사항

- **중요 콘텐츠는 첫 HTML에 포함**: 제목, 요약, 핵심 문구를 서버에서 렌더링하면 크롤링에 유리
- **메타는 반드시 서버**: 현재처럼 `metadata` / `generateMetadata` 사용 유지
- **동적 데이터**: API/JSON으로 채우는 부분은 가능하면 SSR/SSG로 첫 HTML에 넣거나, 최소한 스켈레톤/제목이라도 서버에서 출력

### 3.4 추가 권장

- **sitemap.xml**: 이미 생성됨. 배포 후 Search Console에 제출
- **robots.txt**: `/admin`, `/api` 차단 유지
- **프로덕션 도메인**: `NEXT_PUBLIC_SITE_URL`을 실제 도메인으로 설정 후 빌드

---

## 4. 환경 변수

프로덕션에서 캐노니컬/OG URL이 올바르게 나오도록 설정:

```env
NEXT_PUBLIC_SITE_URL=https://daiyangecotech.com
```

(실제 도메인으로 변경하여 사용)

---

## 5. OG 이미지

소셜 공유용 이미지는 `public/og-image.jpg` (1200×630 권장)를 두면 됩니다.

경로는 `src/lib/seo.ts`의 `SEO.ogImagePath`에서 `/og-image.jpg`로 설정되어 있습니다.
