# HW5 Frontend

This is a minimal React + Redux frontend for the FastAPI + MySQL backend from Part I.

Requirements:
- Node 18+ and npm
- Python 3.9+ (only if you use the optional local FastAPI dev backend)
- Backend running at VITE_API_BASE (default http://localhost:8000)

Install and run:

```bash
# 1) Install deps
npm install

# 2) (Optional) Configure API base via Vite env
#    Copy .env.example to .env and edit VITE_API_BASE if your backend runs elsewhere
#    VITE_API_BASE=http://localhost:8000

# 3) Start the frontend (Vite)
npm run dev
```

Optional: start a local dev backend (FastAPI)

```bash
bash setup_backend.sh
```

Screens:
- Home: lists books, delete buttons
- Create: create a new book
- Update: enter ID, load from client state, update

Notes for submission:
- Capture one screenshot each for Home, Create, Update, Delete showing a relevant code snippet (thunk/slice) and the browser output together.
- Keep screenshots focused on the feature (avoid full files).
