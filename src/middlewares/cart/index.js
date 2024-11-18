import { cartSchema } from '../../validators/index.js'

export const validateCart = (req, res, next) => {
    const cart = req.body
    const { error } = cartSchema.validate(cart)

    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    next()
}
