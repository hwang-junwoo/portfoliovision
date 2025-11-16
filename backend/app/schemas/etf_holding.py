"""
ETF 보유 종목 Pydantic 스키마
API 요청/응답 데이터 검증
"""
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, Field
from typing import Optional


class ETFHoldingBase(BaseModel):
    """ETF 보유 종목 기본 스키마"""
    ticker: str = Field(..., min_length=1, max_length=20, description="ETF 티커 (예: SPY, QQQ)")
    name: Optional[str] = Field(None, max_length=200, description="ETF 이름")
    quantity: Decimal = Field(..., ge=0, description="보유 수량")
    average_price: Decimal = Field(..., ge=0, description="평균 매입 단가 (USD)")


class ETFHoldingCreate(BaseModel):
    """ETF 보유 종목 생성 스키마"""
    portfolio_id: int = Field(..., gt=0, description="포트폴리오 ID")
    ticker: str = Field(..., min_length=1, max_length=20)
    name: Optional[str] = Field(None, max_length=200)
    quantity: Decimal = Field(..., ge=0)
    average_price: Decimal = Field(..., ge=0)


class ETFHoldingUpdate(BaseModel):
    """ETF 보유 종목 수정 스키마"""
    name: Optional[str] = Field(None, max_length=200)
    quantity: Optional[Decimal] = Field(None, ge=0)
    average_price: Optional[Decimal] = Field(None, ge=0)


class ETFHoldingInDB(ETFHoldingBase):
    """데이터베이스 ETF 보유 종목 스키마"""
    id: int
    portfolio_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ETFHolding(ETFHoldingInDB):
    """ETF 보유 종목 응답 스키마"""
    pass


class ETFHoldingWithValue(ETFHolding):
    """현재가 포함 ETF 보유 종목 응답 스키마"""
    current_price: Optional[Decimal] = Field(None, description="현재가 (USD)")
    market_value: Optional[Decimal] = Field(None, description="평가액 (USD)")
    total_cost: Optional[Decimal] = Field(None, description="매입금액 (USD)")
    profit: Optional[Decimal] = Field(None, description="손익 (USD)")
    profit_rate: Optional[Decimal] = Field(None, description="수익률 (%)")
