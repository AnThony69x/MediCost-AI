# 🗄️ Database - MediCost-AI

## 📌 Descripción

La base de datos está gestionada con Supabase (PostgreSQL) y almacena la información del sistema.

---

## 🧱 Tablas principales

- users  
- plans  
- specialties  
- services  
- hospitals  
- coverage_rules  

---

## ⚙️ Configuración

1. Crear proyecto en Supabase  
2. Ejecutar `schema.sql`  
3. Ejecutar `seed.sql`  

---

## 🎯 Uso

El backend consulta la base de datos para:

- Obtener cobertura  
- Calcular copagos  
- Listar hospitales  