"""
Pydantic schemas
"""
from app.schemas.portfolio import (
    Portfolio,
    PortfolioCreate,
    PortfolioUpdate,
    PortfolioWithHoldings,
    PortfolioSummary,
)
from app.schemas.etf_holding import (
    ETFHolding,
    ETFHoldingCreate,
    ETFHoldingUpdate,
    ETFHoldingWithValue,
)
from app.schemas.transaction import (
    Transaction,
    TransactionCreate,
    TransactionUpdate,
    TransactionSummary,
)

__all__ = [
    "Portfolio",
    "PortfolioCreate",
    "PortfolioUpdate",
    "PortfolioWithHoldings",
    "PortfolioSummary",
    "ETFHolding",
    "ETFHoldingCreate",
    "ETFHoldingUpdate",
    "ETFHoldingWithValue",
    "Transaction",
    "TransactionCreate",
    "TransactionUpdate",
    "TransactionSummary",
]

# Rebuild models to resolve forward references
PortfolioWithHoldings.model_rebuild()
