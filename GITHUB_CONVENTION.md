
# GITHUB_CONVENTION.md

## 1. 저장소 목적

본 저장소는 **시그널 디스틸러 AI** 프로젝트의 소스 코드, 기술 문서, 실험 결과를 관리하기 위한 GitHub 리포지토리이다.  
PRD.md, TECH.md, AGENTS.md 등의 문서를 기준으로 기능 개발·실험·리팩터링을 일관된 방식으로 관리한다.

---

## 2. 브랜치 전략

### 2.1 기본 브랜치

- `main`
  - 항상 배포 가능한 상태를 유지한다.
  - PR 리뷰를 거친 코드만 머지한다.
  - 프로덕션 빌드 기준 브랜치로 사용한다.

### 2.2 기능 브랜치

- 네이밍 규칙

  ```text
  feature/<짧은-기능-설명>
  fix/<버그-설명>
  experiment/<실험-주제>
  docs/<문서-주제>
  ```

* 예시

  * `feature/dashboard-flow`
  * `feature/score-calculation`
  * `fix/llm-timeout`
  * `experiment/vix-threshold-tuning`
  * `docs/add-tech-appendix`

### 2.3 브랜치 운영 원칙

* `main` 브랜치에 직접 푸시는 지양하고, **반드시 PR을 통해 머지**한다.
* 기능 단위로 작은 브랜치를 생성하고, 작업이 완료되면 해당 브랜치를 삭제한다.
* 한 브랜치는 **하나의 목적(기능/버그/문서 등)에 집중**한다.

---

## 3. 커밋 메시지 규칙

### 3.1 형식

가능한 한 **Conventional Commits** 스타일을 간소화하여 사용한다.

```text
<type>: <변경 요약>

body (선택)
```

* `type` 목록

  * `feat`  : 새로운 기능 추가
  * `fix`   : 버그 수정
  * `refactor` : 리팩터링(기능 변화 없음)
  * `docs`  : 문서 수정(PRD, TECH, AGENTS 등)
  * `chore` : 빌드, 설정, 기타 유지보수 작업
  * `test`  : 테스트 코드 추가/수정
  * `style` : 코드 스타일/포맷 변경(로직 변경 없음)

### 3.2 예시

```text
feat: 대시보드 주간 신호 카드 UI 구현
fix: Supabase 연결 시 환경변수 누락 오류 수정
refactor: score 계산 유틸 함수 분리
docs: PRD에 3주차 불일치 실험 내용 추가
chore: lint 및 prettier 설정 업데이트
```

* 커밋 메시지는 한국어를 기본으로 작성하되, **짧고 명확하게** 변경 사항을 설명한다.
* 하나의 커밋에는 하나의 논리적인 변경만 포함하는 것을 원칙으로 한다.

---

## 4. PR(Pull Request) 규칙

### 4.1 PR 제목

* 기본적으로 **첫 번째 커밋의 type + 요약**을 따른다.
* 예시

  * `feat: 증류 플로우 단계별 통계 API 구현`
  * `fix: 대시보드 로딩 상태에서 빈 화면 출력 문제 수정`

### 4.2 PR 본문 템플릿 (권장)

```markdown
## 개요
- 이번 PR의 목적과 배경을 간단히 설명한다.

## 주요 변경 사항
- 변경 1
- 변경 2
- ...

## 테스트
- [ ] 로컬에서 기본 기능 동작 확인
- [ ] 주요 페이지(대시보드, admin) 렌더링 확인
- 기타 확인 내용이 있다면 기재

## 기타
- 리뷰 시 특히 봐주었으면 하는 부분
```

### 4.3 리뷰 원칙

* 가능한 한 **1~2명 리뷰 후 머지**를 원칙으로 한다. (소규모 팀일 경우 상대방 1인 확인)
* 코드 리뷰 시 다음을 우선적으로 확인한다.

  * PRD.md / TECH.md에 정의된 요구사항과 기술 방향에 부합하는지
  * 불필요한 복잡도, 중복 코드, 과도한 하드코딩이 없는지
  * 에러 처리 및 엣지 케이스에 대한 최소한의 고려가 있는지

---

## 5. 디렉터리 구조 관례(요약)

(자세한 내용은 TECH.md 참고)

* `app/`

  * Next.js App Router 페이지 및 레이아웃
  * `app/dashboard`, `app/admin`, `app/experiments` 등 주요 화면
* `lib/`

  * 비즈니스 로직, 유틸 함수, API 래퍼
  * 예: `lib/signals/`, `lib/ai/`, `lib/supabase/`
* `supabase/`

  * DB 스키마, 마이그레이션 파일
* `docs/`

  * PRD.md, TECH.md, GITHUB_CONVENTION.md, AGENTS.md 등 문서

---

## 6. Issue 사용 규칙 (선택)

* 가능하다면 이슈를 사용하여 작업 단위를 관리한다.
* 이슈 제목 예시

  * `[feat] Distilled Signal 주간 요약 카드 구현`
  * `[experiment] VIX 기준 상향에 따른 Score 변화 테스트`
* 이슈 본문에는

  * 배경/목적
  * 할 일(To-do)
  * 예상 결과
    를 간단히 정리한다.

---

## 7. 코드 스타일

* 타입스크립트, React, Next.js 스타일은 프로젝트의 ESLint/Prettier 설정에 따른다.
* 새로운 파일을 만들 때는 **기존 파일 스타일을 우선 참고**한다.
* 함수/컴포넌트 이름은 역할이 드러나도록 작성한다.

  * 예: `calculateScoreOfRelevance`, `DistilledSignalCard` 등