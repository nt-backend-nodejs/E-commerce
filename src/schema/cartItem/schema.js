import pool from '../../database/index.js'
import { logger } from '../../utils/logger.js'

export const createCardItemsTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS card_items (
                id SERIAL PRIMARY KEY,
                card_id INT NOT NULL REFERENCES card(id),
                product_id INT NOT NULL REFERENCES product(id),
                quantity INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
        )`)
    } catch (error) {
        logger.error(error)
    }
}
