import {
  getAllOrdersService,
  getOneOrderByIdService,
  createOrderService,
  updateOrderService,
  deleteOrderService,
} from "../service/index.js";

export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await getAllOrdersService("SELECT * FROM Orders");
    res.status(200).send({ status: "ok", data: allOrders });
  } catch (error) {
    next(error);
  }
};


export const getOneOrderById = async (req, res, next) => {
  try {
    const oneOrder = await getOneOrderByIdService(
      "SELECT * FROM Orders WHERE id = $1",
      req.params.id
    );
    res.status(200).send({ status: "ok", data: oneOrder });
  } catch (error) {
    next(error);
  }
};


export const createOrder = async (req, res, next) => {
  try {
    const createOrder = await createOrderService(
      "INSERT INTO Orders (user_id, cart_id, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *",
      req.body.user_id,
      req.body.cart_id,
      req.body.created_at,
      req.body.updated_at
    );
    res.status(201).send({ status: "Created", data: createOrder });
  } catch (error) {
    next(error);
  }
};


export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await updateOrderService(
      "UPDATE Orders SET user_id = $1, cart_id = $2, updated_at = $3 WHERE id = $4 RETURNING *",
      req.body.user_id,
      req.body.cart_id,
      req.body.updated_at,
      req.params.id
    );
    res.status(202).send({ status: "Updated", data: updatedOrder });
  } catch (error) {
    next(error);
  }
};


export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await deleteOrderService(
      "DELETE FROM Orders WHERE id = $1 RETURNING *",
      req.params.id
    );
    res.status(203).send({ status: "Deleted", data: deletedOrder });
  } catch (error) {
    next(error);
  }
};
