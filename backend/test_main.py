
from fastapi.testclient import TestClient
from main import app
from database import get_db
from users.dependencies import get_current_user

client = TestClient(app)


# Fake authenticated user for testing
def override_get_current_user():
    return {
        "user_id": 1,
        "username": "test_user"
    }


# Fake database session
class FakeQuery:
    def filter(self, *args, **kwargs):
        return self

    def all(self):
        return []


class FakeDB:
    def __init__(self):
        self.saved = []

    def add(self, item):
        self.saved.append(item)

    def commit(self):
        pass

    def refresh(self, item):
        pass

    def query(self, model):
        return FakeQuery()


fake_db = FakeDB()


def override_get_db():
    yield fake_db


app.dependency_overrides[get_current_user] = (
    override_get_current_user
)
app.dependency_overrides[get_db] = override_get_db


def test_calculator_addition():
    response = client.post(
        "/calculator/calculate",
        json={
            "number1": 10,
            "number2": 5,
            "operation": "add"
        }
    )

    assert response.status_code == 200
    assert response.json()["result"] == 15
    assert response.json()["user"] == "test_user"
