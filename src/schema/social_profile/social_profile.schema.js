import { logger } from "../../utils/logger.js";
import pool from "../../database/index.js";

export const createSocProfilesTable = async () => {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS social_profiles(
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id),
                platform VARCHAR,
                platform_user VARCHAR
            )
        `);
  } catch (error) {
    logger.error(error);
  }
};
