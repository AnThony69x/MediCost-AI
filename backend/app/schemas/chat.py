"""
Schemas de entrada y salida para el endpoint /chat.
"""

from decimal import Decimal
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class ConversationTurn(BaseModel):
    """Turno previo de conversación para dar contexto al modelo."""

    role: str = Field(..., description="user o assistant")
    content: str = Field(..., min_length=1, max_length=1000)


class ChatRequest(BaseModel):
    """Petición del usuario al chat."""

    user_id: UUID = Field(
        ...,
        description="UUID del usuario registrado en el sistema.",
        examples=["a1b2c3d4-e5f6-7890-abcd-ef1234567890"],
    )
    message: str = Field(
        ...,
        min_length=2,
        max_length=500,
        description="Mensaje del usuario describiendo sus síntomas.",
        examples=["Tengo dolor en el pecho"],
    )
    session_id: Optional[UUID] = Field(
        default=None,
        description="ID de la sesión de chat para agrupar mensajes.",
    )
    history: List[ConversationTurn] = Field(

        default_factory=list,
        description="Historial reciente de la conversación para dar contexto.",
    )


class HospitalResult(BaseModel):
    """Resultado de un hospital con su copago estimado."""

    nombre: str = Field(..., description="Nombre del hospital.")
    ubicacion: str = Field(..., description="Ubicación geográfica del hospital.")
    copago: float = Field(..., description="Copago estimado en dólares.")


class ChatResponse(BaseModel):
    """Respuesta completa del agente médico."""

    requiere_asesoria_medica: bool = Field(
        default=True,
        description="Indica si la respuesta incluye orientación médica con copago/hospitales.",
    )

    especialidad: str = Field(
        ..., description="Especialidad médica recomendada según los síntomas."
    )
    servicio: str = Field(
        ..., description="Nombre del servicio médico asociado a la especialidad."
    )
    cobertura: float = Field(
        ..., description="Porcentaje de cobertura del seguro (0.0 – 1.0)."
    )
    copago: float = Field(
        ..., description="Copago estimado del hospital recomendado, en dólares."
    )
    hospitales: List[HospitalResult] = Field(
        ..., description="Lista de hospitales disponibles, ordenados por menor copago."
    )
    recomendacion: str = Field(
        ..., description="Nombre del hospital más conveniente (menor copago)."
    )
    mensaje: Optional[str] = Field(
        default=None,
        description="Resumen narrativo del resultado para mostrar al usuario.",
    )
