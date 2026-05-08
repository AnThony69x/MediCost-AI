from functools import lru_cache

from supabase import create_client, Client

from app.core.config import settings


def _resolve_supabase_key() -> str:
    """Prioriza service role key y valida que no se use clave pública en backend."""
    key = settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_KEY

    if not key:
        raise ValueError(
            "Falta la clave de Supabase. Configure SUPABASE_SERVICE_ROLE_KEY "
            "(recomendado) o SUPABASE_KEY en backend/.env."
        )

    if key.startswith("sb_publishable_"):
        raise ValueError(
            "Clave inválida para backend: detectada clave pública (sb_publishable_*). "
            "Use la service_role key del proyecto Supabase."
        )

    placeholder_tokens = (
        "REEMPLAZA_AQUI",
        "your-service-role-key",
        "your_",
        "<",
        ">",
    )
    if any(token in key for token in placeholder_tokens):
        raise ValueError(
            "La clave de Supabase parece un placeholder. Reemplace "
            "SUPABASE_SERVICE_ROLE_KEY con la clave real de service_role."
        )

    return key


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    """
    Devuelve un singleton del cliente Supabase.
    Se usa la service role key para que el backend
    pueda operar sin restricciones de RLS.
    """
    return create_client(settings.SUPABASE_URL, _resolve_supabase_key())
