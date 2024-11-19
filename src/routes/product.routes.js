import express from 'express'
import {
    createProducts,
    deleteProducts,
    getAllProducts,
    getByIdProducts,
    updateProducts,
} from '../controllers/index.js'
import { roleGuard } from '../middlewares/index.js'

export const productsRouter = express.Router()

productsRouter.get('/all', getAllProducts)
productsRouter.get('/all/:id', getByIdProducts)
productsRouter.post('/new', roleGuard('admin'), createProducts)
productsRouter.put('/update/:id', roleGuard('admin'), updateProducts)
productsRouter.delete('/delete/:id', roleGuard('admin'), deleteProducts)
