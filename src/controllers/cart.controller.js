import { logger } from '../utils/logger.js'
import {
    getAllCartService,
    getByIdCartService,
    createCartService,
    updateCartService,
    deleteCartService,
} from '../services/index.js'
import { alidateCart } from '../middlewares/index.js'
export const gatAllCardItem = async (req, res, next) => {
    try {
        const allCardsItem = await getAllCartService()
        return res.status(200).send({ status: 'Success', data: allCardsItem })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const gatByIdCardItem = async (req, res, next) => {
    try {
        const message = await getByIdCartService(req.params.id)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send({ message: 'Malumot Tpilmadi' })
        }
        return res.status(200).send({ status: 'Success', data: message.data })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const createlCardItem = async (req, res, next) => {
    try {
        const { error, value } = alidateCart(req.body)
        if (error) {
            return res.status(400).send({
                status: error.message,
                msg: 'malumot notogri tartipda kiritilgan',
            })
        }
        const message = await createCartService(req.body)
        return res.status(200).send({ status: message.status })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateCardItem = async (req, res, next) => {
    try {
        const message = await updateCartService(req.params.id, req.body)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send({ message: 'Malumot Topilmadi' })
        }

        return res.status(200).send({ status: 'Success', id: message.id })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteCardItem = async (req, res, next) => {
    try {
        const message = await deleteCartService(req.params.id)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send({ message: 'Malumot Topilmadi' })
        }
        return res.status(200).send({ status: 'Success', id: message.id })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
