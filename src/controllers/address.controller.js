import { logger } from '../utils/index.js'
import {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
} from '../services/index.js'
export async function getAllAddressesController(req, res, next) {
    try {
        logger.info(`Route: /api/v1/address METHOD: GET`)
        const addresses = await getAddresses()
        res.status(200).send({
            msg: 'OK',
            addresses: addresses,
        })
    } catch (error) {
        logger.info(
            `Route: /api/v1/address METHOD: GET,Error: ${error.message}`,
        )
        next(error)
    }
}
export async function getAddressByIdController(req, res, next) {
    try {
        logger.info(`Route: /api/v1/address/${req.params.id} METHOD: GET`)
        const addresses = await getAddressById(req.params.id)
        res.status(200).send({
            msg: 'OK',
            addresses: addresses,
        })
    } catch (error) {
        logger.info(
            `Route: /api/v1/address/${req.params.id} METHOD: GET,Error: ${error.message}`,
        )
        next(error)
    }
}
export async function createAddressController(req, res, next) {
    try {
        const data = await createAddress(req.body)
        if (!data) {
            return res.send('NOT FOUND!!!')
        }
        res.status(200).send({
            msg: 'CREATED',
            data: data,
        })
    } catch (error) {
        next(error)
    }
}
export async function updateAddressByIdController(req, res, next) {
    try {
        logger.info(`Route: /api/v1/address/${req.params.id} METHOD: PUT`)
        const updatedAddr = await updateAddress(req.params.id, req.body)
        res.status(200).send({
            msg: 'UPDATED',
            updatedAddress: updatedAddr,
        })
    } catch (error) {
        logger.info(
            `Route: /api/v1/address/${req.params.id} METHOD: PUT,Error: ${error.message}`,
        )
        next(error)
    }
}
export async function deleteAddressByIdController(req, res, next) {
    try {
        const data = await deleteAddress(req.params.id)
        res.status(200).send({
            msg: 'DELETED',
            data: data,
        })
    } catch (error) {
        next(error)
    }
}
