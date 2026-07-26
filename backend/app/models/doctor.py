from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.connection import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    specialization = Column(String(100), nullable=False)

    qualification = Column(String(100), nullable=False)

    experience = Column(Integer, nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    phone = Column(String(20), nullable=False)

    consultation_fee = Column(Float, nullable=False)

    available = Column(Boolean, default=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    appointments = relationship(
        "Appointment",
        back_populates="doctor",
        cascade="all, delete",
    )

    medical_records = relationship(
        "MedicalRecord",
        back_populates="doctor",
        cascade="all, delete",
    )