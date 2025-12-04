import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import reviewRoute from './routes/Review.routes.js';
import authRoute from './routes/Auth.routes.js';


const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/review",reviewRoute)

const PORT=process.env.PORT || 3000
console.log(process.env.GEMINI_API_KEY);

connectDB()
app.listen(PORT,()=>{
    console.log(`server is listining on port ${PORT}`);
    
})