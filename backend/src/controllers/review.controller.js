import { CodeReview } from "../models/CodeReview.js"
import generateCodeReview from "../services/ai.service.js"

export const reviewCode=async(req,res)=>{
    try {
        const {code,langauge}=req.body
        if(!code || !langauge){
            return res.status(400).json({message:"all fields are required"})
        }
        
        const review = await generateCodeReview(code,langauge)

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