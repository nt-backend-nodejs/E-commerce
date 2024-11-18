import pool from "../../database/index.js";
import { logger } from "../../utils/index.js";

export const createProductTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        category_id INT REFERENCES categories(id),
        title VARCHAR,
        picture VARCHAR,
        summary VARCHAR,
        description VARCHAR(1000),
        price REAL,
        discount_type VARCHAR,
        discount_value REAL,
        tags VARCHAR,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ
      )
    `);
  } catch (error) {
    logger.error(error);
  }
};
