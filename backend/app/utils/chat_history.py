"""
Utilidad para persistir el historial de conversaciones en Supabase.

El guardado es best-effort: si falla, se registra en el log
pero NO interrumpe la respuesta al usuario.
"""

import logging
from uuid import UUID

from supabase import Client

from app.schemas.chat import ChatResponse

logger = logging.getLogger(__name__)


def save_chat_history(
    client: Client,
    user_id: UUID,
    message: str,
    response: ChatResponse,
) -> None:
    """
    Guarda la interacción del chat en la tabla historial_chat.

    Args:
        client:   Cliente Supabase.
        user_id:  UUID del usuario.
        message:  Mensaje original del usuario.
        response: Respuesta generada por el sistema.
    """
    try:
        client.table("historial_chat").insert(
            {
                "usuario_id": str(user_id),
                "mensaje": message,
                "respuesta": response.model_dump(),
            }
        ).execute()
        logger.debug("Historial guardado para usuario_id=%s", user_id)
    except Exception as exc:  # noqa: BLE001
        logger.warning(
            "No se pudo guardar el historial para usuario_id=%s: %s",
            user_id,
            exc,
        )
