"""
Tests de integración para el endpoint POST /api/v1/chat.

Usa mocks para simular Supabase y el agente IA,
de modo que los tests no requieren conexión externa.

Regla clave de mocking:
    patch("modulo_donde_se_usa.nombre") — no donde está definido.
    Todos los servicios se importan en app.api.routes.chat,
    por eso los patches apuntan a ese módulo.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

# Configurar variables de entorno ANTES de importar la app
os.environ.setdefault("SUPABASE_URL", "https://test.supabase.co")
os.environ.setdefault("SUPABASE_KEY", "test-service-role-key")
os.environ.setdefault("GEMINI_KEY", "")

from decimal import Decimal
from unittest.mock import MagicMock, patch
from uuid import UUID

import pytest
from app.core.supabase_client import get_supabase_client
from app.main import app
from app.models.domain import CoverageRule, HospitalCost, ServiceInfo, UserPlan
from fastapi.testclient import TestClient

# ---------------------------------------------------------------------------
# Constantes de prueba
# ---------------------------------------------------------------------------
USER_ID = "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
PLAN_ID = "b2c3d4e5-f6a7-8901-bcde-f12345678901"
SP_ID = "c3d4e5f6-a7b8-9012-cdef-123456789012"
SVC_ID = "d4e5f6a7-b8c9-0123-defa-234567890123"
RULE_ID = "e5f6a7b8-c9d0-1234-efab-345678901234"
HOSP1_ID = "f6a7b8c9-d0e1-2345-fabc-456789012345"
HOSP2_ID = "a7b8c9d0-e1f2-3456-abcd-567890123456"

MOCK_USER_PLAN = UserPlan(
    user_id=UUID(USER_ID),
    user_name="Test User",
    plan_id=UUID(PLAN_ID),
    plan_name="Premium",
    plan_coverage=Decimal("0.80"),
)
MOCK_SERVICE = ServiceInfo(
    service_id=UUID(SVC_ID),
    service_name="Consulta cardiologica",
    specialty_id=UUID(SP_ID),
    specialty_name="Cardiologia",
    base_cost=Decimal("80.00"),
)
MOCK_COVERAGE = CoverageRule(
    rule_id=UUID(RULE_ID),
    plan_id=UUID(PLAN_ID),
    service_id=UUID(SVC_ID),
    coverage=Decimal("0.85"),
)
MOCK_HOSPITALS = [
    HospitalCost(
        hospital_id=UUID(HOSP2_ID),
        hospital_name="Hospital B",
        location="Norte",
        in_network=True,
        cost=Decimal("76.00"),
        copay=Decimal("11.40"),
    ),
    HospitalCost(
        hospital_id=UUID(HOSP1_ID),
        hospital_name="Hospital A",
        location="Centro",
        in_network=True,
        cost=Decimal("80.00"),
        copay=Decimal("12.00"),
    ),
]


# ---------------------------------------------------------------------------
# Fixture: sobreescribe el cliente Supabase para TODOS los tests de clase
# ---------------------------------------------------------------------------
@pytest.fixture(autouse=True)
def override_supabase():
    """
    Usa app.dependency_overrides para evitar que FastAPI intente
    crear un cliente Supabase real con credenciales de prueba.
    """
    mock_db = MagicMock()
    app.dependency_overrides[get_supabase_client] = lambda: mock_db
    yield mock_db
    app.dependency_overrides.clear()


# ---------------------------------------------------------------------------
# Helper: nombres de los módulos donde se parchean los servicios
# Los patches van sobre app.api.routes.chat (donde se importan),
# NO sobre los módulos de origen.
# ---------------------------------------------------------------------------
_ROUTE = "app.api.routes.chat"


class TestChatEndpoint:
    """Tests de integración para POST /api/v1/chat."""

    def test_chat_exitoso(self):
        """Respuesta exitosa con todos los campos correctos."""
        with (
            patch(f"{_ROUTE}.classify_symptom", return_value="Cardiologia"),
            patch(f"{_ROUTE}.get_service_by_specialty", return_value=MOCK_SERVICE),
            patch(f"{_ROUTE}.get_user_plan", return_value=MOCK_USER_PLAN),
            patch(f"{_ROUTE}.get_coverage_rule", return_value=MOCK_COVERAGE),
            patch(f"{_ROUTE}.get_ranked_hospitals", return_value=MOCK_HOSPITALS),
            patch(f"{_ROUTE}.save_chat_history"),
        ):
            response = TestClient(app).post(
                "/api/v1/chat",
                json={"user_id": USER_ID, "message": "dolor en el pecho"},
            )

        assert response.status_code == 200
        data = response.json()
        assert data["especialidad"] == "Cardiologia"
        assert data["servicio"] == "Consulta cardiologica"
        assert data["cobertura"] == pytest.approx(0.85)
        assert data["copago"] == pytest.approx(11.40)
        assert data["recomendacion"] == "Hospital B"
        assert len(data["hospitales"]) == 2
        assert data["mensaje"] is not None

    def test_hospitales_ordenados_por_copago(self):
        """Los hospitales deben venir ordenados de menor a mayor copago."""
        with (
            patch(f"{_ROUTE}.classify_symptom", return_value="Cardiologia"),
            patch(f"{_ROUTE}.get_service_by_specialty", return_value=MOCK_SERVICE),
            patch(f"{_ROUTE}.get_user_plan", return_value=MOCK_USER_PLAN),
            patch(f"{_ROUTE}.get_coverage_rule", return_value=MOCK_COVERAGE),
            patch(f"{_ROUTE}.get_ranked_hospitals", return_value=MOCK_HOSPITALS),
            patch(f"{_ROUTE}.save_chat_history"),
        ):
            response = TestClient(app).post(
                "/api/v1/chat",
                json={"user_id": USER_ID, "message": "pecho"},
            )

        assert response.status_code == 200
        copagos = [h["copago"] for h in response.json()["hospitales"]]
        assert copagos == sorted(copagos), "Hospitales no están ordenados por copago"

    def test_usuario_no_encontrado_retorna_404(self):
        """Debe retornar 404 si el usuario no existe."""
        from app.utils.exceptions import UserNotFoundException

        with (
            patch(f"{_ROUTE}.classify_symptom", return_value="Cardiologia"),
            patch(f"{_ROUTE}.get_service_by_specialty", return_value=MOCK_SERVICE),
            patch(
                f"{_ROUTE}.get_user_plan", side_effect=UserNotFoundException(USER_ID)
            ),
        ):
            response = TestClient(app).post(
                "/api/v1/chat",
                json={"user_id": USER_ID, "message": "dolor en el pecho"},
            )

        assert response.status_code == 404
        assert "no encontrado" in response.json()["detail"].lower()

    def test_mensaje_vacio_retorna_422(self):
        """Mensaje demasiado corto debe retornar 422 (validación Pydantic)."""
        response = TestClient(app).post(
            "/api/v1/chat",
            json={"user_id": USER_ID, "message": "x"},
        )
        assert response.status_code == 422

    def test_user_id_invalido_retorna_422(self):
        """user_id no UUID debe retornar 422."""
        response = TestClient(app).post(
            "/api/v1/chat",
            json={"user_id": "no-es-uuid", "message": "dolor en el pecho"},
        )
        assert response.status_code == 422

    def test_health_check(self):
        """El endpoint /health debe retornar 200."""
        response = TestClient(app).get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"
