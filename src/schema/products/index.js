import pool from '../../databases/index.js'
import { logger } from '../../utils/index.js'

export const createProducrsTable = async () => {
    try {
        const queryString = `
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                category_id BIGINT NOT NULL,
                title VARCHAR(255) NOT NULL,
                picture VARCHAR(255),
                summary VARCHAR(255),
                description VARCHAR(255),
                price REAL NOT NULL,
                discount_type VARCHAR(255),
                discount_values REAL,
                tags VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (category_id) REFERENCES catories(id) ON DELETE CASCADE   
            )
        `
        await pool.query(queryString)
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}
