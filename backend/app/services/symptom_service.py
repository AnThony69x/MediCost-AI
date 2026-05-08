"""
Servicio de síntomas: dado el nombre de una especialidad médica,
obtiene el servicio médico correspondiente desde Supabase.
"""

import logging
from uuid import UUID

from supabase import Client

from app.models.domain import ServiceInfo
from app.utils.exceptions import ServiceNotFoundException, SpecialtyNotFoundException

logger = logging.getLogger(__name__)


def get_service_by_specialty(client: Client, specialty_name: str) -> ServiceInfo:
    """
    Dado el nombre de una especialidad, retorna el primer servicio médico
    disponible para esa especialidad en Supabase.

    Args:
        client:         Cliente Supabase.
        specialty_name: Nombre de la especialidad (ej. "Cardiologia").

    Returns:
        ServiceInfo con los datos del servicio encontrado.

    Raises:
        SpecialtyNotFoundException: Si la especialidad no existe en la BD.
        ServiceNotFoundException:   Si no hay servicios para esa especialidad.
    """
    # 1. Buscar la especialidad por nombre
    sp_resp = (
        client.table("especialidades")
        .select("id, nombre")
        .eq("nombre", specialty_name)
        .maybe_single()
        .execute()
    )

    if not sp_resp.data:
        logger.warning("Especialidad no encontrada: '%s'", specialty_name)
        raise SpecialtyNotFoundException(specialty_name)

    specialty = sp_resp.data
    specialty_id: str = specialty["id"]
    logger.debug(
        "Especialidad encontrada: id=%s nombre='%s'", specialty_id, specialty_name
    )

    # 2. Buscar el primer servicio vinculado a esa especialidad
    svc_resp = (
        client.table("servicios")
        .select("id, nombre, especialidad_id, costo_base")
        .eq("especialidad_id", specialty_id)
        .limit(1)
        .execute()
    )

    if not svc_resp.data:
        logger.warning("Sin servicios para especialidad '%s'", specialty_name)
        raise ServiceNotFoundException(specialty_name)

    svc = svc_resp.data[0]
    logger.debug("Servicio encontrado: id=%s nombre='%s'", svc["id"], svc["nombre"])

    return ServiceInfo(
        service_id=UUID(svc["id"]),
        service_name=svc["nombre"],
        specialty_id=UUID(svc["especialidad_id"]),
        specialty_name=specialty_name,
        base_cost=svc["costo_base"],
    )
