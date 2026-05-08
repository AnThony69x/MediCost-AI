from functools import lru_cache

from supabase import create_client, Client

from app.core.config import settings


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    """
    Devuelve un singleton del cliente Supabase.
    Se usa la service role key para que el backend
    pueda operar sin restricciones de RLS.
    """
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
