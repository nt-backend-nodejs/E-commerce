import { Router } from 'express'
import {
    createReview,
    deleteReviewById,
    getReviewById,
    getReviews,
    updateReviewById,
} from '../controllers/index.js'
import { validationReviews } from '../middlewares/index.js'
import { authGuard, roleGuard } from '../middlewares/index.js'

export const reviewRouter = Router()
reviewRouter.get('/review', authGuard, getReviews)
reviewRouter.post('/review', authGuard, validationReviews, createReview)
reviewRouter.get('/review/:id', authGuard, getReviewById)
reviewRouter.put('/review/:id', authGuard, validationReviews, updateReviewById)
reviewRouter.delete(
    '/review/:id',
    authGuard,
    roleGuard('admin'),
    deleteReviewById,
)