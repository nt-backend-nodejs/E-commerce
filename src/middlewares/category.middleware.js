import { logger } from "../utils/index.js";

export const categoryMiddleware = (schema) => {
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
