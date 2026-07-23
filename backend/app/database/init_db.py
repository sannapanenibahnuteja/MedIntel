from app.database.connection import Base, engine

# Import every model
from app.models.user import User
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.appointment import Appointment
from app.models.medical_record import MedicalRecord

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Database initialized successfully!")