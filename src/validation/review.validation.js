import Joi from 'joi'

export const reviewSchema = Joi.object({
    user_id: Joi.number().required(),
    product_id: Joi.number().required(),
    raiting: Joi.number().required(),
    comment: Joi.string().min(5).max(100),
})
