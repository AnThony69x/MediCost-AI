import json
from typing import Any, List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


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
    CORS_ORIGIN_REGEX: str = ""

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: Any) -> Any:
        if value is None:
            return value

        if isinstance(value, str):
            raw = value.strip()
            if not raw:
                return []

            if raw.startswith("["):
                parsed = json.loads(raw)
                if isinstance(parsed, list):
                    return [str(origin).strip().rstrip("/") for origin in parsed if str(origin).strip()]

            cleaned = raw.strip('"').strip("'")
            return [
                origin.strip().rstrip("/")
                for origin in cleaned.split(",")
                if origin.strip()
            ]

        if isinstance(value, list):
            return [str(origin).strip().rstrip("/") for origin in value if str(origin).strip()]

        return value


settings = Settings()
