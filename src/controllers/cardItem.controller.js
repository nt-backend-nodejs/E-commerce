import {createCardItemService, getPCardItemSevice,getPCardItemSevice,updatePCardItemService,deleteCardItemService} from "../services/index.js"
export const getAllCardItem = async (req, res, next) => {
    try {
        const allCardItem = await getPCardItemSevice("all")
        return res.status(200).send({ status: 'Success', data: allCategory })
    } catch (error) {
        next(error)
    }
}

export const getByIdCardItem = async (req, res, next) => {
    try {
        const message = await getPCardItemSevice("id",req.params.id)
        if (message.status === 'NOTFOUND') {
            return res.status(404).send('Bunday Id li malumot topilmadi')
        }
        return res.status(200).send({ ststus: 'Success', data: message.data })
    } catch (error) {
        next(error)
    }
}

export const createCardItem = async (req, res, next) => {
    try {
        const { body } = req
        try {
            cardItemSchema.parse(body)
        } catch (validationError) {
            return res.status(400).send({
                status: 'validation_error',
                msg: 'Malumot notogri tartibda kiritilgan',
                errors: validationError.errors, 
            })
        }
        const data = await createCardItemService(body)
        return res.status(201).send({
            status: 'created',
            data,
        })
    } catch (error) {
        next(error)
    }
}


export const updateCardItem = async (req, res, next) => {
    try {
        const { id } = req.params
        const { body } = req 
        
        const updatedCardItem = await updatePCardItemService(body, id)
        return res.status(200).send({
            status: 'updated',
            data: updatedCardItem,
        })
    } catch (error) {
        next(error) 
    }
}

export const deleteCardItem = async (req, res, next) => {
    try {
        const { id } = req.params 
        const deletedCardItem = await deleteCardItemService(id)
        return res.status(200).send({
            status: 'deleted',
            data: deletedCardItem,
        })
    } catch (error) {
        next(error) 
    }
}
