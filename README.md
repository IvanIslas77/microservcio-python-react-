🚀 Sistema Full-Stack: Microservicio Python + React
**Descripción rápida**
Aplicación de ejemplo con un backend en FastAPI (Python) y un frontend en React + Vite + Tailwind CSS. Permite CRUD de usuarios y está preparada para Docker y Docker Compose.
---
📂 Estructura del proyecto
/
├── backend/              # API REST con FastAPI + SQLite + Dockerfile
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/             # React + Vite + Tailwind CSS
│   ├── src/
│   ├── public/
│   └── package.json
└── docker-compose.yml    # Orquestación completa (backend + frontend)
---
🛠️ Stack Tecnológico
- **Backend**
  - FastAPI
  - SQLAlchemy + SQLite
  - Docker
  - Python 3.x

- **Frontend**
  - React 18
  - Vite
  - Tailwind CSS
  - ESLint
---
🚀 Cómo levantar el entorno
1. Con Docker Compose (recomendado)
```bash
# Desde la raíz del proyecto
docker-compose up -d
```
- **Frontend** en → http://localhost:3000
- **API** en → http://localhost:8000
- **Docs Swagger** en → http://localhost:8000/docs
2. En desarrollo local (sin Docker)
Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
Frontend
```bash
cd frontend
npm install
npm run dev
```
---
📜 API Endpoints
| Método | Ruta                   | Descripción         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/v1/users/`       | Listar usuarios     |
| POST   | `/api/v1/users/`       | Crear usuario       |
| GET    | `/api/v1/users/{id}`   | Obtener usuario     |
| PUT    | `/api/v1/users/{id}`   | Actualizar usuario  |
| DELETE | `/api/v1/users/{id}`   | Eliminar usuario    |
---
📦 Docker
El `Dockerfile` en `/backend` y `/frontend` genera imágenes independientes.
El `docker-compose.yml` orquesta ambos servicios y expone los puertos 3000 y 8000.
---
📝 Licencia
MIT © 2025 Jesús Iván Islas Vázquez

