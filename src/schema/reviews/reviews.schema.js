import { logger } from '../../utils/logger.js'
import pool from '../../databases/index.js'

export const createReviewsTable = async () => {
    try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            raiting int,
            comment text,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
          )
        `)
    } catch (error) {
        logger.error(error)
    }
}
