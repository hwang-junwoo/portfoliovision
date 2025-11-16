"""
FastAPI 의존성 주입
데이터베이스 세션 등 공통 의존성 관리
"""
from typing import Generator
from sqlalchemy.orm import Session
from app.database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    데이터베이스 세션 의존성
    각 요청마다 새로운 세션을 생성하고 요청 종료 시 자동으로 닫습니다.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
