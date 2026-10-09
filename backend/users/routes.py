from fastapi import FastAPI, Depends,HTTPException,APIRouter
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt,JWTError
from database import SessionLocal
from sqlalchemy.orm import Session
from database import get_db
import bcrypt
from users.models import User
from users.schemas import UserRegister,UserLogin
from users.dependencies import get_current_user,SECRET_KEY,ALGORITHM

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register")
def register(user_data: UserRegister,db: Session = Depends(get_db)):
    existing_username = db.query(User).filter(User.username == user_data.username).first()
    if existing_username:
        raise HTTPException(status_code=400,detail="Username already exists")

    existing_email = db.query(User).filter(User.email == user_data.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = bcrypt.hashpw(user_data.password.encode("utf-8"),bcrypt.gensalt()).decode("utf-8")

    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }
    
@router.post("/login")
def login(user_data: UserLogin,db: Session = Depends(get_db)):

    user = db.query(User).filter(User.username == user_data.username).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    password_correct = bcrypt.checkpw(
    user_data.password.encode("utf-8"),
    user.password.encode("utf-8")
)

    if not password_correct:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    payload = {
        "user_id": user.id,
        "username": user.username
    }


    token = jwt.encode(payload,SECRET_KEY,algorithm=ALGORITHM)

    return {
        "access_token": token,
        "token_type": "bearer"
    }
    