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
    session_id: UUID | None = None,
) -> None:
    """
    Guarda la interacción del chat en la tabla historial_chat vinculada a una sesión.
    """
    try:
        data = {
            "usuario_id": str(user_id),
            "mensaje": message,
            "respuesta": response.model_dump(),
        }
        if session_id:
            data["sesion_id"] = str(session_id)

        client.table("historial_chat").insert(data).execute()
        logger.debug("Historial guardado para usuario_id=%s en sesion=%s", user_id, session_id)

    except Exception as exc:  # noqa: BLE001
        logger.warning(
            "No se pudo guardar el historial para usuario_id=%s: %s",
            user_id,
            exc,
        )


def get_recent_history(client: Client, user_id: UUID, limit: int = 5, session_id: UUID | None = None) -> list[dict]:
    """
    Recupera los últimos mensajes del usuario desde la base de datos
    para enriquecer el contexto de la IA, opcionalmente filtrados por sesión.
    """
    try:
        query = client.table("historial_chat").select("mensaje, respuesta").eq("usuario_id", str(user_id))
        
        if session_id:
            query = query.eq("sesion_id", str(session_id))
            
        resp = query.order("creado_en", desc=True).limit(limit).execute()

        history = []
        for row in reversed(resp.data or []):
            history.append({"role": "user", "content": row["mensaje"]})
            ans = row.get("respuesta", {})
            if isinstance(ans, dict) and ans.get("mensaje"):
                history.append({"role": "assistant", "content": ans["mensaje"]})
        
        return history
    except Exception as exc:
        logger.warning("No se pudo recuperar historial de la DB para %s: %s", user_id, exc)
        return []


