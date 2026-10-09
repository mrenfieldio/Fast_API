
from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session

from database import get_db
from Todo.models import Todo
from Todo.schemas import TodoCreate,TodoUpdate,TodoResponse
from users.dependencies import get_current_user


router = APIRouter(
    prefix="/todo",
    tags=["Todo"]
)


@router.post("/")
def create_todo(
    todo_data: TodoCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_todo = Todo(
        title=todo_data.title,
        description=todo_data.description,
        priority=todo_data.priority,
        status=todo_data.status,
        user_id=current_user["user_id"]
    )

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return {
        "message": "Todo created successfully",
        "todo": new_todo
    }
    
@router.get("/")
def get_todos(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todos = db.query(Todo).filter(
        Todo.user_id == current_user["user_id"]
    ).all()

    return todos

@router.get("/{todo_id}", response_model=TodoResponse)
def get_todos(
    todo_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = db.query(Todo).filter(
        Todo.id == todo_id,
        Todo.user_id == current_user["user_id"]
    ).first()

    if not todo:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    return todo

@router.put("/{todo_id}")
def update_todo(
    todo_id: int,
    todo_data: TodoUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = db.query(Todo).filter(
        Todo.id == todo_id,
        Todo.user_id == current_user["user_id"]
    ).first()

    if not todo:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    todo.title = todo_data.title
    todo.description = todo_data.description
    todo.priority = todo_data.priority
    todo.status = todo_data.status

    db.commit()
    db.refresh(todo)

    return {
        "message": "Todo updated successfully",
        "todo": todo
    }
    
@router.delete("/{todo_id}")
def delete_todo(
    todo_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    todo = db.query(Todo).filter(
        Todo.id == todo_id,
        Todo.user_id == current_user["user_id"]
    ).first()

    if not todo:
        raise HTTPException(
            status_code=404,
            detail="Todo not found"
        )

    db.delete(todo)
    db.commit()

    return {
        "message": "Todo deleted successfully"
    }