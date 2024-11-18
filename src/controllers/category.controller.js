import { logger } from '../utils/logger.js'
import {
    createCategoryService,
    deleteCategoryService,
    getAllCategoryService,
    getByIdCategoryService,
    updateCategoryService,
} from '../service/index.js'
import { categoryValidation } from '../validation/index.js'

export const getAllCategory = async (req, res, next) => {
    try {
        const allCategory = await getAllCategoryService()
        return res.status(200).send({ status: 'Success', data: allCategory })
    } catch (error) {
        next(error)
    }
}

export const getByIdCategory = async (req, res, next) => {
    try {
        const message = await getByIdCategoryService(req.params.id)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send('Bunday Id li malumot topilmadi')
        }
        return res.status(200).send({ ststus: 'Success', data: message.data })
    } catch (error) {
        next(error)
    }
}

export const createCategory = async (req, res, next) => {
    try {
        const { error, value } = categoryValidation(req.body)
        if (error) {
            return res.status(400).send({
                status: error.message,
                msg: 'malumot notogri tartipda kiritilgan',
            })
        }
        const data = await createCategoryService(req.body)
        console.log(data)
        return res.status(201).send({ ststus: 'created', data })
    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const message = await updateCategoryService(req.params.id, req.body)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send('Bunday Id li malumot topilmadi')
        }
        return res.status(200).send({ ststus: 'Success', id: req.params.id })
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const message = await deleteCategoryService(req.params.id)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send('Bunday Id li malumot topilmadi')
        }
        return res.status(200).send({ ststus: 'Success', id: message.data })
    } catch (error) {
        next(error)
    }
}
