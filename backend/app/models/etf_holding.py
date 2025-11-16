"""
ETF 보유 내역 모델
각 포트폴리오에서 보유 중인 ETF 종목 정보
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class ETFHolding(Base):
    """ETF 보유 내역 테이블"""

    __tablename__ = "etf_holdings"

    # 기본 정보
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False, index=True, comment="포트폴리오 ID")

    # ETF 정보
    ticker = Column(String(20), nullable=False, index=True, comment="ETF 티커 (예: SPY, QQQ)")
    name = Column(String(200), nullable=True, comment="ETF 이름")

    # 보유 정보
    quantity = Column(Numeric(20, 8), nullable=False, default=0, comment="보유 수량")
    average_price = Column(Numeric(20, 2), nullable=False, default=0, comment="평균 매수가 (USD)")

    # 메타데이터
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, comment="생성일시")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False, comment="수정일시")

    # 관계 설정
    portfolio = relationship("Portfolio", back_populates="holdings")

    def __repr__(self):
        return f"<ETFHolding(id={self.id}, ticker='{self.ticker}', quantity={self.quantity})>"
