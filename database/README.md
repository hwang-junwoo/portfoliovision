# Database

PostgreSQL + TimescaleDB 데이터베이스 스크립트 및 마이그레이션

## 디렉토리 구조

```
database/
├── migrations/           # Alembic 마이그레이션 파일
├── seeds/                # 초기 데이터 시드
└── README.md
```

## 데이터베이스 스키마

### 주요 테이블
- `portfolios`: 포트폴리오 정보
- `etf_holdings`: ETF 보유 종목
- `transactions`: 거래 내역
- `etf_prices`: ETF 가격 (TimescaleDB hypertable)
- `news_articles`: 뉴스 기사
- `technical_indicators`: 기술적 지표

*상세 스키마는 PROJECT_PLAN.md의 데이터베이스 설계 섹션을 참조하세요.*
