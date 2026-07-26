from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "MedIntel API"

    SECRET_KEY: str = "CHANGE_ME_TO_A_LONG_RANDOM_SECRET"

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    DATABASE_URL: str = (
        "postgresql://postgres:YOUR_PASSWORD@localhost:5432/medintel"
    )

    class Config:
        env_file = ".env"


settings = Settings()