from app.database.connection import engine, Base

# Import all models here
from app.models.patient import Patient

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Patients table created successfully!")