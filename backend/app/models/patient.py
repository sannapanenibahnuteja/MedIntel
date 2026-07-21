from sqlalchemy import Column, Integer, String, Float
from app.database.connection import Base


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String, nullable=False)

    last_name = Column(String, nullable=False)

    age = Column(Integer, nullable=False)

    gender = Column(String, nullable=False)

    disease = Column(String)

    phone = Column(String)

    blood_group = Column(String)

    email = Column(String, unique=True)

    height = Column(Float)