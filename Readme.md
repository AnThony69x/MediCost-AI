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

Frontend (Next.js)
  ↓
Supabase (DB + Auth + API)
  ↓
FastAPI (lógica + IA)
  ↓
Modelo IA (Gemini)

## 🛠️ Tecnologías

**Frontend**

- Next.js
- TypeScript
- TailwindCSS

**Backend-as-a-Service**

- Supabase (DB, Auth, API)

**Backend (lógica)**

- FastAPI

**Inteligencia Artificial**

- Google Gemini

**Infraestructura**

- Vercel
- Railway

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
git clone https://github.com/tu-usuario/medicost-ai.git
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

- users
- plans
- specialties
- services
- hospitals
- coverage_rules
- chat_history

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
  "specialty": "Cardiología",
  "coverage": 0.8,
  "copay": 16,
  "hospitals": [
    {"name": "Hospital A", "copay": 16},
    {"name": "Hospital B", "copay": 14}
  ],
  "recommendation": "Hospital B"
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
- Predicción de enfermedades
- Recomendación de exámenes médicos
- Dashboard analítico con Power BI
- Asistente por voz

## 👨‍💻 Autores

- Anthony Mejia
- William Cabrera
- Luis Mendoza

## 📄 Licencia

MIT License

