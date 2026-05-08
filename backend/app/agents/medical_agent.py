"""
Agente médico de MediCost-AI.

Clasifica el síntoma del usuario en una especialidad médica.
Estrategia en cascada:
  1. Google Gemini (si GEMINI_KEY está configurado)
  2. Clasificación por palabras clave (fallback local)
  3. 'Medicina General' (fallback último recurso)
"""

import logging
from typing import Optional

import google.generativeai as genai

from app.core.config import settings
from app.utils.exceptions import AIClassificationException

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Diccionario de palabras clave por especialidad
# Clave: nombre exacto de la especialidad (igual que en la BD)
# Valor: lista de términos que el usuario podría mencionar
# ---------------------------------------------------------------------------
SPECIALTY_KEYWORDS: dict[str, list[str]] = {
    "Cardiologia": [
        "pecho",
        "corazon",
        "cardiaco",
        "cardiaca",
        "taquicardia",
        "arritmia",
        "infarto",
        "presion arterial",
        "hipertension",
        "palpitaciones",
        "angina",
        "cardiovascular",
        "pulso",
    ],
    "Traumatologia": [
        "rodilla",
        "tobillo",
        "fractura",
        "hueso",
        "articulacion",
        "espalda",
        "columna",
        "muscular",
        "cadera",
        "ligamento",
        "tendon",
        "pie",
        "codo",
        "hombro",
        "brazo",
        "pierna",
        "luxacion",
        "torcedura",
        "golpe",
        "trauma",
        "ortopedia",
    ],
    "Medicina General": [
        "fiebre",
        "gripa",
        "gripe",
        "resfriado",
        "tos",
        "cansancio",
        "cabeza",
        "cefalea",
        "mareo",
        "nausea",
        "nauseas",
        "vomito",
        "diarrea",
        "malestar",
        "cuerpo",
        "general",
        "dolor general",
        "enfermedad",
        "catarro",
    ],
}

# Prompt para Gemini — instrucción estricta para respuesta corta
_GEMINI_PROMPT = """\
Eres un clasificador médico. Tu única tarea es determinar la especialidad \
médica más apropiada para el síntoma del paciente.

Especialidades disponibles (responde EXACTAMENTE con una de estas):
{specialties}

Síntoma del paciente: "{message}"

Responde ÚNICAMENTE con el nombre de la especialidad, sin explicación, \
sin puntuación adicional.\
"""


# ---------------------------------------------------------------------------
# Clasificación por reglas
# ---------------------------------------------------------------------------
def _rule_based_classify(message: str) -> Optional[str]:
    """
    Clasifica el síntoma usando coincidencia de palabras clave.

    Returns:
        Nombre de la especialidad si hay coincidencia, None si no.
    """
    msg_lower = message.lower()
    for specialty, keywords in SPECIALTY_KEYWORDS.items():
        if any(kw in msg_lower for kw in keywords):
            return specialty
    return None


# ---------------------------------------------------------------------------
# Clasificación con Google Gemini
# ---------------------------------------------------------------------------
def _gemini_classify(message: str) -> str:
    """
    Usa Google Gemini para clasificar el síntoma.

    Returns:
        Nombre de la especialidad según Gemini.

    Raises:
        AIClassificationException: Si Gemini falla o devuelve respuesta inválida.
    """
    specialties = list(SPECIALTY_KEYWORDS.keys())
    prompt = _GEMINI_PROMPT.format(
        specialties=", ".join(specialties),
        message=message,
    )

    try:
        genai.configure(api_key=settings.GEMINI_KEY)
        model = genai.GenerativeModel(settings.GEMINI_MODEL)
        response = model.generate_content(prompt)
        raw = response.text.strip()
    except Exception as exc:
        raise AIClassificationException(str(exc)) from exc

    # Validar que la respuesta sea una especialidad conocida
    for specialty in specialties:
        if specialty.lower() in raw.lower():
            logger.info("Gemini clasificó '%s' → '%s'", message, specialty)
            return specialty

    logger.warning(
        "Gemini devolvió respuesta no válida '%s' para '%s'. Usando reglas.",
        raw,
        message,
    )
    raise AIClassificationException(f"Respuesta inesperada de Gemini: '{raw}'")


# ---------------------------------------------------------------------------
# Función pública principal
# ---------------------------------------------------------------------------
def classify_symptom(message: str) -> str:
    """
    Clasifica el síntoma del usuario en una especialidad médica.

    Estrategia en cascada:
    1. Google Gemini  → si GEMINI_KEY está configurado
    2. Reglas locales → si Gemini falla o no está configurado
    3. 'Medicina General' → fallback último recurso

    Args:
        message: Texto con los síntomas del usuario.

    Returns:
        Nombre de la especialidad médica (str).
    """
    # --- Paso 1: intentar con Gemini ---
    if settings.GEMINI_KEY:
        try:
            return _gemini_classify(message)
        except AIClassificationException as exc:
            logger.warning("Gemini falló, usando reglas: %s", exc.message)

    # --- Paso 2: clasificación por reglas ---
    result = _rule_based_classify(message)
    if result:
        logger.info("Reglas clasificaron '%s' → '%s'", message, result)
        return result

    # --- Paso 3: fallback ---
    logger.warning(
        "Sin clasificación para '%s'. Asignando 'Medicina General'.", message
    )
    return "Medicina General"
