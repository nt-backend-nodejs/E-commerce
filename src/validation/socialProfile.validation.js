
import { z } from "zod";

export const socialProfileCheck = z.object({
  id: z.number().min(1, "id must be a positive integer"), 

  user_id: z
    .number()
    .min(1, "user_id is required") 
    .int("user_id must be an integer"), 

  platform: z
    .string()
    .min(1, "platform is required")
    .max(100, "platform name must be less than 100 characters"), 

  platform_user: z
    .string()
    .min(1, "platform_user is required")
    .max(200, "platform_user must be less than 200 characters"),
});
