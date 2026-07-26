from fastapi import HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.doctor import Doctor
from app.repositories.doctor import DoctorRepository
from app.schemas.doctor import DoctorCreate, DoctorUpdate


class DoctorService:
    def __init__(self, db: Session):
        self.repo = DoctorRepository(db)

    def create_doctor(self, doctor: DoctorCreate):
        if self.repo.get_by_email(doctor.email):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Doctor with this email already exists."
            )

        new_doctor = Doctor(**doctor.model_dump())

        try:
            return self.repo.create(new_doctor)
        except IntegrityError:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Doctor with this email already exists."
            )

    def get_all_doctors(
        self,
        skip: int = 0,
        limit: int = 10,
        search: str | None = None,
    ):
        return self.repo.get_all(
            skip=skip,
            limit=limit,
            search=search,
        )

    def get_doctor(self, doctor_id: int):
        doctor = self.repo.get_by_id(doctor_id)

        if doctor is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Doctor not found."
            )

        return doctor

    def update_doctor(
        self,
        doctor_id: int,
        doctor_update: DoctorUpdate,
    ):
        doctor = self.repo.get_by_id(doctor_id)

        if doctor is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Doctor not found."
            )

        update_data = doctor_update.model_dump(
            exclude_unset=True
        )

        if "email" in update_data:
            existing = self.repo.get_by_email(
                update_data["email"]
            )

            if existing and existing.id != doctor_id:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Doctor email already exists."
                )

        for key, value in update_data.items():
            setattr(doctor, key, value)

        self.repo.update()

        return doctor

    def delete_doctor(self, doctor_id: int):
        doctor = self.repo.get_by_id(doctor_id)

        if doctor is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Doctor not found."
            )

        self.repo.delete(doctor)

        return {
            "message": "Doctor deleted successfully."
        }