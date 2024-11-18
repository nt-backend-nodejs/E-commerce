import pool from "../../database/index.js";
import { logger } from "../../utils/index.js";

export const createwhislistTable = async () => {
  try {

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        role USER_ROLE DEFAULT 'user',
        avatar VARCHAR,
        username VARCHAR UNIQUE NOT NULL,
        birth_of_date DATE,
        phone_number VARCHAR UNIQUE NOT NULL,
        is_active BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ 
      )
    `);
    logger.info('Table Yaratildi')
  } catch (error) {
    logger.error(error);
  }
};

