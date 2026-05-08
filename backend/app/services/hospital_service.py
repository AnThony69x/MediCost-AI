"""
Servicio de hospitales: obtiene hospitales en red para un servicio,
calcula el copago en cada uno y los ordena por menor copago.
"""

import logging
from decimal import Decimal
from typing import List
from uuid import UUID

from supabase import Client

from app.models.domain import HospitalCost
from app.services.copay_service import calculate_copay
from app.utils.exceptions import NoHospitalsAvailableException

logger = logging.getLogger(__name__)


def get_ranked_hospitals(
    client: Client,
    service_id: UUID,
    coverage: Decimal,
    service_name: str,
) -> List[HospitalCost]:
    """
    Obtiene la lista de hospitales en red que ofrecen el servicio dado,
    calcula el copago en cada uno y los ordena de menor a mayor copago.

    Args:
        client:       Cliente Supabase.
        service_id:   UUID del servicio médico.
        coverage:     Cobertura del plan para ese servicio (0.0 - 1.0).
        service_name: Nombre del servicio (para mensajes de error/log).

    Returns:
        Lista de HospitalCost ordenada por copago ascendente.

    Raises:
        NoHospitalsAvailableException: Si no hay hospitales en red disponibles.
    """
    # Join: servicios_hospital → hospitales (solo en red)
    resp = (
        client.table("servicios_hospital")
        .select("costo, hospitales(id, nombre, ubicacion, en_red)")
        .eq("servicio_id", str(service_id))
        .execute()
    )

    # Filtrar hospitales en red (en_red = True) en Python
    # (el filtro en columna de tabla relacionada no es directo en postgrest-py)
    rows = [
        row
        for row in (resp.data or [])
        if row.get("hospitales") and row["hospitales"]["en_red"] is True
    ]

    if not rows:
        logger.warning("Sin hospitales en red para servicio='%s'", service_name)
        raise NoHospitalsAvailableException(service_name)

    results: List[HospitalCost] = []
    for row in rows:
        h = row["hospitales"]
        cost = Decimal(str(row["costo"]))
        copay = calculate_copay(cost, coverage)

        results.append(
            HospitalCost(
                hospital_id=UUID(h["id"]),
                hospital_name=h["nombre"],
                location=h["ubicacion"],
                in_network=h["en_red"],
                cost=cost,
                copay=copay,
            )
        )

    # Ordenar por copago ascendente (menor copago = mejor opción)
    sorted_results = sorted(results, key=lambda hc: hc.copay)

    logger.debug(
        "Hospitales disponibles para '%s': %s",
        service_name,
        [(hc.hospital_name, float(hc.copay)) for hc in sorted_results],
    )

    return sorted_results
