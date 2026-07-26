from app.database.session import SessionLocal
from app.models.user import User
from app.utils.security import hash_password

db = SessionLocal()

user = db.query(User).filter(
    User.email == "bhanu@example.com"
).first()

if user:
    user.hashed_password = hash_password("admin123")
    db.commit()
    print("✅ Password reset successfully!")
    print("Email: bhanu@example.com")
    print("Password: admin123")
else:
    print("❌ User not found")

db.close()