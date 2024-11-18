import pool from "../database/index.js";

export const getAllSocialFilesService = async (query) => {
  try {
    const allData = await pool.query(query);
    return allData.rows;
  } catch (error) {
    throw error;
  }
};

export const getOneSocialFilesByIdService = async (query, id) => {
  try {
    const oneData = await pool.query(query, [id]);
    return oneData.rows;
  } catch (error) {
    throw error;
  }
};

export const createSocialFilesService = async (query, data) => {
  try {
    const { user_id, platform, platform_user } = data;
    const createData = await pool.query(query, [
      user_id,
      platform,
      platform_user,
    ]);
    console.log(createData.rows);
    return createData.rows;
  } catch (error) {
    throw error;
  }
};

export const updateSocialFilesService = async (query, data, id) => {
  try {
    const { user_id, platform, platform_user } = data;
    const updateData = await pool.query(query, [
      user_id,
      platform,
      platform_user,
      id,
    ]);
    return updateData.rows;
  } catch (error) {
    throw error;
  }
};

export const deleteSocialFilesService = async (query, id) => {
  try {
    const oneData = await pool.query(query, [id]);
    return oneData.rows;
  } catch (error) {
    throw error;
  }
};
