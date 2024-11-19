import Joi from 'joi'

export const cartSchema = (data) => {
    const schema = Joi.object({
        user_id: Joi.number().required().messages({
            'number.base': 'User idsi raqam bolishi kerak',
            'any.required': 'User idsi majburiy',
        }),
        total: Joi.number().required().messages({
            'number.base': 'Total raqam bolishi kerak',
            'any.required': 'Total majburiy',
        }),
    })
    return schema.validate(data)
}
