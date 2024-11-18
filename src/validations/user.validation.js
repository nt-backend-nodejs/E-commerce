import Joi from "joi";

export const validationRegisterUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  avatar: Joi.string(),
  username: Joi.string().min(3).required(),
  birth_of_date: Joi.string(),
  phone_number: Joi.string().min(7).required(),
});

export const validationLoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
});

export const validationUpdateUserSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  avatar: Joi.string(),
  username: Joi.string().min(3),
  birth_of_date: Joi.string(),
  phone_number: Joi.string().min(7),
});
