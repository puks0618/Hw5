#!/bin/bash
set -e
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn
echo "Starting uvicorn..."
# Run uvicorn in background
.venv/bin/uvicorn backend_main:app --reload --host 127.0.0.1 --port 8000 &
PID=$!
echo "uvicorn started with PID $PID"
