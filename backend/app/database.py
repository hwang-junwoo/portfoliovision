"""
데이터베이스 연결 및 세션 관리
SQLAlchemy를 사용한 PostgreSQL 연결
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# 동기 엔진 생성
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,  # SQL 쿼리 로깅
    pool_pre_ping=True,  # 연결 상태 확인
)

# 세션 팩토리 생성
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# Base 클래스 생성 (모든 모델의 부모 클래스)
Base = declarative_base()


def get_db():
    """
    데이터베이스 세션 의존성
    FastAPI 라우터에서 사용
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 향후 비동기 지원 (Phase 5 - 실시간 기능)
# from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
# async_engine = create_async_engine(settings.ASYNC_DATABASE_URL, echo=settings.DEBUG)
# AsyncSessionLocal = sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)
