import { useContext, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './components/Dashboard'
import Review from './pages/Review'
import { AuthContext } from './context/AuthContext'

function App() {
  const {user}=useContext(AuthContext)
  
  return (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    {user && <Route path='/dashboard' element={<Dashboard />} />}
    {user && <Route path='/review' element={<Review />} />}
  </Routes>
  )
}

export default App
