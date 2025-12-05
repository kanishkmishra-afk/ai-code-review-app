import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'

function Login() {
    const [userDetails, setUserDetails] = React.useState({
        email: "",
        password: ""
    });
    const {serverUrl,setUser,setToken,login,user}=useContext(AuthContext)
    const navigate=useNavigate()
    const setUsers=(e)=>{
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          await login(userDetails.email,userDetails.password)
          
          navigate('/review')
        } catch (error) {
          console.log("handle Submit error in login -> ",error);
          
        }
      }
      // console.log(user);
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          
            <button className="text-blue-600 hover:underline" onClick={()=>navigate("/signup")}>Signup</button>
          
        </p>
      </div>
    </div>
  )
}

export default Login
