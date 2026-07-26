from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.patient import (
    PatientCreate,
    PatientRead,
    PatientUpdate,
)
from app.services.patient import PatientService

router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.post(
    "/",
    response_model=PatientRead,
    status_code=201,
    summary="Create Patient",
)
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db),
):
    service = PatientService(db)
    return service.create_patient(patient)


@router.get(
    "/",
    response_model=list[PatientRead],
    summary="Get All Patients",
)
def get_all_patients(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    sort_by: str = Query("id"),
    order: str = Query("asc"),
    db: Session = Depends(get_db),
):
    service = PatientService(db)

    return service.get_all_patients(
        skip=skip,
        limit=limit,
        search=search,
        sort_by=sort_by,
        order=order,
    )


@router.get(
    "/{patient_id}",
    response_model=PatientRead,
    summary="Get Patient By ID",
)
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):
    service = PatientService(db)
    return service.get_patient(patient_id)


@router.put(
    "/{patient_id}",
    response_model=PatientRead,
    summary="Update Patient",
)
def update_patient(
    patient_id: int,
    patient: PatientUpdate,
    db: Session = Depends(get_db),
):
    service = PatientService(db)
    return service.update_patient(patient_id, patient)


@router.delete(
    "/{patient_id}",
    summary="Delete Patient",
)
def delete_patient(
    patient_id: int,
    db: Session = Depends(get_db),
):
    service = PatientService(db)
    return service.delete_patient(patient_id)