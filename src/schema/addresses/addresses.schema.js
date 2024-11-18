import pool from '../../databases/index.js'
import { logger } from '../../utils/index.js'
export const createAddressTable = async () => {
    try {
        await pool.query(
            `CREATE TABLE IF NOT EXISTS addresses(
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                address_line_1 VARCHAR,
                address_line_2 VARCHAR,
                country VARCHAR,
                city VARCHAR,
                postal_code VARCHAR,
                phone_number VARCHAR NOT NULL,
                landmark VARCHAR,
                CONSTRAINT fk_users
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`,
        )
    } catch (error) {
        logger(error)
    }
}
