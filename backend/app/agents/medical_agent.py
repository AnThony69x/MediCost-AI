"""
Agente médico de MediCost-AI usando Groq.
Clasifica síntomas y detecta intención médica con alta velocidad y contexto.
"""

import logging
from typing import Optional

from groq import Groq

from app.core.config import settings
from app.utils.exceptions import AIClassificationException

logger = logging.getLogger(__name__)


def _get_groq_client():
    return Groq(api_key=settings.GROQ_API_KEY)

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


def _looks_medical_by_rules(message: str) -> bool:
    """Determina si un mensaje parece clínico sin clasificar especialidad."""
    return _rule_based_classify(message) is not None


def _format_history_for_prompt(history: list[dict]) -> str:
    """Formatea el historial para incluirlo en los prompts de Gemini."""
    if not history:
        return "Sin historial previo."
    
    turns = []
    for turn in history[-5:]: # Tomar los últimos 5 turnos para contexto
        role = "Usuario" if turn.get("role") == "user" else "Asistente"
        content = turn.get("content", "")
        turns.append(f"{role}: {content}")
    return "\n".join(turns)

def detect_medical_intent(message: str, history: list[dict] = None) -> bool:
    """
    Detecta si el mensaje tiene intención médica usando Groq.
    """
    history = history or []
    
    if settings.GROQ_API_KEY:
        context = _format_history_for_prompt(history)
        prompt = f"""Eres un experto en detección de intención médica.
Decide si el último mensaje requiere activar el flujo de costos médicos.

CONTEXTO PREVIO:
{context}

ÚLTIMO MENSAJE:
{message!r}

Responde ÚNICAMENTE "YES" o "NO".
"""

        try:
            client = _get_groq_client()
            completion = client.chat.completions.create(
                model=settings.GROQ_MODEL,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1,
            )
            raw = (completion.choices[0].message.content or "").strip().upper()
            if "YES" in raw:
                return True
            if "NO" in raw:
                return False
        except Exception as exc:
            logger.warning("Fallo en detección de intención con Groq: %s", exc)

    return _looks_medical_by_rules(message)


def classify_symptom(message: str, history: list[dict] = None) -> str:
    """
    Clasifica el síntoma en una especialidad usando Groq.
    """
    history = history or []
    specialties = list(SPECIALTY_KEYWORDS.keys())
    
    if settings.GROQ_API_KEY:
        context = _format_history_for_prompt(history)
        prompt = f"""Clasificador médico inteligente.
Determina la especialidad adecuada.

ESPECIALIDADES DISPONIBLES:
{", ".join(specialties)}

CONTEXTO PREVIO:
{context}

ÚLTIMO MENSAJE:
"{message}"

Responde ÚNICAMENTE con el nombre de la especialidad.
"""
        try:
            client = _get_groq_client()
            completion = client.chat.completions.create(
                model=settings.GROQ_MODEL,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1,
            )
            raw = (completion.choices[0].message.content or "").strip()
            
            for specialty in specialties:
                if specialty.lower() in raw.lower():
                    return specialty
        except Exception as exc:
            logger.warning("Fallo en clasificación con Groq: %s", exc)

    # Fallback a reglas y Medicina General
    result = _rule_based_classify(message)
    return result if result else "Medicina General"
