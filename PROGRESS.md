# 프로젝트 진행 상황

> 이 파일은 프로젝트의 진행 상황을 추적합니다. 새로운 세션을 시작할 때 이 파일을 먼저 확인하세요.

**마지막 업데이트**: 2025-11-15

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

### 2025-11-15: 프로젝트 기획 및 문서화 완료

#### 1. 프로젝트 기획 ✅
- [x] 프로젝트 아이디어 확정 (해외 ETF 포트폴리오 관리)
- [x] 기술 스택 선정 (Next.js + FastAPI + PostgreSQL)
- [x] 비용 전략 수립 (무료 우선, AI는 선택사항)
- [x] 5개 Phase 로드맵 작성 (12주)
- [x] 우선순위 결정 (포트폴리오 관리 > 뉴스 > AI > 기술지표 > 실시간)

#### 2. 문서 작성 ✅
- [x] `PROJECT_PLAN.md` - 전체 프로젝트 기획서 (한글, 매우 상세)
- [x] `PROJECT_STRUCTURE.md` - 디렉토리 및 파일 구조
- [x] `README.md` - 프로젝트 소개 및 빠른 시작
- [x] `SETUP_GUIDE.md` - 개발 환경 설정 단계별 가이드
- [x] `CLAUDE.md` - AI 어시스턴트를 위한 프로젝트 가이드
- [x] `PROGRESS.md` - 진행 상황 추적 (이 파일)
- [x] `.gitignore` - Git 제외 파일 설정

#### 3. 주요 결정 사항 ✅
- [x] 프로젝트명: **PortfolioVision**
- [x] 무료 기능 우선 개발 (Phase 1, 2, 4, 5)
- [x] AI 기능(Phase 3)은 나중에 추가
- [x] Claude API 비용 이해 (Pro 구독과 별개)
- [x] 개발 환경: 로컬 (완전 무료)

---

## 🚧 현재 상태

### Phase 0: 프로젝트 초기 설정 📍 **← 현재 위치**

**상태**: 문서화 완료, 개발 환경 설정 대기 중

**완료됨**:
- ✅ 모든 기획 문서 작성
- ✅ Git 설정 파일 (.gitignore) 생성
- ✅ 프로젝트 구조 설계

**미완료**:
- ⬜ 실제 디렉토리 구조 생성
- ⬜ Git 저장소 초기화
- ⬜ 백엔드 환경 설정
- ⬜ 프론트엔드 환경 설정
- ⬜ 데이터베이스 설정

---

## 📋 다음 할 일 (우선순위 순)

### 즉시 할 일 (Phase 0 완료)

#### 1. 프로젝트 폴더 구조 생성
```bash
# 프로젝트 루트에서 실행
mkdir frontend backend database docs scripts
```

#### 2. Git 저장소 초기화
```bash
git init
git add .
git commit -m "Initial commit: Project documentation"
```

#### 3. 백엔드 초기 설정
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
```

`backend/requirements.txt` 생성 후:
```bash
pip install -r requirements.txt
```

#### 4. 프론트엔드 초기 설정
```bash
npx create-next-app@latest frontend --typescript --tailwind --app --src-dir
cd frontend
npm install
```

#### 5. 데이터베이스 설정
```sql
-- PostgreSQL에서 실행
CREATE DATABASE portfoliovision;
```

---

### 그 다음 할 일 (Phase 1 시작)

#### Week 1: 프로젝트 셋업
- [ ] FastAPI 기본 구조 생성 (`app/main.py`)
- [ ] Next.js 기본 페이지 구성
- [ ] PostgreSQL 연결 설정
- [ ] Alembic 마이그레이션 초기화
- [ ] 첫 API 엔드포인트 테스트 (Hello World)

#### Week 2: 핵심 포트폴리오 기능
- [ ] 데이터베이스 스키마 작성 (portfolios, holdings, transactions)
- [ ] 포트폴리오 CRUD API 구현
- [ ] 보유 종목 관리 API 구현
- [ ] 프론트엔드 대시보드 레이아웃
- [ ] 포트폴리오 목록 화면

#### Week 3: 포트폴리오 분석
- [ ] yfinance API 통합
- [ ] ETF 가격 데이터 가져오기
- [ ] 손익 계산 로직
- [ ] 자산 배분 차트 (파이 차트)
- [ ] 성과 지표 표시

---

## 🎯 현재 Phase 진행률

### Phase 0: 프로젝트 초기 설정 🟡 90%
- ✅ 기획 및 문서화 (100%)
- ⬜ 개발 환경 설정 (0%)
- ⬜ Git 초기화 (0%)

### Phase 1: 포트폴리오 관리 ⬜ 0%
- ⬜ Week 1: 프로젝트 셋업 (0%)
- ⬜ Week 2: 핵심 기능 (0%)
- ⬜ Week 3: 분석 기능 (0%)

### Phase 2: 경제 뉴스 ⬜ 0%
### Phase 3: AI 인사이트 ⬜ 0% (선택사항)
### Phase 4: 기술적 지표 ⬜ 0%
### Phase 5: 실시간 기능 ⬜ 0%

---

## 📝 작업 로그

### 2025-11-15 (오늘)

**시간**: 기획 및 문서 작성

**작업 내용**:
1. 프로젝트 아이디어 확정 및 기획
2. 실현 가능성 조사 (한국 주식 API, ETF 데이터, 뉴스 수집 등)
3. 비용 분석 (무료 vs 유료 옵션)
4. 기술 스택 선정 (Next.js, FastAPI, PostgreSQL)
5. 5개 Phase 로드맵 작성
6. 프로젝트 문서 작성:
   - PROJECT_PLAN.md (전체 기획서)
   - PROJECT_STRUCTURE.md (구조 설계)
   - README.md (소개)
   - SETUP_GUIDE.md (설정 가이드)
   - CLAUDE.md (AI 가이드)
   - PROGRESS.md (진행 상황, 이 파일)
   - .gitignore

**중요 결정**:
- 무료 기능 우선 개발 (Phase 1, 2, 4, 5)
- AI는 나중에 선택적으로 추가 (Phase 3)
- Claude API 비용은 Pro 구독과 별개

**다음 세션 할 일**:
- 프로젝트 폴더 구조 생성
- Git 저장소 초기화
- 개발 환경 설정 시작

---

## 🔍 참고 사항

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
- TimescaleDB 설치 여부 결정 (선택사항이지만 권장)
- 폴더명 변경 (AAA → portfoliovision) - 나중에 수동으로

---

## 📊 전체 프로젝트 타임라인

```
Week 0  [============================] 90%  ← 현재
Week 1  [                            ]  0%
Week 2  [                            ]  0%
Week 3  [                            ]  0%
Week 4  [                            ]  0%
Week 5  [                            ]  0%
Week 6  [                            ]  0%  (AI - 선택사항)
Week 7  [                            ]  0%  (AI - 선택사항)
Week 8  [                            ]  0%  (AI - 선택사항)
Week 9  [                            ]  0%
Week 10 [                            ]  0%
Week 11 [                            ]  0%
Week 12 [                            ]  0%
```

**예상 완료일**: 2025년 2월 중순 (12주 후)

---

## ✍️ 메모 / 아이디어

**나중에 고려할 기능**:
- 배당금 추적
- 세금 보고 도구
- PDF 보고서 생성
- 모바일 앱

**기술적 메모**:
- AI 서비스 레이어는 환경 변수로 활성화/비활성화 가능하게
- 모든 핵심 기능은 AI 없이 작동해야 함

---

## 🎓 학습 중 발견한 것

**오늘 배운 것**:
1. Claude API는 Pro 구독과 별개로 과금됨
2. yfinance는 무료로 ETF 데이터 제공
3. TimescaleDB는 시계열 데이터에 매우 효율적
4. FastAPI는 자동 API 문서화 제공 (Swagger)

---

**다음 세션에는 실제 코딩을 시작합니다! 🚀**

**새 세션 시작 명령어**:
```
"CLAUDE.md와 PROGRESS.md를 읽고 다음 작업을 진행해줘"
```
