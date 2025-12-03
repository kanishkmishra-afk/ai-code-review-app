import mongoose from 'mongoose';

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB Database connected successfully");
    } catch (error) {
        console.log("MongoDB :: DataBase error ->  ",error);  
    }
}