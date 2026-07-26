from datetime import date, time
from typing import Optional

from sqlalchemy import or_
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
        search: Optional[str] = None,
        sort_by: str = "id",
        order: str = "asc",
    ):
        query = self.db.query(Appointment)

        if search:
            query = query.filter(
                or_(
                    Appointment.status.ilike(f"%{search}%"),
                    Appointment.notes.ilike(f"%{search}%"),
                )
            )

        allowed_sort_fields = {
            "id": Appointment.id,
            "appointment_date": Appointment.appointment_date,
            "appointment_time": Appointment.appointment_time,
            "status": Appointment.status,
        }

        column = allowed_sort_fields.get(sort_by, Appointment.id)

        if order.lower() == "desc":
            query = query.order_by(column.desc())
        else:
            query = query.order_by(column.asc())

        return (
            query
            .offset(skip)
            .limit(limit)
            .all()
        )