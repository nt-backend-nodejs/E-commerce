import pool from '../databases/index.js'

export const getAllCartService = async () => {
    try {
        const allData = await pool.query(`SELECT * FROM cart`)
        return allData.rows
    } catch (error) {
        throw error
    }
}

export const getByIdCartService = async (id) => {
    try {
        const cart = await pool.query(`SELECT * FROM cart WHERE id = $1`, [id])
        if (cart.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        return { data: cart.rows[0] }
    } catch (error) {
        throw error
    }
}
export const createCartService = async (data) => {
    try {
        await pool.query(
            `
            INSERT INTO cart(user_id , total) 
            VALUES($1,$2)`,
            [data.user_id, data.total],
        )
        return { status: 'CREATED' }
    } catch (error) {
        throw error
    }
}

export const updateCartService = async (id, data) => {
    try {
        const { user_id, total } = data
        const currentUser = await pool.query(
            `SELECT * FROM cart  WHERE id = $1`,
            [id],
        )
        if (currentUser.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        await pool.query(
            `
            UPDATE cart SET user_id = $1, total = $2 WHERE id= $3 RETURNING id
            `,
            [
                user_id || currentUser.rows[0].user_id,
                total || currentUser.rows[0].total,
                id,
            ],
        )
        return { status: 'OK', id: id }
    } catch (error) {
        throw error
    }
}

export const deleteCartService = async (id) => {
    try {
        const currentUser = await pool.query(
            `SELECT * FROM cart WHERE id = $1`,
            [id],
        )
        if (currentUser.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        await pool.query(`DELETE FROM cart WHERE id = $1`, [id])
        return { status: 'OK', id: id }
    } catch (error) {
        throw error
    }
}
