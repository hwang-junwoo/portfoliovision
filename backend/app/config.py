"""
애플리케이션 설정
환경 변수를 통해 설정을 관리합니다.
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """애플리케이션 설정 클래스"""

    # 애플리케이션 기본 설정
    APP_NAME: str = "PortfolioVision"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = True
    SECRET_KEY: str = "your-secret-key-change-this-in-production"

    # 데이터베이스 설정
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/portfoliovision"
    ASYNC_DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/portfoliovision"

    # CORS 설정
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"

    def get_allowed_origins(self) -> List[str]:
        """ALLOWED_ORIGINS를 리스트로 반환"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]

    # API 키 (선택사항)
    ALPHA_VANTAGE_API_KEY: str | None = None

    # AI 설정 (Phase 3 - 선택사항)
    ANTHROPIC_API_KEY: str | None = None
    ENABLE_AI_FEATURES: bool = False

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


# 설정 인스턴스 생성
settings = Settings()
