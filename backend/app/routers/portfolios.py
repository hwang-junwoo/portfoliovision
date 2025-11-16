"""
포트폴리오 API 라우터
포트폴리오 CRUD 엔드포인트
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.portfolio import Portfolio as PortfolioModel
from app.schemas.portfolio import (
    Portfolio,
    PortfolioCreate,
    PortfolioUpdate,
    PortfolioWithHoldings,
)

router = APIRouter()


@router.post("/", response_model=Portfolio, status_code=status.HTTP_201_CREATED)
def create_portfolio(
    portfolio: PortfolioCreate,
    db: Session = Depends(get_db)
):
    """
    새 포트폴리오 생성

    - **name**: 포트폴리오 이름 (필수)
    - **description**: 설명 (선택)
    - **target_return**: 목표 수익률 % (선택)
    """
    db_portfolio = PortfolioModel(**portfolio.model_dump())
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio


@router.get("/", response_model=List[Portfolio])
def list_portfolios(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    포트폴리오 목록 조회

    - **skip**: 건너뛸 개수 (페이지네이션)
    - **limit**: 최대 조회 개수
    """
    portfolios = db.query(PortfolioModel).offset(skip).limit(limit).all()
    return portfolios


@router.get("/{portfolio_id}", response_model=Portfolio)
def get_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db)
):
    """
    포트폴리오 상세 조회

    - **portfolio_id**: 포트폴리오 ID
    """
    portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {portfolio_id} not found"
        )
    return portfolio


@router.get("/{portfolio_id}/with-holdings", response_model=PortfolioWithHoldings)
def get_portfolio_with_holdings(
    portfolio_id: int,
    db: Session = Depends(get_db)
):
    """
    보유 종목 포함 포트폴리오 조회

    - **portfolio_id**: 포트폴리오 ID
    """
    portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {portfolio_id} not found"
        )
    return portfolio


@router.put("/{portfolio_id}", response_model=Portfolio)
def update_portfolio(
    portfolio_id: int,
    portfolio_update: PortfolioUpdate,
    db: Session = Depends(get_db)
):
    """
    포트폴리오 수정

    - **portfolio_id**: 포트폴리오 ID
    - 수정할 필드만 전송 (부분 업데이트 지원)
    """
    db_portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == portfolio_id).first()
    if not db_portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {portfolio_id} not found"
        )

    # 제공된 필드만 업데이트
    update_data = portfolio_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_portfolio, field, value)

    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio


@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_portfolio(
    portfolio_id: int,
    db: Session = Depends(get_db)
):
    """
    포트폴리오 삭제

    - **portfolio_id**: 포트폴리오 ID
    - 연관된 보유 종목과 거래 내역도 함께 삭제됩니다 (cascade)
    """
    db_portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == portfolio_id).first()
    if not db_portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {portfolio_id} not found"
        )

    db.delete(db_portfolio)
    db.commit()
    return None
