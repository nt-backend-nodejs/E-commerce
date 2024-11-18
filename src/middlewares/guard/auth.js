import { AuthenticationError, verifyToken } from '../../utils/index.js'

export const authGuard = async (req, res, next) => {
    try {
        const token = req.headers['authorization']

        if (!token || !token.startsWith('Bearer')) {
            throw new AuthenticationError('Token or auth type not valid')
        }

        const payload = await verifyToken('access', token.split(' ')[1])

        if (!payload.success) {
            throw new AuthenticationError('Token is  expired')
        }

        req.user = payload
        next()
    } catch (e) {
        next(e)
    }
}
