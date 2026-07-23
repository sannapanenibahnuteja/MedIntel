from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.medical_record import MedicalRecord
from app.repositories.appointment import AppointmentRepository
from app.repositories.doctor import DoctorRepository
from app.repositories.medical_record import MedicalRecordRepository
from app.repositories.patient import PatientRepository
from app.schemas.medical_record import (
    MedicalRecordCreate,
    MedicalRecordUpdate,
)


class MedicalRecordService:
    def __init__(self, db: Session):
        self.repo = MedicalRecordRepository(db)
        self.patient_repo = PatientRepository(db)
        self.doctor_repo = DoctorRepository(db)
        self.appointment_repo = AppointmentRepository(db)

    def create(
        self,
        data: MedicalRecordCreate,
    ):
        patient = self.patient_repo.get_by_id(
            data.patient_id
        )

        if patient is None:
            raise HTTPException(
                status_code=404,
                detail="Patient not found.",
            )

        doctor = self.doctor_repo.get_by_id(
            data.doctor_id
        )

        if doctor is None:
            raise HTTPException(
                status_code=404,
                detail="Doctor not found.",
            )

        appointment = self.appointment_repo.get_by_id(
            data.appointment_id
        )

        if appointment is None:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found.",
            )

        existing = self.repo.get_by_appointment(
            data.appointment_id
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This appointment already has a medical record.",
            )

        record = MedicalRecord(
            **data.model_dump()
        )

        return self.repo.create(record)

    def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
    ):
        return self.repo.get_all(
            skip,
            limit,
        )

    def get_by_id(
        self,
        record_id: int,
    ):
        record = self.repo.get_by_id(
            record_id
        )

        if record is None:
            raise HTTPException(
                status_code=404,
                detail="Medical record not found.",
            )

        return record

    def get_patient_records(
        self,
        patient_id: int,
    ):
        return self.repo.get_by_patient(
            patient_id
        )

    def get_doctor_records(
        self,
        doctor_id: int,
    ):
        return self.repo.get_by_doctor(
            doctor_id
        )

    def update(
        self,
        record_id: int,
        data: MedicalRecordUpdate,
    ):
        record = self.repo.get_by_id(
            record_id
        )

        if record is None:
            raise HTTPException(
                status_code=404,
                detail="Medical record not found.",
            )

        update_data = data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(record, key, value)

        self.repo.update()

        return record

    def delete(
        self,
        record_id: int,
    ):
        record = self.repo.get_by_id(
            record_id
        )

        if record is None:
            raise HTTPException(
                status_code=404,
                detail="Medical record not found.",
            )

        self.repo.delete(record)

        return {
            "message": "Medical record deleted successfully."
        }