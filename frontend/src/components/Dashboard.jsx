import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const {serverUrl,token}=useContext(AuthContext)
console.log(token);
const navigate=useNavigate()

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
