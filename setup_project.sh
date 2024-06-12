#!/bin/bash

# 建立主要資料夾
mkdir -p expense-system/backend/app
mkdir -p expense-system/frontend/public
mkdir -p expense-system/frontend/src/components

# 建立 backend 相關檔案
touch expense-system/backend/app/__init__.py
touch expense-system/backend/app/main.py
touch expense-system/backend/app/models.py
touch expense-system/backend/app/schemas.py
touch expense-system/backend/app/crud.py
touch expense-system/backend/Dockerfile
touch expense-system/backend/requirements.txt

# 建立 frontend 相關檔案
touch expense-system/frontend/src/App.js
touch expense-system/frontend/src/index.js
touch expense-system/frontend/Dockerfile
touch expense-system/frontend/package.json

# 建立 docker-compose 檔案
touch expense-system/docker-compose.yml

echo "資料夾結構已建立完畢"