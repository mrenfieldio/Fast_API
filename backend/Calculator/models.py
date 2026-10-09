from sqlalchemy import Column, Integer, String,Float,ForeignKey
from database import Base


class Calculations(Base):
    __tablename__="calculation_history"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    number1=Column(Float, nullable=False)
    number2=Column(Float, nullable=False)
    operation=Column(String, nullable=False)
    result=Column(Float, nullable=False)