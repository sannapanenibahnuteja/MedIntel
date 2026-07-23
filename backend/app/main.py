from fastapi import Depends, FastAPI

from app.auth.dependencies import get_current_user
from app.models.user import User
from app.routers.appointment import router as appointment_router
from app.routers.auth import router as auth_router
from app.routers.doctor import router as doctor_router
from app.routers.patient import router as patient_router

app = FastAPI(
    title="MedIntel API",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "message": "Welcome to MedIntel API"
    }


@app.get("/profile")
def profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role,
    }


app.include_router(auth_router)
app.include_router(patient_router)
app.include_router(doctor_router)
app.include_router(appointment_router)