import pool from "../database/index.js";
import { generateToken, logger, hashPassword } from "../utils/index.js";

export const getAllUsersService = async () => {
  try {
    const allData = await pool.query("SELECT * FROM users");

    return allData.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getOneUserByIdService = async (id) => {
  try {
    const user = await pool.query("select * from users where id = $1", [id]);

    if (!user.rows[0]) return "User not found!";

    return user.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const registerService = async (user) => {
  try {
    const dataEmail = await pool.query("select * from users where email = $1", [
      user.email,
    ]);

    const dataUsername = await pool.query(
      "select * from users where username = $1",
      [user.username]
    );

    const dataPhone_number = await pool.query(
      "select * from users where phone_number = $1",
      [user.phone_number]
    );

    if (dataEmail.rows[0] || dataUsername.rows[0] || dataPhone_number.rows[0]) {
      return "Already exists!";
    }

    const queryString = `
      INSERT INTO users (
        name,
        email,
        password,
        avatar,
        username,
        birth_of_date,
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

    const hashedPassword = await hashPassword(user.password);
    const result = await pool.query(queryString, [
      user.name,
      user.email,
      hashedPassword,
      user.avatar,
      user.username,
      user.birth_of_date,
      user.phone_number,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const loginService = async (data) => {
  try {
    const user = await pool.query("select * from users where email = $1", [
      data.email,
    ]);

    if (!user.rows[0]) return "User not found!";

    const accessToken = await generateToken("access", data);
    const refreshToken = await generateToken("refresh", data);

    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const updateUserService = async (id, data) => {
  try {
    const oldUserData = await pool.query(`select * from users where id = $1`, [
      id,
    ]);

    if (!oldUserData.rows[0]) return "User not found!";

    const queryString = `
      UPDATE users
      SET name = $1,
        email = $2,
        password = $3,
        role = $4,
        avatar = $5,
        username = $6,
        birth_of_date = $7,
        phone_number = $8
      WHERE id = $9

      RETURNING *
    `;

    var hashedPassword = oldUserData.rows[0].password;

    if (data.password) {
      var hashedPassword = await hashPassword(data.password);
    }

    const result = await pool.query(queryString, [
      data.name || oldUserData.rows[0].name,
      data.email || oldUserData.rows[0].email,
      hashedPassword,
      data.role || oldUserData.rows[0].role,
      data.avatar || oldUserData.rows[0].avatar,
      data.username || oldUserData.rows[0].username,
      data.birth_of_date || oldUserData.rows[0].birth_of_date,
      data.phone_number || oldUserData.rows[0].phone_number,
      id,
    ]);

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const deleteUserService = async (id) => {
  try {
    const data = await pool.query("select * from users where id = $1", [id]);

    if (!data.rows[0]) return "User not found!";

    const result = await pool.query(
      "delete from users where id = $1 returning *",
      [id]
    );

    return result.rows[0];
  } catch (error) {
    logger.error(error);
    return error;
  }
};
