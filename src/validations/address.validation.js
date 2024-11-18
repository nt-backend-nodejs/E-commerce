import Joi from "joi";

export const validationCreateAddressSchema = Joi.object({
  user_id: Joi.number().min(1).required(),
  title: Joi.string(),
  address_line: Joi.string(),
  country: Joi.string(),
  city: Joi.string(),
  postal_code: Joi.string().regex(/^[0-9]+$/),
  phone_number: Joi.string().regex(/^[0-9]+$/),
});

export const validationUpdateAddressSchema = Joi.object({
  user_id: Joi.number().min(1),
  title: Joi.string(),
  address_line: Joi.string(),
  country: Joi.string(),
  city: Joi.string(),
  postal_code: Joi.string().regex(/^[0-9]+$/),
  phone_number: Joi.string().regex(/^[0-9]+$/),
});
