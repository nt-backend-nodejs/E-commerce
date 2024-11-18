import express from "express";
import { addressMiddleware, authGuard } from "../middlewares/index.js";
import {
  validationCreateAddressSchema,
  validationUpdateAddressSchema,
} from "../validations/index.js";
import {
  getAllAddressesCon,
  getOneAddressByIdCon,
  createAddressCon,
  updateAddressCon,
  deleteAddressCon,
} from "../controllers/index.js";

export const addressRouter = express.Router();

addressRouter.get("/", authGuard, getAllAddressesCon);
addressRouter.get("/:id", authGuard, getOneAddressByIdCon);
addressRouter.post(
  "/",
  authGuard,
  addressMiddleware(validationCreateAddressSchema),
  createAddressCon
);
addressRouter.put(
  "/:id",
  authGuard,
  addressMiddleware(validationUpdateAddressSchema),
  updateAddressCon
);
addressRouter.delete("/:id", authGuard, deleteAddressCon);
