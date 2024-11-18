import pool from "../database/index.js";
import { logger } from "../utils/index.js";

export const getAllProductsService = async () => {
  try {
    const allData = await pool.query("SELECT * FROM products");

    return allData.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getProductByIdService = async (id) => {
  try {
    const product = await pool.query("select * from products where id = $1", [
      id,
    ]);

    return product.rows[0] || "Not found!";
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createProductService = async (data) => {
  try {
    if (data.category_id) {
      const category = await pool.query(
        `select * from categories where id = $1`,
        [data?.category_id]
      );

      if (!category.rows[0]) return "Category not found!";
    }

    const queryString = `
        INSERT INTO products (
          category_id,
          title,
          picture,
          summary,
          description,
          price,
          discount_type,
          discount_value,
          tags
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9
        )

        RETURNING *
      `;

    const result = await pool.query(queryString, [
      data.category_id,
      data.title,
      data.picture,
      data.summary,
      data.description,
      data.price,
      data.discount_type,
      data.discount_value,
      data.tags,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const updateProductService = async (id, data) => {
  try {
    const oldProductData = await pool.query(
      "select * from products where id = $1",
      [id]
    );

    if (!oldProductData.rows[0]) return "Product not found!";

    if (data.category_id) {
      const category = await pool.query(
        `select * from categories where id = $1`,
        [data?.category_id]
      );

      if (!category.rows[0]) return "Category not found!";
    }

    const queryString = `
        UPDATE products
        SET category_id = $1,
          title = $2,
          picture = $3,
          summary = $4,
          description = $5,
          price = $6,
          discount_type = $7,
          discount_value = $8,
          tags = $9

        WHERE id = $10
  
        RETURNING *
      `;

    const result = await pool.query(queryString, [
      data.category_id || oldProductData.rows[0].category_id,
      data.title || oldProductData.rows[0].title,
      data.picture || oldProductData.rows[0].picture,
      data.summary || oldProductData.rows[0].summary,
      data.description || oldProductData.rows[0].description,
      data.price || oldProductData.rows[0].price,
      data.discount_type || oldProductData.rows[0].discount_type,
      data.discount_value || oldProductData.rows[0].discount_value,
      data.tags || oldProductData.rows[0].tags,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteProductService = async (id) => {
  try {
    const data = await pool.query("select * from products where id = $1", [id]);

    if (!data.rows[0]) return "Product not found!";

    const result = await pool.query(
      "delete from products where id = $1 returning *",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};
