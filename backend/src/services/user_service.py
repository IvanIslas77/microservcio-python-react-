from sqlalchemy.orm import Session
from src.database.database import UserDB, get_db
from src.models.user import UserCreate, UserUpdate, User
from typing import List, Optional
from datetime import datetime
import uuid

class UserService:
    
    @staticmethod
    def get_all_users(db: Session, skip: int = 0, limit: int = 100) -> List[UserDB]:
        return db.query(UserDB).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: str) -> Optional[UserDB]:
        return db.query(UserDB).filter(UserDB.id == user_id).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[UserDB]:
        return db.query(UserDB).filter(UserDB.email == email).first()
    
    @staticmethod
    def create_user(db: Session, user: UserCreate) -> UserDB:
        # Verificar si el email ya existe
        existing_user = UserService.get_user_by_email(db, user.email)
        if existing_user:
            raise ValueError("El email ya está registrado")
        
        # Crear nuevo usuario
        db_user = UserDB(
            id=str(uuid.uuid4()),
            name=user.name,
            email=user.email,
            age=user.age
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def update_user(db: Session, user_id: str, user_update: UserUpdate) -> Optional[UserDB]:
        db_user = UserService.get_user_by_id(db, user_id)
        if not db_user:
            return None
        
        # Verificar email único si se está actualizando
        if user_update.email and user_update.email != db_user.email:
            existing_user = UserService.get_user_by_email(db, user_update.email)
            if existing_user:
                raise ValueError("El email ya está registrado")
        
        # Actualizar campos
        update_data = user_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_user, field, value)
        
        db_user.updated_at = datetime.now()
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def delete_user(db: Session, user_id: str) -> bool:
        db_user = UserService.get_user_by_id(db, user_id)
        if not db_user:
            return False
        
        db.delete(db_user)
        db.commit()
        return True
    
    @staticmethod
    def get_user_stats(db: Session) -> dict:
        total_users = db.query(UserDB).count()
        if total_users == 0:
            return {
                "total_users": 0,
                "average_age": 0,
                "oldest_user": 0,
                "youngest_user": 0
            }
        
        users = db.query(UserDB).all()
        ages = [user.age for user in users]
        
        return {
            "total_users": total_users,
            "average_age": sum(ages) / len(ages),
            "oldest_user": max(ages),
            "youngest_user": min(ages)
        }