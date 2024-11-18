import application from "./app.js";
import db from "./db.js";
import jwt from "./jwt.js";

export const config = {
  ...db,
  ...application,
  ...jwt,
};
