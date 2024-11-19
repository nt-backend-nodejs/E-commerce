import { ForbiddenError } from '../../utils/index.js'

export const roleGuard = (...roles) => {
    return async (req, res, next) => {
        try {
            const { role, sub } = req.user
            if (!roles.includes(role) || sub !== req.params.id) {
                throw new ForbiddenError('access deny!')
            }
            next()
        } catch (e) {
            next(e)
        }
    }
}
