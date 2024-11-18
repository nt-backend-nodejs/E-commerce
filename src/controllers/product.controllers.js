import { logger } from "../utils/index.js";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service.js";

export async function getAllProductsCon(req, res, next) {
  try {
    const allProducts = await getAllProductsService();

    res.send(allProducts);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function getOneProductByIdCon(req, res, next) {
  try {
    const id = req.params.id;

    const product = await getProductByIdService(id);

    if (product instanceof String || typeof product === "string")
      return res.status(404).send(product);

    res.send(product);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function createProductCon(req, res, next) {
  try {
    const productData = req.body;

    const data = await createProductService({
      category_id: productData.category_id,
      title: productData.title,
      picture: productData.picture,
      summary: productData.summary,
      description: productData.description,
      price: productData.price,
      discount_type: productData.discount_type,
      discount_value: productData.discount_value,
      tags: productData.tags,
    });

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function updateProductCon(req, res, next) {
  try {
    const productData = req.body;

    const data = await updateProductService(req.params?.id, {
      category_id: productData.category_id,
      title: productData.title,
      picture: productData.picture,
      summary: productData.summary,
      description: productData.description,
      price: productData.price,
      discount_type: productData.discount_type,
      discount_value: productData.discount_value,
      tags: productData.tags,
    });

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}

export async function deleteProductCon(req, res, next) {
  try {
    const data = await deleteProductService(req.params?.id);

    if (data instanceof String || typeof data === "string")
      return res.status(404).send(data);

    res.send(data);
  } catch (error) {
    logger.error(error);
    next(error);
  }
}
