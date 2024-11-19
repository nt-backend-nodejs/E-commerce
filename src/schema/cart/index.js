import pool from '../../databases/index.js'

export const creatCartTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS cart(
                id SERIAL PRIMARY KEY,
                user_id BIGINT,
                total REAL NOT NULL,
                created_at TIMESTAMP,
                updated_at TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `
        await pool.query(query)
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}
