import pool from "../database/index.js";
import { logger } from "../utils/index.js";

export const getAllCategoriesService = async () => {
  try {
    const allData = await pool.query("SELECT * FROM categories");

    return allData.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getCategoryByIdService = async (id) => {
  try {
    const category = await pool.query(
      "select * from categories where id = $1",
      [id]
    );

    return category.rows[0] || "Category not found!";
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createCategoryService = async (data) => {
  try {
    const queryString = `
        INSERT INTO categories (
          name,
          description,
          tag
        )
        VALUES (
          $1,
          $2,
          $3
        )

        RETURNING *
      `;

    const result = await pool.query(queryString, [
      data.name,
      data.description,
      data.tag,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const updateCategoryService = async (id, data) => {
  try {
    const oldCategoryData = await pool.query(
      "select * from categories where id = $1",
      [id]
    );

    if (!oldCategoryData.rows[0]) return "Category not found!";

    const queryString = `
        UPDATE categories
        SET name = $1,
          description = $2,
          tag = $3

        WHERE id = $4
  
        RETURNING *
      `;

    const result = await pool.query(queryString, [
      data.name || oldCategoryData.rows[0].name,
      data.description || oldCategoryData.rows[0].description,
      data.tag || oldCategoryData.rows[0].tag,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteCategoryService = async (id) => {
  try {
    const data = await pool.query("select * from categories where id = $1", [
      id,
    ]);

    if (!data.rows[0]) return "Category not found!";

    const result = await pool.query(
      "delete from categories where id = $1 returning *",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};
