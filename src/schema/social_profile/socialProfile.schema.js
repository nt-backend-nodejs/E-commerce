import { logger } from "../../utils/logger.js";
import pool from "../../database/index.js";

export const createSotialProfilesTable = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS Social_profiles (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                platform VARCHAR(100) NOT NULL,
                platform_user VARCHAR(100) NOT NULL
            );
        `);
  } catch (error) {
    logger.error(error);
  }
};
