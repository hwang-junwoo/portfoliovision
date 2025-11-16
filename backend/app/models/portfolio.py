"""
포트폴리오 모델
사용자가 관리하는 포트폴리오 정보
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Numeric
from sqlalchemy.orm import relationship
from app.database import Base


class Portfolio(Base):
    """포트폴리오 테이블"""

    __tablename__ = "portfolios"

    # 기본 정보
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True, comment="포트폴리오 이름")
    description = Column(Text, nullable=True, comment="설명")

    # 목표 설정
    target_return = Column(Numeric(5, 2), nullable=True, comment="목표 수익률 (%)")

    # 메타데이터
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, comment="생성일시")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False, comment="수정일시")

    # 관계 설정
    holdings = relationship("ETFHolding", back_populates="portfolio", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="portfolio", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Portfolio(id={self.id}, name='{self.name}')>"
