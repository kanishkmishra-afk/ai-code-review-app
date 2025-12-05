import { useContext, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './components/Dashboard'
import Review from './pages/Review'
import { AuthContext } from './context/AuthContext'
import History from './pages/History'

function App() {
  const {user}=useContext(AuthContext)
  
  return (
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    {user && <Route path='/dashboard' element={<Dashboard />} />}
    {user && <Route path='/review' element={<Review />} />}
    {user && <Route path='/history' element={<History />} />}
  </Routes>
  )
}

export default App
