from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.repositories.patient import PatientRepository
from app.schemas.patient import PatientCreate, PatientUpdate


class PatientService:
    def __init__(self, db: Session):
        self.repo = PatientRepository(db)

    def create_patient(self, patient: PatientCreate):
        # Check duplicate email
        if patient.email:
            existing = self.repo.get_by_email(patient.email)
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already exists."
                )

        new_patient = Patient(**patient.model_dump())

        try:
            return self.repo.create(new_patient)
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already exists."
            )

    def get_all_patients(
        self,
        skip: int = 0,
        limit: int = 10,
        search: str | None = None,
        sort_by: str = "id",
        order: str = "asc",
    ):
        return self.repo.get_all(
            skip=skip,
            limit=limit,
            search=search,
            sort_by=sort_by,
            order=order,
        )

    def get_patient(self, patient_id: int):
        patient = self.repo.get_by_id(patient_id)

        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Patient not found."
            )

        return patient

    def update_patient(
        self,
        patient_id: int,
        patient_update: PatientUpdate,
    ):
        patient = self.repo.get_by_id(patient_id)

        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Patient not found."
            )

        update_data = patient_update.model_dump(exclude_unset=True)

        # Duplicate email check
        if "email" in update_data:
            existing = self.repo.get_by_email(update_data["email"])

            if existing and existing.id != patient_id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Email already exists."
                )

        for key, value in update_data.items():
            setattr(patient, key, value)

        try:
            self.repo.update()
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already exists."
            )

        return patient

    def delete_patient(self, patient_id: int):
        patient = self.repo.get_by_id(patient_id)

        if not patient:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Patient not found."
            )

        self.repo.delete(patient)

        return {
            "message": "Patient deleted successfully."
        }