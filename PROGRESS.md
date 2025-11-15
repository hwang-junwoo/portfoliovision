# 프로젝트 진행 상황

> 이 파일은 프로젝트의 진행 상황을 추적합니다. 새로운 세션을 시작할 때 이 파일을 먼저 확인하세요.

**마지막 업데이트**: 2025-11-15 15:35

---

## 📌 빠른 시작 가이드 (새 세션 시작 시)

### Claude에게 이렇게 요청하세요:

```
1. "CLAUDE.md를 읽고 프로젝트 상황을 파악해줘"
2. "PROGRESS.md에서 마지막 진행 상황을 확인해줘"
3. "다음 할 일을 진행해줘"
```

---

## ✅ 완료된 작업

### 2025-11-15: Phase 0 완료 🎉

#### 1. 프로젝트 기획 ✅ (오전)
- [x] 프로젝트 아이디어 확정 (해외 ETF 포트폴리오 관리)
- [x] 기술 스택 선정 (Next.js + FastAPI + PostgreSQL)
- [x] 비용 전략 수립 (무료 우선, AI는 선택사항)
- [x] 5개 Phase 로드맵 작성 (12주)
- [x] 우선순위 결정 (포트폴리오 관리 > 뉴스 > AI > 기술지표 > 실시간)

#### 2. 문서 작성 ✅ (오전)
- [x] `PROJECT_PLAN.md` - 전체 프로젝트 기획서 (한글, 매우 상세)
- [x] `PROJECT_STRUCTURE.md` - 디렉토리 및 파일 구조
- [x] `README.md` - 프로젝트 소개 및 빠른 시작
- [x] `SETUP_GUIDE.md` - 개발 환경 설정 단계별 가이드
- [x] `CLAUDE.md` - AI 어시스턴트를 위한 프로젝트 가이드
- [x] `PROGRESS.md` - 진행 상황 추적 (이 파일)
- [x] `.gitignore` - Git 제외 파일 설정

#### 3. 개발 환경 설정 ✅ (오후)
- [x] Git 저장소 초기화
- [x] 프로젝트 디렉토리 구조 생성 (frontend, backend, database 등)
- [x] 백엔드 FastAPI 초기 설정
  - [x] app/main.py (진입점, 헬스 체크 API)
  - [x] app/config.py (환경 설정)
  - [x] app/database.py (PostgreSQL 연결)
  - [x] requirements.txt (의존성)
  - [x] pytest 설정
  - [x] 기본 테스트 작성
- [x] 프론트엔드 Next.js 초기 설정
  - [x] Next.js 16 + TypeScript 프로젝트 생성
  - [x] Tailwind CSS 4 설정
  - [x] React Query, Zustand, Chart.js 설치
  - [x] API 클라이언트 설정 (axios)
  - [x] 메인 페이지 구현 (백엔드 헬스 체크)
- [x] GitHub 저장소 연결
  - [x] Repository: https://github.com/hwang-junwoo/portfoliovision
  - [x] 3개 커밋 푸시 완료
  - [x] 브랜치: main

#### 4. Git 커밋 히스토리 ✅
```
a425e07 - chore: 프로젝트 초기 설정 및 디렉토리 구조 생성
6131e92 - feat(backend): FastAPI 백엔드 초기 설정
72db8b7 - feat(frontend): Next.js 프론트엔드 초기 설정
```

---

## 🚧 현재 상태

### Phase 0: 프로젝트 초기 설정 ✅ **완료!**

**Phase 0 진행률**: 100% ✅

**완료됨**:
- ✅ 모든 기획 문서 작성
- ✅ Git 저장소 초기화
- ✅ 프로젝트 구조 생성
- ✅ 백엔드 환경 설정 (FastAPI)
- ✅ 프론트엔드 환경 설정 (Next.js)
- ✅ GitHub 원격 저장소 연결

**실행 가능한 상태**:
- ✅ 백엔드: `cd backend && uvicorn app.main:app --reload` (포트 8000)
- ✅ 프론트엔드: `cd frontend && npm run dev` (포트 3000)
- ✅ API 문서: http://localhost:8000/api/docs

---

## 📋 다음 할 일 (Phase 1 시작)

### Phase 1: 포트폴리오 관리 (1-3주)

#### 1단계: 데이터베이스 설정 (우선)
- [ ] PostgreSQL 설치 및 실행
- [ ] 데이터베이스 생성 (`portfoliovision`)
- [ ] backend/.env 파일 생성 (DATABASE_URL 설정)
- [ ] Alembic 초기화
- [ ] 테이블 스키마 설계:
  - [ ] `portfolios` - 포트폴리오 테이블
  - [ ] `etf_holdings` - ETF 보유 종목
  - [ ] `transactions` - 거래 내역
  - [ ] `etf_prices` - ETF 가격 (TimescaleDB 선택)

#### 2단계: 백엔드 API 개발
- [ ] SQLAlchemy 모델 작성 (models/)
- [ ] Pydantic 스키마 작성 (schemas/)
- [ ] 포트폴리오 API 라우터 (routers/portfolios.py)
  - [ ] GET /api/v1/portfolios - 목록
  - [ ] GET /api/v1/portfolios/{id} - 상세
  - [ ] POST /api/v1/portfolios - 생성
  - [ ] PUT /api/v1/portfolios/{id} - 수정
  - [ ] DELETE /api/v1/portfolios/{id} - 삭제
- [ ] ETF 종목 API 라우터 (routers/etfs.py)
- [ ] 거래 내역 API 라우터 (routers/transactions.py)

#### 3단계: 프론트엔드 UI 개발
- [ ] 대시보드 레이아웃 구성
- [ ] 포트폴리오 목록 페이지
- [ ] 포트폴리오 상세 페이지
- [ ] 거래 내역 입력 폼
- [ ] 기본 차트 컴포넌트

#### 4단계: 통합 및 테스트
- [ ] 백엔드-프론트엔드 API 통합
- [ ] API 테스트 작성
- [ ] E2E 테스트

---

## 🎯 Phase 진행률

### Phase 0: 프로젝트 초기 설정 ✅ 100%
- ✅ 기획 및 문서화 (100%)
- ✅ 개발 환경 설정 (100%)
- ✅ Git 초기화 및 GitHub 연결 (100%)

### Phase 1: 포트폴리오 관리 ⏭️ 0%
- ⬜ 데이터베이스 설정 (0%)
- ⬜ 백엔드 API (0%)
- ⬜ 프론트엔드 UI (0%)
- ⬜ 통합 및 테스트 (0%)

### Phase 2: 경제 뉴스 ⬜ 0%
### Phase 3: AI 인사이트 ⬜ 0% (선택사항)
### Phase 4: 기술적 지표 ⬜ 0%
### Phase 5: 실시간 기능 ⬜ 0%

---

## 📝 작업 로그

### 2025-11-15 오후 (15:00-15:35)

**작업**: Phase 0 개발 환경 설정 완료

**세부 작업**:
1. Git 저장소 초기화 및 디렉토리 구조 생성
2. 백엔드 FastAPI 설정:
   - main.py (헬스 체크 API)
   - config.py (환경 설정)
   - database.py (DB 연결)
   - requirements.txt (무료 라이브러리만)
   - pytest 설정 및 기본 테스트
3. 프론트엔드 Next.js 설정:
   - Next.js 16 + TypeScript
   - Tailwind CSS 4
   - React Query Provider
   - API 클라이언트 (axios)
   - 메인 페이지 (백엔드 헬스 체크 기능)
4. GitHub 저장소 연결 및 푸시 (3개 커밋)

**성과**:
- ✅ 개발 환경 완전히 준비됨
- ✅ 백엔드/프론트엔드 모두 실행 가능
- ✅ GitHub에 코드 백업 완료

**다음 세션 할 일**:
- PostgreSQL 설치 및 데이터베이스 생성
- Alembic 마이그레이션 설정
- 첫 테이블 스키마 작성

---

### 2025-11-15 오전 (10:00-14:00)

**작업**: 프로젝트 기획 및 문서화

**세부 작업**:
1. 프로젝트 아이디어 확정 및 기획
2. 실현 가능성 조사 (ETF 데이터, 뉴스 수집 등)
3. 비용 분석 (무료 vs 유료 옵션)
4. 기술 스택 선정
5. 5개 Phase 로드맵 작성
6. 6개 문서 파일 작성

**중요 결정**:
- 무료 기능 우선 개발
- AI는 선택사항
- Claude API 비용은 Pro 구독과 별개

---

## 📊 전체 프로젝트 타임라인

```
Phase 0  [============================] 100%  ✅ 완료
Phase 1  [                            ]   0%  ⏭️ 다음
Phase 2  [                            ]   0%
Phase 3  [                            ]   0%  (AI - 선택사항)
Phase 4  [                            ]   0%
Phase 5  [                            ]   0%
```

**진행 상황**: 0주차 완료 → 1주차 시작 준비

---

## 🔍 참고 사항

### 개발 환경 정보

**로컬 서버 실행 방법**:
```bash
# 백엔드
cd backend
python -m venv venv  # 처음 한 번만
venv\Scripts\activate  # Windows
pip install -r requirements.txt  # 처음 한 번만
uvicorn app.main:app --reload

# 프론트엔드 (새 터미널)
cd frontend
npm install  # 처음 한 번만
npm run dev
```

**접속 URL**:
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://localhost:8000
- API 문서: http://localhost:8000/api/docs

**GitHub**:
- Repository: https://github.com/hwang-junwoo/portfoliovision
- 브랜치: main

### 중요한 파일 위치

**기획 문서**:
- `PROJECT_PLAN.md` - 가장 상세한 전체 계획
- `CLAUDE.md` - AI 어시스턴트용 빠른 참조

**개발 가이드**:
- `SETUP_GUIDE.md` - 개발 환경 설정 단계
- `PROJECT_STRUCTURE.md` - 코드 구조 및 아키텍처

**진행 추적**:
- `PROGRESS.md` - 이 파일 (진행 상황)

---

## 💡 새 세션 시작 체크리스트

Claude와 대화를 새로 시작할 때:

1. [ ] "CLAUDE.md를 읽어줘" 요청
2. [ ] "PROGRESS.md에서 마지막 작업 확인해줘" 요청
3. [ ] 현재 Phase와 다음 할 일 확인
4. [ ] 작업 시작!

---

## 🐛 알려진 이슈 / 해결해야 할 것

**현재 이슈**: 없음

**향후 고려사항**:
- PostgreSQL 설치 필요 (Phase 1 시작 전)
- TimescaleDB 설치 여부 결정 (선택사항)
- .env 파일 생성 (backend, frontend)

---

## ✍️ 메모 / 아이디어

**나중에 고려할 기능**:
- 배당금 추적
- 세금 보고 도구
- PDF 보고서 생성
- 모바일 앱

**기술적 메모**:
- AI 서비스 레이어는 환경 변수로 활성화/비활성화
- 모든 핵심 기능은 AI 없이 작동
- .gitignore에서 backend/lib만 제외하도록 수정함

---

## 🎓 학습 중 발견한 것

**오늘 배운 것**:
1. Claude API는 Pro 구독과 별개로 과금됨
2. yfinance는 무료로 ETF 데이터 제공
3. Next.js 16은 React 19 사용
4. Tailwind CSS 4가 최신 버전
5. FastAPI는 자동 API 문서화 제공 (Swagger)

---

## 🎉 Phase 0 완료!

**다음 세션에는 Phase 1 (포트폴리오 관리) 개발을 시작합니다!**

**새 세션 시작 명령어**:
```
"CLAUDE.md와 PROGRESS.md를 읽고 Phase 1 개발을 시작해줘"
```

**첫 작업**: PostgreSQL 데이터베이스 설정 및 Alembic 마이그레이션
