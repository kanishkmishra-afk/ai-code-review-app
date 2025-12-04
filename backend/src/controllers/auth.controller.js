import { genToken } from "../config/token.js"
import { User } from "../models/User.js"

export const signup=async(req,res)=>{
    try {
        const {userName,email,password}=req.body
        if(!userName || !email || !password){
            return res.status(400).json({message:"all fields are required"})
        }

        const existedUser= await User.findOne({email})

        if(existedUser){
            return res.status(409).json({message:"user with email already exists"})
        }
        
        const user=await User.create({
            userName,
            email,
            password
        })
        if(!user){
            return res.status(500).json({message:"Something went wrong while registring a user"})
        }
        const token = await genToken(user._id)

        return res.status(201).json({message:"user created successfully", token, user})
    } catch (error) {
        console.log("sign up ERROR ->  ",error);
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email|| !password){
            return res.status(400).json({message:"all fields are required"})
        }
        const user=await User.findOne({email})

        if(!user){
             return res.status(404).json({message:"user does't exist"})
            }
            
         if(!(await user.comparePassword(password))){
            return res.status(401).json({message:"invalid user credintials"})  
        }
        const token = await genToken(user._id)
        const loggedInUser=await User.findById(user._id).select("-password")
        
        return res.status(200).json({message:"user logged in successfuilly", token, user: loggedInUser})  
        
    } catch (error) {
        console.log("login ERROR ->  ",error);
    }
}