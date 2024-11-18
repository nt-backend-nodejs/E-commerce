import express from "express";
import { authGuard, productMiddleware } from "../middlewares/index.js";
import {
  validationCreateProductSchema,
  validationUpdateProductSchema,
} from "../validations/index.js";
import {
  createProductCon,
  deleteProductCon,
  getAllProductsCon,
  getOneProductByIdCon,
  updateProductCon,
} from "../controllers/index.js";

export const productRouter = express.Router();

productRouter.get("/", authGuard, getAllProductsCon);
productRouter.get("/:id", authGuard, getOneProductByIdCon);
productRouter.post(
  "/",
  authGuard,
  productMiddleware(validationCreateProductSchema),
  createProductCon
);
productRouter.put(
  "/:id",
  authGuard,
  productMiddleware(validationUpdateProductSchema),
  updateProductCon
);
productRouter.delete("/:id", authGuard, deleteProductCon);
