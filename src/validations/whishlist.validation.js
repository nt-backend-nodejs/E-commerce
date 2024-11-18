import Joi from "joi";

export const createWishlistValidationSchema = Joi.object({
    user_id: Joi.number().min(1).required(),
    product_id: Joi.number().min(1).required()
})

export const updateWishlistValidationSchema = Joi.object({
    user_id: Joi.number().min(1),
    product_id: Joi.number().min(1)
})
