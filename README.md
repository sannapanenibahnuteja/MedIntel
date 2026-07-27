# 🏥 MedIntel – Hospital Management System

A modern **Hospital Management System** built with **FastAPI**, **Next.js**, **PostgreSQL**, and **JWT Authentication**. The application provides a secure platform for managing patients, doctors, appointments, and medical records through an intuitive web interface.

---

# 🌐 Live Demo

### Frontend
https://med-intel-neon.vercel.app

### Backend API
https://medintel-phhj.onrender.com

### API Documentation
https://medintel-phhj.onrender.com/docs

---

# 📸 Preview

> Add screenshots here after uploading them to GitHub.

- Login Page
- Dashboard
- Patients
- Doctors
- Appointments
- Medical Records

---

# ✨ Features

## Authentication

- Secure JWT Authentication
- Argon2 Password Hashing
- Protected API Routes
- User Login

## Patient Management

- Add Patients
- View Patients
- Update Patient Details
- Delete Patients

## Doctor Management

- Add Doctors
- View Doctors
- Update Doctor Information
- Delete Doctors

## Appointment Management

- Schedule Appointments
- View Appointments
- Update Appointments
- Delete Appointments

## Medical Records

- Create Medical Records
- View Medical History
- Update Records
- Delete Records

## Dashboard

- Centralized Dashboard
- Easy Navigation
- Modern User Interface

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
2. FastAPI verifies credentials.
3. Password is validated using Argon2.
4. JWT Access Token is generated.
5. Token is stored in Local Storage.
6. Protected API endpoints require a valid JWT.

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/MedIntel.git
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

Activate it

Windows

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

# ⚙ Environment Variables

Backend `.env`

```env
DATABASE_URL=YOUR_DATABASE_URL

SECRET_KEY=YOUR_SECRET_KEY

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# 🗄 Database

The project uses **PostgreSQL** hosted on **Neon**.

Main entities:

- Users
- Patients
- Doctors
- Appointments
- Medical Records

---

# 📡 API Endpoints

## Authentication

- POST `/auth/register`
- POST `/auth/login`

## Patients

- GET `/patients`
- POST `/patients`
- PUT `/patients/{id}`
- DELETE `/patients/{id}`

## Doctors

- GET `/doctors`
- POST `/doctors`
- PUT `/doctors/{id}`
- DELETE `/doctors/{id}`

## Appointments

- GET `/appointments`
- POST `/appointments`
- PUT `/appointments/{id}`
- DELETE `/appointments/{id}`

## Medical Records

- GET `/medical-records`
- POST `/medical-records`
- PUT `/medical-records/{id}`
- DELETE `/medical-records/{id}`

---

# 🔒 Security

- JWT Authentication
- Password Hashing using Argon2
- CORS Protection
- Environment Variables
- SQLAlchemy ORM
- Input Validation using Pydantic

---

# 🎯 Future Improvements

- Email Notifications
- AI Diagnosis Assistant
- AI Medical Chatbot
- PDF Report Generation
- Role-Based Access Control
- File Uploads
- Medical Image Storage
- Analytics Dashboard
- Audit Logs
- Appointment Reminders

---

# 👨‍💻 Developer

**Bhanu Teja**

B.Tech – Artificial Intelligence & Machine Learning

---

# ⭐ Support

If you like this project, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future development.
