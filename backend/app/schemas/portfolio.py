"""
포트폴리오 Pydantic 스키마
API 요청/응답 데이터 검증
"""
from datetime import datetime
from decimal import Decimal
from pydantic import BaseModel, Field
from typing import Optional, List, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.etf_holding import ETFHolding


class PortfolioBase(BaseModel):
    """포트폴리오 기본 스키마"""
    name: str = Field(..., min_length=1, max_length=100, description="포트폴리오 이름")
    description: Optional[str] = Field(None, description="포트폴리오 설명")
    target_return: Optional[Decimal] = Field(None, ge=0, le=999.99, description="목표 수익률 (%)")


class PortfolioCreate(PortfolioBase):
    """포트폴리오 생성 스키마"""
    pass


class PortfolioUpdate(BaseModel):
    """포트폴리오 수정 스키마 (모든 필드 선택사항)"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    target_return: Optional[Decimal] = Field(None, ge=0, le=999.99)


class PortfolioInDB(PortfolioBase):
    """데이터베이스 포트폴리오 스키마"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Portfolio(PortfolioInDB):
    """포트폴리오 응답 스키마"""
    pass


class PortfolioWithHoldings(Portfolio):
    """보유 종목 포함 포트폴리오 응답 스키마"""
    holdings: List["ETFHolding"] = []


class PortfolioSummary(BaseModel):
    """포트폴리오 요약 정보"""
    id: int
    name: str
    total_value: Decimal = Field(default=0, description="총 평가액 (USD)")
    total_cost: Decimal = Field(default=0, description="총 매입금액 (USD)")
    total_profit: Decimal = Field(default=0, description="총 손익 (USD)")
    total_profit_rate: Decimal = Field(default=0, description="총 수익률 (%)")
    holdings_count: int = Field(default=0, description="보유 종목 수")
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
