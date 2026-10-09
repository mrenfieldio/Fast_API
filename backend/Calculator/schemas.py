from pydantic import BaseModel

class CalculatorRequest(BaseModel):
    number1: float
    number2: float
    operation: str