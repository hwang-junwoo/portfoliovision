# CLAUDE.md - AI 어시스턴트를 위한 프로젝트 가이드

> 이 문서는 Claude 또는 다른 AI 어시스턴트가 프로젝트 상황을 빠르게 파악하고 효과적으로 도움을 줄 수 있도록 작성되었습니다.

**최종 업데이트**: 2025-11-23 17:20
**프로젝트 상태**: Phase 1 프론트엔드 UI 주요 기능 완성 (80%) - 거래 내역 및 차트 남음

---

## 🎯 프로젝트 개요

### 프로젝트명
**PortfolioVision** - AI 기반 ETF 포트폴리오 관리 및 투자 인텔리전스 플랫폼

### 목적
- **주 목적**: 개인 학습 및 포트폴리오용 프로젝트
- **사용자**: 본인 (해외 ETF 투자자)
- **상용화 계획**: 없음 (개인용)

### 핵심 가치
해외 ETF 투자자를 위한 올인원 포트폴리오 관리 대시보드
- 실시간 가격 모니터링
- 경제 뉴스 수집 및 분석
- 기술적 지표 분석
- AI 기반 투자 인사이트 (선택사항)

---

## 💰 중요: 비용 전략

### 무료로 진행 (우선)
사용자가 **무료로 먼저 완성**하고 싶어 함
- Phase 1, 2, 4, 5는 완전 무료
- 모든 핵심 기능 무료로 제공

### AI 기능 (선택사항, 나중에)
- Phase 3 (AI 인사이트)는 **선택사항**
- Claude API 사용 시 월 ₩2,000~30,000 추가 비용
- **중요**: Claude Pro 구독과 별개로 API 과금
- AI 추가가 쉽도록 아키텍처 설계는 미리 해둘 것

---

## 📋 현재 프로젝트 상태

### 완료된 작업 ✅

#### Phase 0: 초기 설정 (2025-11-15 완료)
1. ✅ **프로젝트 기획 완료** (PROJECT_PLAN.md)
   - 5개 Phase 로드맵 (12주)
   - 무료/유료 기능 명확히 구분
   - 기술 스택 선정 완료

2. ✅ **문서 작성 완료**
   - README.md: 프로젝트 소개
   - PROJECT_PLAN.md: 상세 기획서 (한글)
   - PROJECT_STRUCTURE.md: 디렉토리 구조
   - SETUP_GUIDE.md: 개발 환경 설정 가이드
   - .gitignore: Git 제외 파일

3. ✅ **디렉토리 구조 생성**
   - frontend/, backend/, database/, scripts/, docs/ 생성
   - 각 디렉토리별 README.md 작성

4. ✅ **백엔드 초기화 완료**
   - FastAPI 프로젝트 구조 설정
   - main.py, config.py, database.py 생성
   - requirements.txt 작성 (무료 라이브러리만)
   - .env.example 환경 변수 템플릿
   - pytest 테스트 설정
   - 커밋: `6131e92 - feat(backend): FastAPI 백엔드 초기 설정`

5. ✅ **프론트엔드 초기화 완료**
   - Next.js 16 + TypeScript 프로젝트 생성
   - Tailwind CSS 4 설정
   - React Query, Zustand, Chart.js 설치
   - API 클라이언트 설정 (axios)
   - 메인 페이지 구현 (백엔드 헬스 체크)
   - 커밋: `72db8b7 - feat(frontend): Next.js 프론트엔드 초기 설정`

6. ✅ **Git 저장소 설정 완료**
   - 로컬 Git 저장소 초기화
   - GitHub 원격 저장소 연결
   - Repository: https://github.com/hwang-junwoo/portfoliovision
   - 브랜치: main
   - 총 4개 커밋 푸시 완료

#### Phase 1: 포트폴리오 관리 (2025-11-23 진행 중 - 80% 완료)

##### 백엔드 API (2025-11-16 완료)
1. ✅ **데이터베이스 설정 완료**
   - PostgreSQL 18 연결 및 설정
   - Alembic 마이그레이션 시스템 구축
   - 3개 테이블 생성: portfolios, etf_holdings, transactions
   - Foreign key 관계 및 인덱스 설정
   - 마이그레이션 파일: `0be2b47c48b0_create_initial_tables.py`

2. ✅ **SQLAlchemy 모델 작성 완료**
   - Portfolio 모델 (app/models/portfolio.py)
   - ETFHolding 모델 (app/models/etf_holding.py)
   - Transaction 모델 + TransactionType Enum (app/models/transaction.py)
   - Relationship 및 Cascade 설정

3. ✅ **Pydantic 스키마 작성 완료**
   - Portfolio 스키마 (Create/Update/Response/WithHoldings/Summary)
   - ETFHolding 스키마 (Create/Update/Response/WithValue)
   - Transaction 스키마 (Create/Update/Response/Summary)
   - Forward reference 처리 (TYPE_CHECKING)

4. ✅ **CRUD API 엔드포인트 개발 완료 (총 22개 라우트)**

   **Portfolios API** (`/api/v1/portfolios`)
   - POST / - 포트폴리오 생성
   - GET / - 목록 조회 (페이지네이션)
   - GET /{id} - 상세 조회
   - GET /{id}/with-holdings - 보유 종목 포함 조회
   - PUT /{id} - 수정 (부분 업데이트)
   - DELETE /{id} - 삭제 (cascade)

   **ETF Holdings API** (`/api/v1/etf-holdings`)
   - POST / - 종목 추가
   - GET /portfolio/{portfolio_id} - 포트폴리오별 조회
   - GET /{id} - 상세 조회
   - PUT /{id} - 수정
   - DELETE /{id} - 삭제

   **Transactions API** (`/api/v1/transactions`)
   - POST / - 거래 내역 추가 (total_amount 자동 계산)
   - GET /portfolio/{portfolio_id} - 포트폴리오별 조회 (필터링: ticker, type, date)
   - GET /{id} - 상세 조회
   - PUT /{id} - 수정
   - DELETE /{id} - 삭제

5. ✅ **API 테스트 완료**
   - test_api.py 스크립트 작성
   - 모든 엔드포인트 정상 작동 확인
   - API 문서: http://localhost:8000/api/docs
   - 커밋: `6b1f44b - feat(backend): Phase 1 포트폴리오 관리 API 완성`

##### 프론트엔드 UI (2025-11-23 진행 중 - 80% 완료)

1. ✅ **대시보드 레이아웃 구성**
   - Sidebar.tsx - 사이드바 네비게이션 (5개 메뉴)
   - Header.tsx - 헤더 (포트폴리오 선택 드롭다운)
   - DashboardLayout.tsx - 메인 레이아웃 컨테이너
   - 반응형 디자인 적용

2. ✅ **대시보드 페이지**
   - app/dashboard/page.tsx
   - 4개 요약 카드 (포트폴리오, 평가액, 수익률, 보유 종목)
   - 최근 활동 섹션
   - 빠른 시작 가이드

3. ✅ **포트폴리오 관리 UI**
   - 포트폴리오 목록 페이지 (React Query 연동)
   - CreatePortfolioModal.tsx - 생성 모달
   - 포트폴리오 상세 페이지 (app/portfolios/[id]/page.tsx)
   - 포트폴리오 삭제 기능

4. ✅ **ETF 종목 관리 UI**
   - AddETFHoldingModal.tsx - 종목 추가 모달
   - 보유 종목 테이블
   - 종목 삭제 기능
   - 예상 평가액 자동 계산

5. ⚠️ **거래 내역 페이지** (구조만 완성)
   - app/transactions/page.tsx (빈 페이지)
   - 필터 UI 구조
   - 요약 카드 구조

6. ✅ **홈페이지 업데이트**
   - "대시보드로 이동" / "포트폴리오 보기" 버튼
   - 백엔드 연결 상태 확인

7. ✅ **서버 실행 테스트**
   - 프론트엔드: http://localhost:3000 ✅
   - 백엔드: http://localhost:8000 ✅

### 현재 단계 📍
**Phase 1: 프론트엔드 UI 주요 기능 완성 (80%)**
- ✅ 백엔드 API 완전히 작동 (22개 엔드포인트)
- ✅ 데이터베이스 스키마 설정 완료
- ✅ 대시보드 레이아웃 완성 (사이드바, 헤더)
- ✅ 포트폴리오 CRUD UI 완성 (생성, 목록, 상세, 삭제)
- ✅ ETF 종목 관리 UI 완성 (추가, 삭제)
- ✅ React Query API 연동 및 캐싱
- ⚠️ 거래 내역 UI 미완 (구조만)
- ⚠️ 차트 시각화 미완
- ⚠️ 수정 기능 미완 (포트폴리오, ETF)

### 다음 할 일 ⏭️

#### Phase 1 남은 작업 (20%):
1. **거래 내역 CRUD UI** (최우선)
   - 거래 내역 테이블 구현 (React Query)
   - 거래 추가 모달 (매수/매도)
   - 필터링 (날짜, 티커, 유형)
   - 거래 수정/삭제 기능

2. **차트 및 시각화**
   - Chart.js 설치 및 설정
   - 포트폴리오 분포 파이 차트
   - 종목별 비중 표시

3. **수정 기능 추가**
   - 포트폴리오 수정 모달
   - ETF 종목 수정 모달

4. **UX 개선**
   - 로딩 스피너 추가
   - 토스트 알림 (react-hot-toast)
   - 에러 바운더리

---

## 🚀 기술 스택

### 프론트엔드
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Chart.js, Dygraphs
- **State**: Zustand
- **Data Fetching**: TanStack Query (React Query)

### 백엔드
- **Framework**: Python FastAPI
- **Language**: Python 3.9+
- **Database**: PostgreSQL 16+ + TimescaleDB
- **ORM**: SQLAlchemy
- **Migration**: Alembic
- **Data**: pandas, yfinance, pandas-ta
- **News**: feedparser (RSS)
- **AI**: anthropic (Claude API) - Phase 3, 선택사항

### 인프라
- **개발**: 로컬 (완전 무료)
- **프로덕션** (향후): Vercel + Railway/Render (무료 티어)

---

## 📂 프로젝트 구조

```
portfoliovision/
├── frontend/                    ✅ Next.js 16 + TypeScript
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   │   ├── layout.tsx      # 루트 레이아웃
│   │   │   ├── page.tsx        # 메인 페이지
│   │   │   └── globals.css
│   │   ├── lib/                # 유틸리티
│   │   │   ├── api.ts          # axios API 클라이언트
│   │   │   └── utils.ts        # Tailwind 유틸
│   │   └── providers/
│   │       └── query-provider.tsx  # React Query
│   ├── package.json            # 의존성 (React Query, Zustand, Chart.js 등)
│   └── .env.local.example
│
├── backend/                     ✅ FastAPI + Python
│   ├── alembic/                # ✅ Alembic 마이그레이션
│   │   ├── versions/
│   │   │   └── 0be2b47c48b0_create_initial_tables.py
│   │   └── env.py
│   ├── app/
│   │   ├── main.py             # ✅ FastAPI 진입점 (라우터 등록)
│   │   ├── config.py           # ✅ 환경 설정 (get_allowed_origins)
│   │   ├── database.py         # ✅ PostgreSQL 연결
│   │   ├── dependencies.py     # ✅ 의존성 주입 (get_db)
│   │   ├── models/             # ✅ SQLAlchemy 모델
│   │   │   ├── portfolio.py   # Portfolio 모델
│   │   │   ├── etf_holding.py # ETFHolding 모델
│   │   │   └── transaction.py # Transaction 모델
│   │   ├── schemas/            # ✅ Pydantic 스키마
│   │   │   ├── portfolio.py   # Portfolio 스키마
│   │   │   ├── etf_holding.py # ETFHolding 스키마
│   │   │   └── transaction.py # Transaction 스키마
│   │   ├── routers/            # ✅ API 라우터
│   │   │   ├── portfolios.py  # 포트폴리오 CRUD
│   │   │   ├── etf_holdings.py# ETF 종목 CRUD
│   │   │   └── transactions.py# 거래 내역 CRUD
│   │   ├── services/           # 비즈니스 로직 (향후)
│   │   └── utils/              # 유틸리티 (향후)
│   ├── tests/
│   │   └── test_main.py        # 기본 테스트
│   ├── test_api.py             # ✅ API 테스트 스크립트
│   ├── requirements.txt        # ✅ Python 의존성 (업데이트)
│   ├── alembic.ini             # ✅ Alembic 설정
│   └── .env                    # ✅ 환경 변수 (실제 DB 비밀번호)
│
├── database/                    # DB 스크립트
│   ├── migrations/             # (alembic으로 대체)
│   └── seeds/                  # 초기 데이터 (향후)
│
├── docs/                       # 추가 문서
├── scripts/                    # 유틸리티 스크립트
│
├── .gitignore                  ✅
├── README.md                   ✅
├── PROJECT_PLAN.md             ✅
├── PROJECT_STRUCTURE.md        ✅
├── SETUP_GUIDE.md              ✅
└── CLAUDE.md                   ✅ (이 파일)
```

### 실행 가능한 서버
- **백엔드**: `cd backend && uvicorn app.main:app --reload` (포트 8000)
- **프론트엔드**: `cd frontend && npm run dev` (포트 3000)
- **API 문서**: http://localhost:8000/api/docs
- **데이터베이스**: PostgreSQL 18 (포트 5432)

### API 엔드포인트 (총 22개)
- Portfolios: 6개 엔드포인트 (CRUD + with-holdings)
- ETF Holdings: 5개 엔드포인트 (CRUD + portfolio list)
- Transactions: 5개 엔드포인트 (CRUD + portfolio list with filters)
- 기타: 6개 (/, /health, /docs, /redoc, /openapi.json, /oauth2-redirect)

---

## 🗺️ 개발 로드맵 (12주)

### Phase 1: 포트폴리오 관리 (1-3주) 🔄 **← 현재 진행 중**
- ✅ 포트폴리오 CRUD API
- ✅ ETF 보유 종목 관리 API
- ✅ 거래 내역 기록 API
- ✅ 데이터베이스 스키마 설계 및 마이그레이션
- ⏭️ 기본 대시보드 UI **← 다음 단계**
- ⏭️ 포트폴리오 관리 UI
- ⏭️ ETF 종목 관리 UI
- ⏭️ 거래 내역 UI
- **비용**: 무료
- **진행 상태**: 백엔드 완료 (50%), 프론트엔드 시작 필요

### Phase 2: 경제 뉴스 (4-5주) ⬜
- RSS 피드 파서
- 뉴스 수집 자동화
- 뉴스 대시보드
- **비용**: 무료

### Phase 3: AI 인사이트 (6-8주) ⬜ **← 선택사항, 나중에**
- Claude API 통합
- 뉴스 감성 분석
- 포트폴리오 추천
- **비용**: 월 ₩2,000~30,000 (사용량 따라)

### Phase 4: 기술적 지표 (9-10주) ⬜
- pandas-ta 통합
- 이동평균, RSI, MACD 등
- 차트 시각화
- **비용**: 무료

### Phase 5: 실시간 기능 (11-12주) ⬜
- WebSocket 서버
- 실시간 가격 스트리밍
- 가격 알림
- **비용**: 무료

---

## 🎯 우선순위 (사용자 지정)

1. **포트폴리오 관리** (Phase 1) - 최우선
2. **경제 뉴스 수집** (Phase 2)
3. **AI 인사이트** (Phase 3) - **선택사항**
4. **기술적 지표** (Phase 4)
5. **실시간 가격** (Phase 5)

---

## 📖 주요 문서 참조

### 즉시 참조할 문서
1. **PROJECT_PLAN.md**: 전체 프로젝트 기획 (한글, 가장 상세)
2. **SETUP_GUIDE.md**: 개발 환경 설정 단계별 가이드
3. **PROJECT_STRUCTURE.md**: 디렉토리 및 파일 구조

### 필요시 참조
4. **README.md**: 프로젝트 소개 및 빠른 시작

---

## 💡 개발 시 주의사항

### 비용 관련
- ✅ 무료 기능 먼저 완성
- ✅ AI(Phase 3)는 나중에 추가 가능하도록 설계만
- ❌ AI API 키 설정은 Phase 3 시작할 때까지 미룸

### 아키텍처
- ✅ AI 서비스 레이어는 선택적으로 로드되도록 설계
- ✅ 환경 변수로 AI 기능 활성화/비활성화 가능하게
- ✅ AI 없어도 모든 핵심 기능 작동

### 코드 품질
- TypeScript/Python 타입 힌팅 철저히
- 컴포넌트/함수 재사용 최대화
- 테스트 작성 (pytest, Jest)

### 보안
- API 키는 절대 Git에 커밋 금지
- .env 파일 사용
- 민감한 금융 데이터 로깅 금지

---

## 🤖 Claude를 위한 가이드라인

### 작업 시작 전
1. **이 문서(CLAUDE.md) 먼저 읽기**
2. 현재 프로젝트 상태 확인
3. 작업이 어느 Phase에 해당하는지 파악
4. 무료/유료 기능 구분 확인

### 코드 작성 시
1. **무료 우선**: AI 관련 코드는 Phase 3 전까지 작성 안 함
2. **한글 주석**: 복잡한 로직은 한글 주석으로 설명
3. **타입 안전성**: TypeScript/Python 타입 힌팅 필수
4. **재사용성**: 컴포넌트/함수 재사용 고려
5. **테스트**: 가능하면 테스트 코드도 함께 작성

### 문서 작성 시
1. **한글 우선**: 기술 문서는 한글로
2. **명확성**: 초보자도 이해할 수 있게
3. **예시 포함**: 코드 예시, 명령어 예시 포함

### 질문 받았을 때
1. 프로젝트 전체 맥락 고려
2. 비용 관련 질문이면 무료 옵션 먼저 제시
3. 불확실하면 명확히 질문

---

## 📞 자주 묻는 질문 (FAQ)

### Q: AI 기능을 지금 구현해야 하나요?
**A**: 아니요. Phase 3는 선택사항이며, Phase 1, 2, 4, 5를 먼저 완성합니다. AI 추가가 쉽도록 아키텍처만 설계해두면 됩니다.

### Q: Claude API 비용이 얼마나 드나요?
**A**: 사용량에 따라 월 ₩2,000~30,000이며, Claude Pro 구독과 별개입니다. 무료 기능만으로도 충분히 사용 가능합니다.

### Q: 어떤 ETF 데이터 API를 사용하나요?
**A**: yfinance (무료)를 사용합니다. Alpha Vantage는 선택사항입니다.

### Q: TimescaleDB가 필수인가요?
**A**: 아니요. 권장사항이며, 일반 PostgreSQL로도 작동합니다. TimescaleDB는 시계열 데이터 성능을 개선합니다.

### Q: 다음에 뭘 해야 하나요?
**A**: 이 문서의 "다음 할 일" 섹션을 확인하거나, PROJECT_PLAN.md의 Phase 1 체크리스트를 참조하세요.

---

## 🔄 문서 업데이트 가이드

### 이 문서(CLAUDE.md)를 업데이트해야 할 때
- ✅ Phase 단계가 변경될 때
- ✅ 주요 기능이 완성될 때
- ✅ 기술 스택이 변경될 때
- ✅ 중요한 결정 사항이 있을 때

### 업데이트 방법
1. "최종 업데이트" 날짜 변경
2. "프로젝트 상태" 섹션 업데이트
3. "완료된 작업" 체크리스트 업데이트
4. "다음 할 일" 섹션 업데이트

---

## 🎓 학습 목표

이 프로젝트를 통해 배우고자 하는 것:
1. 풀스택 개발 (Next.js + FastAPI)
2. 시계열 데이터베이스 (TimescaleDB)
3. 실시간 통신 (WebSocket)
4. 금융 데이터 분석
5. AI API 통합 (선택사항)

---

## ⚠️ 중요 알림

### 법적 고지
- 이 도구는 개인용이며 투자 조언이 아닙니다
- 유료 종목 추천은 법적으로 금지 (투자자문업 등록 필요)
- "참고용" 명시 필수

### 데이터 정확성
- ETF 가격 데이터는 지연될 수 있음
- 항상 공식 거래소 데이터로 확인 필요

---

**이 문서를 읽은 후에는 프로젝트의 전체 맥락을 이해하고 효과적으로 도움을 줄 수 있습니다!**

**Happy Coding! 🚀**
