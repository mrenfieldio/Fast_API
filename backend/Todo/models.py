from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base


class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title=Column(String,nullable=False)
    description=Column(String,nullable=True)
    priority = Column(String, default="medium")
    status = Column(String, default="pending")
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    