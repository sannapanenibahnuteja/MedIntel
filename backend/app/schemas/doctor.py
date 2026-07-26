from pydantic import BaseModel, ConfigDict, EmailStr


class DoctorCreate(BaseModel):
    name: str
    specialization: str
    qualification: str
    experience: int
    email: EmailStr
    phone: str
    consultation_fee: float
    available: bool = True


class DoctorUpdate(BaseModel):
    name: str | None = None
    specialization: str | None = None
    qualification: str | None = None
    experience: int | None = None
    email: EmailStr | None = None
    phone: str | None = None
    consultation_fee: float | None = None
    available: bool | None = None


class DoctorRead(BaseModel):
    id: int
    name: str
    specialization: str
    qualification: str
    experience: int
    email: EmailStr
    phone: str
    consultation_fee: float
    available: bool

    model_config = ConfigDict(from_attributes=True)