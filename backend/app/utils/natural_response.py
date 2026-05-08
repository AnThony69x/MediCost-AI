"""
Generación de texto natural para el chat médico.

Si Gemini está disponible, usa una reformulación breve y humana.
Si no, construye una respuesta clara con pequeñas variaciones para evitar
que el texto suene rígido o repetitivo.
"""

from __future__ import annotations

import logging
import random
from typing import Iterable

import google.generativeai as genai

from app.core.config import settings

logger = logging.getLogger(__name__)

_NATURAL_PROMPT = """\
Eres un asistente de salud en español. Escribe una respuesta corta, cálida y
natural para un paciente. Habla en primera persona y evita sonar robótico.

Usa estos datos para redactar el mensaje:
- Síntoma descrito: {message}
- Especialidad sugerida: {specialty}
- Servicio asociado: {service}
- Cobertura del plan: {coverage_pct}%
- Plan: {plan_name}
- Hospital recomendado: {hospital_name}
- Ubicación: {location}
- Copago estimado: ${copay:.2f}

Requisitos:
- Máximo 3 oraciones.
- No uses listas ni viñetas.
- No expliques el proceso interno.
- Mantén un tono empático y natural.
- Cierra ofreciendo ayuda si el usuario desea revisar otro síntoma.
"""

_CONVERSATION_PROMPT = """\
Eres un asistente conversacional cálido y natural en español.
Responde como una persona real, sin sonar robótico ni usar plantillas fijas.

Contexto reciente:
{history}

Último mensaje del usuario:
{message}

Reglas:
- Responde en 1 a 3 frases.
- Si el usuario saluda, saluda de vuelta.
- Si agradece, responde con amabilidad.
- Si pide ayuda general, ofrece ayuda con un tono humano.
- No menciones que eres un modelo ni que estás usando reglas.
- No uses listas, viñetas ni títulos.
"""

_OPENERS = [
    "Con lo que me cuentas, la orientación más adecuada es",
    "Por los síntomas que describes, te recomendaría",
    "Si tomo en cuenta lo que comentas, lo más conveniente es",
]

_CLOSINGS = [
    "Si quieres, también puedo ayudarte a revisar otro síntoma.",
    "Si te parece, seguimos con otro síntoma o duda que tengas.",
    "Si necesitas, puedo orientarte con otro caso similar.",
]


def _format_history(history: Iterable[dict[str, str]]) -> str:
    turns: list[str] = []
    for item in history:
        role = item.get("role", "user")
        content = item.get("content", "").strip()
        if not content:
            continue
        label = "Usuario" if role == "user" else "Asistente"
        turns.append(f"{label}: {content}")
    return "\n".join(turns[-8:]) if turns else "Sin contexto previo relevante."


def _build_fallback_message(
    *,
    message: str,
    specialty: str,
    service: str,
    coverage_pct: int,
    plan_name: str,
    hospital_name: str,
    location: str,
    copay: float,
) -> str:
    opener = random.choice(_OPENERS)
    closing = random.choice(_CLOSINGS)

    return (
        f"{opener} {specialty}. "
        f"Con tu plan {plan_name}, la cobertura para {service} ronda el {coverage_pct}%. "
        f"La opción más conveniente que encontré es {hospital_name} ({location}), "
        f"con un copago estimado de ${copay:.2f}. {closing}"
    )


def build_natural_response(
    *,
    message: str,
    specialty: str,
    service: str,
    coverage_pct: int,
    plan_name: str,
    hospital_name: str,
    location: str,
    copay: float,
) -> str:
    """
    Devuelve un texto natural para mostrar al usuario.
    """
    if settings.GEMINI_KEY:
        try:
            genai.configure(api_key=settings.GEMINI_KEY)
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            prompt = _NATURAL_PROMPT.format(
                message=message,
                specialty=specialty,
                service=service,
                coverage_pct=coverage_pct,
                plan_name=plan_name,
                hospital_name=hospital_name,
                location=location,
                copay=copay,
            )
            response = model.generate_content(prompt)
            text = (response.text or "").strip()
            if text:
                return text
        except Exception as exc:  # noqa: BLE001
            logger.warning("No se pudo generar respuesta natural con Gemini: %s", exc)

    return _build_fallback_message(
        message=message,
        specialty=specialty,
        service=service,
        coverage_pct=coverage_pct,
        plan_name=plan_name,
        hospital_name=hospital_name,
        location=location,
        copay=copay,
    )


def build_conversational_response(
    *,
    message: str,
    history: Iterable[dict[str, str]] | None = None,
) -> str:
    """Genera una respuesta natural para mensajes que no son síntomas."""
    history = history or []

    if settings.GEMINI_KEY:
        try:
            genai.configure(api_key=settings.GEMINI_KEY)
            model = genai.GenerativeModel(settings.GEMINI_MODEL)
            prompt = _CONVERSATION_PROMPT.format(
                history=_format_history(history),
                message=message,
            )
            response = model.generate_content(prompt)
            text = (response.text or "").strip()
            if text:
                return text
        except Exception as exc:  # noqa: BLE001
            logger.warning(
                "No se pudo generar respuesta conversacional con Gemini: %s", exc
            )

    lower = message.strip().lower()
    if any(token in lower for token in ["hola", "buenas", "holi", "hello"]):
        return random.choice(
            [
                "Hola, claro, te acompaño. Cuéntame qué necesitas y lo vemos juntos.",
                "Hola, aquí estoy. Dime qué te preocupa y te ayudo paso a paso.",
                "Hola, encantado de ayudarte. Cuéntame un poco más y seguimos.",
            ]
        )

    if any(token in lower for token in ["gracias", "muchas gracias", "te lo agradezco"]):
        return random.choice(
            [
                "Con gusto, para eso estoy. Si necesitas algo más, aquí sigo.",
                "No hay de qué, sigo atento por si quieres revisar otra cosa.",
                "Con gusto, si te surge otra duda, la vemos enseguida.",
            ]
        )

    if any(token in lower for token in ["adios", "bye", "hasta luego", "nos vemos"]):
        return random.choice(
            [
                "Claro, hablamos luego. Cuídate mucho.",
                "Perfecto, aquí estaré cuando vuelvas. Que estés bien.",
                "De acuerdo, hasta luego. Si necesitas algo más, aquí sigo.",
            ]
        )

    return random.choice(
        [
            "Te sigo leyendo. Cuéntame un poco más para orientarte mejor.",
            "Entiendo, dime un poco más y te acompaño con calma.",
            "Cuéntame más contexto y te respondo de la forma más útil posible.",
        ]
    )
