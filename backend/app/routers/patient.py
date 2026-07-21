from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.patient import PatientCreate, PatientRead
from app.services.patient import (
    create_patient,
    get_patients,
    get_patient_by_id,
    delete_patient,
)

router = APIRouter(
    prefix="/patients",
    tags=["Patients"]
)


@router.post("/", response_model=PatientRead)
def add_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
    return create_patient(db, patient)


@router.get("/", response_model=list[PatientRead])
def list_patients(
    db: Session = Depends(get_db)
):
    return get_patients(db)


@router.get("/{patient_id}", response_model=PatientRead)
def get_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):
    patient = get_patient_by_id(db, patient_id)

    if patient is None:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return patient


@router.delete("/{patient_id}")
def remove_patient(
    patient_id: int,
    db: Session = Depends(get_db)
):
    patient = delete_patient(db, patient_id)

    if patient is None:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return {
        "message": "Patient deleted successfully"
    }