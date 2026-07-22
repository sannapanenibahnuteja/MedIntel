from typing import Optional

from sqlalchemy.orm import Session

from app.models.patient import Patient


class PatientRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, patient: Patient) -> Patient:
        self.db.add(patient)
        self.db.commit()
        self.db.refresh(patient)
        return patient

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
            search = f"%{search}%"

            query = query.filter(
                (Patient.first_name.ilike(search))
                | (Patient.last_name.ilike(search))
                | (Patient.email.ilike(search))
                | (Patient.disease.ilike(search))
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

    def get_by_id(self, patient_id: int):
        return (
            self.db.query(Patient)
            .filter(Patient.id == patient_id)
            .first()
        )

    def get_by_email(self, email: str):
        return (
            self.db.query(Patient)
            .filter(Patient.email == email)
            .first()
        )

    def update(self):
        self.db.commit()

    def delete(self, patient: Patient):
        self.db.delete(patient)
        self.db.commit()