MediCost-AI — Agente Inteligente para Estimación de Copagos y Cobertura Médica

🎯 Objetivo General
-----------------
Desarrollar una aplicación web inteligente que permita a los pacientes conocer, antes de acudir a un centro de salud:

- La especialidad médica adecuada según sus síntomas
- El nivel de cobertura de su seguro
- El costo estimado del copago
- El hospital más conveniente dentro de la red

❗ Problema
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

💡 Solución
--------
MediCost-AI propone un agente conversacional que:

- Interpreta síntomas en lenguaje natural
- Sugiere la especialidad médica adecuada
- Consulta la cobertura del seguro del usuario
- Calcula el copago estimado
- Compara hospitales disponibles
- Recomienda la mejor opción económica

🔄 Flujo del Sistema
---------------------------
Usuario ingresa síntoma
	↓
Frontend (React + Vite)
	↓
Backend (FastAPI)
	↓
Clasificación de especialidad (reglas o IA)
	↓
Consulta a Supabase
	↓
Cálculo de copago
	↓
Comparación de hospitales
	↓
Respuesta al usuario

🏗️ Arquitectura del Sistema
------------------------
Frontend (React + Vite)
	↓
Backend (FastAPI)
	↓
Supabase (Base de datos)
	↓
IA (Google Gemini)

🧩 Componentes del Sistema
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
- Clasificar especialidades

Ejemplo:
Input: "dolor en el pecho"
Output: Cardiología

🧠 Lógica de Cálculo
-----------------
Fórmula

copago = costo_servicio * (1 - cobertura)

Ejemplo
Costo: $80
Cobertura: 80%

Copago: $16

🏥 Comparación de Hospitales
------------------------
Proceso:

- Filtrar hospitales dentro de la red
- Calcular copago por hospital
- Ordenar por menor costo

Ejemplo:

Hospital A → $16
Hospital B → $14 ✅
Hospital C → $19

🗃️ Modelo de Datos (Supabase)
----------------------------
Tablas principales:

- usuarios
- planes
- especialidades
- servicios
- hospitales
- reglas_cobertura
- servicios_hospital
- historial_chat

Tecnologías
-----------
Frontend

- React
- Vite
- TypeScript

Backend-as-a-Service

- Supabase

Backend (lógica)

- FastAPI

Inteligencia Artificial

 - Google Gemini (GEMINI_KEY)
🧪 Alcance (MVP)
----------------
El sistema incluirá:

✔ Chat básico funcional
✔ Clasificación básica de síntomas (sin IA al inicio)
✔ Consulta de datos desde Supabase
✔ Cálculo de copagos
✔ Comparación de hospitales
✔ Recomendación automática

👥 Roles del Equipo
👤 Anthony — Base de Datos
Diseño de tablas

Creación de schema.sql

Datos de prueba (seed.sql)

Relaciones y consultas

👤 William — Backend
Desarrollo en FastAPI

Endpoint /chat

Lógica de negocio

Integración con Supabase

👤 Luis — Frontend
Interfaz en React + Vite

Chat UI

Consumo de API

Visualización de resultados

🚀 Fases de Desarrollo
-------------------
Fase 1 (MVP)
- Reglas simples (sin IA)
- Datos simulados
- Funcionalidad básica

Fase 2
- Integración con IA (Google Gemini)
- Mejora en clasificación

Fase 3
- Mejoras UI
- Optimización
- Testing

🔮 Futuras Mejoras
---------------
- Integración con aseguradoras reales
- Recomendación de exámenes
- Dashboard analítico
- Asistente por voz

🌍 Impacto Esperado
----------------
- Reducción de incertidumbre en costos médicos
- Mejora en la experiencia del paciente
- Mejores decisiones de atención
- Optimización del uso de servicios de salud

🏁 Conclusión
----------
MediCost-AI integra datos, lógica de negocio y (opcionalmente) inteligencia artificial para ofrecer al paciente una estimación clara, rápida y confiable de su atención médica antes de acudir al hospital.

📝 Notas Finales
-----------
Todo el sistema debe manejarse en español (tablas, datos y lógica)

Mantener datos de prueba en /database

Documentar reglas en reglas_cobertura

Validar siempre los cálculos antes de integrar frontend


