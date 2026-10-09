from pydantic import BaseModel,ConfigDict


class TodoCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"
    status: str = "pending"
    
class TodoUpdate(BaseModel):
    title: str
    description: str | None = None
    priority: str
    status: str
    
class TodoResponse(BaseModel):
    id: int
    title: str
    description: str | None
    priority: str
    status: str

    model_config = ConfigDict(from_attributes=True)