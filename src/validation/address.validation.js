import Joi from 'joi'
export const addressesSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    title: Joi.string().min(5).required(),
    address_line_1: Joi.string().min(5).required(),
    address_line_2: Joi.string().min(5).optional(),
    country: Joi.string().min(5).required(),
    city: Joi.string().min(5).required(),
    postal_code: Joi.string().required(),
    phone_number: Joi.string().required(),
    landmark: Joi.string().optional(),
})
