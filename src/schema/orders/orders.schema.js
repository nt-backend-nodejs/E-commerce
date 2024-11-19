import { logger } from "../../utils/logger.js";
import pool from "../../database/index.js";

export const createOrdersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        cart_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.info("Orders table successfully created.");
  } catch (error) {
    logger.error("Error creating orders table: ", error);
  }
};
