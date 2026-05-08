"""
Servicio de cálculo de copago.

Fórmula: copago = costo_servicio * (1 - cobertura)
"""

from decimal import ROUND_HALF_UP, Decimal

_CENT = Decimal("0.01")


def calculate_copay(cost: Decimal, coverage: Decimal) -> Decimal:
    """
    Calcula el copago que debe pagar el paciente.

    Args:
        cost:     Costo total del servicio en el hospital (>= 0).
        coverage: Porcentaje de cobertura del seguro (0.0 - 1.0).

    Returns:
        Copago redondeado a dos decimales.

    Examples:
        >>> calculate_copay(Decimal("80"), Decimal("0.80"))
        Decimal('16.00')
        >>> calculate_copay(Decimal("76"), Decimal("0.85"))
        Decimal('11.40')
    """
    if coverage < Decimal("0") or coverage > Decimal("1"):
        raise ValueError(f"La cobertura debe estar entre 0 y 1, recibido: {coverage}")
    if cost < Decimal("0"):
        raise ValueError(f"El costo no puede ser negativo, recibido: {cost}")

    copay = cost * (Decimal("1") - coverage)
    return copay.quantize(_CENT, rounding=ROUND_HALF_UP)
