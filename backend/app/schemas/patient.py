from typing import Optional

from pydantic import BaseModel, EmailStr, ConfigDict


class PatientCreate(BaseModel):
    first_name: str
    last_name: str
    age: int
    gender: str
    disease: Optional[str] = None
    phone: Optional[str] = None
    blood_group: Optional[str] = None
    email: Optional[EmailStr] = None
    height: Optional[float] = None


class PatientUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    disease: Optional[str] = None
    phone: Optional[str] = None
    blood_group: Optional[str] = None
    email: Optional[EmailStr] = None
    height: Optional[float] = None


class PatientRead(BaseModel):
    id: int
    first_name: str
    last_name: str
    age: int
    gender: str
    disease: Optional[str]
    phone: Optional[str]
    blood_group: Optional[str]
    email: Optional[EmailStr]
    height: Optional[float]

    model_config = ConfigDict(from_attributes=True)