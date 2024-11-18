import { Router } from 'express'
import { authController } from '../controllers/index.js'
import { authGuard, roleGuard } from '../middlewares/index.js'

export const authRoutes = Router()

// const validator = (schema) => validateRequest(schema)

authRoutes.post('/register', authController.register)
authRoutes.post('/login', authController.login)
authRoutes.get(
    '/profile',
    authGuard,
    roleGuard('admin'),
    authController.profile,
)
