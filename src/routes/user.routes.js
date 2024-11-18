import express from "express";
import { authGuard, userMiddleware } from "../middlewares/index.js";
import {
  validationLoginUserSchema,
  validationRegisterUserSchema,
  validationUpdateUserSchema,
} from "../validations/index.js";
import {
  getAllUsersCon,
  getOneUserByIdCon,
  registerCon,
  loginCon,
  updateUserCon,
  deleteUserCon,
} from "../controllers/index.js";

export const userRouter = express.Router();

userRouter.get("/", authGuard, getAllUsersCon);
userRouter.get("/:id", authGuard, getOneUserByIdCon);
userRouter.post(
  "/register",
  userMiddleware(validationRegisterUserSchema),
  registerCon
);
userRouter.post("/login", userMiddleware(validationLoginUserSchema), loginCon);
userRouter.put(
  "/:id",
  authGuard,
  userMiddleware(validationUpdateUserSchema),
  updateUserCon
);
userRouter.delete("/:id", authGuard, deleteUserCon);
