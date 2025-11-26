아래는 **시그널 디스틸러 AI** 프로젝트의 **기술 스택·아키텍처만**을 보다 상세하게 정리한 내용입니다.
(PRD에 그대로 붙여 넣을 수 있도록 문어체 + 개요식으로 작성했습니다.)

---

## 〈부록〉 기술 스택 및 아키텍처 상세

### 1. 전체 아키텍처 개요

* 아키텍처 형태

  * **Next.js 풀스택 단일 애플리케이션**을 기준으로 한다.
  * 프론트엔드, 백엔드(API), 서버 사이드 렌더링(SSR)을 모두 Next.js(App Router) 상에서 처리한다.
* 주요 컴포넌트

  * **프론트엔드 UI 레이어**: Next.js App Router, React Server/Client Components
  * **백엔드/API 레이어**: Next.js Route Handlers 및 Server Actions
  * **데이터 레이어**: Supabase(PostgreSQL)를 이용한 영속 데이터 저장
  * **AI 레이어**: LLM 및 임베딩 API 연동을 통한 요약·설명·클러스터링

---

### 2. 프론트엔드

#### 2.1 프레임워크 및 언어

* **Next.js (App Router 기반, 최신 버전)**

  * App Router(`app/` 디렉터리)를 활용하여 페이지·레이아웃·라우트를 구성한다.
  * React Server Components(RSC)와 Client Components를 혼합 사용한다.
* **언어**

  * **TypeScript**를 기본 언어로 사용한다.
  * 컴포넌트, 서버 로직, 유틸리티 모듈 모두 타입 정의를 원칙으로 한다.

#### 2.2 UI 라이브러리 및 스타일링

* **스타일링**

  * **Tailwind CSS**를 기본 스타일링 도구로 사용한다.
  * 디자인 토큰(색상, 폰트 크기, 여백 등)은 Tailwind 설정에서 일관되게 관리한다.
* **UI 컴포넌트**

  * 필요 시 **Headless UI / Radix 기반 컴포넌트 라이브러리**(예: shadcn/ui)를 도입한다.
  * 모달, 드롭다운, 탭, 다이얼로그 등 패턴화된 요소는 재사용 가능한 컴포넌트로 분리한다.
* **차트/시각화**

  * 초기에는 **간단한 SVG/Canvas 기반 차트 라이브러리**(예: Recharts 또는 Chart.js)를 검토한다.
  * 필수 시각화 항목: 단계별 신호 수 변화, Score 분포, AI vs 인간 평가 비교 등.

#### 2.3 라우팅 구조 (예시)

* `app/page.tsx`

  * 루트 페이지. `/dashboard`로 리다이렉트하거나 간단한 소개 화면을 제공한다.
* `app/dashboard/page.tsx`

  * 주간 Distilled Signal, 증류 플로우, 평가 패널을 포함한 메인 대시보드.
* `app/experiments/page.tsx`

  * AI vs 인간 평가 비교, 불일치 사례 리스트 등 실험 결과용 화면.
* `app/admin/ingest/page.tsx`

  * 데이터 업로드/입력용 내부 관리 화면.
* `app/admin/distill/page.tsx`

  * “이번 주 신호 증류하기” 버튼 및 로그 확인용 화면.

---

### 3. 백엔드/API 레이어

#### 3.1 Next.js Route Handlers

* `app/api/signals/ingest/route.ts`

  * Raw 신호 입력용 API 엔드포인트.
  * CSV 업로드, 단일 레코드 입력 등을 처리한다.
* `app/api/signals/distill/route.ts`

  * 증류 파이프라인 실행 트리거.
  * 주단위 데이터 조회 → 필터링 → Score 계산 → Distilled Signal 생성까지를 수행한다.
* `app/api/feedback/route.ts`

  * Distilled Signal에 대한 사용자 평가(점수, 코멘트)를 수신·저장한다.
* `app/api/metrics/route.ts`

  * 대시보드에서 사용할 통계 데이터(단계별 신호 수, 평가 분포 등)를 반환한다.

#### 3.2 Server Actions

* 대시보드 내 특정 인터랙션(예: “이번 주 신호 증류하기”, “평가 제출”)은
  **Server Actions**를 통해 직접 서버 로직을 호출하는 방식을 병행한다.
* 장점

  * 클라이언트에서 별도 fetch 코드 작성 없이 폼/버튼 액션으로 서버 함수를 호출할 수 있다.
  * Supabase 서버 클라이언트를 Server Action 안에서 안전하게 사용할 수 있다.

---

### 4. 데이터 레이어 – Supabase / PostgreSQL

#### 4.1 Supabase 사용 범위

* **DB(필수)**

  * 모든 신호, 요약, Score, 평가 데이터를 PostgreSQL에 저장한다.
* **Auth(선택)**

  * 초기에는 내부 프로젝트 성격이므로 간단한 비밀번호 또는 토큰 기반 보호만 적용한다.
  * 외부 사용자 확장 시 Supabase Auth 도입을 검토한다.
* **Storage(선택)**

  * 필요 시 시각화 결과 이미지, 리포트 파일 등을 저장하는 용도로 사용한다.

#### 4.2 주요 테이블 구조 (요약)

* `signals_raw`

  * 수집된 원천 데이터(지표형, 뉴스형, 포트폴리오형 등)를 저장한다.
* `signals_processed`

  * 요약·정규화·Score 계산 이후의 중간 결과를 저장한다.
* `signals_distilled`

  * 주 단위 최종 Distilled Signal을 저장한다.
* `feedback`

  * Distilled Signal에 대한 인간 평가(점수, 코멘트)를 저장한다.

#### 4.3 마이그레이션 관리

* Supabase CLI 또는 `supabase/migrations` 디렉터리를 활용하여
  **DDL을 SQL 파일 단위로 버전 관리**한다.
* 모든 스키마 변경은 마이그레이션 파일을 통해 적용하며,
  수동 변경은 지양한다.

#### 4.4 RLS(Row Level Security) 정책

* 초기(내부 사용) 단계에서는 개발 속도를 고려하여 RLS를 비활성화하거나 최소한으로 적용한다.
* 외부 사용자 도입 시

  * 사용자별 신호·평가 데이터 분리를 위해 RLS 정책을 설계한다.
  * 예: `user_id = auth.uid()` 조건을 기반으로 데이터 접근을 제한한다.

---

### 5. AI 레이어

#### 5.1 LLM 요약·설명

* 사용 목적

  * 뉴스·리포트·커뮤니티 텍스트를 **1~3줄 요약**으로 변환.
  * Distilled Signal에 대한 **자연어 설명 2~3줄** 생성.
* 아키텍처

  * Next.js 서버(백엔드)에서 LLM API를 호출한다.
  * API Key는 **서버 환경 변수**로만 관리하며, 클라이언트에 노출하지 않는다.
* 구현 형태

  * `lib/ai/llm.ts` 등으로 래퍼 모듈을 구성하여,
    요약, 설명 생성, 문장 톤 조정 등을 일관된 인터페이스로 제공한다.

#### 5.2 임베딩 및 클러스터링(선택)

* 필요 시 다음을 도입한다.

  * 텍스트 임베딩 API를 활용하여 신호 간 유사도를 계산한다.
  * 유사 이슈/테마를 클러스터링하여 하나의 그룹으로 통합한다.
* 저장 방식

  * Supabase의 `vector` 컬럼 타입을 사용하여 임베딩 벡터를 저장할 수 있다.
* 활용 예

  * “같은 이슈가 반복 등장하는지”를 정량화하여 Score에 반영
  * 유사 이슈들을 하나의 클러스터 카드로 묶어 대시보드에 노출

---

### 6. 배포 및 환경 구성

#### 6.1 배포 환경

* **Vercel**을 기본 배포 대상 플랫폼으로 가정한다.

  * Next.js와의 높은 호환성 및 SSR/Edge 기능 지원.
* 대체

  * 필요 시 자체 서버 또는 다른 클라우드 환경으로 이전 가능하다(예: Docker 기반).

#### 6.2 환경 변수 관리

* LLM API 키, Supabase URL/Key 등 민감 정보는 `.env` 또는 Vercel 환경 변수 설정을 통해 관리한다.
* 환경 변수 예시

  * `NEXT_PUBLIC_SUPABASE_URL` (공개 키)
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  * `SUPABASE_SERVICE_ROLE_KEY` (서버 전용, 클라이언트에 노출 금지)
  * `LLM_API_KEY` (OpenAI/Gemini 등)

#### 6.3 빌드·런타임

* 빌드

  * `next build`를 통해 정적 분석 및 번들 생성.
* 런타임

  * `next start` 혹은 Vercel 서버리스 환경을 활용한 배포.

---

### 7. 테스트 및 품질 관리

#### 7.1 테스트 전략

* **유닛 테스트**

  * Score 계산 로직, 필터링 로직 등 순수 함수 중심으로 Jest 등으로 테스트한다.
* **통합 테스트**

  * 증류 파이프라인(원천 데이터 → 최종 Distilled Signal까지)의 end-to-end 테스트는 선택적으로 작성한다.
* **UI 테스트(선택)**

  * 핵심 상호작용(평가 버튼, 증류 실행 버튼 등)에 대해 간단한 E2E 테스트(Cypress, Playwright 등)를 검토한다.

#### 7.2 로깅 및 모니터링

* **로깅**

  * API 호출 실패, LLM 오류, DB 에러 등은 서버 로그로 기록한다.
* **분석**

  * 추후 필요 시 간단한 사용 로그(페이지 뷰, 버튼 클릭 등)를 추가하여,
    어떤 기능이 실제로 사용되는지 관찰할 수 있도록 한다.

---

### 8. 개발 워크플로우

* 코드 관리

  * Git 기반 브랜치 전략(예: `main` + `feature/*`)을 사용한다.
* 협업 방식

  * 박찬영: 거시·지수 관련 로직, Score 항목 정의, 데이터 해석 관련 문서 작성 중심.
  * 지민성: Next.js/Supabase 기반 개발, UI/UX 구현, API 연동 로직 구현 중심.
* 문서화

  * PRD, ERD, API 스펙, 주요 알고리즘 설명은 동일 저장소의 `docs/` 또는 Notion에 정리한다.

---

위 내용은 **시그널 디스틸러 AI** 프로젝트의 “기술 스택 및 아키텍처” 부분만을 상세화한 것입니다.