import { CodeReview } from "../models/CodeReview.js"
import generateCodeReview from "../services/ai.service.js"

export const reviewCode=async(req,res)=>{
    try {
        const {code,langauge}=req.body
        if(!code){
            return res.status(400).json({message:"code fields are required"})
        }
        if(!langauge){
            return res.status(400).json({message:"langauge fields are required"})
        }
        
        const review = await generateCodeReview(code,langauge)
        const fallbackReview="The AI service is currently unavailable. Please try again later."
        if(!review){
            console.log("quota limit exceeded");
            
            return res.status(500).json({message:"LIMIT EXCEEDED. Please try again later.", review: fallbackReview})
        }
        const genReview = await CodeReview.create({
            review,
            code,
            langauge,
            user:req.userId
        })

        return res.status(201).json(genReview)

    } catch (error) {
        console.log("review code ERROR ->",error);
    }
}

export const history=async(req,res)=>{
    try {
        const userId=req.userId
        const reviews=await CodeReview.find({user:userId})
        if(!reviews){
            return res.status(400).json({message:"reviews not found"})
        }

        return res.status(200).json(reviews)
    } catch (error) {
        console.log("history ERROR -> ",error);
        
    }
}

export const singleReview=async(req,res)=>{
    try {
        const id=req.params

        const review=await CodeReview.find({_id:id})
         if(!review){
            return res.status(400).json({message:"review not found"})
        }

        return res.status(200).json(review)
    } catch (error) {
        console.log("single review ERROR -> ",error);
        
    }
}