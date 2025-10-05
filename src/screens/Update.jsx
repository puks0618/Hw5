import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBook } from '../features/books/booksSlice'
import { useNavigate } from 'react-router-dom'

export default function Update(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector(s => s.books)
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  const load = () => {
    if (!id || Number.isNaN(Number(id))) {
      alert('Please enter a valid numeric ID before loading')
      return
    }
    const b = items.find(x => String(x.id) === String(id))
    if (!b) return alert('Book not found in current state. Ensure you loaded Home first or refresh.')
    setTitle(b.title); setAuthor(b.author); setYear(b.year)
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!id || Number.isNaN(Number(id))) {
      alert('Please enter a valid numeric ID')
      return
    }
    try {
      await dispatch(updateBook({ id: Number(id), title, author, year: Number(year) })).unwrap()
      navigate('/')
    } catch (err) {
      alert(`Update failed: ${err?.message || JSON.stringify(err)}`)
    }
  }

  return (
    <div className="container">
      <h1>Update Book</h1>
      <div className="form">
        <label>Book ID to edit<input type="number" value={id} onChange={e=>setId(e.target.value)} required /></label>
        <button className="btn" onClick={load}>Load</button>
      </div>

      <form onSubmit={submit} className="form">
        <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} required /></label>
        <label>Author<input value={author} onChange={e=>setAuthor(e.target.value)} required /></label>
        <label>Year<input type="number" value={year} onChange={e=>setYear(e.target.value)} required /></label>
        <div>
          <button className="btn">Update</button>
        </div>
      </form>
    </div>
  )
}
