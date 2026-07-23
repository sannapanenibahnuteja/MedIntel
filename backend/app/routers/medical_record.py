from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.medical_record import (
    MedicalRecordCreate,
    MedicalRecordRead,
    MedicalRecordUpdate,
)
from app.services.medical_record import MedicalRecordService

router = APIRouter(
    prefix="/medical-records",
    tags=["Medical Records"],
)


@router.post(
    "/",
    response_model=MedicalRecordRead,
    status_code=201,
)
def create_record(
    data: MedicalRecordCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    return service.create(data)


@router.get(
    "/",
    response_model=list[MedicalRecordRead],
)
def get_records(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    return service.get_all(skip, limit)


@router.get(
    "/{record_id}",
    response_model=MedicalRecordRead,
)
def get_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    return service.get_by_id(record_id)


@router.put(
    "/{record_id}",
    response_model=MedicalRecordRead,
)
def update_record(
    record_id: int,
    data: MedicalRecordUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    return service.update(record_id, data)


@router.delete(
    "/{record_id}",
)
def delete_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = MedicalRecordService(db)
    return service.delete(record_id)