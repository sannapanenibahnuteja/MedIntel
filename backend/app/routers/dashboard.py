from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.patient import Patient
from app.models.doctor import Doctor
from app.models.appointment import Appointment
from app.models.medical_record import MedicalRecord

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
):
    return {
        "patients": db.query(Patient).count(),
        "doctors": db.query(Doctor).count(),
        "appointments": db.query(Appointment).count(),
        "medical_records": db.query(MedicalRecord).count(),
    }