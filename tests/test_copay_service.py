"""
Tests para el servicio de cálculo de copago.

Valida la fórmula: copago = costo * (1 - cobertura)
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from decimal import Decimal

import pytest
from app.services.copay_service import calculate_copay


class TestCalculateCopay:
    """Tests unitarios para calculate_copay."""

    # ── Casos del ejemplo del README ──────────────────────────────────────

    def test_ejemplo_readme_basico(self):
        """Caso del README: costo=$80, cobertura=80% → copago=$16.00"""
        result = calculate_copay(Decimal("80"), Decimal("0.80"))
        assert result == Decimal("16.00")

    def test_ejemplo_hospital_b_premium(self):
        """Hospital B, plan Premium, cardiología: $76 * (1-0.85) = $11.40"""
        result = calculate_copay(Decimal("76"), Decimal("0.85"))
        assert result == Decimal("11.40")

    # ── Cobertura extrema ─────────────────────────────────────────────────

    def test_cobertura_total(self):
        """Cobertura del 100% → copago = $0.00"""
        result = calculate_copay(Decimal("100"), Decimal("1.00"))
        assert result == Decimal("0.00")

    def test_sin_cobertura(self):
        """Cobertura del 0% → copago = costo completo"""
        result = calculate_copay(Decimal("50"), Decimal("0.00"))
        assert result == Decimal("50.00")

    # ── Redondeo ──────────────────────────────────────────────────────────

    def test_redondeo_dos_decimales(self):
        """El resultado siempre tiene exactamente 2 decimales."""
        result = calculate_copay(Decimal("70"), Decimal("0.55"))
        # 70 * 0.45 = 31.50
        assert result == Decimal("31.50")

    def test_redondeo_half_up(self):
        """Verifica que el redondeo es HALF_UP."""
        # 40 * (1 - 0.70) = 40 * 0.30 = 12.00
        result = calculate_copay(Decimal("40"), Decimal("0.70"))
        assert result == Decimal("12.00")

    # ── Costo cero ────────────────────────────────────────────────────────

    def test_costo_cero(self):
        """Costo $0 → copago siempre $0.00"""
        result = calculate_copay(Decimal("0"), Decimal("0.80"))
        assert result == Decimal("0.00")

    # ── Validaciones de entrada ───────────────────────────────────────────

    def test_cobertura_mayor_a_uno_lanza_error(self):
        """Cobertura > 1 debe lanzar ValueError."""
        with pytest.raises(ValueError, match="cobertura"):
            calculate_copay(Decimal("80"), Decimal("1.01"))

    def test_cobertura_negativa_lanza_error(self):
        """Cobertura negativa debe lanzar ValueError."""
        with pytest.raises(ValueError, match="cobertura"):
            calculate_copay(Decimal("80"), Decimal("-0.1"))

    def test_costo_negativo_lanza_error(self):
        """Costo negativo debe lanzar ValueError."""
        with pytest.raises(ValueError, match="costo"):
            calculate_copay(Decimal("-10"), Decimal("0.80"))

    # ── Consistencia con datos semilla (seed.sql) ─────────────────────────

    @pytest.mark.parametrize(
        "hospital, cost, coverage, expected_copay",
        [
            # Plan Premium (cobertura=0.85 para cardiología)
            ("Hospital A", Decimal("80.00"), Decimal("0.85"), Decimal("12.00")),
            ("Hospital B", Decimal("76.00"), Decimal("0.85"), Decimal("11.40")),
            ("Hospital C", Decimal("84.00"), Decimal("0.85"), Decimal("12.60")),
            # Plan Basico (cobertura=0.60 para cardiología)
            ("Hospital A", Decimal("80.00"), Decimal("0.60"), Decimal("32.00")),
            ("Hospital B", Decimal("76.00"), Decimal("0.60"), Decimal("30.40")),
        ],
    )
    def test_datos_semilla_cardiologia(self, hospital, cost, coverage, expected_copay):
        """Verifica copagos con datos reales del seed.sql."""
        result = calculate_copay(cost, coverage)
        assert result == expected_copay, (
            f"{hospital}: esperado {expected_copay}, obtenido {result}"
        )
