import mongoose from 'mongoose';

const codeReviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    langauge:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, { timestamps: true });

export const CodeReview = mongoose.model('CodeReview', codeReviewSchema);