import { Router } from 'express'
import {
    createAddressController,
    deleteAddressByIdController,
    getAddressByIdController,
    getAllAddressesController,
    updateAddressByIdController,
} from '../controllers/index.js'
import {
    authGuard,
    roleGuard,
    validationAddress,
} from '../middlewares/index.js'
export const addressRouter = Router()
addressRouter.get('/all', authGuard, getAllAddressesController)
addressRouter.get('/all/:id', authGuard, getAddressByIdController)
addressRouter.post(
    '/create',
    authGuard,
    roleGuard('admin'),
    validationAddress,
    createAddressController,
)
addressRouter.put('/update/:id', authGuard, updateAddressByIdController)
addressRouter.delete(
    '/delete/:id',
    authGuard,
    roleGuard('admin', 'manager'),
    deleteAddressByIdController,
)
