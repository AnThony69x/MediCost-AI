"""
Generación de texto natural para el chat médico usando Groq.
Produce respuestas dinámicas, humanas y contextuales.
"""

from __future__ import annotations

import logging
from groq import Groq

from app.core.config import settings

logger = logging.getLogger(__name__)


def _get_groq_client():
    return Groq(api_key=settings.GROQ_API_KEY)

_NATURAL_PROMPT = """\
Eres MediCost-AI, un asistente de salud empático y experto. Tu objetivo es informar al paciente de forma clara, humana y personalizada.
Habla como un profesional médico que conoce el historial del paciente y lo orienta con cuidado.

DATOS DEL PACIENTE:
- Género: {genero}
- Perfil: {perfil}
- Antecedentes: {antecedentes}

CONTEXTO DE LA CHARLA:
{history}

DATOS TÉCNICOS PARA INTEGRAR:
- Síntoma actual: {message}
- Especialidad sugerida: {specialty}
- Plan del usuario: {plan_name}
- Cobertura aplicable: {coverage_pct}%
- Hospital recomendado: {hospital_name} en {location}
- Copago estimado: ${copay:.2f}

REGLAS DE ORO:
1. Usa los datos del paciente (edad/género) para adaptar tu lenguaje y nivel de empatía.
2. Si tiene antecedentes relevantes, relaciónalos brevemente si tiene sentido médico.
3. No uses listas. Escribe 2 a 3 oraciones fluidas y humanas.
4. Cierra ofreciendo ayuda adicional de forma cálida.
"""


_CONVERSATION_PROMPT = """\
Eres MediCost-AI, un asistente de salud digital de vanguardia. Tu personalidad es profesional, cercana, intuitiva y profundamente humana. No eres solo un procesador de datos, eres un guía.

TU ESTILO:
- Habla de tú a tú, con calidez pero manteniendo el respeto.
- Usa un lenguaje fluido y natural. Evita frases cortadas o que parezcan sacadas de un manual.
- Si el usuario te cuenta algo personal o su estado de ánimo, reconócelo antes de pasar a la información técnica.

CONTEXTO DE LA CONVERSACIÓN:
{history}

MENSAJE ACTUAL:
{message}

REGLAS DE ORO:
1. Mantén la coherencia con lo que se ha dicho antes. Si el usuario ya se presentó o ya mencionó un dolor, no lo ignores.
2. Sé breve pero sustancial (máximo 3 oraciones).
3. Si el mensaje NO es médico (ej: un saludo o un agradecimiento), responde con gracia y deja la puerta abierta para ayudar con síntomas.
4. NUNCA menciones que eres una IA, un bot o un algoritmo. Eres simplemente MediCost-AI.
"""


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
    history: Iterable[dict[str, str]] | None = None,
    user_profile: dict | None = None,
) -> str:
    """
    Genera una respuesta 100% dinámica usando Groq.
    """
    history = history or []
    user_profile = user_profile or {}
    
    perfil = "Paciente"
    if user_profile.get("fecha_nacimiento"):
        from datetime import date
        dob = user_profile["fecha_nacimiento"]
        if isinstance(dob, str):
            dob = date.fromisoformat(dob)
        age = (date.today() - dob).days // 365
        perfil = f"Paciente de {age} años"

    try:
        client = _get_groq_client()
        prompt = _NATURAL_PROMPT.format(
            genero=user_profile.get("genero", "No especificado"),
            perfil=perfil,
            antecedentes=", ".join(user_profile.get("antecedentes", [])) or "Ninguno conocido",
            history=_format_history(history),
            message=message,
            specialty=specialty,
            service=service,
            coverage_pct=coverage_pct,
            plan_name=plan_name,
            hospital_name=hospital_name,
            location=location,
            copay=copay,
        )
        
        completion = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=500,
        )
        text = (completion.choices[0].message.content or "").strip()
        if text:
            return text
    except Exception as exc:
        logger.error("Fallo crítico en Groq build_natural_response: %s", exc)
        raise

    raise RuntimeError("Groq no devolvió una respuesta válida.")


def build_conversational_response(
    *,
    message: str,
    history: Iterable[dict[str, str]] | None = None,
) -> str:
    """Genera una respuesta conversacional usando Groq."""
    history = history or []
    try:
        client = _get_groq_client()
        prompt = _CONVERSATION_PROMPT.format(
            history=_format_history(history),
            message=message,
        )
        
        completion = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8,
            max_tokens=400,
        )
        text = (completion.choices[0].message.content or "").strip()
        if text:
            return text
    except Exception as exc:
        logger.error("Fallo crítico en Groq build_conversational_response: %s", exc)
        raise

    raise RuntimeError("Groq no devolvió una respuesta válida.")
