import pool from "../database/index.js";
import { logger } from "../utils/index.js";

export const getAllSocProfilesService = async () => {
  try {
    const allData = await pool.query("SELECT * FROM social_profiles");

    return allData.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getSocProfileByIdService = async (id) => {
  try {
    const socProfile = await pool.query(
      "select * from social_profiles where id = $1",
      [id]
    );

    if (!socProfile.rows[0]) return "Not found!";

    return socProfile.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createSocProfileService = async (data) => {
  try {
    if (data.user_id) {
      const user = await pool.query(`select * from users where id = $1`, [
        data?.user_id,
      ]);

      if (!user.rows[0]) return "User not found!";
    }

    const queryString = `
      INSERT INTO social_profiles (
        user_id,
        platform,
        platform_user
      )
      VALUES (
        $1,
        $2,
        $3
      )
      RETURNING *
    `;

    const result = await pool.query(queryString, [
      data.user_id,
      data.platform,
      data.platform_user,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const updateSocProfileService = async (id, data) => {
  try {
    const oldSocProfileData = await pool.query(
      "select * from social_profiles where id = $1",
      [id]
    );

    if (!oldSocProfileData.rows[0]) return "Profile not found!";

    if (data.user_id) {
      const user = await pool.query(`select * from users where id = $1`, [
        data?.user_id,
      ]);

      if (!user.rows[0]) return "User not found!";
    }

    const queryString = `
      UPDATE social_profiles
      SET user_id = $1,
        platform = $2,
        platform_user = $3

      WHERE id = $4

      RETURNING *
    `;

    const result = await pool.query(queryString, [
      data.user_id || oldSocProfileData.rows[0].user_id,
      data.platform || oldSocProfileData.rows[0].platform,
      data.platform_user || oldSocProfileData.rows[0].platform_user,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteSocProfileService = async (id) => {
  try {
    const data = await pool.query(
      "select * from social_profiles where id = $1",
      [id]
    );

    if (!data.rows[0]) return "Profile not found!";

    const result = await pool.query(
      "delete from social_profiles where id = $1 returning *",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};
