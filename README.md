# 🚀 Sistema Full-Stack: Microservicio Python + React

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Aplicación moderna full-stack con arquitectura de microservicios**

[Demo en Vivo](#) • [Documentación API](#api-endpoints) • [Instalación](#-instalación) • [Contribuir](#-contribuir)

</div>

---

## 📋 Descripción

Sistema completo de gestión de usuarios construido con las mejores prácticas de desarrollo moderno. Combina un backend robusto en **FastAPI** con un frontend dinámico en **React**, todo containerizado con **Docker** para un despliegue eficiente.

### ✨ Características Principales

- 🔥 **API REST** completa con FastAPI
- ⚡ **Frontend reactivo** con React + Vite
- 🐳 **Containerización** completa con Docker
- 📊 **Base de datos** SQLite con SQLAlchemy ORM
- 🎨 **UI moderna** con Tailwind CSS
- 📚 **Documentación automática** con Swagger
- 🔄 **CRUD completo** de usuarios
- 🚀 **Hot reload** en desarrollo

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    HTTP/REST API   ┌─────────────────┐
│                 │◄──────────────────►│                 │
│   React Client  │                    │  FastAPI Server │
│   (Port: 3000)  │                    │   (Port: 8000)  │
│                 │                    │                 │
└─────────────────┘                    └─────────────────┘
                                                │
                                                ▼
                                       ┌─────────────────┐
                                       │                 │
                                       │  SQLite Database│
                                       │                 │
                                       └─────────────────┘
```

---

## 📂 Estructura del Proyecto

```
sistema-fullstack/
├── 📁 backend/                 # Microservicio Python
│   ├── 📁 app/
│   │   ├── 📄 main.py         # Punto de entrada FastAPI
│   │   ├── 📄 models.py       # Modelos SQLAlchemy
│   │   ├── 📄 schemas.py      # Esquemas Pydantic
│   │   ├── 📄 crud.py         # Operaciones CRUD
│   │   └── 📄 database.py     # Configuración DB
│   ├── 📄 requirements.txt    # Dependencias Python
│   └── 🐳 Dockerfile         # Imagen Docker backend
│
├── 📁 frontend/               # Aplicación React
│   ├── 📁 src/
│   │   ├── 📁 components/     # Componentes React
│   │   ├── 📁 services/       # Servicios API
│   │   ├── 📁 hooks/          # Custom hooks
│   │   └── 📄 App.jsx         # Componente principal
│   ├── 📄 package.json        # Dependencias Node
│   ├── 📄 tailwind.config.js  # Configuración Tailwind
│   └── 🐳 Dockerfile         # Imagen Docker frontend
│
├── 🐳 docker-compose.yml      # Orquestación completa
├── 📄 README.md              # Documentación
└── 📄 .gitignore             # Archivos ignorados
```

---

## 🛠️ Stack Tecnológico

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![Python](https://img.shields.io/badge/Python-3.11+-blue) | 3.11+ | Lenguaje principal |
| ![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green) | Latest | Framework web asíncrono |
| ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0+-orange) | 2.0+ | ORM para base de datos |
| ![SQLite](https://img.shields.io/badge/SQLite-3-lightblue) | 3 | Base de datos |
| ![Uvicorn](https://img.shields.io/badge/Uvicorn-Latest-purple) | Latest | Servidor ASGI |

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![React](https://img.shields.io/badge/React-18+-blue) | 18+ | Biblioteca UI |
| ![Vite](https://img.shields.io/badge/Vite-5+-green) | 5+ | Build tool moderno |
| ![Tailwind](https://img.shields.io/badge/Tailwind-3+-teal) | 3+ | Framework CSS |
| ![Axios](https://img.shields.io/badge/Axios-Latest-yellow) | Latest | Cliente HTTP |

### DevOps
| Tecnología | Propósito |
|------------|-----------|
| 🐳 **Docker** | Containerización |
| 🐙 **Docker Compose** | Orquestación |
| 📊 **SQLite** | Base de datos |

---

## 🚀 Instalación

### Prerrequisitos

- 🐳 [Docker](https://www.docker.com/get-started) (v20+)
- 🐙 [Docker Compose](https://docs.docker.com/compose/) (v2+)
- 🟢 [Node.js](https://nodejs.org/) (v18+) *(solo para desarrollo)*
- 🐍 [Python](https://www.python.org/) (v3.11+) *(solo para desarrollo)*

### 🐳 Opción 1: Con Docker (Recomendado)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/sistema-fullstack.git
cd sistema-fullstack

# 2. Levantar todos los servicios
docker-compose up -d

# 3. Ver los logs (opcional)
docker-compose logs -f
```

**¡Listo! 🎉 Accede a:**
- 🌐 **Frontend**: http://localhost:3000  
- 🔧 **API**: http://localhost:8000  
- 📚 **Docs**: http://localhost:8000/docs  

### 💻 Opción 2: Desarrollo Local

<details>
<summary>🔽 <strong>Expandir instrucciones de desarrollo</strong></summary>

#### Backend
```bash
# 1. Navegar al backend
cd backend

# 2. Crear entorno virtual
python -m venv .venv

# 3. Activar entorno virtual
# En Linux/Mac:
source .venv/bin/activate
# En Windows:
.venv\Scripts\activate

# 4. Instalar dependencias
pip install -r requirements.txt

# 5. Ejecutar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
# 1. Navegar al frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

</details>

---

## 📚 API Endpoints

### 👥 Gestión de Usuarios

| Método | Endpoint | Descripción | Ejemplo |
|--------|----------|-------------|---------|
| ![GET](https://img.shields.io/badge/GET-4CAF50?style=flat-square) | `/api/v1/users/` | Listar todos los usuarios | `GET /api/v1/users/` |
| ![POST](https://img.shields.io/badge/POST-2196F3?style=flat-square) | `/api/v1/users/` | Crear nuevo usuario | `POST /api/v1/users/` |
| ![GET](https://img.shields.io/badge/GET-4CAF50?style=flat-square) | `/api/v1/users/{id}` | Obtener usuario por ID | `GET /api/v1/users/1` |
| ![PUT](https://img.shields.io/badge/PUT-FF9800?style=flat-square) | `/api/v1/users/{id}` | Actualizar usuario | `PUT /api/v1/users/1` |
| ![DELETE](https://img.shields.io/badge/DELETE-F44336?style=flat-square) | `/api/v1/users/{id}` | Eliminar usuario | `DELETE /api/v1/users/1` |

### 📝 Ejemplo de Uso

```bash
# Crear usuario
curl -X POST "http://localhost:8000/api/v1/users/" \
     -H "Content-Type: application/json" \
     -d '{"name":"Juan Pérez","email":"juan@example.com"}'

# Obtener usuarios
curl -X GET "http://localhost:8000/api/v1/users/"
```

---

## 🐳 Docker

### Comandos Útiles

```bash
# Levantar servicios
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Parar servicios
docker-compose down

# Reconstruir imágenes
docker-compose build --no-cache

# Ver estado de contenedores
docker-compose ps
```

### Configuración de Puertos

| Servicio | Puerto Local | Puerto Contenedor |
|----------|--------------|-------------------|
| Frontend | 3000 | 3000 |
| Backend | 8000 | 8000 |

---

## 🧪 Testing

```bash
# Backend - Ejecutar tests
cd backend
python -m pytest

# Frontend - Ejecutar tests
cd frontend
npm run test
```

---

## 🚀 Despliegue

### Producción con Docker

```bash
# Construir para producción
docker-compose -f docker-compose.prod.yml up -d
```

### Variables de Entorno

Crea un archivo `.env` en la raíz:

```env
# Base de datos
DATABASE_URL=sqlite:///./app.db

# API
API_HOST=0.0.0.0
API_PORT=8000

# Frontend
REACT_APP_API_URL=http://localhost:8000
```

---

## 🤝 Contribuir

1. 🍴 **Fork** el proyecto
2. 🌿 Crea tu rama: `git checkout -b feature/nueva-funcionalidad`
3. 💾 Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. 📤 Push a la rama: `git push origin feature/nueva-funcionalidad`
5. 🔃 Abre un **Pull Request**

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Jesús Iván Islas Vázquez**

- 🌐 [GitHub](https://github.com/IvanIslas77)
- 💼 [LinkedIn](https://www.linkedin.com/in/jesus-ivan-islas-vazquez-32385333b/)
- 📧 [Email](ivanisalsvz77@gmail.com)

---

<div align="center">

**⭐ ¡No olvides darle una estrella si te gustó el proyecto! ⭐**

**🚀 Hecho con ❤️ y mucho ☕**

</div>

