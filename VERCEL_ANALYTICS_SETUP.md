# Vercel Analytics 설정 가이드

## 🔧 환경 변수 설정

실제 Vercel Analytics 데이터를 사용하려면 다음 환경 변수를 설정해야 합니다:

### 1. `.env.local` 파일에 추가

```bash
# Vercel Analytics API 설정
VERCEL_ACCESS_TOKEN=your_vercel_access_token_here
VERCEL_PROJECT_ID=your_project_id_here
VERCEL_TEAM_ID=your_team_id_here  # 팀 계정인 경우만 필요
```

### 2. Vercel Access Token 생성

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. Settings → Tokens → Create Token
3. Token 이름 입력 (예: "Analytics Dashboard")
4. Scope 선택:
   - `analytics:read` - Analytics 데이터 읽기 권한
   - `project:read` - 프로젝트 정보 읽기 권한
5. 생성된 토큰을 `VERCEL_ACCESS_TOKEN`에 입력

### 3. Project ID 찾기

1. Vercel Dashboard에서 프로젝트 선택
2. Settings → General → Project ID 복사
3. `VERCEL_PROJECT_ID`에 입력

### 4. Team ID 찾기 (팀 계정인 경우)

1. Vercel Dashboard → Team Settings
2. General → Team ID 복사
3. `VERCEL_TEAM_ID`에 입력

## 🚀 사용 방법

### 개발 환경

```bash
# 환경 변수 설정 후 개발 서버 실행
pnpm dev
```

### 프로덕션 환경

Vercel 대시보드에서 환경 변수 설정:

1. Project Settings → Environment Variables
2. 위의 환경 변수들을 Production 환경에 추가

## 📊 데이터 구조

API는 다음 형식의 데이터를 반환합니다:

```typescript
interface AnalyticsDataPoint {
  date: string // YYYY-MM-DD 형식
  desktop: number // 데스크톱 방문자 수
  mobile: number // 모바일 방문자 수
}
```

## 🔄 폴백 시스템

환경 변수가 설정되지 않았거나 API 호출이 실패하는 경우:

1. 더미 데이터가 자동으로 표시됩니다
2. 대시보드는 정상적으로 작동합니다
3. 콘솔에 경고 메시지가 출력됩니다

## 🛠️ 문제 해결

### API 호출 실패 시

1. **토큰 권한 확인**: Analytics 읽기 권한이 있는지 확인
2. **Project ID 확인**: 올바른 프로젝트 ID인지 확인
3. **네트워크 확인**: Vercel API 접근이 가능한지 확인

### 데이터가 표시되지 않는 경우

1. **Analytics 활성화**: 프로젝트에서 Analytics가 활성화되어 있는지 확인
2. **충분한 데이터**: 최소 몇 일의 방문 데이터가 있는지 확인
3. **시간 범위**: 적절한 시간 범위가 선택되었는지 확인

## 📈 추가 기능

### 실시간 업데이트

```typescript
// 5분마다 자동 갱신
const { data } = useAnalyticsData(timeRange, {
  refetchInterval: 5 * 60 * 1000,
})
```

### 캐싱 설정

```typescript
// 캐시 시간 조정 (기본: 5분)
staleTime: 10 * 60 * 1000 // 10분
```

## 💡 팁

1. **개발 환경**: `.env.local` 사용
2. **프로덕션**: Vercel 환경 변수 사용
3. **보안**: 토큰을 코드에 직접 넣지 마세요
4. **모니터링**: 콘솔 로그로 API 호출 상태 확인

## 🔗 관련 링크

- [Vercel Analytics API 문서](https://vercel.com/docs/analytics/api)
- [Vercel Access Token 생성](https://vercel.com/account/tokens)
- [프로젝트 설정](https://vercel.com/docs/projects/overview)
