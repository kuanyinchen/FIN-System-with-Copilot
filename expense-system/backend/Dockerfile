FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# 設置工作目錄
WORKDIR /app

# 複製 requirements.txt 到工作目錄
COPY requirements.txt /app/

# 安裝依賴
RUN pip install -r requirements.txt

# 複製應用程式代碼到工作目錄
COPY ./app /app/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]