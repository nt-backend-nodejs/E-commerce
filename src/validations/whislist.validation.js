import Joi from "joi";

export const checkwhislistSchema=Joi.object({
    id:Joi.number().integer().min(1),
    user_id:Joi.number().integer().min(1).required(),
    product_id:Joi.number().integer().min(1).required()
})