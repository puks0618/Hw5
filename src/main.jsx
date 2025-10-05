import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import store from './store'
import Home from './screens/Home'
import Create from './screens/Create'
import Update from './screens/Update'
import './styles.css'

function App(){
  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/update">Update</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/update" element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

createRoot(document.getElementById('root')).render(<App />)
