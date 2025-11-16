"""
거래 내역 모델
ETF 매수/매도 거래 기록
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Numeric, DateTime, Enum as SQLEnum, ForeignKey, Date
from sqlalchemy.orm import relationship
from enum import Enum
from app.database import Base


class TransactionType(str, Enum):
    """거래 유형"""
    BUY = "buy"
    SELL = "sell"


class Transaction(Base):
    """거래 내역 테이블"""

    __tablename__ = "transactions"

    # 기본 정보
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False, index=True, comment="포트폴리오 ID")

    # 거래 정보
    ticker = Column(String(20), nullable=False, index=True, comment="ETF 티커 (예: SPY, QQQ)")
    transaction_type = Column(SQLEnum(TransactionType), nullable=False, comment="거래 유형 (buy/sell)")
    transaction_date = Column(Date, nullable=False, index=True, comment="거래일")

    # 수량 및 가격
    quantity = Column(Numeric(20, 8), nullable=False, comment="거래 수량")
    price = Column(Numeric(20, 2), nullable=False, comment="거래 단가 (USD)")
    total_amount = Column(Numeric(20, 2), nullable=False, comment="총 거래금액 (USD)")
    fee = Column(Numeric(20, 2), nullable=True, default=0, comment="수수료 (USD)")

    # 메모
    note = Column(String(500), nullable=True, comment="메모")

    # 메타데이터
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, comment="생성일시")

    # 관계 설정
    portfolio = relationship("Portfolio", back_populates="transactions")

    def __repr__(self):
        return f"<Transaction(id={self.id}, ticker='{self.ticker}', type='{self.transaction_type}', quantity={self.quantity})>"
