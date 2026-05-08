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
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from supabase import Client

from app.agents.medical_agent import classify_symptom
from app.agents.medical_agent import detect_medical_intent
from app.core.supabase_client import get_supabase_client
from app.schemas.chat import ChatRequest, ChatResponse, HospitalResult
from app.schemas.common import ErrorResponse
from app.services.coverage_service import get_coverage_rule, get_user_plan
from app.services.hospital_service import get_ranked_hospitals
from app.services.symptom_service import get_service_by_specialty
from app.utils.chat_history import save_chat_history, get_recent_history
from app.utils.natural_response import (
    build_conversational_response,
    build_natural_response,
)
from app.utils.exceptions import MediCostException

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Chat"])


@router.post(
    "/chat",
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
    db: Annotated[Client, Depends(get_supabase_client)],
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

        history_payload = [turn.model_dump() for turn in request.history]

        # Enriquecer contexto con Supabase si el historial es breve (memoria a largo plazo)
        if len(history_payload) < 2:
            db_history = get_recent_history(db, request.user_id, session_id=request.session_id)
            if db_history:
                history_payload = db_history + history_payload
                logger.info("Contexto enriquecido con %d turnos de la DB", len(db_history))

        # ── 1. Detectar intención médica con contexto ────────────────────
        if not detect_medical_intent(request.message, history=history_payload):
            conversational_message = build_conversational_response(
                message=request.message,
                history=history_payload,
            )

            response = ChatResponse(
                requiere_asesoria_medica=False,
                especialidad="",
                servicio="",
                cobertura=0.0,
                copago=0.0,
                hospitales=[],
                recomendacion="",
                mensaje=conversational_message,
            )

            save_chat_history(db, request.user_id, request.message, response, session_id=request.session_id)
            return response

        # ── 2. Clasificar síntoma con contexto ───────────────────────────
        specialty_name = classify_symptom(request.message, history=history_payload)
        logger.info("Especialidad determinada: '%s'", specialty_name)

        # ── 3. Obtener servicio médico para la especialidad ────────────────
        service = get_service_by_specialty(db, specialty_name)

        # ── 4. Obtener usuario y plan ──────────────────────────────────────
        user_plan = get_user_plan(db, request.user_id)

        # ── 5. Obtener regla de cobertura (plan + servicio) ────────────────
        coverage_rule = get_coverage_rule(
            db,
            plan_id=user_plan.plan_id,
            service_id=service.service_id,
            plan_name=user_plan.plan_name,
            service_name=service.service_name,
        )

        # ── 6. Rankear hospitales por copago ──────────────────────────────
        hospitals = get_ranked_hospitals(
            db,
            service_id=service.service_id,
            coverage=coverage_rule.coverage,
            service_name=service.service_name,
        )

        # ── 7. Construir respuesta natural con contexto ────────────────────
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

        natural_message = build_natural_response(
            message=request.message,
            specialty=specialty_name,
            service=service.service_name,
            coverage_pct=coverage_pct,
            plan_name=user_plan.plan_name,
            hospital_name=best.nombre,
            location=best.ubicacion,
            copay=best.copago,
            history=history_payload,
            user_profile={
                "genero": user_plan.genero,
                "fecha_nacimiento": user_plan.fecha_nacimiento,
                "antecedentes": user_plan.antecedentes,
            },
        )


        response = ChatResponse(
            requiere_asesoria_medica=True,
            especialidad=specialty_name,
            servicio=service.service_name,
            cobertura=float(coverage_rule.coverage),
            copago=best.copago,
            hospitales=hospital_results,
            recomendacion=best.nombre,
            mensaje=natural_message,
        )

        logger.info(
            "Respuesta generada | especialidad=%s | hospital=%s | copago=%.2f",
            specialty_name,
            best.nombre,
            best.copago,
        )

        # ── 8. Guardar historial (best-effort) ─────────────────────────────
        save_chat_history(db, request.user_id, request.message, response, session_id=request.session_id)


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
