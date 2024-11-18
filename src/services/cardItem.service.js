import pool from '../databases/index.js'
import { AppError } from '../utils/appError.js'

export const getPCardItemSevice = async (type, data = '') => {
    try {
        let query = ''
        switch (type) {
            case 'all':
                query = `select * from card_items`
                break
            case 'id':
                query = `select * from card_items where id = $1`
                break
        }
        let allCardItem = ''
        if (type === 'all') {
            allCardItem = await pool.query(query)
            return allCardItem.rows
        }
        if (type !== 'all') {
            allCardItem = await pool.query(query, [data])
            return allCardItem.rows
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const createCardItemService = async (cardItem) => {
    try {
        const data = [
            cardItem.card_id || null,
            cardItem.product_id,
            cardItem.quantity,
        ]
        const query = `
            INSERT INTO card_items(
                card_id,
                product_id,
                quantity
                )
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `
        const newProducts = await pool.query(query, data)
        return newProducts.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const updatePCardItemService = async (cardItem, id) => {
    try {
        const oldCardItem = await getPCardItemSevice('id', id)
        if (oldCardItem.length === 0) {
            throw new AppError('card item not found', 404)
        }
        const data = [
            cardItem.card_id || oldCardItem.card_id,
            cardItem.product_id || oldCardItem.product_id,
            cardItem.quantity || oldCardItem.quantity,
            id,
        ]

        const query = `
            UPDATE card_items
            SET card_id = $1,
                product_id = $2,
                quantity = $3
            WHERE id = $4
            RETURNING *
        `
        const updateProducts = await pool.query(query, data)
        return updateProducts.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteCardItemService = async (id) => {
    try {
        const oldCardItem = await getPCardItemSevice('id', id)
        if (oldCardItem.length === 0) {
            throw new AppError('card item not found', 404)
        }
        const query = `
            DELETE FROM card_items WHERE id = $1
            RETURNING *
        `
        const deleteCartItem = await pool.query(query, [id])
        return deleteCartItem.rows
    } catch (error) {
        throw new Error(error)
    }
}
