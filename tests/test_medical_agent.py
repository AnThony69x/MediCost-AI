"""
Tests para el agente médico (clasificación de síntomas).

Prueba la clasificación por reglas sin necesitar conexión a Gemini.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from unittest.mock import MagicMock, patch

import pytest
from app.agents.medical_agent import (
    SPECIALTY_KEYWORDS,
    _rule_based_classify,
    classify_symptom,
)


class TestRuleBasedClassify:
    """Tests para la clasificación por reglas locales."""

    # ── Cardiología ───────────────────────────────────────────────────────

    def test_dolor_pecho_cardiologia(self):
        assert _rule_based_classify("Tengo dolor en el pecho") == "Cardiologia"

    def test_palpitaciones_cardiologia(self):
        assert _rule_based_classify("siento palpitaciones fuertes") == "Cardiologia"

    def test_corazon_cardiologia(self):
        assert _rule_based_classify("me duele el corazon") == "Cardiologia"

    # ── Traumatología ─────────────────────────────────────────────────────

    def test_dolor_rodilla_traumatologia(self):
        assert _rule_based_classify("me duele la rodilla") == "Traumatologia"

    def test_fractura_traumatologia(self):
        assert _rule_based_classify("posible fractura en el brazo") == "Traumatologia"

    def test_espalda_traumatologia(self):
        assert _rule_based_classify("tengo dolor de espalda") == "Traumatologia"

    # ── Medicina General ──────────────────────────────────────────────────

    def test_fiebre_medicina_general(self):
        assert _rule_based_classify("tengo fiebre alta") == "Medicina General"

    def test_tos_medicina_general(self):
        assert _rule_based_classify("tos y malestar general") == "Medicina General"

    def test_nauseas_medicina_general(self):
        assert _rule_based_classify("nauseas y vomito") == "Medicina General"

    # ── Sin coincidencia ──────────────────────────────────────────────────

    def test_sin_coincidencia_retorna_none(self):
        """Si no hay palabras clave, debe retornar None."""
        result = _rule_based_classify("xyz123 sin sentido médico")
        assert result is None

    # ── Case insensitive ──────────────────────────────────────────────────

    def test_mayusculas_ignoradas(self):
        """La clasificación no debe ser sensible a mayúsculas."""
        assert _rule_based_classify("DOLOR EN EL PECHO") == "Cardiologia"
        assert _rule_based_classify("FIEBRE ALTA") == "Medicina General"


class TestClassifySymptom:
    """Tests para la función principal classify_symptom."""

    def test_sin_gemini_usa_reglas(self):
        """Sin GEMINI_KEY, debe usar clasificación por reglas."""
        with patch("app.agents.medical_agent.settings") as mock_settings:
            mock_settings.GEMINI_KEY = ""
            result = classify_symptom("dolor en el pecho")
        assert result == "Cardiologia"

    def test_fallback_medicina_general(self):
        """Si no hay coincidencia, retorna 'Medicina General'."""
        with patch("app.agents.medical_agent.settings") as mock_settings:
            mock_settings.GEMINI_KEY = ""
            result = classify_symptom("xyz sintoma desconocido 999")
        assert result == "Medicina General"

    def test_gemini_falla_usa_reglas(self):
        """Si Gemini falla, debe hacer fallback a reglas sin lanzar excepción."""
        with patch("app.agents.medical_agent.settings") as mock_settings:
            mock_settings.GEMINI_KEY = "fake-key"
            mock_settings.GEMINI_MODEL = "gemini-1.5-flash"
            with patch("app.agents.medical_agent._gemini_classify") as mock_gemini:
                from app.utils.exceptions import AIClassificationException

                mock_gemini.side_effect = AIClassificationException("Timeout")
                result = classify_symptom("dolor de rodilla")
        assert result == "Traumatologia"

    def test_gemini_respuesta_valida(self):
        """Si Gemini responde correctamente, usa esa respuesta."""
        with patch("app.agents.medical_agent.settings") as mock_settings:
            mock_settings.GEMINI_KEY = "fake-key"
            mock_settings.GEMINI_MODEL = "gemini-1.5-flash"
            with patch("app.agents.medical_agent._gemini_classify") as mock_gemini:
                mock_gemini.return_value = "Traumatologia"
                result = classify_symptom("no importa el texto")
        assert result == "Traumatologia"

    @pytest.mark.parametrize(
        "message,expected",
        [
            ("dolor en el pecho", "Cardiologia"),
            ("me duele la rodilla", "Traumatologia"),
            ("tengo fiebre", "Medicina General"),
            ("palpitaciones", "Cardiologia"),
            ("fractura en el tobillo", "Traumatologia"),
            ("tos y gripe", "Medicina General"),
        ],
    )
    def test_clasificacion_parametrizada(self, message, expected):
        """Test parametrizado con casos representativos."""
        with patch("app.agents.medical_agent.settings") as mock_settings:
            mock_settings.GEMINI_KEY = ""
            result = classify_symptom(message)
        assert result == expected


class TestSpecialtyKeywords:
    """Tests de integridad del diccionario de palabras clave."""

    def test_todas_especialidades_tienen_keywords(self):
        """Cada especialidad debe tener al menos 3 palabras clave."""
        for specialty, keywords in SPECIALTY_KEYWORDS.items():
            assert len(keywords) >= 3, (
                f"'{specialty}' tiene solo {len(keywords)} keywords"
            )

    def test_no_hay_keywords_duplicadas_entre_especialidades(self):
        """Una misma keyword no debería aparecer en dos especialidades distintas."""
        all_keywords: list[str] = []
        for keywords in SPECIALTY_KEYWORDS.values():
            all_keywords.extend(keywords)
        assert len(all_keywords) == len(set(all_keywords)), (
            "Hay palabras clave duplicadas entre especialidades"
        )
