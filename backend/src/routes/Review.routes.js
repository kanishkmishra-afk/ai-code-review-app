import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { history, reviewCode, singleReview } from '../controllers/review.controller.js'

const reviewRoute = express.Router()

reviewRoute.post("/codeReview",isAuth,reviewCode)
reviewRoute.get("/history",isAuth,history)
reviewRoute.get("/history:id",isAuth,singleReview)

export default reviewRoute