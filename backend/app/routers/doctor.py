from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.doctor import (
    DoctorCreate,
    DoctorRead,
    DoctorUpdate,
)
from app.services.doctor import DoctorService

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"],
)


@router.post(
    "/",
    response_model=DoctorRead,
    status_code=201,
    summary="Create Doctor",
)
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db),
):
    service = DoctorService(db)
    return service.create_doctor(doctor)


@router.get(
    "/",
    response_model=list[DoctorRead],
    summary="Get All Doctors",
)
def get_all_doctors(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    service = DoctorService(db)

    return service.get_all_doctors(
        skip=skip,
        limit=limit,
        search=search,
    )


@router.get(
    "/{doctor_id}",
    response_model=DoctorRead,
    summary="Get Doctor By ID",
)
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
):
    service = DoctorService(db)
    return service.get_doctor(doctor_id)


@router.put(
    "/{doctor_id}",
    response_model=DoctorRead,
    summary="Update Doctor",
)
def update_doctor(
    doctor_id: int,
    doctor: DoctorUpdate,
    db: Session = Depends(get_db),
):
    service = DoctorService(db)
    return service.update_doctor(
        doctor_id,
        doctor,
    )


@router.delete(
    "/{doctor_id}",
    summary="Delete Doctor",
)
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
):
    service = DoctorService(db)
    return service.delete_doctor(doctor_id)