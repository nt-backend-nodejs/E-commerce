import { productsSchema } from '../../validators/index.js'

export const validateProduct = (req, res, next) => {
    const product = req.body
    const { error } = productsSchema.validate(product)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}
