# PortfolioVision - 프로젝트 구조

## 📁 전체 디렉토리 구조

```
portfoliovision/
├── frontend/                   # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/               # Next.js 14 App Router
│   │   │   ├── (auth)/        # 인증 관련 페이지 (향후)
│   │   │   ├── (dashboard)/   # 대시보드 레이아웃
│   │   │   │   ├── page.tsx               # 메인 대시보드
│   │   │   │   ├── holdings/              # 보유 종목 페이지
│   │   │   │   ├── transactions/          # 거래 내역
│   │   │   │   ├── news/                  # 뉴스 페이지
│   │   │   │   ├── insights/              # AI 인사이트 (Phase 3)
│   │   │   │   ├── charts/                # 차트 분석
│   │   │   │   └── settings/              # 설정
│   │   │   ├── api/           # Next.js API 라우트 (선택사항)
│   │   │   ├── layout.tsx     # 루트 레이아웃
│   │   │   └── globals.css    # 전역 스타일
│   │   ├── components/        # React 컴포넌트
│   │   │   ├── dashboard/     # 대시보드 컴포넌트
│   │   │   │   ├── PortfolioOverview.tsx
│   │   │   │   ├── AssetAllocation.tsx
│   │   │   │   ├── PerformanceMetrics.tsx
│   │   │   │   └── RecentNews.tsx
│   │   │   ├── holdings/      # 보유 종목 컴포넌트
│   │   │   │   ├── HoldingsTable.tsx
│   │   │   │   ├── AddHoldingModal.tsx
│   │   │   │   └── EditHoldingModal.tsx
│   │   │   ├── news/          # 뉴스 컴포넌트
│   │   │   │   ├── NewsFeed.tsx
│   │   │   │   ├── NewsCard.tsx
│   │   │   │   └── NewsFilter.tsx
│   │   │   ├── charts/        # 차트 컴포넌트
│   │   │   │   ├── CandlestickChart.tsx
│   │   │   │   ├── LineChart.tsx
│   │   │   │   └── PieChart.tsx
│   │   │   ├── ui/            # shadcn/ui 컴포넌트
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── ...
│   │   │   └── layout/        # 레이아웃 컴포넌트
│   │   │       ├── Header.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── Footer.tsx
│   │   ├── lib/               # 유틸리티 함수
│   │   │   ├── api.ts         # API 클라이언트
│   │   │   ├── utils.ts       # 일반 유틸리티
│   │   │   ├── formatters.ts  # 데이터 포맷팅
│   │   │   └── websocket.ts   # WebSocket 클라이언트
│   │   ├── hooks/             # 커스텀 React 훅
│   │   │   ├── usePortfolio.ts
│   │   │   ├── useHoldings.ts
│   │   │   ├── useNews.ts
│   │   │   └── useRealTimePrice.ts
│   │   ├── store/             # 상태 관리 (Zustand)
│   │   │   ├── portfolioStore.ts
│   │   │   ├── newsStore.ts
│   │   │   └── settingsStore.ts
│   │   └── types/             # TypeScript 타입 정의
│   │       ├── portfolio.ts
│   │       ├── holding.ts
│   │       ├── news.ts
│   │       └── api.ts
│   ├── public/                # 정적 파일
│   │   ├── images/
│   │   └── icons/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── .env.local
│
├── backend/                   # FastAPI 백엔드
│   ├── app/
│   │   ├── main.py           # FastAPI 애플리케이션 진입점
│   │   ├── config.py         # 설정 관리
│   │   ├── database.py       # 데이터베이스 연결
│   │   ├── dependencies.py   # 의존성 주입
│   │   ├── api/              # API 라우터
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── portfolios.py      # 포트폴리오 API
│   │   │   │   ├── holdings.py        # 보유 종목 API
│   │   │   │   ├── transactions.py    # 거래 API
│   │   │   │   ├── etf.py             # ETF 데이터 API
│   │   │   │   ├── news.py            # 뉴스 API
│   │   │   │   ├── ai.py              # AI 인사이트 API (Phase 3)
│   │   │   │   ├── technical.py       # 기술적 지표 API
│   │   │   │   └── websocket.py       # WebSocket 엔드포인트
│   │   │   └── __init__.py
│   │   ├── models/           # SQLAlchemy 모델
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── portfolio.py
│   │   │   ├── holding.py
│   │   │   ├── transaction.py
│   │   │   ├── etf_price.py
│   │   │   ├── news.py
│   │   │   └── ai_insight.py
│   │   ├── schemas/          # Pydantic 스키마
│   │   │   ├── __init__.py
│   │   │   ├── portfolio.py
│   │   │   ├── holding.py
│   │   │   ├── transaction.py
│   │   │   ├── news.py
│   │   │   └── ai.py
│   │   ├── services/         # 비즈니스 로직
│   │   │   ├── __init__.py
│   │   │   ├── portfolio_service.py
│   │   │   ├── etf_service.py         # yfinance 통합
│   │   │   ├── news_service.py        # RSS 피드 수집
│   │   │   ├── ai_service.py          # Claude API 통합 (Phase 3)
│   │   │   ├── technical_service.py   # pandas-ta 통합
│   │   │   └── websocket_service.py   # 실시간 데이터
│   │   ├── core/             # 핵심 기능
│   │   │   ├── __init__.py
│   │   │   ├── security.py   # 보안 관련
│   │   │   ├── cache.py      # 캐싱 (선택사항)
│   │   │   └── logger.py     # 로깅
│   │   └── utils/            # 유틸리티
│   │       ├── __init__.py
│   │       ├── calculations.py        # 손익 계산 등
│   │       ├── formatters.py
│   │       └── validators.py
│   ├── alembic/              # 데이터베이스 마이그레이션
│   │   ├── versions/
│   │   ├── env.py
│   │   └── alembic.ini
│   ├── tests/                # 테스트
│   │   ├── __init__.py
│   │   ├── test_portfolios.py
│   │   ├── test_holdings.py
│   │   ├── test_etf_service.py
│   │   └── test_news_service.py
│   ├── requirements.txt      # Python 의존성
│   ├── .env                  # 환경 변수
│   └── pyproject.toml
│
├── database/                 # 데이터베이스 관련
│   ├── init.sql             # 초기 스키마
│   └── seed.sql             # 시드 데이터 (선택사항)
│
├── docs/                    # 문서
│   ├── api/                 # API 문서
│   ├── architecture/        # 아키텍처 문서
│   └── development/         # 개발 가이드
│
├── scripts/                 # 유틸리티 스크립트
│   ├── setup.sh            # 초기 설정 스크립트
│   ├── seed_data.py        # 샘플 데이터 생성
│   └── backup_db.sh        # DB 백업
│
├── .github/                # GitHub 관련
│   └── workflows/          # GitHub Actions
│       └── ci.yml          # CI/CD
│
├── .gitignore
├── README.md
├── PROJECT_PLAN.md
├── PROJECT_STRUCTURE.md
└── LICENSE
```

---

## 📦 주요 디렉토리 설명

### Frontend (Next.js)

#### `src/app/`
- Next.js 14 App Router 사용
- 파일 시스템 기반 라우팅
- 레이아웃, 페이지, API 라우트 포함

#### `src/components/`
- 재사용 가능한 React 컴포넌트
- 도메인별로 그룹화 (dashboard, holdings, news 등)
- shadcn/ui 컴포넌트는 `ui/` 폴더에

#### `src/lib/`
- API 클라이언트, 유틸리티 함수
- WebSocket 연결 관리

#### `src/hooks/`
- 커스텀 React 훅
- 데이터 페칭, 상태 관리 로직

#### `src/store/`
- Zustand 기반 전역 상태 관리
- 포트폴리오, 뉴스, 설정 등

### Backend (FastAPI)

#### `app/api/`
- RESTful API 엔드포인트
- 버전별로 구분 (v1/)
- 각 도메인별 라우터 분리

#### `app/models/`
- SQLAlchemy ORM 모델
- 데이터베이스 테이블 정의

#### `app/schemas/`
- Pydantic 스키마
- 요청/응답 데이터 검증 및 직렬화

#### `app/services/`
- 비즈니스 로직 레이어
- 외부 API 통합 (yfinance, RSS, Claude API)
- 기술적 지표 계산 (pandas-ta)

#### `app/core/`
- 보안, 캐싱, 로깅 등 핵심 기능

---

## 🔧 설정 파일

### Frontend

**package.json**
```json
{
  "name": "portfoliovision-frontend",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "tailwindcss": "^3.0.0",
    "zustand": "^4.0.0",
    "chart.js": "^4.0.0",
    "react-chartjs-2": "^5.0.0"
  }
}
```

**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Backend

**requirements.txt**
```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
alembic==1.13.1
pydantic==2.5.3
pydantic-settings==2.1.0
python-dotenv==1.0.0

# Data & Analysis
pandas==2.1.4
pandas-ta==0.3.14b
yfinance==0.2.35

# News & RSS
feedparser==6.0.10
aiohttp==3.9.1

# AI (선택사항)
anthropic==0.8.1

# Utils
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
```

---

## 🗄️ 데이터베이스 스키마

### 주요 테이블

1. **portfolios** - 포트폴리오
2. **holdings** - 보유 종목
3. **transactions** - 거래 내역
4. **etf_prices** - ETF 가격 (TimescaleDB hypertable)
5. **news_articles** - 뉴스 기사
6. **news_sentiment** - 뉴스 감성 분석
7. **ai_insights** - AI 인사이트 (Phase 3)
8. **user_settings** - 사용자 설정

---

## 🚀 개발 워크플로우

### 1. 새 기능 개발 순서

1. **백엔드 먼저**
   - `app/models/` 에 SQLAlchemy 모델 추가
   - `app/schemas/` 에 Pydantic 스키마 정의
   - `app/services/` 에 비즈니스 로직 구현
   - `app/api/v1/` 에 API 엔드포인트 추가
   - `tests/` 에 테스트 작성

2. **프론트엔드 이어서**
   - `src/types/` 에 TypeScript 타입 정의
   - `src/lib/api.ts` 에 API 클라이언트 함수 추가
   - `src/hooks/` 에 커스텀 훅 작성
   - `src/components/` 에 UI 컴포넌트 구현
   - `src/app/` 에 페이지 추가

### 2. Git 브랜치 전략

```
main                # 프로덕션
└── develop         # 개발
    ├── feature/portfolio-management
    ├── feature/news-integration
    └── feature/ai-insights
```

---

## 📝 명명 규칙

### 파일명
- **React 컴포넌트**: PascalCase (예: `HoldingsTable.tsx`)
- **유틸리티/훅**: camelCase (예: `usePortfolio.ts`)
- **Python 파일**: snake_case (예: `portfolio_service.py`)

### 변수/함수명
- **TypeScript**: camelCase
- **Python**: snake_case
- **상수**: UPPER_SNAKE_CASE

### API 엔드포인트
- RESTful 규칙 준수
- 복수형 명사 사용
- 예: `/api/v1/portfolios`, `/api/v1/holdings`

---

## 🔐 환경 변수

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfoliovision

# API Keys (선택사항)
CLAUDE_API_KEY=sk-ant-...
ALPHA_VANTAGE_API_KEY=...

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

이 구조는 확장 가능하고 유지보수하기 쉽도록 설계되었습니다.
