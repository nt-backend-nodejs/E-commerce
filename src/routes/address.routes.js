import { Router } from 'express'
import {
    createAddressController,
    deleteAddressByIdController,
    getAddressByIdController,
    getAllAddressesController,
    updateAddressByIdController,
} from '../controllers/index.js'
export const addressRouter = Router()
addressRouter.get('/all', getAllAddressesController)
addressRouter.get('/all/:id', getAddressByIdController)
addressRouter.put('/update/:id', updateAddressByIdController)
addressRouter.post('/create', createAddressController)
addressRouter.delete('/delete/:id', deleteAddressByIdController)
