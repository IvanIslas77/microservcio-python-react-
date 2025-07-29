from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os

# Cargar variables de entorno
load_dotenv()

# Importar rutas
from src.controllers.user_controller import router as user_router

# Crear aplicación FastAPI
app = FastAPI(
    title="Microservicio de Usuarios",
    description="API REST para gestión de usuarios",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción usar dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check
@app.get("/health")
async def health_check():
    return {
        "status": "OK",
        "service": "microservicio-usuarios",
        "version": "1.0.0"
    }

# Registrar rutas
app.include_router(user_router, prefix="/api/v1/users", tags=["users"])

# Ejecutar servidor
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )