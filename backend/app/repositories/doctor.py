from typing import Optional

from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.doctor import Doctor


class DoctorRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, doctor: Doctor):
        self.db.add(doctor)
        self.db.commit()
        self.db.refresh(doctor)
        return doctor

    def get_all(
        self,
        skip: int = 0,
        limit: int = 10,
        search: Optional[str] = None,
        sort_by: str = "id",
        order: str = "asc",
    ):
        query = self.db.query(Doctor)

        if search:
            search = f"%{search}%"

            query = query.filter(
                or_(
                    Doctor.name.ilike(search),
                    Doctor.specialization.ilike(search),
                    Doctor.qualification.ilike(search),
                    Doctor.email.ilike(search),
                )
            )

        allowed_sort_fields = {
            "id": Doctor.id,
            "name": Doctor.name,
            "specialization": Doctor.specialization,
            "experience": Doctor.experience,
            "consultation_fee": Doctor.consultation_fee,
        }

        column = allowed_sort_fields.get(sort_by, Doctor.id)

        if order.lower() == "desc":
            query = query.order_by(column.desc())
        else:
            query = query.order_by(column.asc())

        return query.offset(skip).limit(limit).all()

    def get_by_id(self, doctor_id: int):
        return (
            self.db.query(Doctor)
            .filter(Doctor.id == doctor_id)
            .first()
        )

    def get_by_email(self, email: str):
        return (
            self.db.query(Doctor)
            .filter(Doctor.email == email)
            .first()
        )

    def update(self):
        self.db.commit()

    def delete(self, doctor: Doctor):
        self.db.delete(doctor)
        self.db.commit()