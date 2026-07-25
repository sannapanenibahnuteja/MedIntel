from typing import Optional

from sqlalchemy import or_

from app.models.doctor import Doctor
from app.repositories.base import BaseRepository


class DoctorRepository(BaseRepository[Doctor]):
    def __init__(self, db):
        super().__init__(db, Doctor)

    def get_by_email(self, email: str):
        return (
            self.db.query(Doctor)
            .filter(Doctor.email == email)
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
        query = self.db.query(Doctor)

        if search:
            query = query.filter(
                or_(
                    Doctor.name.ilike(f"%{search}%"),
                    Doctor.specialization.ilike(f"%{search}%"),
                    Doctor.qualification.ilike(f"%{search}%"),
                    Doctor.email.ilike(f"%{search}%"),
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

        return (
            query
            .offset(skip)
            .limit(limit)
            .all()
        )