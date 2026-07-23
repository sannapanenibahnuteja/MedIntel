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

    def search(
        self,
        search: str,
        skip: int = 0,
        limit: int = 10,
    ):
        return (
            self.db.query(Doctor)
            .filter(
                or_(
                    Doctor.name.ilike(f"%{search}%"),
                    Doctor.specialization.ilike(f"%{search}%"),
                    Doctor.qualification.ilike(f"%{search}%"),
                    Doctor.email.ilike(f"%{search}%"),
                )
            )
            .offset(skip)
            .limit(limit)
            .all()
        )