from typing import Optional

from sqlalchemy import or_

from app.models.patient import Patient
from app.repositories.base import BaseRepository


class PatientRepository(BaseRepository[Patient]):
    def __init__(self, db):
        super().__init__(db, Patient)

    def get_by_email(self, email: str):
        return (
            self.db.query(Patient)
            .filter(Patient.email == email)
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
        query = self.db.query(Patient)

        if search:
            query = query.filter(
                or_(
                    Patient.first_name.ilike(f"%{search}%"),
                    Patient.last_name.ilike(f"%{search}%"),
                    Patient.email.ilike(f"%{search}%"),
                    Patient.disease.ilike(f"%{search}%"),
                )
            )

        allowed_sort_fields = {
            "id": Patient.id,
            "first_name": Patient.first_name,
            "last_name": Patient.last_name,
            "age": Patient.age,
            "gender": Patient.gender,
        }

        column = allowed_sort_fields.get(sort_by, Patient.id)

        if order.lower() == "desc":
            query = query.order_by(column.desc())
        else:
            query = query.order_by(column.asc())

        return query.offset(skip).limit(limit).all()