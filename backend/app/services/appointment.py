from datetime import date

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.appointment import Appointment
from app.repositories.appointment import AppointmentRepository
from app.repositories.doctor import DoctorRepository
from app.repositories.patient import PatientRepository
from app.schemas.appointment import (
    AppointmentCreate,
    AppointmentUpdate,
)


class AppointmentService:
    def __init__(self, db: Session):
        self.repo = AppointmentRepository(db)
        self.patient_repo = PatientRepository(db)
        self.doctor_repo = DoctorRepository(db)

    def create_appointment(
        self,
        appointment: AppointmentCreate,
    ):
        if appointment.appointment_date < date.today():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Appointment cannot be in the past.",
            )

        patient = self.patient_repo.get_by_id(
            appointment.patient_id
        )

        if patient is None:
            raise HTTPException(
                status_code=404,
                detail="Patient not found.",
            )

        doctor = self.doctor_repo.get_by_id(
            appointment.doctor_id
        )

        if doctor is None:
            raise HTTPException(
                status_code=404,
                detail="Doctor not found.",
            )

        if not doctor.available:
            raise HTTPException(
                status_code=400,
                detail="Doctor is unavailable.",
            )

        existing = self.repo.doctor_has_appointment(
            appointment.doctor_id,
            appointment.appointment_date,
            appointment.appointment_time,
        )

        if existing:
            raise HTTPException(
                status_code=409,
                detail="Doctor already has an appointment at this time.",
            )

        db_appointment = Appointment(
            **appointment.model_dump()
        )

        return self.repo.create(db_appointment)

    def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
    ):
        return self.repo.get_all(skip, limit)

    def get_by_id(
        self,
        appointment_id: int,
    ):
        appointment = self.repo.get_by_id(
            appointment_id
        )

        if appointment is None:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found.",
            )

        return appointment

    def update(
        self,
        appointment_id: int,
        data: AppointmentUpdate,
    ):
        appointment = self.repo.get_by_id(
            appointment_id
        )

        if appointment is None:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found.",
            )

        update_data = data.model_dump(
            exclude_unset=True
        )

        new_date = update_data.get(
            "appointment_date",
            appointment.appointment_date,
        )

        new_time = update_data.get(
            "appointment_time",
            appointment.appointment_time,
        )

        existing = self.repo.doctor_has_appointment(
            appointment.doctor_id,
            new_date,
            new_time,
        )

        if existing and existing.id != appointment.id:
            raise HTTPException(
                status_code=409,
                detail="Doctor already has an appointment at this time.",
            )

        for key, value in update_data.items():
            setattr(
                appointment,
                key,
                value,
            )

        self.repo.update()

        return appointment

    def delete(
        self,
        appointment_id: int,
    ):
        appointment = self.repo.get_by_id(
            appointment_id
        )

        if appointment is None:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found.",
            )

        self.repo.delete(appointment)

        return {
            "message": "Appointment deleted successfully."
        }