import { addressesSchema } from '../validation/index.js'
export const validationAddress = (req, res, next) => {
    try {
        const { error } = addressesSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        next()
    } catch (error) {
        next(error)
    }
}
