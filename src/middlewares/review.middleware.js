import { reviewSchema } from '../validation/review.validation.js'
export const validationReviews = (req, res, next) => {
    try {
        const { error } = reviewSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        next()
    } catch (error) {
        next(error)
    }
}
