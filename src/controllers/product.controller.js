import {
    getAllProductService,
    getByIdProductService,
    createProductService,
    updateProductService,
    deleteProductService,
} from '../services/index.js'
import { productsSchema } from '../validators/index.js'
export const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await getAllProductService()
        return res.status(200).send({ status: 'Succcess', data: allProducts })
    } catch (error) {
        next(error)
    }
}

export const getByIdProducts = async (req, res, next) => {
    try {
        const message = await getByIdProductService(req.params.id)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send('Bunday Id li malumot topilmadi')
        }
        return res.status(200).send({ ststus: message.data })
    } catch (error) {
        next(error)
    }
}

export const createProducts = async (req, res, next) => {
    try {
        const { error, value } = productsSchema(req.body)
        if (error) {
            return res.status(400).send({
                status: error.message,
                msg: 'malumot notogri tartipda kiritilgan',
            })
        }
        const data = await createProductService(req.body)
        return res.status(201).send({ ststus: 'created', data })
    } catch (error) {
        next(error)
    }
}

export const updateProducts = async (req, res, next) => {
    try {
        const message = await updateProductService(req.params.id, req.body)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send('Bunday Id li malumot topilmadi')
        }
        return res.status(200).send({ ststus: 'Success', id: req.params.id })
    } catch (error) {
        next(error)
    }
}

export const deleteProducts = async (req, res, next) => {
    try {
        const message = await deleteProductService(req.params.id)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send('Bunday Id li malumot topilmadi')
        }
        return res.status(200).send({ ststus: 'Success', id: message.data })
    } catch (error) {
        next(error)
    }
}
