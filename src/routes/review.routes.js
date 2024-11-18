import { Router } from 'express'
import {
    createReview,
    deleteReviewById,
    getReviewById,
    updateReviewById,
} from '../controllers/index.js'
import { validationReviews } from '../validation/review.validation.js'
import { authGuard, roleGuard } from '../middlewares/index.js'

export const reviewRouter = Router()

reviewRouter.post('/review', authGuard, validationReviews, createReview)
reviewRouter.get('/review/:id', authGuard, getReviewById)
reviewRouter.put('/review/:id', authGuard, validationReviews, updateReviewById)
reviewRouter.delete(
    '/review/:id',
    authGuard,
    roleGuard('admin'),
    deleteReviewById,
)
