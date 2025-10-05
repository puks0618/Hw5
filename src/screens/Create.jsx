import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBook } from '../features/books/booksSlice'
import { useNavigate } from 'react-router-dom'

export default function Create(){
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(createBook({ title, author, year: Number(year) })).unwrap()
      navigate('/')
    } catch (err) {
      alert(`Create failed: ${err?.message || JSON.stringify(err)}`)
    }
  }

  return (
    <div className="container">
      <h1>Create Book</h1>
      <form onSubmit={submit} className="form">
        <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} required /></label>
        <label>Author<input value={author} onChange={e=>setAuthor(e.target.value)} required /></label>
        <label>Year<input type="number" value={year} onChange={e=>setYear(e.target.value)} required /></label>
        <div>
          <button className="btn">Create</button>
        </div>
      </form>
    </div>
  )
}
