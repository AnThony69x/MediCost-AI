from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.core.config import settings

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    summary="Health check",
    description="Verifica que el servicio esté activo.",
)
def health_check() -> JSONResponse:
    return JSONResponse(
        content={
            "status": "ok",
            "service": settings.APP_NAME,
            "version": settings.APP_VERSION,
        }
    )
