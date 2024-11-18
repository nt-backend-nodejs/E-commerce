import Joi from 'joi'

export const cartSchema = Joi.object({
    user_id: Joi.number().required().message({
        'number.base': 'User idsi raqam bolishi kerak',
        'any.required': 'User idsi majburiy',
    }),
    total: Joi.number().required().message({
        'number.base': 'Total raqam bolishi kerak',
        'any.required': 'Total majburiy',
    }),
})
