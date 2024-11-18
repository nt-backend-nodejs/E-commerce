import Joi from "joi";

export const validationCategorySchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  tag: Joi.string(),
});
