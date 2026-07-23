from datetime import date, time

from sqlalchemy.orm import Session

from app.models.appointment import Appointment
from app.repositories.base import BaseRepository


class AppointmentRepository(BaseRepository[Appointment]):
    def __init__(self, db: Session):
        super().__init__(db, Appointment)

    def doctor_has_appointment(
        self,
        doctor_id: int,
        appointment_date: date,
        appointment_time: time,
    ):
        return (
            self.db.query(Appointment)
            .filter(
                Appointment.doctor_id == doctor_id,
                Appointment.appointment_date == appointment_date,
                Appointment.appointment_time == appointment_time,
            )
            .first()
        )

    def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
    ):
        return (
            self.db.query(Appointment)
            .offset(skip)
            .limit(limit)
            .all()
        )