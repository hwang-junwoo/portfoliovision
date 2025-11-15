"""
PortfolioVision Backend API
FastAPI 애플리케이션 진입점
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

# FastAPI 앱 생성
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI 기반 ETF 포트폴리오 관리 및 투자 인텔리전스 플랫폼",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """루트 엔드포인트"""
    return {
        "message": "Welcome to PortfolioVision API",
        "version": settings.APP_VERSION,
        "docs": "/api/docs",
    }


@app.get("/health")
async def health_check():
    """헬스 체크 엔드포인트"""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


# 향후 라우터 추가 예시
# from app.routers import portfolios, etfs, news
# app.include_router(portfolios.router, prefix="/api/v1/portfolios", tags=["portfolios"])
# app.include_router(etfs.router, prefix="/api/v1/etfs", tags=["etfs"])
# app.include_router(news.router, prefix="/api/v1/news", tags=["news"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )
