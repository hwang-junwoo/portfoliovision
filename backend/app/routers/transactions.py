"""
거래 내역 API 라우터
ETF 매수/매도 거래 기록 관리
"""
from typing import List, Optional
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.transaction import Transaction as TransactionModel, TransactionType
from app.models.portfolio import Portfolio as PortfolioModel
from app.schemas.transaction import (
    Transaction,
    TransactionCreate,
    TransactionUpdate,
)

router = APIRouter()


@router.post("/", response_model=Transaction, status_code=status.HTTP_201_CREATED)
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db)
):
    """
    새 거래 내역 기록

    - **portfolio_id**: 포트폴리오 ID (필수)
    - **ticker**: ETF 티커 (필수)
    - **transaction_type**: 거래 유형 buy/sell (필수)
    - **transaction_date**: 거래일 (필수)
    - **quantity**: 거래 수량 (필수)
    - **price**: 거래 단가 (필수)
    - **fee**: 수수료 (선택, 기본값 0)
    - **note**: 메모 (선택)
    """
    # 포트폴리오 존재 확인
    portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == transaction.portfolio_id).first()
    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {transaction.portfolio_id} not found"
        )

    # total_amount 자동 계산
    total_amount = transaction.quantity * transaction.price

    db_transaction = TransactionModel(
        portfolio_id=transaction.portfolio_id,
        ticker=transaction.ticker,
        transaction_type=transaction.transaction_type,
        transaction_date=transaction.transaction_date,
        quantity=transaction.quantity,
        price=transaction.price,
        total_amount=total_amount,
        fee=transaction.fee or 0,
        note=transaction.note,
    )

    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@router.get("/portfolio/{portfolio_id}", response_model=List[Transaction])
def list_portfolio_transactions(
    portfolio_id: int,
    ticker: Optional[str] = Query(None, description="특정 티커로 필터링"),
    transaction_type: Optional[TransactionType] = Query(None, description="거래 유형으로 필터링"),
    start_date: Optional[date] = Query(None, description="시작일"),
    end_date: Optional[date] = Query(None, description="종료일"),
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    특정 포트폴리오의 거래 내역 조회

    - **portfolio_id**: 포트폴리오 ID
    - **ticker**: 특정 ETF로 필터링 (선택)
    - **transaction_type**: buy/sell로 필터링 (선택)
    - **start_date**: 시작일 (선택)
    - **end_date**: 종료일 (선택)
    - **skip**: 건너뛸 개수
    - **limit**: 최대 조회 개수
    """
    # 포트폴리오 존재 확인
    portfolio = db.query(PortfolioModel).filter(PortfolioModel.id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Portfolio with id {portfolio_id} not found"
        )

    # 쿼리 구성
    query = db.query(TransactionModel).filter(TransactionModel.portfolio_id == portfolio_id)

    if ticker:
        query = query.filter(TransactionModel.ticker == ticker)
    if transaction_type:
        query = query.filter(TransactionModel.transaction_type == transaction_type)
    if start_date:
        query = query.filter(TransactionModel.transaction_date >= start_date)
    if end_date:
        query = query.filter(TransactionModel.transaction_date <= end_date)

    # 최신순 정렬
    transactions = query.order_by(TransactionModel.transaction_date.desc()).offset(skip).limit(limit).all()
    return transactions


@router.get("/{transaction_id}", response_model=Transaction)
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):
    """
    거래 내역 상세 조회

    - **transaction_id**: 거래 내역 ID
    """
    transaction = db.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transaction with id {transaction_id} not found"
        )
    return transaction


@router.put("/{transaction_id}", response_model=Transaction)
def update_transaction(
    transaction_id: int,
    transaction_update: TransactionUpdate,
    db: Session = Depends(get_db)
):
    """
    거래 내역 수정

    - **transaction_id**: 거래 내역 ID
    - 수정할 필드만 전송 (부분 업데이트 지원)
    """
    db_transaction = db.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
    if not db_transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transaction with id {transaction_id} not found"
        )

    # 제공된 필드만 업데이트
    update_data = transaction_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_transaction, field, value)

    # quantity 또는 price가 변경되면 total_amount 재계산
    if 'quantity' in update_data or 'price' in update_data:
        db_transaction.total_amount = db_transaction.quantity * db_transaction.price

    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@router.delete("/{transaction_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):
    """
    거래 내역 삭제

    - **transaction_id**: 거래 내역 ID
    """
    db_transaction = db.query(TransactionModel).filter(TransactionModel.id == transaction_id).first()
    if not db_transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transaction with id {transaction_id} not found"
        )

    db.delete(db_transaction)
    db.commit()
    return None
