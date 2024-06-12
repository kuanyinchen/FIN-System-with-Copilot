from sqlalchemy.orm import Session
from .models import Expense
from .schemas import Expense as ExpenseSchema
from datetime import datetime, timedelta

def get_expenses(db: Session, title: str = None, start_date: datetime = None, end_date: datetime = None):
    query = db.query(Expense)
    if title:
        query = query.filter(Expense.title.contains(title))
    if start_date and end_date:
        if (end_date - start_date).days > 30:
            raise ValueError('查詢日期範圍不能超過 30 天')
        query = query.filter(Expense.date.between(start_date, end_date))
    return query.all()

def create_expense(db: Session, expense: ExpenseSchema):
    db_expense = Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense