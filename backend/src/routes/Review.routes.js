import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { reviewCode } from '../controllers/review.controller.js'

const reviewRoute = express.Router()

reviewRoute.post("/codeReview",isAuth,reviewCode)

export default reviewRoute