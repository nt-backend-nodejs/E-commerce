import express from 'express'
import {
    getAllCart,
    getByIdCart,
    createCart,
    updateCart,
    deleteCart,
} from '../controllers/index.js'
import { roleGuard } from '../middlewares/index.js'

export const cardRouter = express.Router()

cardRouter.get('/all', getAllCart)
cardRouter.get('/all/:id', getByIdCart)
cardRouter.post('/new', roleGuard('admin'), createCart)
cardRouter.put('/update/:id', roleGuard('admin'), updateCart)
cardRouter.delete('/delete/:id', roleGuard('admin'), deleteCart)
