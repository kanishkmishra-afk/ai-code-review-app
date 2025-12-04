import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({children}) {

    const {token}=useContext(AuthContext)
    const navigate=useNavigate()

    if(!token){
        navigate('/login')
    }

    return children
}

export default ProtectedRoute
