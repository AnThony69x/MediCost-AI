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
    Obtiene la lista de hospitales en red usando la función RPC de la DB.
    """
    try:
        resp = client.rpc(
            "fn_get_ranked_hospitals",
            {
                "p_service_id": str(service_id),
                "p_coverage": float(coverage)
            }
        ).execute()

        if not resp.data:
            logger.warning("Sin hospitales en red para servicio='%s'", service_name)
            raise NoHospitalsAvailableException(service_name)

        results: List[HospitalCost] = [
            HospitalCost(
                hospital_id=UUID(row["hospital_id"]),
                hospital_name=row["hospital_name"],
                location=row["location"],
                in_network=True,
                cost=Decimal(str(row["cost"])),
                copay=Decimal(str(row["copay"])),
            )
            for row in resp.data
        ]

        return results

    except Exception as exc:
        if isinstance(exc, NoHospitalsAvailableException):
            raise
        logger.error("Error al llamar a fn_get_ranked_hospitals: %s", exc)
        raise MediCostException(500, "Error al calcular hospitales recomendados.") from exc

