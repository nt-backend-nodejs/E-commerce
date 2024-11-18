import { logger } from "../utils/logger.js";
import pool from "../database/index.js";

export const getAllAddressesService = async () => {
  try {
    const allData = await pool.query("SELECT * FROM addresses");

    return allData.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getAddressByIdService = async (id) => {
  try {
    const address = await pool.query("select * from addresses where id = $1", [
      id,
    ]);

    if (!address) return "Address not found!";

    return address.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createAddressService = async (address) => {
  try {
    if (address.user_id) {
      const user = await pool.query(`select * from users where id = $1`, [
        address?.user_id,
      ]);

      if (!user.rows[0]) return "User not found!";
    }

    const queryString = `
      INSERT INTO addresses (
        user_id,
        title,
        address_line,
        country,
        city,
        postal_code,
        phone_number
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7
      )

      RETURNING *
    `;

    const result = await pool.query(queryString, [
      address.user_id,
      address.title,
      address.address_line,
      address.country,
      address.city,
      address.postal_code,
      address.phone_number,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const updateAddressService = async (id, data) => {
  try {
    const oldaddressData = await pool.query(
      "select * from addresses where id = $1",
      [id]
    );

    if (!oldaddressData.rows[0]) return "Address not found!";

    if (data.user_id) {
      const user = await pool.query(`select * from users where id = $1`, [
        data?.user_id,
      ]);

      if (!user.rows[0]) return "User not found!";
    }

    const queryString = `
      UPDATE addresses
      SET user_id = $1,
        title = $2,
        address_line = $3,
        country = $4,
        city = $5,
        postal_code = $6,
        phone_number = $7
      WHERE id = $8

      RETURNING *
    `;

    const result = await pool.query(queryString, [
      data.user_id || oldaddressData.rows[0].user_id,
      data.title || oldaddressData.rows[0].title,
      data.address_line || oldaddressData.rows[0].address_line,
      data.country || oldaddressData.rows[0].country,
      data.city || oldaddressData.rows[0].city,
      data.postal_code || oldaddressData.rows[0].postal_code,
      data.phone_number || oldaddressData.rows[0].phone_number,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteAddressService = async (id) => {
  try {
    const data = await pool.query("select * from addresses where id = $1", [
      id,
    ]);

    if (!data.rows[0]) return "Address not found!";

    const result = await pool.query(
      "delete from addresses where id = $1 returning *",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};
