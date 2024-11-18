import Joi from 'joi'

export const reviewSchema = Joi.object({
    user_id: Joi.number().required(),
    product_id: Joi.number().required(),
    raiting: Joi.number().required(),
    comment: Joi.string().min(5).max(100),
})

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
