# PortfolioVision

> AI 기반 ETF 포트폴리오 관리 및 투자 인텔리전스 플랫폼

해외 ETF 투자자를 위한 올인원 포트폴리오 관리 대시보드입니다. 실시간 가격 모니터링, 경제 뉴스 수집, 기술적 지표 분석을 무료로 제공하며, 선택적으로 AI 기반 투자 인사이트를 추가할 수 있습니다.

## ✨ 주요 기능

### 무료 핵심 기능
- 📊 **포트폴리오 관리**: ETF 보유 현황 추적, 손익 계산, 자산 배분 분석
- 📰 **경제 뉴스 수집**: 주요 금융 뉴스 자동 수집 및 필터링
- 📈 **기술적 지표 분석**: 이동평균선, RSI, MACD, 볼린저 밴드 등
- 🔴 **실시간 가격 모니터링**: WebSocket 기반 실시간 ETF 가격 업데이트

### 선택적 기능
- 🤖 **AI 투자 인사이트**: Claude API를 활용한 뉴스 분석 및 포트폴리오 추천 (선택사항)

## 🚀 기술 스택

### 프론트엔드
- **Next.js 14+**: React 기반 풀스택 프레임워크
- **Tailwind CSS**: 유틸리티 우선 스타일링
- **shadcn/ui**: 모던 UI 컴포넌트
- **Chart.js**: 데이터 시각화

### 백엔드
- **FastAPI**: Python 고성능 웹 프레임워크
- **PostgreSQL**: 관계형 데이터베이스
- **TimescaleDB**: 시계열 데이터 처리
- **pandas-ta**: 기술적 지표 계산

### 데이터 소스
- **yfinance**: ETF 가격 데이터 (무료)
- **RSS Feeds**: 경제 뉴스 수집 (무료)
- **Claude API**: AI 분석 (선택사항)

## 💰 비용

**핵심 기능: 완전 무료 (₩0)**
- 포트폴리오 관리
- 뉴스 수집
- 기술적 지표
- 실시간 가격

**선택 기능: AI 인사이트**
- 월 ₩2,000~30,000 (사용량에 따라)
- Claude Pro 구독과 별개

## 📋 개발 로드맵

### Phase 1: 포트폴리오 관리 (1-3주) ⬜
- [ ] Next.js + FastAPI 프로젝트 초기화
- [ ] PostgreSQL 데이터베이스 설정
- [ ] 포트폴리오 CRUD 기능
- [ ] ETF 보유 종목 관리
- [ ] 거래 내역 기록
- [ ] 기본 대시보드 UI

### Phase 2: 경제 뉴스 (4-5주) ⬜
- [ ] RSS 피드 파서 구현
- [ ] 뉴스 수집 자동화
- [ ] 뉴스 필터링 및 검색
- [ ] 뉴스 대시보드

### Phase 3: AI 인사이트 (6-8주) ⬜ (선택사항)
- [ ] Claude API 통합
- [ ] 뉴스 감성 분석
- [ ] 포트폴리오 추천
- [ ] 자동 보고서 생성

### Phase 4: 기술적 지표 (9-10주) ⬜
- [ ] pandas-ta 통합
- [ ] 기술적 지표 계산
- [ ] 차트 시각화
- [ ] 매수/매도 신호

### Phase 5: 실시간 기능 (11-12주) ⬜
- [ ] WebSocket 서버 구현
- [ ] 실시간 가격 스트리밍
- [ ] 가격 알림 시스템
- [ ] 실시간 대시보드

## 🛠 시작하기

### 사전 요구사항
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+

### 설치 및 실행

#### 1. 저장소 클론
```bash
git clone https://github.com/yourusername/portfoliovision.git
cd portfoliovision
```

#### 2. 프론트엔드 설정
```bash
cd frontend
npm install
npm run dev
```

#### 3. 백엔드 설정
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### 4. 데이터베이스 설정
```bash
# PostgreSQL 데이터베이스 생성
createdb portfoliovision

# 마이그레이션 실행
cd backend
alembic upgrade head
```

### 환경 변수

#### 프론트엔드 (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### 백엔드 (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfoliovision
CLAUDE_API_KEY=sk-ant-...  # 선택사항 (AI 기능 사용 시)
```

## 📸 스크린샷

*(개발 진행 후 추가 예정)*

## 🤝 기여

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 개발되었습니다.

## ⚠️ 면책조항

**투자 조언 아님**: 이 도구는 개인 포트폴리오 추적 및 분석 전용입니다. 전문적인 투자 조언을 구성하지 않습니다.

**리스크 경고**:
- 과거 성과가 미래 결과를 보장하지 않습니다
- 모든 투자에는 리스크가 있습니다
- 데이터가 지연되거나 부정확할 수 있습니다
- 투자 결정 전 전문가와 상담하세요

## 📄 라이선스

MIT License

## 📞 연락처

프로젝트 관련 문의: [이메일 주소]

---

**Made with ❤️ for ETF investors**
