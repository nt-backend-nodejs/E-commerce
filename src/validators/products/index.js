import Joi from 'joi'

export const productsSchema = (data) => {
    const schema = Joi.object({
        category_id: Joi.number().required().messages({
            'number.base': 'category_id raqam bolishi kerak',
            'any.required': 'category_id majburiy',
        }),
        title: Joi.string().required().messages({
            'string.base': 'title string bolishi kerak',
            'any.required': 'title majburiy',
        }),
        picture: Joi.string().uri().optional().messages({
            'string.uri': 'Rasm manzili togri formatda emas',
        }),
        summary: Joi.string().optional().messages({
            'string.base': 'Summary string korinishida bolishi kerak',
        }),
        description: Joi.string().optional().messages({
            'string.base': 'Descriptin string korinishida bolishi kerak',
        }),
        price: Joi.number().required().messages({
            'number.base': 'Narx number korinishida bolishi kerak',
            'any.required': 'Narx maydoni bosh bolmasligi kerak',
        }),
        discount_type: Joi.string().required().messages({
            'string.any': 'Chegirma turi string korinishida bolishi kerak',
            'any.requireed': 'Chegirma maydoni bosh bolmasligi kerak',
        }),
        discount_value: Joi.number().optional().messages({
            'number.base': 'Chegirma narxi number korinishida bolishi kerak',
        }),
        tags: Joi.string().optional(),
    })
    return schema.validate(data)
}
