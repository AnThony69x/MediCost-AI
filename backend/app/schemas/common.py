"""Schemas comunes reutilizables en toda la API."""

from pydantic import BaseModel


class ErrorResponse(BaseModel):
    """Estructura estándar para respuestas de error."""

    detail: str
    code: str = "ERROR"
