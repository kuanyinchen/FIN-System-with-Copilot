from fastapi import FastAPI, Depends, Query
from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from sqlalchemy.orm import Session
from .models import Base, engine, SessionLocal
from .schemas import Expense
from .crud import get_expenses, create_expense
from datetime import datetime

app = FastAPI()

# 設置 CORS 中間件
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    # 如果有其他的前端域名，也需要加進來
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/expenses", response_model=List[Expense])
def read_expenses(title: Optional[str] = None,
                  start_date: Optional[datetime] = Query(None),
                  end_date: Optional[datetime] = Query(None),
                  db: Session = Depends(get_db)):
    return get_expenses(db, title, start_date, end_date)

@app.post("/expenses", response_model=Expense)
def add_expense(expense: Expense, db: Session = Depends(get_db)):
    return create_expense(db, expense)