import pool from "../../database/index.js";
import { logger } from "../../utils/index.js";

export const createCategoryTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        description VARCHAR(1000),
        tag VARCHAR,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ
    )
    `);
  } catch (error) {
    logger.error(error);
  }
};
