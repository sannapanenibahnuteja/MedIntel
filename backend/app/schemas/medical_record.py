from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class MedicalRecordCreate(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_id: int

    symptoms: str

    diagnosis: str

    medications: Optional[str] = None

    allergies: Optional[str] = None

    doctor_notes: Optional[str] = None


class MedicalRecordUpdate(BaseModel):
    symptoms: Optional[str] = None

    diagnosis: Optional[str] = None

    medications: Optional[str] = None

    allergies: Optional[str] = None

    doctor_notes: Optional[str] = None


class MedicalRecordRead(BaseModel):
    id: int

    patient_id: int

    doctor_id: int

    appointment_id: int

    symptoms: str

    diagnosis: str

    medications: Optional[str]

    allergies: Optional[str]

    doctor_notes: Optional[str]

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )