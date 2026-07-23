from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentRead,
    AppointmentUpdate,
)
from app.services.appointment import AppointmentService

router = APIRouter(
    prefix="/appointments",
    tags=["Appointments"],
)


@router.post(
    "/",
    response_model=AppointmentRead,
    status_code=201,
)
def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AppointmentService(db)

    return service.create_appointment(
        appointment
    )


@router.get(
    "/",
    response_model=list[AppointmentRead],
)
def get_all_appointments(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AppointmentService(db)

    return service.get_all(
        skip,
        limit,
    )


@router.get(
    "/{appointment_id}",
    response_model=AppointmentRead,
)
def get_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AppointmentService(db)

    return service.get_by_id(
        appointment_id
    )


@router.put(
    "/{appointment_id}",
    response_model=AppointmentRead,
)
def update_appointment(
    appointment_id: int,
    appointment: AppointmentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AppointmentService(db)

    return service.update(
        appointment_id,
        appointment,
    )


@router.delete(
    "/{appointment_id}",
)
def delete_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = AppointmentService(db)

    return service.delete(
        appointment_id
    )