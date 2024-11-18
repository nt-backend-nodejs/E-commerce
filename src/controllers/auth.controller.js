import { logger } from '../utils/logger.js'
import { findUser, login, register } from '../services/index.js'

export const authController = {
    register: async function (req, res, next) {
        try {
            const currentUser = await register(req.body)

            res.send(currentUser)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    login: async function (req, res, next) {
        try {
            const currentUser = await login(req.body)

            res.send(currentUser)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
    profile: async function (req, res, next) {
        try {
            const { sub } = req.user
            const currentUser = await findUser('id', sub)

            const { password, ...data } = currentUser

            res.send(data)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    },
}
