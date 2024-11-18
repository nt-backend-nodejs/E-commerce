import { Router } from "express";
import {
  getAllSocialFiles,
  getOneSocialFilesById,
  createSocialFiles,
  updateSocialFiles,
  deleteSocialFiles,
} from "../controller/index.js";

export const socialFilesRouter = Router();

socialFilesRouter.get("/all", getAllSocialFiles);
socialFilesRouter.get("/all/:id", getOneSocialFilesById);
socialFilesRouter.post("/new", createSocialFiles);
socialFilesRouter.put("/update/:id", updateSocialFiles);
socialFilesRouter.delete("/delete/:id", deleteSocialFiles);
