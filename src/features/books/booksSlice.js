import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE = 'http://localhost:8000'

const makeErr = (err) => ({ message: err.message, status: err.response?.status ?? null, data: err.response?.data ?? null })

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_BASE}/books`)
    return res.data
  } catch (err) {
    return rejectWithValue(makeErr(err))
  }
})

export const createBook = createAsyncThunk('books/createBook', async (book, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_BASE}/books`, book)
    return res.data
  } catch (err) {
    return rejectWithValue(makeErr(err))
  }
})

export const updateBook = createAsyncThunk('books/updateBook', async ({ id, ...book }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_BASE}/books/${id}`, book)
    return res.data
  } catch (err) {
    return rejectWithValue(makeErr(err))
  }
})

export const deleteBook = createAsyncThunk('books/deleteBook', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE}/books/${id}`)
    return id
  } catch (err) {
    return rejectWithValue(makeErr(err))
  }
})

const booksSlice = createSlice({
  name: 'books',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchBooks.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchBooks.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(createBook.pending, (state) => { state.loading = true; state.error = null })
      .addCase(createBook.fulfilled, (state, action) => { state.loading = false; state.items.push(action.payload) })
      .addCase(createBook.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(updateBook.pending, (state) => { state.loading = true; state.error = null })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false
        const idx = state.items.findIndex(b => b.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(updateBook.rejected, (state, action) => { state.loading = false; state.error = action.payload })

      .addCase(deleteBook.pending, (state) => { state.loading = true; state.error = null })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false
        state.items = state.items.filter(b => b.id !== action.payload)
      })
      .addCase(deleteBook.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }
})

export default booksSlice.reducer
