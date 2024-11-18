import Joi from "joi";

export const validationCreateProductSchema = Joi.object({
  category_id: Joi.number().min(1).required(),
  title: Joi.string(),
  picture: Joi.string(),
  summary: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  discount_type: Joi.string(),
  discount_value: Joi.number(),
  tags: Joi.string(),
});

export const validationUpdateProductSchema = Joi.object({
  category_id: Joi.number().min(1),
  title: Joi.string(),
  picture: Joi.string(),
  summary: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  discount_type: Joi.string(),
  discount_value: Joi.number(),
  tags: Joi.string(),
});
