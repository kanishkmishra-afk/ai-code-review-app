import React, { useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [userDetails, setUserDetails] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate=useNavigate()

    const {serverUrl,setUser,setToken,user}=useContext(AuthContext)
    const setUsers=(e)=>{
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(userDetails);
        try {
            const response= await axios.post(serverUrl+"api/auth/signup",{userName:userDetails.username,email:userDetails.email,password:userDetails.password})
            if(response.data){
                setUser(response.data.user)
                setToken(response.data.token)
                localStorage.setItem("token",response.data.token)
            }
            
            navigate('/dashboard')
            
        } catch (error) {
            console.log("handle Submit Error in sigup -> ",error);
            
        }
        
    }
    console.log(user);
 return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Enter Username..."
            required
            onChange={setUsers}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email..."
            required
            onChange={setUsers}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password..."
            required
            onChange={setUsers}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup
