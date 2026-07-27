# Screenshots
<img width="1532" height="1598" alt="patients" src="https://github.com/user-attachments/assets/da6cf70d-5204-4597-8f64-09ea14866c5f" />
<img width="1532" height="1598" alt="medical-records" src="https://github.com/user-attachments/assets/eb6d0e43-d54d-4562-ae0f-725d0bd0750e" />
<img width="1532" height="1598" alt="login" src="https://github.com/user-attachments/assets/6a42f845-1a2b-4949-9779-fdfb9a7df932" />
<img width="1532" height="1598" alt="doctors" src="https://github.com/user-attachments/assets/a6680f4d-8694-4615-b5b5-a8c68521b1b7" />
<img width="1532" height="1598" alt="dashboard" src="https://github.com/user-attachments/assets/70fd3656-5ac1-49a2-b1f6-d806c2b5133a" />
<img width="1532" height="1598" alt="appointments" src="https://github.com/user-attachments/assets/6ebffbb8-25f2-43ca-85a6-c1748d2e1803" />
# 🏥 MedIntel – Hospital Management System

A production-ready **Hospital Management System** built using **FastAPI**, **Next.js**, and **PostgreSQL**. MedIntel provides secure authentication and an intuitive interface for managing patients, doctors, appointments, and medical records.

---

# 🌐 Live Demo

### 🖥 Frontend
https://med-intel-neon.vercel.app

### ⚙️ Backend API
https://medintel-phhj.onrender.com

### 📄 API Documentation
https://medintel-phhj.onrender.com/docs

---

# 🚀 Features

## 🔐 Authentication

- Secure JWT Authentication
- Argon2 Password Hashing
- User Login
- Protected API Routes

---

## 👨‍⚕️ Doctor Management

- Add Doctor
- View Doctors
- Edit Doctor Information
- Delete Doctor

---

## 🧑 Patient Management

- Add Patient
- View Patients
- Update Patient Details
- Delete Patient

---

## 📅 Appointment Management

- Schedule Appointments
- View Appointments
- Edit Appointments
- Delete Appointments

---

## 📋 Medical Records

- Create Medical Records
- View Medical Records
- Update Records
- Delete Records

---

## 📊 Dashboard

- Clean Modern Interface
- Centralized Navigation
- Responsive Layout

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Argon2 Password Hashing

## Database

- PostgreSQL
- Neon Database

## Deployment

- Vercel
- Render

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```text
MedIntel
│
├── backend
│   ├── app
│   │   ├── auth
│   │   ├── config
│   │   ├── database
│   │   ├── models
│   │   ├── repositories
│   │   ├── routers
│   │   ├── schemas
│   │   ├── services
│   │   ├── utils
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── public
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication Flow

1. User enters email and password.
2. FastAPI verifies the credentials.
3. Password is validated using Argon2.
4. A JWT Access Token is generated.
5. Token is stored in Local Storage.
6. Protected endpoints require a valid JWT.

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/sannapanenibahnuteja/MedIntel.git
```

---

## Backend Setup

```bash
cd backend
```

Create a virtual environment

```bash
python -m venv backend
```

Activate the environment

### Windows

```bash
backend\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the backend

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=YOUR_DATABASE_URL

SECRET_KEY=YOUR_SECRET_KEY

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 🗄 Database

MedIntel uses **PostgreSQL** hosted on **Neon**.

Database entities include:

- Users
- Patients
- Doctors
- Appointments
- Medical Records

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |

### Patients

| Method | Endpoint |
|---------|----------|
| GET | `/patients` |
| POST | `/patients` |
| PUT | `/patients/{id}` |
| DELETE | `/patients/{id}` |

### Doctors

| Method | Endpoint |
|---------|----------|
| GET | `/doctors` |
| POST | `/doctors` |
| PUT | `/doctors/{id}` |
| DELETE | `/doctors/{id}` |

### Appointments

| Method | Endpoint |
|---------|----------|
| GET | `/appointments` |
| POST | `/appointments` |
| PUT | `/appointments/{id}` |
| DELETE | `/appointments/{id}` |

### Medical Records

| Method | Endpoint |
|---------|----------|
| GET | `/medical-records` |
| POST | `/medical-records` |
| PUT | `/medical-records/{id}` |
| DELETE | `/medical-records/{id}` |

---

# 🔒 Security

- JWT Authentication
- Argon2 Password Hashing
- CORS Protection
- SQLAlchemy ORM
- Environment Variables
- Input Validation using Pydantic

---

# 📸 Screenshots

> Add screenshots of the following pages after uploading them to GitHub.

- Login Page
- Dashboard
- Patient Management
- Doctor Management
- Appointment Management
- Medical Records

---

# 🎯 Future Improvements

- AI Diagnosis Assistant
- AI Medical Chatbot
- Email Notifications
- Appointment Reminders
- PDF Report Generation
- Medical Image Uploads
- Analytics Dashboard
- Role-Based Access Control
- Audit Logs

---

# 👨‍💻 Developer

**Bhanu Teja**

B.Tech – Artificial Intelligence & Machine Learning

GitHub: https://github.com/sannapanenibahnuteja

---

# ⭐ Show Your Support

If you found this project useful, please consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and supports future development.

---

## 📌 Project Status

✅ Completed

✔ Frontend deployed on Vercel

✔ Backend deployed on Render

✔ PostgreSQL database hosted on Neon

✔ JWT Authentication implemented

✔ CRUD operations completed

✔ Production deployment successful

✔ Fully tested and functional
