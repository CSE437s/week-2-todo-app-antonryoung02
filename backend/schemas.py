from pydantic import BaseModel


class TodoSchema(BaseModel):
    id: int
    title: str
    description: str
