from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from Calculator.models import Calculations
from Calculator.schemas import CalculatorRequest
from users.dependencies import get_current_user


router=APIRouter(
    prefix="/calculator",
    tags=["Calculator"]
)

@router.post("/calculate")
def calculate(
    data: CalculatorRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    if data.operation == "add":
        result = data.number1 + data.number2

    elif data.operation == "subtract":
        result = data.number1 - data.number2

    elif data.operation == "multiply":
        result = data.number1 * data.number2

    elif data.operation == "divide":

        if data.number2 == 0:
            raise HTTPException(
                status_code=400,
                detail="Cannot divide by zero"
            )

        result = data.number1 / data.number2

    else:
        raise HTTPException(
            status_code=400,
            detail="Invalid operation"
        )
    new_calculation = Calculations(
        user_id=current_user["user_id"],
        number1=data.number1,
        number2=data.number2,
        operation=data.operation,
        result=result
    )

    db.add(new_calculation)
    db.commit()
    db.refresh(new_calculation)

    return {
        "user": current_user["username"],
        "number1": data.number1,
        "number2": data.number2,
        "operation": data.operation,
        "result": result
    }
    
@router.get("/calculations")
def get_calculations(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    calculations = db.query(Calculations).filter(
        Calculations.user_id == current_user["user_id"]
    ).all()

    return calculations
