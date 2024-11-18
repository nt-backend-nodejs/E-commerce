import { logger } from "../utils/index.js";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../services/index.js";

export async function getAllCategoriesCon(req, res, next) {
  try {
    const allCategories = await getAllCategoriesService();

    res.send(allCategories);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function getOneCategoryByIdCon(req, res, next) {
  try {
    const id = req.params.id;

    const category = await getCategoryByIdService(id);

    if (category instanceof String || typeof category === "string")
      return res.status(404).send(category);

    res.send(category);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function createCategoryCon(req, res, next) {
  try {
    const categoryData = req.body;

    const data = await createCategoryService({
      name: categoryData.name,
      description: categoryData.description,
      tag: categoryData.tag,
    });

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function updateCategoryCon(req, res, next) {
  try {
    const categoryData = req.body;

    const data = await updateCategoryService(req.params?.id, {
      name: categoryData.name,
      description: categoryData.description,
      tag: categoryData.tag,
    });

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function deleteCategoryCon(req, res, next) {
  try {
    const data = await deleteCategoryService(req.params?.id);

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
