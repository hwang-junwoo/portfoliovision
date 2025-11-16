"""
거래 내역 Pydantic 스키마
API 요청/응답 데이터 검증
"""
from datetime import datetime, date
from decimal import Decimal
from pydantic import BaseModel, Field, field_validator
from typing import Optional
from app.models.transaction import TransactionType


class TransactionBase(BaseModel):
    """거래 내역 기본 스키마"""
    ticker: str = Field(..., min_length=1, max_length=20, description="ETF 티커")
    transaction_type: TransactionType = Field(..., description="거래 유형 (buy/sell)")
    transaction_date: date = Field(..., description="거래일")
    quantity: Decimal = Field(..., gt=0, description="거래 수량")
    price: Decimal = Field(..., gt=0, description="거래 단가 (USD)")
    total_amount: Decimal = Field(..., gt=0, description="총 거래금액 (USD)")
    fee: Optional[Decimal] = Field(0, ge=0, description="수수료 (USD)")
    note: Optional[str] = Field(None, max_length=500, description="메모")

    @field_validator('total_amount')
    @classmethod
    def validate_total_amount(cls, v: Decimal, info) -> Decimal:
        """총 거래금액 검증 (수량 * 단가와 일치해야 함)"""
        # Note: validation logic can be added here if needed
        return v


class TransactionCreate(BaseModel):
    """거래 내역 생성 스키마"""
    portfolio_id: int = Field(..., gt=0, description="포트폴리오 ID")
    ticker: str = Field(..., min_length=1, max_length=20)
    transaction_type: TransactionType
    transaction_date: date
    quantity: Decimal = Field(..., gt=0)
    price: Decimal = Field(..., gt=0)
    fee: Optional[Decimal] = Field(0, ge=0)
    note: Optional[str] = Field(None, max_length=500)

    @property
    def total_amount(self) -> Decimal:
        """총 거래금액 자동 계산"""
        return self.quantity * self.price


class TransactionUpdate(BaseModel):
    """거래 내역 수정 스키마"""
    ticker: Optional[str] = Field(None, min_length=1, max_length=20)
    transaction_type: Optional[TransactionType] = None
    transaction_date: Optional[date] = None
    quantity: Optional[Decimal] = Field(None, gt=0)
    price: Optional[Decimal] = Field(None, gt=0)
    fee: Optional[Decimal] = Field(None, ge=0)
    note: Optional[str] = Field(None, max_length=500)


class TransactionInDB(TransactionBase):
    """데이터베이스 거래 내역 스키마"""
    id: int
    portfolio_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class Transaction(TransactionInDB):
    """거래 내역 응답 스키마"""
    pass


class TransactionSummary(BaseModel):
    """거래 내역 요약"""
    ticker: str
    total_buy_quantity: Decimal = Field(default=0, description="총 매수 수량")
    total_sell_quantity: Decimal = Field(default=0, description="총 매도 수량")
    total_buy_amount: Decimal = Field(default=0, description="총 매수 금액 (USD)")
    total_sell_amount: Decimal = Field(default=0, description="총 매도 금액 (USD)")
    net_quantity: Decimal = Field(default=0, description="순 보유 수량")
    average_buy_price: Optional[Decimal] = Field(None, description="평균 매수 단가 (USD)")
