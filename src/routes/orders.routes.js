import {Router} from "express";
import {
  getAllOrders,
  getOneOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controller/index.js";

 export const ordersRouter = express.Router();


ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:id", getOneOrderById);
ordersRouter.post("/", createOrder);
ordersRouter.put("/:id", updateOrder);
ordersRouter.delete("/:id", deleteOrder);

