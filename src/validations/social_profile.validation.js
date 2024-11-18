import Joi from "joi";

export const validationCreateSocProfileSchema = Joi.object({
  user_id: Joi.number().min(1).required(),
  platform: Joi.string(),
  platform_user: Joi.string(),
});

export const validationUpdateSocProfileSchema = Joi.object({
  user_id: Joi.number().min(1).required(),
  platform: Joi.string(),
  platform_user: Joi.string(),
});
