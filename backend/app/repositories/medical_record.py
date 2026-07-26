from typing import Optional

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.medical_record import MedicalRecord
from app.repositories.base import BaseRepository


class MedicalRecordRepository(BaseRepository[MedicalRecord]):

    def __init__(self, db: Session):
        super().__init__(db, MedicalRecord)


    def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
        search: Optional[str] = None,
    ):
        query = self.db.query(MedicalRecord)

        if search:
            query = query.filter(
                or_(
                    MedicalRecord.symptoms.ilike(
                        f"%{search}%"
                    ),
                    MedicalRecord.diagnosis.ilike(
                        f"%{search}%"
                    ),
                    MedicalRecord.medications.ilike(
                        f"%{search}%"
                    ),
                )
            )

        return (
            query
            .offset(skip)
            .limit(limit)
            .all()
        )


    def get_by_appointment(
        self,
        appointment_id: int
    ):
        return (
            self.db.query(MedicalRecord)
            .filter(
                MedicalRecord.appointment_id == appointment_id
            )
            .first()
        )


    def get_by_patient(
        self,
        patient_id: int,
        skip: int = 0,
        limit: int = 10,
    ):
        return (
            self.db.query(MedicalRecord)
            .filter(
                MedicalRecord.patient_id == patient_id
            )
            .offset(skip)
            .limit(limit)
            .all()
        )


    def get_by_doctor(
        self,
        doctor_id: int,
        skip: int = 0,
        limit: int = 10,
    ):
        return (
            self.db.query(MedicalRecord)
            .filter(
                MedicalRecord.doctor_id == doctor_id
            )
            .offset(skip)
            .limit(limit)
            .all()
        )