import jwt from "jsonwebtoken";
import { config } from "../../config/index.js";

const { sign, verify } = jwt;

export const generateToken = async (prop, payload) => {
  const option = config.jwt[prop];

  const token = sign(payload, option.secret, {
    expiresIn: option.expiresIn,
  });

  return token;
};

export const isvalidToken = async (prop, token) => {
  try {
    const option = config.jwt[prop];

    const result = verify(token, option.secret);

    return {
      ...result,
      success: true,
    };
  } catch (error) {
    if (error.message === "invalid token") {
      return {
        success: false,
      };
    }
  }
};
