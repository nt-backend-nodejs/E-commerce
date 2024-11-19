import pool from '../databases/index.js'

export const createReviewService = async (reviewData) => {
    try {
        const { user_id, product_id, raiting, comment } = reviewData
        const result = await pool.query(
            `INSERT INTO reviews (user_id, product_id, raiting, comment)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, product_id, raiting, comment],
        )
        if (!result.rows[0]) {
            throw new Error('Fail try again')
        }
        return { success: true, review: result.rows[0] }
    } catch (error) {
        return { success: false, error }
    }
}

export const getReviewsService = async () => {
    try {
        const result = await pool.query(`SELECT * FROM reviews`)
        if (!result.rows) {
            throw new Error('Review not found')
        }
        return { success: true, review: result.rows }
    } catch (error) {
        return { success: false, error }
    }
}
export const getReviewByIdService = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM reviews WHERE id = $1`, [
            id,
        ])
        if (!result.rows[0]) {
            throw new Error('Review not found')
        }
        return { success: true, review: result.rows[0] }
    } catch (error) {
        return { success: false, error }
    }
}

export const deleteReviewByIdService = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM reviews WHERE id = $1 RETURNING *`,
            [id],
        )
        if (!result.rows[0]) {
            throw new Error('Review not found')
        }
        return { success: true, review: result.rows[0] }
    } catch (error) {
        return { success: false, error }
    }
}

export const updateReviewByIdService = async (id, reviewData) => {
    try {
        const { raiting, comment } = reviewData
        const result = await pool.query(
            `UPDATE reviews SET raiting = $1, comment = $2, updated_at = CURRENT_TIMESTAMP
             WHERE id = $3 RETURNING *`,
            [raiting, comment, id],
        )
        if (!result.rows[0]) {
            throw new Error('Review not found')
        }
        return { success: true, review: result.rows[0] }
    } catch (error) {
        return { success: false, error }
    }
}
