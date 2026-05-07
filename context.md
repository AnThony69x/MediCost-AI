MediCost-AI
====================

Nombre del Proyecto
--------------------
MediCost-AI — Agente Inteligente para Estimación de Copagos y Cobertura Médica

Objetivo General
-----------------
Desarrollar una aplicación web inteligente que permita a los pacientes conocer, antes de acudir a un centro de salud:

- La especialidad médica adecuada según sus síntomas
- El nivel de cobertura de su seguro
- El costo estimado del copago
- El hospital más conveniente dentro de la red

Problema
--------
Actualmente, los pacientes enfrentan:

- Falta de orientación sobre a qué especialista acudir
- Desconocimiento de su cobertura médica
- Incertidumbre sobre los costos de atención
- Elección ineficiente de hospitales

Esto genera:

- Gastos inesperados
- Mala experiencia del usuario
- Uso ineficiente de recursos médicos

Solución
--------
MediCost-AI propone un agente conversacional que:

- Interpreta síntomas en lenguaje natural
- Sugiere la especialidad médica adecuada
- Consulta la cobertura del seguro del usuario
- Calcula el copago estimado
- Compara hospitales disponibles
- Recomienda la mejor opción económica

Flujo del Sistema (resumen)
---------------------------
Usuario ingresa síntoma
	↓
Frontend (Next.js)
	↓
Backend (FastAPI)
	↓
IA (clasificación de síntomas)
	↓
Consulta Supabase (datos)
	↓
Cálculo de copago
	↓
Ranking de hospitales
	↓
Respuesta al usuario

Arquitectura del Sistema
------------------------
Frontend (Next.js)
	↓
Supabase (DB + Auth + API)
	↓
FastAPI (lógica + IA)
	↓
Modelo IA (Gemini u otro LLM)

Componentes
-----------

Frontend
- Interfaz tipo chat
- Visualización de resultados
- Lista de hospitales recomendados

Supabase (Backend-as-a-Service)
Se encarga de:

- Base de datos (PostgreSQL)
- Autenticación de usuarios
- API automática (CRUD)

Backend (FastAPI)
Responsable de:

- Lógica de negocio
- Cálculo de copagos
- Ranking de hospitales
- Integración con IA

Agente de IA
Se usa para:

- Interpretar síntomas del usuario
- Clasificar la especialidad médica

Ejemplo:
Input: "dolor en el pecho"
Output: Cardiología

Lógica de Cálculo
-----------------
Fórmula

copago = costo_servicio * (1 - cobertura)

Ejemplo
Costo: $80
Cobertura: 80%

Copago: $16

Comparación de Hospitales
------------------------
Proceso:

- Filtrar hospitales dentro de la red
- Calcular copago por hospital
- Ordenar por menor costo

Ejemplo:

Hospital A → $16
Hospital B → $14 ✅
Hospital C → $19

Modelo de Datos (en Supabase)
----------------------------
Tablas principales:

- users
- plans
- specialties
- services
- hospitals
- coverage_rules
- chat_history

Tecnologías
-----------
Frontend

- Next.js
- TypeScript
- TailwindCSS

Backend-as-a-Service

- Supabase

Backend (lógica)

- FastAPI

Inteligencia Artificial

- Google Gemini (u otro LLM)

Infraestructura

- Vercel
- Railway

Alcance (MVP)
----------------
El sistema incluirá:

✔ Chat básico funcional
✔ Clasificación simple de síntomas (reglas → luego IA)
✔ Consulta de datos desde Supabase
✔ Cálculo de copagos
✔ Comparación de hospitales
✔ Recomendación automática

Fases de Desarrollo
-------------------
Fase 1 (MVP)
- Reglas simples (sin IA)
- Datos simulados
- Funcionalidad básica

Fase 2
- Integración con IA (Gemini)
- Mejora en clasificación

Fase 3
- Optimización
- UI avanzada
- Analítica

Futuras mejoras
---------------
- Integración con aseguradoras reales
- Predicción de enfermedades
- Recomendación de exámenes
- Dashboard analítico con Power BI
- Asistente por voz

Impacto Esperado
----------------
- Reducción de incertidumbre en costos médicos
- Mejora en la experiencia del paciente
- Optimización en la toma de decisiones
- Digitalización del proceso de pre-atención

Conclusión
----------
MediCost-AI integra inteligencia artificial, datos y lógica de negocio en una sola plataforma para ofrecer al paciente una estimación clara, rápida y confiable de su atención médica antes de acudir al hospital, reduciendo costos inesperados y mejorando la eficiencia del sistema de salud.

Notas finales
-----------
Documentar reglas en `coverage_rules` y mantener datos de ejemplo en `database/` para facilitar pruebas y despliegue local.


