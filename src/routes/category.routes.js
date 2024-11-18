import express from "express";
import { authGuard, categoryMiddleware } from "../middlewares/index.js";
import { validationCategorySchema } from "../validations/index.js";
import {
  getAllCategoriesCon,
  getOneCategoryByIdCon,
  createCategoryCon,
  updateCategoryCon,
  deleteCategoryCon,
} from "../controllers/index.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", authGuard, getAllCategoriesCon);
categoryRouter.get("/:id", authGuard, getOneCategoryByIdCon);
categoryRouter.post(
  "/",
  authGuard,
  categoryMiddleware(validationCategorySchema),
  createCategoryCon
);
categoryRouter.put(
  "/:id",
  authGuard,
  categoryMiddleware(validationCategorySchema),
  updateCategoryCon
);
categoryRouter.delete("/:id", authGuard, deleteCategoryCon);
