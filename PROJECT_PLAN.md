# PortfolioVision - ETF 포트폴리오 관리 대시보드

> AI 기반 ETF 포트폴리오 관리 및 투자 인텔리전스 플랫폼

---

## 📋 프로젝트 개요

### 프로젝트 정보
- **프로젝트명**: PortfolioVision
- **버전**: 1.0.0
- **유형**: 웹 대시보드 애플리케이션
- **목적**: 개인 포트폴리오 관리 및 학습
- **대상 사용자**: 개인 투자자 (본인)
- **주요 초점**: 해외 ETF 포트폴리오 관리

### 비전
실시간 경제 뉴스 분석과 AI 기반 투자 인사이트를 제공하여 정보에 입각한 투자 결정을 내릴 수 있도록 돕는 지능형 포트폴리오 관리 플랫폼

### 핵심 가치
1. **중앙화된 ETF 관리**: 모든 해외 ETF 보유 현황을 한 곳에서 추적
2. **지능형 뉴스 분석**: AI 기반 경제 뉴스 큐레이션 및 감성 분석
3. **데이터 기반 인사이트**: 기술적 지표 및 AI 추천
4. **실시간 모니터링**: 실시간 가격 업데이트 및 포트폴리오 성과 추적

---

## 🎯 프로젝트 목표

### 주요 목표
1. 종합적인 ETF 포트폴리오 추적 시스템 구축 **(무료)**
2. 보유 종목과 관련된 경제 뉴스 수집 및 분석 **(무료)**
3. 더 나은 의사결정을 위한 기술적 분석 도구 구현 **(무료)**
4. 실시간 포트폴리오 모니터링 활성화 **(무료)**
5. AI 기반 투자 인사이트 및 추천 제공 **(선택사항, 나중에 추가 가능)**

### 성공 지표 (무료 기능)
- ✅ 모든 ETF 보유 현황 성공적으로 추적 및 표시
- ✅ 5개 이상의 신뢰할 수 있는 뉴스 소스에서 뉴스 수집
- ✅ 10개 이상의 기술적 지표 계산
- ✅ 5초 미만의 지연시간으로 실시간 가격 업데이트 표시

### 추가 목표 (선택사항)
- 💡 AI 투자 인사이트 생성 (Phase 3, 원하는 경우에만)

---

## 🚀 기능 명세

### Phase 1: 포트폴리오 관리 (우선순위 1)
**일정**: 1-3주차

#### 핵심 기능
1. **포트폴리오 대시보드**
   - 총 포트폴리오 가치 표시
   - 자산 배분 파이 차트
   - 성과 지표 (일간/주간/월간/연간 수익률)
   - 손익 추적

2. **ETF 관리**
   - ETF 보유 현황 추가/수정/삭제
   - 매수 가격, 수량, 날짜 추적
   - 현재 가치 및 손익 계산
   - 다중 통화 지원 (USD, EUR 등)

3. **거래 내역**
   - 매수/매도 거래 기록
   - 타임스탬프가 있는 거래 로그
   - 평균 단가 계산
   - 과거 성과 추적

4. **포트폴리오 분석**
   - 자산 배분 분석 (섹터별, 지역별, 자산 클래스별)
   - 다각화 분석
   - 상관관계 매트릭스
   - 리스크 지표 (변동성, 베타)

#### 데이터 모델
```
Portfolio (포트폴리오)
├── id
├── name (이름)
├── total_value (총 가치)
├── currency (통화)
└── created_at (생성일)

Holding (보유 종목)
├── id
├── portfolio_id
├── ticker (티커)
├── name (종목명)
├── quantity (수량)
├── purchase_price (매수가)
├── purchase_date (매수일)
├── current_price (현재가)
└── sector/category (섹터/카테고리)

Transaction (거래)
├── id
├── portfolio_id
├── ticker
├── type (매수/매도)
├── quantity (수량)
├── price (가격)
├── date (날짜)
└── fees (수수료)
```

---

### Phase 2: 경제 뉴스 수집 및 분석 (우선순위 2)
**일정**: 4-5주차

#### 핵심 기능
1. **뉴스 수집**
   - 주요 금융 뉴스 소스에서 수집
   - RSS 피드 통합 (Bloomberg, Reuters, CNBC, Financial Times)
   - 보유 종목 기반 키워드 필터링
   - 카테고리화 (시장 뉴스, 섹터 뉴스, 특정 종목 뉴스)

2. **뉴스 대시보드**
   - 최신 헤드라인 표시
   - 뉴스 타임라인 뷰
   - 카테고리 필터
   - 검색 기능
   - 중요 기사 북마크

3. **뉴스 분석**
   - 감성 분석 (긍정/중립/부정)
   - 포트폴리오 보유 종목과의 관련성 점수
   - 트렌딩 토픽 감지
   - 보유 종목에 대한 영향 평가

4. **알림 및 알람**
   - 보유 종목 관련 속보 알림
   - 감성 변화 알림
   - 맞춤 키워드 알림

#### 데이터 소스
- **RSS 피드**:
  - Bloomberg Markets RSS
  - Reuters Business
  - CNBC Markets
  - Financial Times Markets
  - The Wall Street Journal Markets

- **뉴스 API** (선택사항):
  - NewsAPI.org
  - Alpha Vantage News

---

### Phase 3: AI 기반 투자 인사이트 (우선순위 3)
**일정**: 6-8주차

#### 핵심 기능
1. **AI 뉴스 분석**
   - 일일 시장 트렌드 요약
   - 뉴스 기사에서 핵심 인사이트 추출
   - 기회 및 리스크 식별
   - 감성 보고서 생성

2. **포트폴리오 추천**
   - 리밸런싱 제안
   - 리스크 평가
   - 다각화 추천
   - 세금 손실 수확 기회

3. **AI 투자 어드바이저**
   - 포트폴리오에 대한 자연어 질의응답
   - 시장 상황 분석
   - 섹터 로테이션 제안
   - 경제 지표 해석

4. **자동화된 보고서**
   - 일일 포트폴리오 요약
   - 주간 성과 보고서
   - 월간 투자 인사이트
   - 맞춤 보고서 생성

#### AI 통합
- **주 AI**: Claude API (Anthropic)
  - 금융 분석에 뛰어남
  - 강력한 추론 능력
  - 컨텍스트 윈도우: 200K 토큰

- **백업**: OpenAI GPT-4
  - 특정 작업을 위한 대안

#### AI 프롬프트 예시
```
1. 뉴스 요약:
"다음 금융 뉴스 기사들을 요약하고 [티커]에 대한 잠재적 영향을 분석해주세요: [기사들]"

2. 포트폴리오 분석:
"현재 ETF 포트폴리오 배분을 분석하고 개선 사항을 제안해주세요: [보유 종목]"

3. 시장 감성:
"최근 뉴스를 바탕으로 [섹터]에 대한 시장 감성은 어떤가요?"
```

---

### Phase 4: 기술적 지표 분석 (우선순위 4)
**일정**: 9-10주차

#### 핵심 기능
1. **기술적 지표**
   - 이동평균선 (SMA, EMA)
   - 상대강도지수 (RSI)
   - MACD (이동평균 수렴확산)
   - 볼린저 밴드
   - 거래량 분석
   - 지지/저항 레벨

2. **차트 시각화**
   - 캔들스틱 차트
   - 라인 차트
   - 거래량 차트
   - 다중 타임프레임 (1일, 1주, 1개월, 3개월, 1년, 5년)
   - 지표 오버레이

3. **기술적 분석 대시보드**
   - 모든 보유 종목의 지표 요약
   - 매수/매도/보유 신호
   - 기술적 강도 점수
   - 추세 분석

4. **백테스팅** (향후 개선사항)
   - 트레이딩 전략 테스트
   - 과거 성과 시뮬레이션

#### 기술 라이브러리
- **pandas-ta**: 기술적 분석 라이브러리
- **Chart.js** 또는 **Dygraphs**: 차트 시각화
- **NumPy/Pandas**: 데이터 조작

---

### Phase 5: 실시간 가격 모니터링 (우선순위 5)
**일정**: 11-12주차

#### 핵심 기능
1. **실시간 가격 업데이트**
   - 실시간 ETF 가격 스트리밍
   - 실시간 데이터를 위한 WebSocket 연결
   - 포트폴리오 가치 자동 갱신
   - 가격 변동 표시기

2. **가격 알림**
   - 목표 가격 설정 (상한/하한)
   - 변동률 알림
   - 거래량 급증 알림
   - 맞춤 조건 알림

3. **시장 상태**
   - 시장 개장/폐장 상태
   - 장전/장후 가격
   - 시장 지수 표시 (S&P 500, NASDAQ, DOW)

4. **실시간 대시보드**
   - 실시간 포트폴리오 가치 티커
   - 실시간 손익 업데이트
   - 스트리밍 뉴스 피드
   - 시장 히트맵

#### ETF 가격 데이터 소스
1. **Alpha Vantage API** (추천)
   - 무료 티어: 일 25회 요청
   - 프리미엄: $50-250/월
   - 글로벌 ETF 커버리지
   - 실시간 및 과거 데이터

2. **Yahoo Finance API** (비공식)
   - 무료
   - yfinance Python 라이브러리
   - 과거 데이터에 적합
   - 제한적인 실시간 기능

3. **IEX Cloud**
   - 무료 티어: 월 50,000 메시지
   - 양호한 실시간 지원
   - 미국 시장 중심

4. **Finnhub**
   - 무료 티어: 분당 60회 API 호출
   - WebSocket 지원
   - 글로벌 커버리지

---

## 🛠 기술 스택

### 프론트엔드
**프레임워크**: Next.js 14+ (React)
- 서버 사이드 렌더링 (SSR)
- 백엔드 통합을 위한 API 라우트
- 최적화된 성능
- SEO 친화적

**UI 라이브러리**:
- **Tailwind CSS**: 유틸리티 우선 스타일링
- **shadcn/ui**: 모던 컴포넌트 라이브러리
- **Tremor**: 대시보드 중심 컴포넌트 (대안)

**차트 라이브러리**:
- **Chart.js**: 주 차트 라이브러리
- **Dygraphs**: 대용량 데이터셋 및 실시간 업데이트용
- **React Financial Charts**: 주식 차트

**상태 관리**:
- **React Context API** 또는 **Zustand**: 경량 상태 관리
- **TanStack Query (React Query)**: 서버 상태 관리

### 백엔드
**프레임워크**: Python FastAPI
- 고성능 (ASGI)
- 비동기 지원
- WebSocket 지원
- 자동 API 문서화 (Swagger)
- Pydantic을 통한 타입 안전성

**주요 라이브러리**:
- **pandas**: 데이터 조작
- **pandas-ta**: 기술적 분석
- **yfinance**: ETF 데이터 가져오기
- **feedparser**: RSS 피드 파싱
- **anthropic**: Claude AI SDK
- **aiohttp**: 비동기 HTTP 요청

### 데이터베이스
**주 데이터베이스**: PostgreSQL 16+ with TimescaleDB 확장
- 시계열 데이터(가격 히스토리)에 탁월
- ACID 준수
- 유연한 스키마를 위한 JSON 지원
- 자동 데이터 보존 정책
- 효율적인 압축

**스키마 설계**:
```sql
-- 포트폴리오 테이블
portfolios
holdings
transactions

-- 가격 데이터 (TimescaleDB hypertable)
etf_prices (ticker, timestamp, open, high, low, close, volume)

-- 뉴스 데이터
news_articles
news_sentiment

-- AI 인사이트
ai_insights
ai_reports

-- 사용자 설정
user_settings
```

**캐싱**: Redis (선택사항)
- API 응답 캐싱
- 세션 관리
- 실시간 데이터 버퍼링

### 실시간 통신
**WebSocket**: FastAPI WebSocket
- 실시간 가격 업데이트
- 실시간 뉴스 피드
- 포트폴리오 가치 스트리밍

### AI 통합
**Claude API** (Anthropic)
- 모델: Claude Sonnet 4.5
- 비용: 100만 토큰당 약 $3-75
- 사용 사례: 뉴스 분석, 포트폴리오 인사이트, 질의응답

### 배포
**개발 환경**:
- 프론트엔드: Localhost:3000 (Next.js dev server)
- 백엔드: Localhost:8000 (FastAPI uvicorn)
- 데이터베이스: 로컬 PostgreSQL

**프로덕션** (향후):
- 프론트엔드: Vercel (무료 티어)
- 백엔드: Railway 또는 Render (무료 티어)
- 데이터베이스: Railway PostgreSQL 또는 Supabase

### 개발 도구
- **버전 관리**: Git + GitHub
- **코드 에디터**: VSCode
- **API 테스팅**: Postman 또는 Thunder Client
- **데이터베이스 도구**: pgAdmin 또는 TablePlus

---

## 🎨 UI/UX 디자인

### 디자인 원칙
1. **깔끔하고 미니멀**: 데이터 명확성에 집중
2. **반응형**: 모바일 친화적 (주로 웹이지만)
3. **다크 모드**: 장시간 사용시 눈의 피로 감소
4. **데이터 시각화**: 빠른 인사이트를 위한 차트와 그래프
5. **성능**: 빠른 로딩 시간과 부드러운 인터랙션

### 대시보드 레이아웃

```
┌─────────────────────────────────────────────────────────┐
│  PortfolioVision              [사용자] [설정]           │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ 총 자산     │  │ 오늘 손익    │  │ 총 수익률     │  │
│  │  $125,430   │  │  +$1,234     │  │  +15.2%       │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐  ┌────────────────────────┐ │
│  │  자산 배분            │  │  최신 뉴스             │ │
│  │  [파이 차트]          │  │  • 속보...             │ │
│  │                       │  │  • 시장 업데이트...    │ │
│  │                       │  │  • ETF 분석...         │ │
│  └───────────────────────┘  └────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  보유 종목                                    [+ 추가]  │
│  ┌────────────────────────────────────────────────────┐ │
│  │ 티커  │ 종목명    │ 수량  │ 가치    │ 손익 │ %  │  │
│  │ VTI   │ Vanguard │ 100   │ $23,500 │ +5%  │    │  │
│  │ QQQ   │ Invesco  │ 50    │ $19,250 │ +8%  │    │  │
│  └────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐  │
│  │  AI 인사이트                                      │  │
│  │  "최근 시장 트렌드를 기반으로..."                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 색상 구성
- **주 색상**: 파랑 (#3B82F6) - 신뢰와 안정성
- **성공**: 녹색 (#10B981) - 양의 수익
- **위험**: 빨강 (#EF4444) - 음의 수익
- **배경**: 다크 (#1F2937) / 라이트 (#F9FAFB)
- **텍스트**: 계층을 위한 그레이 스케일

### 주요 화면
1. **대시보드** - 메인 개요
2. **보유 종목** - 상세 ETF 목록
3. **거래 내역** - 거래 히스토리
4. **뉴스** - 뉴스 피드 및 분석
5. **인사이트** - AI 추천
6. **차트** - 기술적 분석
7. **설정** - 사용자 설정

---

## 📊 데이터 아키텍처

### 데이터 흐름

```
외부 API → 백엔드 (FastAPI) → 데이터베이스 (PostgreSQL)
                  ↓
              WebSocket
                  ↓
         프론트엔드 (Next.js) → 사용자
                  ↑
            AI 분석 (Claude API)
```

### API 엔드포인트 (백엔드)

#### 포트폴리오 관리
```
GET    /api/portfolios          - 모든 포트폴리오 목록
POST   /api/portfolios          - 포트폴리오 생성
GET    /api/portfolios/{id}     - 포트폴리오 상세 정보
PUT    /api/portfolios/{id}     - 포트폴리오 수정
DELETE /api/portfolios/{id}     - 포트폴리오 삭제

GET    /api/holdings            - 보유 종목 목록
POST   /api/holdings            - 보유 종목 추가
PUT    /api/holdings/{id}       - 보유 종목 수정
DELETE /api/holdings/{id}       - 보유 종목 제거

GET    /api/transactions        - 거래 내역
POST   /api/transactions        - 거래 추가
```

#### 시장 데이터
```
GET    /api/etf/{ticker}/price       - 현재 가격
GET    /api/etf/{ticker}/history     - 과거 가격
GET    /api/etf/{ticker}/info        - ETF 정보
GET    /api/market/indices           - 시장 지수

WS     /ws/prices                    - 실시간 가격 스트림
```

#### 뉴스
```
GET    /api/news                     - 최신 뉴스
GET    /api/news/search              - 뉴스 검색
GET    /api/news/{id}/sentiment      - 뉴스 감성
GET    /api/news/trending            - 트렌딩 토픽
```

#### AI 인사이트
```
POST   /api/ai/analyze-portfolio     - 포트폴리오 분석
POST   /api/ai/analyze-news          - 뉴스 분석
POST   /api/ai/chat                  - AI 채팅
GET    /api/ai/insights              - 일일 인사이트
GET    /api/ai/reports               - 생성된 보고서
```

#### 기술적 분석
```
GET    /api/technical/{ticker}/indicators  - 모든 지표
GET    /api/technical/{ticker}/signals     - 매수/매도 신호
GET    /api/technical/{ticker}/chart       - 차트 데이터
```

### 데이터베이스 스키마 (상세)

```sql
-- 사용자 (향후 다중 사용자 대비)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 포트폴리오
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 보유 종목
CREATE TABLE holdings (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
    ticker VARCHAR(20) NOT NULL,
    name VARCHAR(255),
    quantity DECIMAL(18, 8) NOT NULL,
    average_price DECIMAL(18, 2) NOT NULL,
    sector VARCHAR(50),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(portfolio_id, ticker)
);

-- 거래
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id) ON DELETE CASCADE,
    ticker VARCHAR(20) NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('buy', 'sell')),
    quantity DECIMAL(18, 8) NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    fees DECIMAL(18, 2) DEFAULT 0,
    transaction_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ETF 가격 (TimescaleDB hypertable)
CREATE TABLE etf_prices (
    ticker VARCHAR(20) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    open DECIMAL(18, 2),
    high DECIMAL(18, 2),
    low DECIMAL(18, 2),
    close DECIMAL(18, 2) NOT NULL,
    volume BIGINT,
    PRIMARY KEY (ticker, timestamp)
);

SELECT create_hypertable('etf_prices', 'timestamp');

-- 뉴스 기사
CREATE TABLE news_articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT UNIQUE NOT NULL,
    source VARCHAR(100),
    author VARCHAR(255),
    published_at TIMESTAMP NOT NULL,
    content TEXT,
    image_url TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 뉴스 감성
CREATE TABLE news_sentiment (
    id SERIAL PRIMARY KEY,
    article_id INTEGER REFERENCES news_articles(id) ON DELETE CASCADE,
    ticker VARCHAR(20),
    sentiment VARCHAR(20) CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    confidence DECIMAL(5, 2),
    analyzed_at TIMESTAMP DEFAULT NOW()
);

-- AI 인사이트
CREATE TABLE ai_insights (
    id SERIAL PRIMARY KEY,
    portfolio_id INTEGER REFERENCES portfolios(id),
    type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 사용자 설정
CREATE TABLE user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    key VARCHAR(100) NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, key)
);

-- 인덱스
CREATE INDEX idx_holdings_portfolio ON holdings(portfolio_id);
CREATE INDEX idx_transactions_portfolio ON transactions(portfolio_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX idx_news_published ON news_articles(published_at DESC);
CREATE INDEX idx_news_category ON news_articles(category);
CREATE INDEX idx_sentiment_ticker ON news_sentiment(ticker);
```

---

## 📅 개발 로드맵

### Phase 1: 기초 작업 (1-3주차)
**목표**: 포트폴리오 관리 MVP

**1주차: 프로젝트 셋업**
- [ ] Next.js 프로젝트 초기화
- [ ] FastAPI 백엔드 셋업
- [ ] PostgreSQL + TimescaleDB 구성
- [ ] Git 저장소 설정
- [ ] 기본 프로젝트 구조 생성
- [ ] 개발 환경 설정

**2주차: 핵심 포트폴리오 기능**
- [ ] 데이터베이스 스키마 구현
- [ ] 포트폴리오 CRUD API 구축
- [ ] 보유 종목 관리 API 생성
- [ ] 거래 기록 시스템 구축
- [ ] 기본 프론트엔드 대시보드 구현
- [ ] 보유 종목 테이블 컴포넌트 생성

**3주차: 포트폴리오 분석**
- [ ] ETF 데이터를 위한 yfinance 통합
- [ ] 자산 배분 계산기 구축
- [ ] 포트폴리오 분석 API 생성
- [ ] 차트 시각화 구현
- [ ] 손익 계산 추가
- [ ] 성과 지표 구축

**마일스톤 1**: ✅ 기능적인 포트폴리오 추적 시스템

---

### Phase 2: 뉴스 통합 (4-5주차)
**목표**: 경제 뉴스 수집 및 표시

**4주차: 뉴스 수집**
- [ ] RSS 피드 파서 설정
- [ ] 뉴스 수집 서비스 생성
- [ ] 뉴스 저장 시스템 구축
- [ ] 뉴스 API 엔드포인트 구현
- [ ] 뉴스 피드 UI 컴포넌트 생성
- [ ] 뉴스 필터링 및 검색 추가

**5주차: 뉴스 분석**
- [ ] 기본 감성 분석 통합
- [ ] 뉴스 카테고리화 구축
- [ ] 뉴스 대시보드 생성
- [ ] 뉴스 알림 구현
- [ ] 북마크 기능 추가
- [ ] 뉴스 타임라인 뷰 구축

**마일스톤 2**: ✅ 뉴스 수집 및 표시 작동

---

### Phase 3: AI 인텔리전스 (6-8주차)
**목표**: AI 기반 인사이트 및 추천

**6주차: AI 통합**
- [ ] Claude API 통합 설정
- [ ] AI 서비스 레이어 구축
- [ ] 뉴스 요약 구현
- [ ] AI 채팅 인터페이스 생성
- [ ] 프롬프트 템플릿 추가
- [ ] AI 응답 테스트

**7주차: 포트폴리오 AI**
- [ ] 포트폴리오 분석 AI 구축
- [ ] 리밸런싱 제안 구현
- [ ] 리스크 평가 생성
- [ ] AI 인사이트 대시보드 추가
- [ ] 자동화된 보고서 구축
- [ ] 인사이트 캐싱 구현

**8주차: AI 개선**
- [ ] AI 프롬프트 최적화
- [ ] 컨텍스트 관리 추가
- [ ] 비용 통제 구현
- [ ] AI 피드백 시스템 구축
- [ ] AI 설정 패널 생성
- [ ] AI 출력 테스트 및 개선

**마일스톤 3**: ✅ 가치 있는 추천을 생성하는 AI 인사이트

---

### Phase 4: 기술적 분석 (9-10주차)
**목표**: 기술적 지표 및 차트 작성

**9주차: 지표**
- [ ] pandas-ta 라이브러리 통합
- [ ] 이동평균선 구현
- [ ] RSI 계산 추가
- [ ] MACD 지표 구축
- [ ] 볼린저 밴드 생성
- [ ] 지표 API 구축

**10주차: 차트 작성**
- [ ] Chart.js 통합
- [ ] 캔들스틱 차트 구축
- [ ] 지표 오버레이 추가
- [ ] 다중 타임프레임 차트 생성
- [ ] 기술적 대시보드 구축
- [ ] 매수/매도 신호 추가

**마일스톤 4**: ✅ 기술적 분석 도구 작동

---

### Phase 5: 실시간 기능 (11-12주차)
**목표**: 실시간 가격 모니터링

**11주차: 실시간 데이터**
- [ ] ETF 가격 API 선택 및 통합
- [ ] WebSocket 서버 설정
- [ ] 실시간 가격 스트리밍 구현
- [ ] 가격 업데이트 서비스 구축
- [ ] 실시간 포트폴리오 가치 생성
- [ ] 시장 상태 표시 추가

**12주차: 알림 및 마무리**
- [ ] 가격 알림 시스템 구축
- [ ] 알림 알람 구현
- [ ] 시장 지수 표시 추가
- [ ] 실시간 대시보드 위젯 생성
- [ ] 성능 최적화
- [ ] 버그 수정 및 개선

**마일스톤 5**: ✅ 완전한 실시간 모니터링 작동

---

### 출시 후 개선사항 (향후)
- [ ] 모바일 반응형 개선
- [ ] 다중 포트폴리오 지원
- [ ] 내보내기/가져오기 기능 (CSV, JSON)
- [ ] PDF 보고서 생성
- [ ] 배당금 추적
- [ ] 세금 보고 도구
- [ ] 백테스팅 기능
- [ ] 맞춤 스크리너
- [ ] 소셜 기능 (인사이트 공유)
- [ ] 모바일 앱 (React Native)

---

## 🔒 보안 및 개인정보 보호 고려사항

### 데이터 보안
1. **API 키**: 환경 변수에 저장, Git에 커밋 금지
2. **데이터베이스**: 강력한 비밀번호 사용, 접근 제한
3. **API 인증**: JWT 또는 세션 기반 인증 구현 (다중 사용자인 경우)
4. **HTTPS**: 프로덕션에서 SSL/TLS 사용
5. **입력 검증**: 모든 사용자 입력 검증
6. **SQL 인젝션**: 파라미터화된 쿼리 사용 (ORM)

### 개인정보 보호
1. **개인 데이터**: 포트폴리오 데이터를 로컬에 보관 (공유 금지)
2. **AI 처리**: Claude API로 전송되는 데이터 인식
3. **백업**: 정기적인 암호화된 백업
4. **로깅**: 민감한 금융 데이터 로깅 방지

### 모범 사례
- 코드에 API 키를 절대 저장하지 않기
- 구성을 위해 `.env` 파일 사용
- API에 대한 속도 제한 구현
- 정기적인 보안 업데이트
- 프론트엔드 및 백엔드에서 입력 검증

---

## 💰 비용 추정

### ✅ 무료로 진행 가능한 기능 (Phase 1, 2, 4, 5)

**완전 무료 서비스**:
- Next.js: 무료 (오픈소스)
- FastAPI: 무료 (오픈소스)
- PostgreSQL: 무료 (로컬)
- Chart.js: 무료 (오픈소스)
- Git/GitHub: 무료
- VSCode: 무료
- yfinance: 무료 (ETF 가격 데이터)
- RSS 피드: 무료 (경제 뉴스)
- pandas-ta: 무료 (기술적 지표)

**호스팅** (무료 티어 옵션):
- Vercel: 무료 (Next.js 프론트엔드)
- Railway: 무료 티어 (월 $5 크레딧)
- Supabase: 무료 티어 (PostgreSQL)

**✨ 핵심 기능 모두 무료로 사용 가능!**
- 포트폴리오 관리 ✅
- 경제 뉴스 수집 ✅
- 기술적 지표 분석 ✅
- 실시간 가격 모니터링 ✅

**총 개발/운영 비용**: **₩0 (완전 무료)**

---

### 💡 선택적 유료 기능 (Phase 3 - AI 인사이트)

**나중에 필요하면 추가할 수 있는 기능:**

**Claude API** (AI 뉴스 분석 및 포트폴리오 인사이트):
- Claude Sonnet 4.5: 100만 토큰당 입력 ₩3,900 / 출력 ₩19,500
- Claude Haiku (저렴한 모델): 100만 토큰당 입력 ₩325 / 출력 ₩1,625

**예상 사용량별 월 비용**:
- 절약 사용 (주 2-3회): ₩2,000~4,000
- 일반 사용 (매일): ₩15,000~30,000

**⚠️ 중요**:
- Claude Pro/Max 구독과 **별개로 과금**됩니다
- API 사용은 **완전히 선택사항**입니다
- AI 없이도 모든 핵심 기능 사용 가능

**Alpha Vantage Premium** (더 많은 API 호출이 필요한 경우):
- 프리미엄: ₩65,000/월
- 무료 티어(일 25회)로도 충분히 사용 가능

---

### 📋 개발 전략

**1단계 (무료)**: Phase 1, 2, 4, 5 완성
- 포트폴리오 관리
- 뉴스 수집 및 표시
- 기술적 지표
- 실시간 가격

**2단계 (선택)**: Phase 3 추가 (AI 원하는 경우에만)
- AI 뉴스 분석
- AI 포트폴리오 인사이트
- 자동화된 보고서

**권장사항**:
- ✅ 무료 기능으로 먼저 완성
- ✅ AI 추가가 쉽도록 아키텍처 설계
- ✅ 나중에 필요하면 Phase 3 추가

---

## 🧪 테스팅 전략

### 단위 테스트
- 백엔드: API 엔드포인트를 위한 pytest
- 프론트엔드: Jest + React Testing Library

### 통합 테스트
- API 통합 테스트
- 데이터베이스 통합 테스트
- 외부 API 모킹

### E2E 테스트
- 사용자 흐름을 위한 Playwright 또는 Cypress

### 수동 테스트
- 크로스 브라우저 테스팅
- 반응형 디자인 테스팅
- 성능 테스팅

---

## 📚 학습 성과

이 프로젝트를 완료하면 다음을 배우게 됩니다:

### 기술적 스킬
1. **풀스택 개발**: Next.js + FastAPI
2. **데이터베이스 설계**: 시계열용 PostgreSQL + TimescaleDB
3. **API 통합**: 다중 외부 API (금융, 뉴스, AI)
4. **실시간 시스템**: WebSocket 구현
5. **데이터 시각화**: 차트 및 대시보드
6. **AI 통합**: Claude를 사용한 프롬프트 엔지니어링
7. **금융 분석**: 기술적 지표 및 포트폴리오 지표

### 도메인 지식
1. **ETF 시장**: ETF 구조 및 가격 책정 이해
2. **기술적 분석**: 차트 패턴 및 지표
3. **포트폴리오 관리**: 자산 배분 및 리스크 관리
4. **금융 뉴스**: 시장 감성 및 영향 분석
5. **투자 전략**: 데이터 기반 의사결정

### 모범 사례
1. **깔끔한 코드**: 모듈형, 유지보수 가능한 아키텍처
2. **API 설계**: RESTful 원칙 및 문서화
3. **보안**: 민감한 금융 데이터 처리
4. **성능**: 대용량 데이터셋 최적화
5. **DevOps**: 배포 및 모니터링

---

## 🎓 리소스 및 참고자료

### ETF 데이터 소스
- [Alpha Vantage](https://www.alphavantage.co/) - 금융 데이터 API
- [yfinance](https://github.com/ranaroussi/yfinance) - Yahoo Finance Python 라이브러리
- [IEX Cloud](https://iexcloud.io/) - 금융 데이터 플랫폼
- [Finnhub](https://finnhub.io/) - 실시간 주식 API

### 뉴스 소스
- [NewsAPI](https://newsapi.org/) - 뉴스 수집 API
- [RSS Feeds](https://rss.com/) - RSS 피드 디렉토리
- 주요 금융 뉴스 매체 RSS 피드

### 기술적 분석
- [pandas-ta 문서](https://github.com/twopirllc/pandas-ta)
- [TA-Lib](https://ta-lib.org/) - 기술적 분석 라이브러리

### AI 통합
- [Claude API 문서](https://docs.anthropic.com/)
- [OpenAI API 문서](https://platform.openai.com/docs)

### 프론트엔드 리소스
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Chart.js](https://www.chartjs.org/)
- [Tremor 대시보드 컴포넌트](https://www.tremor.so/)

### 백엔드 리소스
- [FastAPI 문서](https://fastapi.tiangolo.com/)
- [TimescaleDB 문서](https://docs.timescale.com/)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)

### 학습 리소스
- [Investopedia](https://www.investopedia.com/) - 금융 교육
- [ETF.com](https://www.etf.com/) - ETF 연구 및 분석

---

## 🚨 중요 면책조항

### 법적 고지
1. **투자 조언 아님**: 이 도구는 개인 포트폴리오 추적 및 분석 전용입니다. 전문적인 투자 조언을 구성하지 않습니다.

2. **보장 없음**: 과거 성과가 미래 결과를 보장하지 않습니다. 모든 투자에는 리스크가 있습니다.

3. **규정 준수**: 개인 사용 전용. 상업적 투자 자문 서비스에 대한 라이센스가 없습니다.

4. **데이터 정확성**: 정확성을 위해 노력하지만 데이터가 지연되거나 부정확할 수 있습니다. 항상 정보를 확인하세요.

5. **AI 한계**: AI 생성 인사이트는 과거 패턴을 기반으로 하며 미래 시장 행동을 예측하지 못할 수 있습니다.

### 리스크 경고
- **시장 리스크**: ETF 가치는 변동할 수 있으며 손실이 발생할 수 있습니다
- **기술적 리스크**: 소프트웨어 버그 또는 API 장애가 발생할 수 있습니다
- **데이터 리스크**: 타사 API가 변경되거나 사용할 수 없게 될 수 있습니다
- **AI 리스크**: AI 인사이트는 의사결정의 여러 입력 중 하나여야 합니다

### 권장 관행
1. **자체 조사**: 항상 독립적인 조사 수행
2. **다각화**: 알고리즘 추천에만 의존하지 마세요
3. **리스크 관리**: 손실을 감당할 수 있는 금액 이상으로 투자하지 마세요
4. **전문가 조언**: 개인화된 안내를 위해 라이센스가 있는 금융 자문가와 상담하세요
5. **정기적인 검토**: 정기적으로 투자 전략을 검토하고 업데이트하세요

---

## 📞 다음 단계

### 즉시 실행할 작업
1. ✅ 프로젝트 계획 검토 및 승인
2. ⬜ 개발 환경 설정
3. ⬜ GitHub 저장소 생성
4. ⬜ Next.js 및 FastAPI 프로젝트 초기화
5. ⬜ PostgreSQL 데이터베이스 설정
6. ⬜ Phase 1 개발 시작

### 고려할 질문
1. 처음부터 추적하고 싶은 특정 ETF가 있나요?
2. 선호하는 특정 뉴스 소스가 있나요?
3. 관심 있는 맞춤 기술적 지표가 있나요?
4. 대시보드를 위한 선호하는 색상 구성이 있나요?
5. 우선순위를 두고 싶은 특정 AI 인사이트가 있나요?

---

## 📝 프로젝트 메타데이터

**문서 버전**: 1.0
**최종 업데이트**: 2025-11-15
**작성자**: 프로젝트 소유자
**상태**: 기획 단계
**예상 완료**: 시작부터 12주

---

**ETF 포트폴리오 관리 플랫폼을 구축할 준비가 되었습니다!** 🚀

준비되면 Phase 1부터 시작하겠습니다.
