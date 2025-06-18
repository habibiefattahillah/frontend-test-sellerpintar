import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});

export const userResponseSchema = z.object({
  data: UserSchema,
});

export type User = z.infer<typeof UserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
