from pydantic import BaseModel, Field, validator
from datetime import datetime, timedelta

class Expense(BaseModel):
    title: str
    amount: float = Field(..., gt=0)
    date: datetime
    category: str

    @validator('category')
    def check_category(cls, v):
        if v not in ['食', '衣', '住', '行']:
            raise ValueError('分類只能是 [食、衣、住、行]')
        return v

    @validator('date')
    def check_date(cls, v):
        if v < datetime.now() - timedelta(days=365):
            raise ValueError('發生日不能晚於 1 年前')
        return v

    class Config:
        orm_mode = True