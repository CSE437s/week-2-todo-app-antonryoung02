from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
from models import Todo
from schemas import TodoSchema
from sqlalchemy.orm import Session
from fastapi import FastAPI, Depends


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

SQLALCHEMY_DATABASE_URL = "postgresql://username:password@db/dbname"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base


def init_db():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/")
def retrieve_items(db: Session = Depends(get_db)):
    items = db.query(Todo).all()
    return items


@app.post("/items/")
def upsert_item(
    title: str, description: str, completed: str, db: Session = Depends(get_db)
):
    item = Todo(title=title, description=description, completed=completed)
    db.add(item)
    db.commit()
    return item


@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Todo).filter(Todo.id == item_id).first()

    if item is None:
        return

    db.delete(item)
    db.commit()


# What else
# Create, remove, retrieve todo(s)
