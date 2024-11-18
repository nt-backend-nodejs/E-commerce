import express from "express";
import { authGuard, socProfileMiddleware } from "../middlewares/index.js";
import {
  validationCreateSocProfileSchema,
  validationUpdateSocProfileSchema,
} from "../validations/index.js";
import {
  getAllSocProfilesCon,
  getOneSocProfileByIdCon,
  createSocProfileCon,
  updateSocProfileCon,
  deleteSocProfileCon,
} from "../controllers/index.js";

export const social_ProfileRouter = express.Router();

social_ProfileRouter.get("/", authGuard, getAllSocProfilesCon);
social_ProfileRouter.get("/:id", authGuard, getOneSocProfileByIdCon);
social_ProfileRouter.post(
  "/",
  authGuard,
  socProfileMiddleware(validationCreateSocProfileSchema),
  createSocProfileCon
);
social_ProfileRouter.put(
  "/:id",
  authGuard,
  socProfileMiddleware(validationUpdateSocProfileSchema),
  updateSocProfileCon
);
social_ProfileRouter.delete("/:id", authGuard, deleteSocProfileCon);
