# PortfolioVision - 개발 환경 설정 가이드

이 가이드는 PortfolioVision 프로젝트를 로컬 환경에서 실행하기 위한 단계별 설정 방법을 안내합니다.

---

## 📋 사전 요구사항

### 필수 소프트웨어

1. **Node.js** (v18 이상)
   - [다운로드](https://nodejs.org/)
   - 설치 확인: `node --version`

2. **Python** (v3.9 이상)
   - [다운로드](https://www.python.org/downloads/)
   - 설치 확인: `python --version`

3. **PostgreSQL** (v14 이상)
   - [다운로드](https://www.postgresql.org/download/)
   - 설치 확인: `psql --version`

4. **Git**
   - [다운로드](https://git-scm.com/)
   - 설치 확인: `git --version`

### 추천 도구

- **VSCode**: 코드 에디터
- **pgAdmin** 또는 **TablePlus**: 데이터베이스 GUI
- **Postman** 또는 **Thunder Client**: API 테스팅

---

## 🚀 Phase 1 설정 단계

### 1단계: 프로젝트 디렉토리 구조 생성

```bash
# 프로젝트 루트에서 실행
mkdir -p frontend backend database docs scripts

# 백엔드 디렉토리 구조
mkdir -p backend/app/api/v1
mkdir -p backend/app/models
mkdir -p backend/app/schemas
mkdir -p backend/app/services
mkdir -p backend/app/core
mkdir -p backend/app/utils
mkdir -p backend/tests
mkdir -p backend/alembic/versions

# 프론트엔드 디렉토리는 Next.js CLI로 생성 예정
```

---

### 2단계: 백엔드 설정 (FastAPI)

#### 2-1. Python 가상환경 생성

```bash
cd backend

# 가상환경 생성
python -m venv venv

# 가상환경 활성화
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

#### 2-2. 필수 패키지 설치

`backend/requirements.txt` 파일 생성:

```txt
# Core
fastapi==0.109.0
uvicorn[standard]==0.27.0
python-dotenv==1.0.0

# Database
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
alembic==1.13.1

# Validation
pydantic==2.5.3
pydantic-settings==2.1.0

# Data & Analysis
pandas==2.1.4
pandas-ta==0.3.14b
yfinance==0.2.35
numpy==1.26.3

# News & RSS
feedparser==6.0.10
aiohttp==3.9.1

# Utils
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6

# Development
pytest==7.4.4
pytest-asyncio==0.23.3
httpx==0.26.0
```

설치:
```bash
pip install -r requirements.txt
```

#### 2-3. 환경 변수 설정

`backend/.env` 파일 생성:

```env
# Application
APP_NAME=PortfolioVision
APP_VERSION=1.0.0
DEBUG=True

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/portfoliovision

# Security
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# API Keys (Phase 3+, 선택사항)
# CLAUDE_API_KEY=sk-ant-...
# ALPHA_VANTAGE_API_KEY=...
```

**⚠️ 중요**: `.env` 파일은 절대 Git에 커밋하지 마세요!

#### 2-4. FastAPI 기본 구조 생성

`backend/app/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="ETF Portfolio Management & Investment Intelligence Platform"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to PortfolioVision API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

`backend/app/core/config.py`:

```python
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "PortfolioVision"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
```

#### 2-5. 백엔드 실행 테스트

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

브라우저에서 확인:
- API: http://localhost:8000
- API 문서: http://localhost:8000/docs

---

### 3단계: 데이터베이스 설정 (PostgreSQL)

#### 3-1. PostgreSQL 데이터베이스 생성

```bash
# PostgreSQL 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE portfoliovision;

# 사용자 생성 (선택사항)
CREATE USER portfoliovision_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE portfoliovision TO portfoliovision_user;

# 종료
\q
```

#### 3-2. TimescaleDB 확장 설치 (선택사항, 권장)

```sql
-- portfoliovision 데이터베이스에 접속
psql -U postgres -d portfoliovision

-- TimescaleDB 확장 활성화
CREATE EXTENSION IF NOT EXISTS timescaledb;

\q
```

**TimescaleDB 미설치 시**: 일반 PostgreSQL 테이블로도 동작하지만 시계열 데이터 성능이 낮을 수 있습니다.

#### 3-3. Alembic 초기화 (데이터베이스 마이그레이션)

```bash
cd backend

# Alembic 초기화
alembic init alembic

# alembic.ini 수정 (sqlalchemy.url 주석 처리)
# env.py에서 동적으로 DATABASE_URL을 로드하도록 설정
```

`backend/alembic/env.py` 수정:

```python
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.core.config import settings
from app.database import Base

# Alembic Config 객체
config = context.config

# DATABASE_URL 설정
config.set_main_option('sqlalchemy.url', settings.DATABASE_URL)

# 모델 메타데이터
target_metadata = Base.metadata

# ... (나머지는 기본값 유지)
```

---

### 4단계: 프론트엔드 설정 (Next.js)

#### 4-1. Next.js 프로젝트 생성

```bash
# 프로젝트 루트에서 실행
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir
```

설정 옵션:
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ `src/` directory
- ✅ App Router
- ❌ Turbopack (아직 안정화 중)
- ✅ Import alias (@/*)

#### 4-2. 추가 패키지 설치

```bash
cd frontend

# UI 라이브러리
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# 차트 라이브러리
npm install chart.js react-chartjs-2

# 상태 관리
npm install zustand

# API 클라이언트
npm install axios

# 유틸리티
npm install date-fns
npm install react-query @tanstack/react-query
```

#### 4-3. shadcn/ui 초기화

```bash
npx shadcn-ui@latest init
```

설정:
- Style: Default
- Base color: Slate
- CSS variables: Yes

shadcn/ui 컴포넌트 설치:

```bash
npx shadcn-ui@latest add button card table input dialog select
```

#### 4-4. 환경 변수 설정

`frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

#### 4-5. 프론트엔드 실행 테스트

```bash
cd frontend
npm run dev
```

브라우저에서 확인: http://localhost:3000

---

### 5단계: Git 설정

#### 5-1. .gitignore 생성

프로젝트 루트에 `.gitignore`:

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
ENV/
env/
.venv

# FastAPI / Backend
backend/.env
backend/alembic/versions/*.pyc

# Node / Frontend
node_modules/
.next/
out/
frontend/.env.local
frontend/.env.production.local

# Database
*.db
*.sqlite
*.sqlite3

# IDEs
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Logs
*.log
logs/

# OS
Thumbs.db
```

#### 5-2. Git 초기화

```bash
# 프로젝트 루트에서
git init
git add .
git commit -m "Initial commit: Project structure and setup"
```

#### 5-3. GitHub 저장소 연결 (선택사항)

```bash
# GitHub에서 저장소 생성 후
git remote add origin https://github.com/yourusername/portfoliovision.git
git branch -M main
git push -u origin main
```

---

## ✅ 설정 확인 체크리스트

### 백엔드
- [ ] Python 가상환경 활성화 (`venv`)
- [ ] 패키지 설치 완료 (`pip install -r requirements.txt`)
- [ ] `.env` 파일 생성 및 설정
- [ ] FastAPI 서버 실행 (`uvicorn app.main:app --reload`)
- [ ] http://localhost:8000/docs 접속 가능

### 데이터베이스
- [ ] PostgreSQL 설치 및 실행
- [ ] `portfoliovision` 데이터베이스 생성
- [ ] TimescaleDB 확장 설치 (선택사항)
- [ ] Alembic 초기화

### 프론트엔드
- [ ] Next.js 프로젝트 생성
- [ ] 추가 패키지 설치
- [ ] shadcn/ui 초기화
- [ ] `.env.local` 파일 생성
- [ ] Next.js 서버 실행 (`npm run dev`)
- [ ] http://localhost:3000 접속 가능

### Git
- [ ] `.gitignore` 생성
- [ ] Git 초기화
- [ ] 첫 커밋 완료

---

## 🎯 다음 단계

설정이 완료되면 Phase 1 개발을 시작할 수 있습니다:

1. **데이터베이스 스키마 설계 및 마이그레이션**
2. **포트폴리오 CRUD API 구현**
3. **프론트엔드 대시보드 UI 구축**

자세한 내용은 [PROJECT_PLAN.md](PROJECT_PLAN.md)의 Phase 1 섹션을 참조하세요.

---

## 🐛 문제 해결

### PostgreSQL 연결 오류
```
sqlalchemy.exc.OperationalError: could not connect to server
```
**해결**: PostgreSQL 서비스가 실행 중인지 확인
- Windows: 서비스 관리자에서 PostgreSQL 시작
- macOS: `brew services start postgresql`
- Linux: `sudo systemctl start postgresql`

### FastAPI 임포트 오류
```
ModuleNotFoundError: No module named 'app'
```
**해결**: 가상환경 활성화 확인 및 PYTHONPATH 설정
```bash
cd backend
export PYTHONPATH="${PYTHONPATH}:${PWD}"  # macOS/Linux
set PYTHONPATH=%PYTHONPATH%;%CD%          # Windows
```

### Next.js 빌드 오류
```
Module not found: Can't resolve '@/...'
```
**해결**: `tsconfig.json`의 paths 설정 확인

---

**설정 완료! 이제 개발을 시작할 준비가 되었습니다! 🚀**
