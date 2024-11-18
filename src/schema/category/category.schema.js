import pool from '../../database/index.js'
import { logger } from '../../utils/logger.js'
export const createCategoryTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS category (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                description TEXT,
                tag VARCHAR,
                created_at TIMESTAMPTZ, 
                updated_at TIMESTAMPTZ 
            )`)
    } catch (error) {
        logger.error(error)
    }
}
