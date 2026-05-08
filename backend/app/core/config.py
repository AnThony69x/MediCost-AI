from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # App
    APP_NAME: str = "MediCost-AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Supabase
    SUPABASE_URL: str
    # Compatibilidad: usar preferentemente SUPABASE_SERVICE_ROLE_KEY.
    # SUPABASE_KEY se mantiene para proyectos antiguos.
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_KEY: str = ""

    # Google Gemini (opcional)
    GEMINI_KEY: str = ""
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # Groq
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"


    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]


settings = Settings()
