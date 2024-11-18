import { isvalidToken, logger } from "../utils/index.js";

export const authGuard = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(409).send("token not found");
    }

    const [type, token] = req.headers.authorization?.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(409).send("Not valid data");
    }

    if (!isvalidToken("access", token)) {
      throw new Error("No valid data!");
    }

    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
