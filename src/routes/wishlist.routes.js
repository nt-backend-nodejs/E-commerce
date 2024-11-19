import express from "express";
import {
  getAllwhishlist,
  getwhishlistByid,
  createWhishlist,
  updateWhishlist,
  deleteWhishlist,
} from "../controllers/index.js";
import {
  checkwhislistmiddleware,
  updatewhislistmiddleware,
} from "../middlewares/index.js";
import { checkwhislistSchema } from "../validations/index.js";

export const whishlistRouter = express.Router();

whishlistRouter.get("/", getAllwhishlist);
whishlistRouter.get("/:id", getwhishlistByid);
whishlistRouter.post(
  "/",
  checkwhislistmiddleware(checkwhislistSchema),
  createWhishlist
);
whishlistRouter.put(
  "/:id",
  updatewhislistmiddleware(checkwhislistSchema),
  updateWhishlist
);
whishlistRouter.delete("/:id", deleteWhishlist);
