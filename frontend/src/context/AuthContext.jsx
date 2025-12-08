import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const AuthContext= createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState("")
    const [token,setToken]=useState("")
    const navigate=useNavigate()


    const serverUrl="https://ai-code-review-app-3e4y.onrender.com/"

    const login = async(email,password)=>{
        try {
            const response= await axios.post(serverUrl+"api/auth/login",{email,password})
            if(response.data){
                setUser(response.data.user)
                setToken(response.data.token)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("user",JSON.stringify(response.data.user))
            }
            
        } catch (error) {
            console.log("login ERROR -> ",error);
            
        }
    }

    const logout=()=>{
        setUser({})
        setToken("")
        localStorage.removeItem("token")
    }   

    const checkAuth=()=>{
        const savedUser=localStorage.getItem("user")
        if(savedUser){
            setUser(savedUser)
            navigate('/review')
        }

    }
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem("user")))
        setToken(localStorage.getItem("token"))
        checkAuth()
    },[setUser,setToken])

    const value={
        setUser,
        setToken,
        token,
        user,
        login,
        logout,
        serverUrl
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}