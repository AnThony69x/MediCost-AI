"""
Excepciones de dominio de MediCost-AI.

Cada excepción lleva su propio HTTP status code para
que la capa de API pueda transformarla en una HTTPException
sin lógica adicional.
"""


class MediCostException(Exception):
    """Excepción base del sistema."""

    def __init__(self, message: str, status_code: int = 400) -> None:
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class UserNotFoundException(MediCostException):
    """Se lanza cuando no existe un usuario con el ID dado."""

    def __init__(self, user_id: str) -> None:
        super().__init__(
            f"Usuario con ID '{user_id}' no encontrado.",
            status_code=404,
        )


class SpecialtyNotFoundException(MediCostException):
    """Se lanza cuando la especialidad no existe en la base de datos."""

    def __init__(self, specialty: str) -> None:
        super().__init__(
            f"Especialidad '{specialty}' no encontrada en la base de datos.",
            status_code=404,
        )


class ServiceNotFoundException(MediCostException):
    """Se lanza cuando no hay servicio para la especialidad dada."""

    def __init__(self, specialty: str) -> None:
        super().__init__(
            f"No se encontró ningún servicio para la especialidad '{specialty}'.",
            status_code=404,
        )


class CoverageNotFoundException(MediCostException):
    """Se lanza cuando no existe regla de cobertura para el plan + servicio."""

    def __init__(self, plan: str, service: str) -> None:
        super().__init__(
            f"No hay regla de cobertura para el plan '{plan}' y servicio '{service}'.",
            status_code=404,
        )


class NoHospitalsAvailableException(MediCostException):
    """Se lanza cuando no hay hospitales en red para el servicio solicitado."""

    def __init__(self, service: str) -> None:
        super().__init__(
            f"No hay hospitales en red disponibles para el servicio '{service}'.",
            status_code=404,
        )


class AIClassificationException(MediCostException):
    """Se lanza cuando falla la clasificación de síntomas por IA."""

    def __init__(self, detail: str = "") -> None:
        msg = "Error al clasificar síntomas con IA."
        if detail:
            msg = f"{msg} {detail}"
        super().__init__(msg, status_code=503)
