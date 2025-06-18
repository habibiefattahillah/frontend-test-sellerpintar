import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.string(),
});
