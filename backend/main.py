from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from users.routes import router as users_router
from Calculator.routes import router as calculator_router
from Todo.routes import router as todo_router

app = FastAPI()

app.include_router(users_router)
app.include_router(calculator_router)
app.include_router(todo_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)