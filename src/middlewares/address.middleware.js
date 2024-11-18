import { logger } from "../utils/index.js";

export const addressMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      schema.validate(req.body);
      next();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
};
