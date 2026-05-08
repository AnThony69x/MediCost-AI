"""
Endpoint principal: POST /api/v1/chat

Orquesta el flujo completo:
  1. Clasificar síntoma → especialidad
  2. Obtener servicio médico
  3. Obtener plan del usuario
  4. Obtener regla de cobertura
  5. Rankear hospitales por copago
  6. Construir y retornar la respuesta
  7. Guardar historial (best-effort)
"""

import logging

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client

from app.agents.medical_agent import classify_symptom
from app.core.supabase_client import get_supabase_client
from app.schemas.chat import ChatRequest, ChatResponse, HospitalResult
from app.schemas.common import ErrorResponse
from app.services.coverage_service import get_coverage_rule, get_user_plan
from app.services.hospital_service import get_ranked_hospitals
from app.services.symptom_service import get_service_by_specialty
from app.utils.chat_history import save_chat_history
from app.utils.exceptions import MediCostException

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Chat"])


@router.post(
    "/chat",
    response_model=ChatResponse,
    responses={
        404: {"model": ErrorResponse, "description": "Recurso no encontrado"},
        422: {"description": "Error de validación en la petición"},
        500: {"model": ErrorResponse, "description": "Error interno del servidor"},
        503: {"model": ErrorResponse, "description": "Servicio de IA no disponible"},
    },
    summary="Procesa síntomas y estima copago",
    description=(
        "Recibe el síntoma del usuario, determina la especialidad médica, "
        "calcula el copago según el plan del usuario y devuelve un ranking "
        "de hospitales disponibles ordenados por menor copago."
    ),
)
def chat(
    request: ChatRequest,
    db: Client = Depends(get_supabase_client),
) -> ChatResponse:
    """
    Flujo de procesamiento del chat médico.
    """
    try:
        logger.info(
            "Nueva petición chat | user_id=%s | mensaje='%s'",
            request.user_id,
            request.message,
        )

        # ── 1. Clasificar síntoma ──────────────────────────────────────────
        specialty_name = classify_symptom(request.message)
        logger.info("Especialidad determinada: '%s'", specialty_name)

        # ── 2. Obtener servicio médico para la especialidad ────────────────
        service = get_service_by_specialty(db, specialty_name)

        # ── 3. Obtener usuario y plan ──────────────────────────────────────
        user_plan = get_user_plan(db, request.user_id)

        # ── 4. Obtener regla de cobertura (plan + servicio) ────────────────
        coverage_rule = get_coverage_rule(
            db,
            plan_id=user_plan.plan_id,
            service_id=service.service_id,
            plan_name=user_plan.plan_name,
            service_name=service.service_name,
        )

        # ── 5. Rankear hospitales por copago ──────────────────────────────
        hospitals = get_ranked_hospitals(
            db,
            service_id=service.service_id,
            coverage=coverage_rule.coverage,
            service_name=service.service_name,
        )

        # ── 6. Construir respuesta ─────────────────────────────────────────
        hospital_results = [
            HospitalResult(
                nombre=h.hospital_name,
                ubicacion=h.location,
                copago=float(h.copay),
            )
            for h in hospitals
        ]

        best = hospital_results[0]
        coverage_pct = int(float(coverage_rule.coverage) * 100)

        response = ChatResponse(
            especialidad=specialty_name,
            servicio=service.service_name,
            cobertura=float(coverage_rule.coverage),
            copago=best.copago,
            hospitales=hospital_results,
            recomendacion=best.nombre,
            mensaje=(
                f"Según su síntoma, se recomienda la especialidad de {specialty_name}. "
                f"Con su plan {user_plan.plan_name} tiene una cobertura del {coverage_pct}% "
                f"para {service.service_name}. "
                f"El hospital más conveniente es {best.nombre} "
                f"({best.ubicacion}) con un copago estimado de ${best.copago:.2f}."
            ),
        )

        logger.info(
            "Respuesta generada | especialidad=%s | hospital=%s | copago=%.2f",
            specialty_name,
            best.nombre,
            best.copago,
        )

        # ── 7. Guardar historial (best-effort, no bloquea respuesta) ───────
        save_chat_history(db, request.user_id, request.message, response)

        return response

    except MediCostException as exc:
        logger.warning(
            "Error de negocio en /chat: [%s] %s", exc.status_code, exc.message
        )
        raise HTTPException(status_code=exc.status_code, detail=exc.message) from exc

    except Exception as exc:
        logger.exception("Error inesperado en /chat")
        raise HTTPException(
            status_code=500,
            detail="Error interno del servidor. Por favor, intente más tarde.",
        ) from exc
