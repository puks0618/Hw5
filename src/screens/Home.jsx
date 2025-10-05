import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks, deleteBook } from '../features/books/booksSlice'

export default function Home(){
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(s => s.books)

  useEffect(() => { dispatch(fetchBooks()) }, [dispatch])

  return (
    <div className="container">
      <h1>Books</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div className="error">
          <p><strong>Error:</strong> {error.message ?? JSON.stringify(error)}</p>
          {error.status && <p><strong>Status:</strong> {error.status}</p>}
          {error.data && <pre>{JSON.stringify(error.data, null, 2)}</pre>}
        </div>
      )}
      <ul className="list">
        {items.map(b => (
          <li key={b.id} className="item">
            <div>
              <strong>{b.title}</strong> — {b.author} ({b.year})
            </div>
            <div>
              <button onClick={() => { if (b?.id == null) return; dispatch(deleteBook(b.id)) }} className="btn delete">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
