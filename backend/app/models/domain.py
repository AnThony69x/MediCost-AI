"""
Modelos de dominio internos del sistema MediCost-AI.

Estos dataclasses representan entidades del negocio tal como
se manejan dentro de los servicios, independientemente de la
capa de presentación (schemas de API) o de persistencia (Supabase).
"""

from dataclasses import dataclass
from decimal import Decimal
from uuid import UUID


from datetime import date
from typing import Optional, List

@dataclass(frozen=True)
class UserPlan:
    """Datos del usuario junto con su plan de seguro y perfil médico."""

    user_id: UUID
    user_name: str
    plan_id: UUID
    plan_name: str
    plan_coverage: Decimal
    genero: Optional[str] = None
    fecha_nacimiento: Optional[date] = None
    antecedentes: List[str] = None



@dataclass(frozen=True)
class ServiceInfo:
    """Información de un servicio médico y su especialidad."""

    service_id: UUID
    service_name: str
    specialty_id: UUID
    specialty_name: str
    base_cost: Decimal  # costo_base del servicio


@dataclass(frozen=True)
class CoverageRule:
    """Regla de cobertura específica para un plan + servicio."""

    rule_id: UUID
    plan_id: UUID
    service_id: UUID
    coverage: Decimal  # cobertura específica (puede diferir de plan_coverage)


@dataclass(frozen=True)
class HospitalCost:
    """Hospital con costo de servicio y copago calculado."""

    hospital_id: UUID
    hospital_name: str
    location: str
    in_network: bool
    cost: Decimal    # costo del servicio en este hospital
    copay: Decimal   # copago estimado = cost * (1 - coverage)
