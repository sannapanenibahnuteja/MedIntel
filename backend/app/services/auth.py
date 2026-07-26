from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate, UserLogin
from app.utils.security import (
    create_access_token,
    hash_password,
    verify_password,
)


class AuthService:
    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def register(self, user: UserCreate):
        if self.repo.get_by_email(user.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already exists.",
            )

        if self.repo.get_by_username(user.username):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Username already exists.",
            )

        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hash_password(user.password),
        )

        return self.repo.create(db_user)

    def login(self, credentials: UserLogin):
        user = self.repo.get_by_email(credentials.email)

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        if not verify_password(
            credentials.password,
            user.hashed_password,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
            )

        token = create_access_token(
            {
                "sub": str(user.id),
                "role": user.role,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }