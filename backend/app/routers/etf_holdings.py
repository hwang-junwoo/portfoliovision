"""
ETF 보유 종목 API 라우터
ETF 종목 관리 엔드포인트
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.etf_holding import ETFHolding as ETFHoldingModel
from app.models.portfolio import Portfolio as PortfolioModel
from app.schemas.etf_holding import (
    ETFHolding,
    ETFHoldingCreate,
    ETFHoldingUpdate,
)

router = APIRouter()


@router.post("/", response_model=ETFHolding, status_code=status.HTTP_201_CREATED)
def create_etf_holding(
    holding: ETFHoldingCreate,
    db: Session = Depends(get_db)
):
    """
    새 ETF 보유 종목 추가

    - **portfolio_id**: 포트폴리오 ID (필수)
    - **ticker**: ETF 티커 (필수)
    - **name**: ETF 이름 (선택)
    - **quantity**: 보유 수량 (필수)
    - **average_price**: 평균 매입 단가 (필수)
    """
    # 포트폴리오 존재 확인
    portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == holding.portfolio_id).first()
    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {holding.portfolio_id} not found"
        )

    # 같은 포트폴리오에 같은 티커가 이미 있는지 확인
    existing = db.query(ETFHoldingModel).filter(
        ETFHoldingModel.portfolio_id == holding.portfolio_id,
        ETFHoldingModel.ticker == holding.ticker
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"ETF {holding.ticker} already exists in portfolio {holding.portfolio_id}"
        )

    db_holding = ETFHoldingModel(**holding.model_dump())
    db.add(db_holding)
    db.commit()
    db.refresh(db_holding)
    return db_holding


@router.get("/portfolio/{portfolio_id}", response_model=List[ETFHolding])
def list_portfolio_holdings(
    portfolio_id: int,
    db: Session = Depends(get_db)
):
    """
    특정 포트폴리오의 보유 종목 목록 조회

    - **portfolio_id**: 포트폴리오 ID
    """
    # 포트폴리오 존재 확인
    portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {portfolio_id} not found"
        )

    holdings = db.query(ETFHoldingModel).filter(
        ETFHoldingModel.portfolio_id == portfolio_id
    ).all()
    return holdings


@router.get("/{holding_id}", response_model=ETFHolding)
def get_etf_holding(
    holding_id: int,
    db: Session = Depends(get_db)
):
    """
    ETF 보유 종목 상세 조회

    - **holding_id**: 보유 종목 ID
    """
    holding = db.query(ETFHoldingModel).filter(ETFHoldingModel.id == holding_id).first()
    if not holding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ETF holding with id {holding_id} not found"
        )
    return holding


@router.put("/{holding_id}", response_model=ETFHolding)
def update_etf_holding(
    holding_id: int,
    holding_update: ETFHoldingUpdate,
    db: Session = Depends(get_db)
):
    """
    ETF 보유 종목 수정

    - **holding_id**: 보유 종목 ID
    - 수정할 필드만 전송 (부분 업데이트 지원)
    """
    db_holding = db.query(ETFHoldingModel).filter(ETFHoldingModel.id == holding_id).first()
    if not db_holding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ETF holding with id {holding_id} not found"
        )

    # 제공된 필드만 업데이트
    update_data = holding_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_holding, field, value)

    db.commit()
    db.refresh(db_holding)
    return db_holding


@router.delete("/{holding_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_etf_holding(
    holding_id: int,
    db: Session = Depends(get_db)
):
    """
    ETF 보유 종목 삭제

    - **holding_id**: 보유 종목 ID
    """
    db_holding = db.query(ETFHoldingModel).filter(ETFHoldingModel.id == holding_id).first()
    if not db_holding:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ETF holding with id {holding_id} not found"
        )

    db.delete(db_holding)
    db.commit()
    return None
