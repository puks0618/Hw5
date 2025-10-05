from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Allow the Vite dev server origin so the browser can call the API during development
app.add_middleware(
    CORSMiddleware,
    # Allow any localhost/127.0.0.1 port (Vite may pick a different port if 5173 is busy)
    allow_origins=[],
    allow_origin_regex=r"^http://(localhost|127\.0\.0\.1):\d+$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Simple request logger middleware to help debug method/path issues (e.g. 405)
@app.middleware("http")
async def log_requests(request, call_next):
    method = request.method
    path = request.url.path
    print(f"--> {method} {path}")
    response = await call_next(request)
    print(f"<-- {method} {path} {response.status_code}")
    return response

class Book(BaseModel):
    id: Optional[int] = None
    title: str
    author: str
    year: int

# in-memory store
_books: List[Book] = []
_next_id = 1

@app.get('/books', response_model=List[Book])
def list_books():
    return _books

@app.post('/books', response_model=Book)
def create_book(book: Book):
    global _next_id
    book.id = _next_id
    _next_id += 1
    _books.append(book)
    return book

@app.put('/books/{id}', response_model=Book)
def update_book(id: int, book: Book):
    for i, b in enumerate(_books):
        if b.id == id:
            updated = book.copy()
            updated.id = id
            _books[i] = updated
            return updated
    raise HTTPException(status_code=404, detail='Book not found')

@app.delete('/books/{id}')
def delete_book(id: int):
    global _books
    _books = [b for b in _books if b.id != id]
    return {'ok': True}
