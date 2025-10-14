# AnotherDoctor 홈페이지 (어나더닥터)

AI 기반 치아 색상 측정 솔루션 **T-GRID** 를 제공하는 어나더닥터(AnotherDoctor)의 공식 웹사이트입니다.
마케팅 랜딩, 다국어 콘텐츠, 뉴스룸, 관리자 도구를 통합해 한 곳에서 운영하도록 설계되었습니다.

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [기술 스택](#기술-스택)
3. [폴더 구조](#폴더-구조)
4. [빠른 시작](#빠른-시작)
5. [환경 변수](#환경-변수)
6. [주요 기능](#주요-기능)
7. [개발 편의 명령어](#개발-편의-명령어)
8. [데이터베이스 & 관리자 계정](#데이터베이스--관리자-계정)
9. [배포 가이드](#배포-가이드)
10. [코딩 컨벤션 및 도구](#코딩-컨벤션-및-도구)

---

## 프로젝트 개요

- **플랫폼**: Next.js 15 App Router 기반 SSR/ISR 하이브리드 사이트
- **다국어 지원**: `next-intl` 과 커스텀 `middleware` 를 이용해 한국어/영어 라우팅 자동 처리
- **콘텐츠 관리**: 관리자 전용 `/admin` 공간에서 뉴스, 배너 리소스 등을 관리
- **외부 연동**:
  - Supabase Storage (이미지 업로드)
  - Google Analytics Data API (관리자 대시보드 통계)
  - NAVER/Google 검색 인증 메타 태그

## 기술 스택

| 분류 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 15 (App Router), React 19 |
| 언어/타이핑 | TypeScript 5 |
| 스타일링 | Tailwind CSS 4 (PostCSS 플러그인 기반), CSS Variables |
| 상태 & 데이터 | TanStack Query, React Hook Form, Zod |
| 데이터베이스 | PostgreSQL + Prisma (Accelerate 지원) |
| 인증/보안 | NextAuth (Credentials), bcryptjs |
| 파일 스토리지 | Supabase Storage (`images` 버킷) |
| 분석/계측 | Google Analytics Data API, @vercel/analytics, @vercel/speed-insights |
| 배포 | Vercel (Production/Preview) |

## 폴더 구조

```
homepage/
├── app/                     # App Router 엔트리 (국제화 라우트, API, 관리자)
│   ├── (admin)/admin        # 관리자 UI (보호된 라우트)
│   ├── [locale]/…           # ko/en 다국어 페이지
│   └── api/[…]/route.ts     # 서버 액션 & REST API
├── prisma/                  # Prisma 스키마 및 마이그레이션
├── public/                  # 정적 에셋 (이미지, 폰트 등)
├── scripts/                 # 로컬/배포 자동화 스크립트 (예: env 필터링)
└── src/
    ├── app/                 # 글로벌 레이아웃/프로바이더
    ├── entities/            # 도메인 단위 UI 컴포넌트
    ├── features/            # 특정 기능 단위 모듈
    ├── widgets/             # 페이지 조립을 위한 섹션 컴포넌트
    ├── shared/              # 공용 유틸, API 클라이언트, hooks, lib
    ├── i18n/                # 로케일 라우팅 및 번역 정의
    └── generated/           # Prisma Client (빌드 시 생성)
```

> `src/shared/lib/db.ts` 에서 Prisma Client를 재사용하고, `src/shared/lib/auth.ts` 에서 관리자 인증 로직을 제공합니다.

## 빠른 시작

### 1. 사전 요구사항

- Node.js 20+
- pnpm 10 (프로젝트에 명시된 버전을 사용하세요)
- PostgreSQL (로컬 혹은 클라우드)
- Supabase 프로젝트 (Storage `images` 버킷 필요)

### 2. 개발용 설치

```bash
git clone <repository-url>
cd homepage
pnpm install
```

> `pnpm` 대신 다른 패키지 매니저 사용은 권장되지 않습니다. (lock-file 및 workspace 설정 차이)

### 3. 환경 변수 준비

필수 변수는 [환경 변수](#환경-변수) 항목을 참고해 `.env.local` 에 추가하세요.

### 4. 데이터베이스 마이그레이션

```bash
pnpm prisma migrate dev
pnpm prisma generate
```

필요 시 `pnpm prisma studio` 로 관리자 계정을 직접 생성합니다. (자세한 절차는 아래 참고)

### 5. 개발 서버 실행

```bash
pnpm dev    # Turbopack 기반 개발 서버 (http://localhost:3000)
```

---

## 환경 변수

| 키 | 설명 |
| --- | --- |
| `DATABASE_URL` | PostgreSQL 접속 URL (Prisma 기본 연결) |
| `DIRECT_URL` | (선택) Prisma Accelerate용 Direct URL |
| `NEXTAUTH_SECRET` | NextAuth JWT 서명 키 |
| `NEXT_PUBLIC_APP_URL` | 공개용 사이트 기본 URL (메일, 링크 생성 등에 사용) |
| `NEXT_PUBLIC_NAVER_SITE` | 네이버 사이트 소유권 검증 코드 |
| `NEXT_PUBLIC_GA_ID` | GA 측정 ID (`G-XXXX` 형식) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key (클라이언트 업로드용) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key (서버 업로드용) |
| `GOOGLE_ANALYTICS_PROPERTY_ID` | Google Analytics Data API에서 조회할 Property ID |
| `GOOGLE_ANALYTICS_PRIVATE_KEY` | GA 서비스 계정 Private Key (`\n` 포함 시 이스케이프 필요) |
| `GOOGLE_ANALYTICS_CLIENT_EMAIL` | GA 서비스 계정 이메일 |
| `GOOGLE_ANALYTICS_PROJECT_ID` | GA 서비스 계정 프로젝트 ID |

추가로 Vercel 배포 시 `vercel env pull` → `node scripts/filter-env.js direct` 명령으로
시스템 변수를 제외한 `.env` 파일을 자동 생성하도록 구성되어 있습니다.

---

## 주요 기능

- **다국어 라우팅**: `middleware.ts` 와 `next-intl` 을 통해 `/ko`, `/en` 하위 URL 자동 전환
- **SEO & 퍼포먼스**: `app/robots.ts`, `app/sitemap.ts`, 구조화 데이터 메타 태그, OpenGraph 설정
- **Supabase 업로드**: 관리자에서 이미지 업로드 시 `images` 버킷에 저장하고 공개 URL을 반환
- **뉴스룸**: Prisma 모델(`News`) 기반으로 다국어 뉴스 리스트/세부 페이지 제공
- **관리자 대시보드**:
  - `NextAuth` Credentials 로그인 (`/admin/login`)
  - Google Analytics API로 주요 지표 조회
  - 드래그앤드롭, 리치 텍스트(TinyMCE), Radix UI로 편의성 향상
- **실시간 계측**: Vercel Analytics 및 Speed Insights 통합

---

## 개발 편의 명령어

| 명령어 | 설명 |
| ------ | ---- |
| `pnpm dev` | Turbopack 개발 서버 실행 |
| `pnpm build` | 프로덕션 빌드 (Prisma generate 포함) |
| `pnpm start` | 로컬 프로덕션 서버 (빌드 후) |
| `pnpm lint` | Next.js + ESLint 규칙 검사 |
| `pnpm prisma migrate dev` | 개발 데이터베이스 마이그레이션 |
| `pnpm prisma studio` | Prisma Studio 실행 (DB GUI) |
| `pnpm env:pull:preview` / `pnpm env:pull:prod` | Vercel 환경 변수 동기화 |

---

## 데이터베이스 & 관리자 계정

Prisma 스키마 (`prisma/schema.prisma`) 에는 `News`, `Administrator` 모델이 정의되어 있습니다.

1. **마이그레이션 적용** 후 `pnpm prisma studio` 로 DB에 접속합니다.
2. `Administrator` 테이블에 새 레코드를 만들고 `passwordHash` 컬럼에는 `bcryptjs` 로 해시한 값을 입력합니다.
   ```ts
   import { hash } from 'bcryptjs';
   console.log(await hash('your-password', 12));
   ```
3. 생성된 계정으로 `/admin/login` 에서 로그인하면 관리자 패널에 접근할 수 있습니다.

Supabase Storage는 `images` 버킷이 공개(read) 가능하도록 설정되어 있어야 하며,
Service Role Key는 서버 전용 API 라우트에서만 사용되니 노출에 주의하십시오.

---

## 배포 가이드

1. `pnpm build` 로 빌드가 통과하는지 확인합니다.
2. Vercel 프로젝트와 연결한 뒤, 위 [환경 변수](#환경-변수)를 Preview/Production 모두에 설정합니다.
3. Supabase Storage, GA 서비스 계정, Prisma 데이터베이스 접근 권한이 프로덕션 환경과 일치하는지 검증합니다.
4. `vercel --prod` 혹은 GitHub PR → Production Promotion 방식으로 배포합니다.

> Vercel Analytics/Speed Insights는 자동으로 활성화되며 추가 설정이 필요 없습니다.

---

## 코딩 컨벤션 및 도구

- **Lint/Format**: ESLint 9 + Prettier 3 (`prettier-plugin-tailwindcss`)
- **스타일 가이드**: Tailwind CSS 4 (디자이너 정의 토큰은 `src/shared/styles` 참고)
- **유닛 테스트**: 현재 별도 테스트 도구는 도입되어 있지 않습니다.
- **커밋/PR**: 기능 단위 브랜치를 권장하며, 빌드/린트 통과 후 PR 생성

---

> ⓒ AnotherDoctor. 본 저장소는 내부 전용 프로젝트이며 무단 복제/배포를 금합니다.
