# 🏥 MediCost-AI

Agente Inteligente para Estimación de Copagos y Cobertura Médica

## 📌 Descripción

MediCost-AI es una aplicación web basada en inteligencia artificial que permite a los pacientes estimar, antes de acudir a un centro de salud:

- La especialidad médica adecuada según sus síntomas
- El porcentaje de cobertura de su seguro
- El valor estimado del copago
- El hospital más conveniente dentro de la red

El sistema reduce la incertidumbre económica del paciente y mejora la toma de decisiones en salud.

## 🚀 Ejemplo de uso

**Usuario:**

"Tengo dolor en el pecho"

**Sistema:**

→ Especialidad: Cardiología
→ Cobertura: 80%
→ Copago estimado: $16
→ Mejor opción: Hospital B

## 🧠 Funcionalidades

- 💬 Chat inteligente
- 🩺 Clasificación de síntomas → especialidad médica
- 💰 Cálculo automático de copago
- 🏥 Comparación de hospitales
- 📊 Recomendación de la mejor opción
- 🧾 Explicación clara para el usuario

## 🏗️ Arquitectura

Frontend (React + Vite)
  ↓
Backend (FastAPI)
  ↓
Supabase (Base de datos)
  ↓
IA (Google Gemini)

## 🛠️ Tecnologías

**Frontend**

- React
- Vite
- TypeScript

**Backend-as-a-Service**

- Supabase (DB, Auth, API)

**Backend (lógica)**

- FastAPI

**Inteligencia Artificial**

- Google Gemini (vía `GEMINI_KEY`)

## 📂 Estructura del Proyecto

```
medicost-ai/
├── frontend/
├── backend/
├── database/
├── docs/
├── docker-compose.yml
└── README.md
```

## ⚙️ Instalación

1. Clonar repositorio

```bash
git clone https://github.com/AnThony69x/MediCost-AI.git
cd medicost-ai
```

2. Backend (desarrollo local)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Servidor:

http://localhost:8000

3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App:

http://localhost:3000

4. Base de datos

Configurar un proyecto en Supabase y crear las tablas necesarias (o importar desde `database/` si hay migraciones/SQL):

- usuarios
- planes
- especialidades
- servicios
- hospitales
- reglas_cobertura
- servicios_hospital
- historial_chat

## 🧮 Lógica de negocio

Fórmula de copago:

```
copago = costo_servicio * (1 - cobertura)
```

Ejemplo:

- Costo: $80
- Cobertura: 80%

Copago: $16

## 🔌 API principal

`POST /chat`

Request
```json
{
  "user_id": 1,
  "message": "dolor en el pecho"
}
```

Response
```json
{
  "especialidad": "Cardiología",
  "cobertura": 0.8,
  "copago": 16,
  "hospitales": [
    {"nombre": "Hospital A", "copago": 16},
    {"nombre": "Hospital B", "copago": 14}
  ],
  "recomendacion": "Hospital B"
}
```

## 🧪 Estado del proyecto

🚧 MVP en desarrollo

Incluye:

- Clasificación básica de síntomas
- Cálculo de copagos
- Datos simulados

## 📈 Futuras mejoras

- Integración con aseguradoras reales
- Recomendación de exámenes médicos
- Dashboard analítico
- Asistente por voz

## 👨‍💻 Autores

- Anthony Mejia
- William Cabrera
- Luis Mendoza

## 📄 Licencia

MIT License

