# Backend

FastAPI 기반 백엔드 API 서버

## 기술 스택
- Python 3.9+
- FastAPI
- PostgreSQL + TimescaleDB
- SQLAlchemy
- Alembic
- pandas, yfinance, pandas-ta

## 시작하기

```bash
# 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
venv\Scripts\activate

# 가상환경 활성화 (Linux/Mac)
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# 개발 서버 실행
uvicorn app.main:app --reload
```

## 디렉토리 구조

```
backend/
├── app/
│   ├── main.py           # FastAPI 애플리케이션 진입점
│   ├── config.py         # 설정
│   ├── database.py       # DB 연결
│   ├── models/           # SQLAlchemy 모델
│   ├── schemas/          # Pydantic 스키마
│   ├── routers/          # API 라우터
│   ├── services/         # 비즈니스 로직
│   └── utils/            # 유틸리티 함수
├── alembic/              # DB 마이그레이션
├── tests/                # 테스트
└── requirements.txt
```

*현재 FastAPI 프로젝트가 초기화되지 않았습니다. SETUP_GUIDE.md를 참조하여 설정하세요.*
