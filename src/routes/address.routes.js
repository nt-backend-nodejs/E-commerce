import { Router } from 'express'
export const addressRouter = Router()
addressRouter.get('/')
addressRouter.get('/:id')
addressRouter.put('/:id')
