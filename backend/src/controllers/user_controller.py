from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from src.database.database import get_db
from src.models.user import User, UserCreate, UserUpdate
from src.services.user_service import UserService

# Constantes para mensajes
USER_NOT_FOUND = "Usuario no encontrado"
USER_DELETED_SUCCESS = "Usuario eliminado correctamente"

router = APIRouter()

@router.get("/", response_model=List[User])
async def get_users(
    skip: int = Query(0, ge=0, description="Número de registros a saltar"),
    limit: int = Query(100, ge=1, le=1000, description="Número máximo de registros"),
    db: Session = Depends(get_db)
):
    """Obtener todos los usuarios"""
    try:
        users = UserService.get_all_users(db, skip=skip, limit=limit)
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str, db: Session = Depends(get_db)):
    """Obtener usuario por ID"""
    try:
        user = UserService.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail=USER_NOT_FOUND)
        return user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=User, status_code=201)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Crear nuevo usuario"""
    try:
        return UserService.create_user(db, user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{user_id}", response_model=User)
async def update_user(user_id: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    """Actualizar usuario existente"""
    try:
        updated_user = UserService.update_user(db, user_id, user_update)
        if not updated_user:
            raise HTTPException(status_code=404, detail=USER_NOT_FOUND)
        return updated_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{user_id}")
async def delete_user(user_id: str, db: Session = Depends(get_db)):
    """Eliminar usuario"""
    try:
        deleted = UserService.delete_user(db, user_id)
        if not deleted:
            raise HTTPException(status_code=404, detail=USER_NOT_FOUND)
        return {"message": USER_DELETED_SUCCESS}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/stats/summary")
async def get_user_stats(db: Session = Depends(get_db)):
    """Obtener estadísticas de usuarios"""
    try:
        stats = UserService.get_user_stats(db)
        return {"success": True, "data": stats}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))