"""
Servicio de cobertura: obtiene el plan del usuario y la regla de cobertura
específica para el par plan + servicio.
"""

import logging
from decimal import Decimal
from uuid import UUID

from supabase import Client

from app.models.domain import CoverageRule, UserPlan
from app.utils.exceptions import CoverageNotFoundException, UserNotFoundException

logger = logging.getLogger(__name__)


def get_user_plan(client: Client, user_id: UUID) -> UserPlan:
    """
    Obtiene el usuario y su plan de seguro desde Supabase.

    Args:
        client:  Cliente Supabase.
        user_id: UUID del usuario.

    Returns:
        UserPlan con los datos del usuario y su plan.

    Raises:
        UserNotFoundException: Si el usuario no existe.
    """
    resp = (
        client.table("usuarios")
        .select("id, nombre, plan_id, planes(id, nombre, cobertura)")
        .eq("id", str(user_id))
        .maybe_single()
        .execute()
    )

    if not resp.data:
        logger.warning("Usuario no encontrado: id=%s", user_id)
        raise UserNotFoundException(str(user_id))

    data = resp.data
    plan = data["planes"]

    logger.debug(
        "Usuario '%s' encontrado con plan '%s' (cobertura=%.0f%%)",
        data["nombre"],
        plan["nombre"],
        float(plan["cobertura"]) * 100,
    )

    return UserPlan(
        user_id=UUID(data["id"]),
        user_name=data["nombre"],
        plan_id=UUID(plan["id"]),
        plan_name=plan["nombre"],
        plan_coverage=Decimal(str(plan["cobertura"])),
    )


def get_coverage_rule(
    client: Client,
    plan_id: UUID,
    service_id: UUID,
    plan_name: str,
    service_name: str,
) -> CoverageRule:
    """
    Obtiene la regla de cobertura específica para un par plan + servicio.

    La cobertura en reglas_cobertura puede diferir de la cobertura base
    del plan (cada servicio puede tener un porcentaje distinto).

    Args:
        client:       Cliente Supabase.
        plan_id:      UUID del plan del usuario.
        service_id:   UUID del servicio médico.
        plan_name:    Nombre del plan (para mensajes de error).
        service_name: Nombre del servicio (para mensajes de error).

    Returns:
        CoverageRule con la cobertura aplicable.

    Raises:
        CoverageNotFoundException: Si no existe regla para ese par plan+servicio.
    """
    resp = (
        client.table("reglas_cobertura")
        .select("id, plan_id, servicio_id, cobertura")
        .eq("plan_id", str(plan_id))
        .eq("servicio_id", str(service_id))
        .maybe_single()
        .execute()
    )

    if not resp.data:
        logger.warning(
            "Sin cobertura para plan='%s' servicio='%s'", plan_name, service_name
        )
        raise CoverageNotFoundException(plan_name, service_name)

    data = resp.data
    coverage = Decimal(str(data["cobertura"]))

    logger.debug(
        "Cobertura encontrada: plan='%s' servicio='%s' cobertura=%.0f%%",
        plan_name,
        service_name,
        float(coverage) * 100,
    )

    return CoverageRule(
        rule_id=UUID(data["id"]),
        plan_id=UUID(data["plan_id"]),
        service_id=UUID(data["servicio_id"]),
        coverage=coverage,
    )
