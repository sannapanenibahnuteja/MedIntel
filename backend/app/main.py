from fastapi import FastAPI

from app.routers.patient import router as patient_router

app = FastAPI(
    title="MedIntel API",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to MedIntel API"
    }


app.include_router(patient_router)