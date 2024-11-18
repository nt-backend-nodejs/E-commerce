import { z } from "zod";

export const orderValidationSchema = z.object({
  id: z
    .number()
    .min(1, "id must be a positive integer") ,

  user_id: z
    .number()
    .min(1, "user_id is required")  
    .int("user_id must be an integer"), 

  cart_id: z
    .number()
    .min(1, "cart_id is required")  
    .int("cart_id must be an integer"), 

  created_at: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      "created_at must be a valid ISO8601 date format"
    )
    .optional(),  

  updated_at: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      "updated_at must be a valid ISO8601 date format"
    )
    .optional(), 
});
