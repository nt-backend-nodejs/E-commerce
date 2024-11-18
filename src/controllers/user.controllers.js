import { logger } from "../utils/index.js";
import {
  getAllUsersService,
  getOneUserByIdService,
  registerService,
  loginService,
  updateUserService,
  deleteUserService,
} from "../services/index.js";

export async function getAllUsersCon(req, res, next) {
  try {
    const allUsers = await getAllUsersService();

    res.send(allUsers);
  } catch (error) { 
    logger.error(error);
    next(error);
  }
}

export async function getOneUserByIdCon(req, res, next) {
  try {
    const id = req.params.id;

    const user = await getOneUserByIdService(id);

    if (user instanceof String || typeof user === "string")
      return res.status(404).send(user);

    res.send(user);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function registerCon(req, res, next) {
  try {
    const user = req.body;

    const data = await registerService({
      name: user?.name,
      email: user?.email,
      password: user?.password,
      role: user?.role,
      avatar: user?.avatar,
      username: user?.username,
      birth_of_date: user?.birth_of_date,
      phone_number: user?.phone_number,
    });

    if (data instanceof String || typeof data === "string") {
      if (data.includes("exists!")) return res.status(409).send(data);
      return res.status(404).send(data);
    }

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function loginCon(req, res, next) {
  try {
    const userData = {
      email: req.body?.email,
      username: req.body?.username,
    };

    const result = await loginService(userData);

    if (result instanceof String || typeof result === "string")
      return res.status(404).send(result);

    res.send(result);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function updateUserCon(req, res, next) {
  try {
    const userData = req.body;

    const data = await updateUserService(req.params?.id, {
      name: userData?.name,
      email: userData?.email,
      password: userData?.password,
      role: userData?.role,
      avatar: userData?.avatar,
      username: userData?.username,
      birth_of_date: userData?.birth_of_date,
      phone_number: userData?.phone_number,
    });

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function deleteUserCon(req, res, next) {
  try {
    const data = await deleteUserService(req.params?.id);

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
